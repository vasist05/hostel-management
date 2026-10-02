const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const { randomUUID } = require('crypto');

// Load backend/.env with Node's built-in loader (no dotenv dependency required).
// This has to happen before './database' is required, because database.js reads
// DB_PATH at module load time.
const envFile = path.resolve(__dirname, '.env');
if (fs.existsSync(envFile)) {
  try {
    process.loadEnvFile(envFile);
  } catch (err) {
    console.warn('Could not load .env file:', err.message);
  }
}

const { initDatabase, runAsync, getAsync, allAsync } = require('./database');

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors({ origin: process.env.CORS_ORIGIN || '*' }));
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));

// Request logging middleware
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl} -> ${res.statusCode} (${duration}ms)`);
  });
  next();
});

// ----------------------------------------------------
// Health Check
// ----------------------------------------------------
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    service: 'StayEase Hostel Management API'
  });
});

// ----------------------------------------------------
// 1. Hostel Details
// ----------------------------------------------------
app.get('/api/hostel', async (req, res) => {
  try {
    const hostel = await getAsync('SELECT * FROM hostels LIMIT 1');
    if (!hostel) return res.status(404).json({ error: 'Hostel not found' });
    if (hostel.rules) {
      try {
        hostel.rules = JSON.parse(hostel.rules);
      } catch (e) {
        // Keep as string if parsing fails
      }
    }
    res.json(hostel);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/hostel', async (req, res) => {
  try {
    const {
      name, address, contact_phone, contact_email,
      manager_name, total_floors, total_rooms, total_beds,
      washing_machines, rules
    } = req.body;

    const rulesStr = typeof rules === 'object' ? JSON.stringify(rules) : rules;

    const result = await runAsync(
      `UPDATE hostels SET
        name = COALESCE(?, name),
        address = COALESCE(?, address),
        contact_phone = COALESCE(?, contact_phone),
        contact_email = COALESCE(?, contact_email),
        manager_name = COALESCE(?, manager_name),
        total_floors = COALESCE(?, total_floors),
        total_rooms = COALESCE(?, total_rooms),
        total_beds = COALESCE(?, total_beds),
        washing_machines = COALESCE(?, washing_machines),
        rules = COALESCE(?, rules)
       WHERE id = 1`,
      [name, address, contact_phone, contact_email, manager_name, total_floors, total_rooms, total_beds, washing_machines, rulesStr]
    );

    res.json({ message: 'Hostel updated successfully', changes: result.changes });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ----------------------------------------------------
// 2. Rooms & Beds Management
// ----------------------------------------------------
app.get('/api/rooms', async (req, res) => {
  try {
    const { floor, ac, category } = req.query;
    let query = 'SELECT * FROM rooms WHERE 1=1';
    const params = [];

    if (floor !== undefined && floor !== 'ALL') {
      query += ' AND floor = ?';
      params.push(Number(floor));
    }
    if (ac !== undefined) {
      query += ' AND ac = ?';
      params.push(ac === 'true' || ac === '1' ? 1 : 0);
    }
    if (category) {
      query += ' AND LOWER(category) = LOWER(?)';
      params.push(category);
    }

    query += ' ORDER BY floor ASC, room_number ASC';

    const rooms = await allAsync(query, params);
    const allBeds = await allAsync('SELECT * FROM beds');

    // Attach beds to each room and normalize properties matching frontend app.js
    const formattedRooms = rooms.map(room => {
      let amenities = [];
      try {
        amenities = room.amenities ? JSON.parse(room.amenities) : [];
      } catch (e) {
        amenities = [];
      }

      const roomBeds = allBeds
        .filter(b => b.room_id === room.id)
        .map(b => ({
          id: b.bed_id,
          dbId: b.id,
          status: b.status,
          tenant: b.tenant_name,
          phone: b.tenant_phone,
          joinDate: b.join_date,
          paymentStatus: b.payment_status
        }));

      // Calculate available beds dynamically based on beds
      const availableBeds = roomBeds.length > 0
        ? roomBeds.filter(b => b.status === 'Available').length
        : room.available_beds;

      return {
        id: room.id,
        roomNumber: room.room_number,
        floor: room.floor,
        type: room.type,
        category: room.category,
        ac: Boolean(room.ac),
        pricePerMonth: room.price_per_month,
        deposit: room.deposit,
        totalBeds: room.total_beds,
        availableBeds,
        amenities,
        image: room.image_url,
        beds: roomBeds
      };
    });

    res.json(formattedRooms);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/rooms/:id', async (req, res) => {
  try {
    const room = await getAsync('SELECT * FROM rooms WHERE id = ?', [req.params.id]);
    if (!room) return res.status(404).json({ error: 'Room not found' });

    let amenities = [];
    try {
      amenities = room.amenities ? JSON.parse(room.amenities) : [];
    } catch (e) {
      amenities = [];
    }

    const beds = await allAsync('SELECT * FROM beds WHERE room_id = ?', [room.id]);
    const formattedBeds = beds.map(b => ({
      id: b.bed_id,
      dbId: b.id,
      status: b.status,
      tenant: b.tenant_name,
      phone: b.tenant_phone,
      joinDate: b.join_date,
      paymentStatus: b.payment_status
    }));

    res.json({
      id: room.id,
      roomNumber: room.room_number,
      floor: room.floor,
      type: room.type,
      category: room.category,
      ac: Boolean(room.ac),
      pricePerMonth: room.price_per_month,
      deposit: room.deposit,
      totalBeds: room.total_beds,
      availableBeds: formattedBeds.filter(b => b.status === 'Available').length,
      amenities,
      image: room.image_url,
      beds: formattedBeds
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/rooms', async (req, res) => {
  try {
    const {
      id, roomNumber, room_number, floor, type, category, ac,
      pricePerMonth, price_per_month, deposit, totalBeds, total_beds,
      availableBeds, available_beds, amenities, image, image_url, beds
    } = req.body;

    const rNumber = roomNumber || room_number;
    const rId = id || `R${rNumber}`;
    const rFloor = Number(floor) || 1;
    const rType = type || 'Standard Room';
    const rCat = category || 'Single';
    const rAc = ac ? 1 : 0;
    const rPrice = Number(pricePerMonth || price_per_month) || 8000;
    const rDeposit = Number(deposit) || 10000;
    const rTotal = Number(totalBeds || total_beds) || (beds ? beds.length : 1);
    const rAvail = availableBeds !== undefined ? availableBeds : (available_beds !== undefined ? available_beds : rTotal);
    const rAmenities = typeof amenities === 'object' ? JSON.stringify(amenities) : (amenities || '[]');
    const rImage = image || image_url || 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=800&q=80';

    // Wrap room + bed inserts in a transaction so a partial failure doesn't
    // leave an orphaned room row with no beds.
    await runAsync('BEGIN');
    try {
      await runAsync(
        `INSERT INTO rooms (id, room_number, floor, type, category, ac, price_per_month, deposit, total_beds, available_beds, amenities, image_url)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [rId, rNumber, rFloor, rType, rCat, rAc, rPrice, rDeposit, rTotal, rAvail, rAmenities, rImage]
      );

      // If beds array was provided, create beds
      if (Array.isArray(beds) && beds.length > 0) {
        for (const b of beds) {
          const bedId = b.id || `${rNumber}-A`;
          await runAsync(
            `INSERT INTO beds (id, room_id, bed_id, status, tenant_name, tenant_phone, join_date, payment_status)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
            [
              `${rId}-${bedId}`,
              rId,
              bedId,
              b.status || 'Available',
              b.tenant || b.tenant_name || null,
              b.phone || b.tenant_phone || null,
              b.joinDate || b.join_date || null,
              b.paymentStatus || b.payment_status || null
            ]
          );
        }
      } else {
        // Auto-generate default beds
        const letters = ['A', 'B', 'C', 'D'];
        for (let i = 0; i < rTotal; i++) {
          const bedId = `${rNumber}-${letters[i] || (i + 1)}`;
          await runAsync(
            `INSERT INTO beds (id, room_id, bed_id, status) VALUES (?, ?, ?, 'Available')`,
            [`${rId}-${bedId}`, rId, bedId]
          );
        }
      }

      await runAsync('COMMIT');
    } catch (innerErr) {
      await runAsync('ROLLBACK');
      throw innerErr;
    }

    res.status(201).json({ message: 'Room created successfully', id: rId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/rooms/:id', async (req, res) => {
  try {
    const {
      roomNumber, room_number, floor, type, category, ac,
      pricePerMonth, price_per_month, deposit, totalBeds, total_beds,
      availableBeds, available_beds, amenities, image, image_url
    } = req.body || {};

    // Prefer the camelCase field, then the snake_case alias. Deliberately not
    // `a || b`: a legitimate 0 (e.g. availableBeds: 0) is falsy and would fall
    // through to the alias, so the COALESCE below would silently keep the old value.
    const pick = (primary, alias) => (primary !== undefined ? primary : alias);

    const rNumber = pick(roomNumber, room_number);
    const rAc = ac !== undefined ? (ac ? 1 : 0) : undefined;
    const rPrice = pick(pricePerMonth, price_per_month);
    const rTotal = pick(totalBeds, total_beds);
    const rAvail = pick(availableBeds, available_beds);
    const rImage = pick(image, image_url);
    const rAmenities = amenities === undefined
      ? undefined
      : (typeof amenities === 'object' && amenities !== null ? JSON.stringify(amenities) : amenities);

    const result = await runAsync(
      `UPDATE rooms SET
        room_number = COALESCE(?, room_number),
        floor = COALESCE(?, floor),
        type = COALESCE(?, type),
        category = COALESCE(?, category),
        ac = COALESCE(?, ac),
        price_per_month = COALESCE(?, price_per_month),
        deposit = COALESCE(?, deposit),
        total_beds = COALESCE(?, total_beds),
        available_beds = COALESCE(?, available_beds),
        amenities = COALESCE(?, amenities),
        image_url = COALESCE(?, image_url)
       WHERE id = ?`,
      [
        rNumber, floor, type, category, rAc,
        rPrice, deposit, rTotal, rAvail,
        rAmenities, rImage, req.params.id
      ]
    );

    if (result.changes === 0) {
      return res.status(404).json({ error: 'Room not found' });
    }

    res.json({ message: 'Room updated successfully', changes: result.changes });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/rooms/:id', async (req, res) => {
  try {
    await runAsync('DELETE FROM beds WHERE room_id = ?', [req.params.id]);
    const result = await runAsync('DELETE FROM rooms WHERE id = ?', [req.params.id]);
    res.json({ message: 'Room and its beds deleted successfully', changes: result.changes });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Beds sub-routes
app.get('/api/rooms/:roomId/beds', async (req, res) => {
  try {
    const beds = await allAsync('SELECT * FROM beds WHERE room_id = ?', [req.params.roomId]);
    res.json(beds);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/rooms/:roomId/beds', async (req, res) => {
  try {
    const { bed_id, status, tenant_name, tenant_phone, join_date, payment_status } = req.body;
    const id = `${req.params.roomId}-${bed_id}`;
    await runAsync(
      `INSERT INTO beds (id, room_id, bed_id, status, tenant_name, tenant_phone, join_date, payment_status)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [id, req.params.roomId, bed_id, status || 'Available', tenant_name || null, tenant_phone || null, join_date || null, payment_status || null]
    );
    res.status(201).json({ message: 'Bed added successfully', id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/beds/:id', async (req, res) => {
  try {
    const { status, tenant, tenant_name, phone, tenant_phone, joinDate, join_date, paymentStatus, payment_status } = req.body || {};

    // Only build assignments for the columns the caller actually sent. Omitting a
    // field must leave it untouched: a partial `{ status }` update used to bind
    // NULL to tenant_name/tenant_phone/join_date/payment_status and wipe the
    // resident's record. Passing an explicit null still clears a column.
    const assignments = [];
    const params = [];
    const assign = (column, value) => {
      if (value === undefined) return;
      assignments.push(`${column} = ?`);
      params.push(value);
    };

    assign('status', status);
    assign('tenant_name', tenant !== undefined ? tenant : tenant_name);
    assign('tenant_phone', phone !== undefined ? phone : tenant_phone);
    assign('join_date', joinDate !== undefined ? joinDate : join_date);
    assign('payment_status', paymentStatus !== undefined ? paymentStatus : payment_status);

    if (assignments.length === 0) {
      return res.status(400).json({ error: 'No updatable bed fields provided' });
    }

    params.push(req.params.id, req.params.id);
    const result = await runAsync(
      `UPDATE beds SET ${assignments.join(', ')} WHERE id = ? OR bed_id = ?`,
      params
    );

    if (result.changes === 0) {
      return res.status(404).json({ error: 'Bed not found' });
    }

    res.json({ message: 'Bed updated successfully', changes: result.changes });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/beds/:id', async (req, res) => {
  try {
    // Use only the primary key `id` column — the old `OR bed_id = ?` clause
    // matched on the short label (e.g. '101-A') and could accidentally delete
    // every bed that shared that label across different rooms.
    const result = await runAsync('DELETE FROM beds WHERE id = ?', [req.params.id]);
    if (result.changes === 0) {
      return res.status(404).json({ error: 'Bed not found' });
    }
    res.json({ message: 'Bed deleted successfully', changes: result.changes });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ----------------------------------------------------
// 3. Maintenance Tickets
// ----------------------------------------------------
app.get('/api/tickets', async (req, res) => {
  try {
    const tickets = await allAsync('SELECT * FROM tickets ORDER BY created_at DESC');
    res.json(tickets);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/tickets', async (req, res) => {
  try {
    const { id, tenant, room, category, priority, description, status, date, photo } = req.body;
    // Use crypto.randomUUID() for collision-free IDs — Math.random() only has
    // 900 possible values in the old `T-${Math.floor(100 + Math.random()*900)}`
    // pattern, causing frequent primary-key conflicts under load.
    const ticketId = id || `T-${randomUUID()}`;
    const ticketDate = date || new Date().toISOString().split('T')[0];

    await runAsync(
      `INSERT INTO tickets (id, tenant, room, category, priority, description, status, date, photo)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [ticketId, tenant, room, category || 'General', priority || 'Medium', description, status || 'Pending', ticketDate, photo || null]
    );

    res.status(201).json({ message: 'Ticket created successfully', id: ticketId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/tickets/:id', async (req, res) => {
  try {
    const { status, priority, description } = req.body;
    await runAsync(
      `UPDATE tickets SET
        status = COALESCE(?, status),
        priority = COALESCE(?, priority),
        description = COALESCE(?, description)
       WHERE id = ?`,
      [status, priority, description, req.params.id]
    );
    res.json({ message: 'Ticket updated successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/tickets/:id', async (req, res) => {
  try {
    const result = await runAsync('DELETE FROM tickets WHERE id = ?', [req.params.id]);
    res.json({ message: 'Ticket deleted successfully', changes: result.changes });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ----------------------------------------------------
// 4. Notices & Announcements
// ----------------------------------------------------
app.get('/api/notices', async (req, res) => {
  try {
    const notices = await allAsync('SELECT * FROM notices ORDER BY date DESC, id DESC');
    res.json(notices);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/notices', async (req, res) => {
  try {
    const { title, date, category, author, content } = req.body;
    const noticeDate = date || new Date().toISOString().split('T')[0];
    const result = await runAsync(
      `INSERT INTO notices (title, date, category, author, content) VALUES (?, ?, ?, ?, ?)`,
      [title, noticeDate, category || 'Notice', author || 'Management', content]
    );
    res.status(201).json({ message: 'Notice created successfully', id: result.lastID });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/notices/:id', async (req, res) => {
  try {
    const { title, date, category, author, content } = req.body;
    await runAsync(
      `UPDATE notices SET
        title = COALESCE(?, title),
        date = COALESCE(?, date),
        category = COALESCE(?, category),
        author = COALESCE(?, author),
        content = COALESCE(?, content)
       WHERE id = ?`,
      [title, date, category, author, content, req.params.id]
    );
    res.json({ message: 'Notice updated successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/notices/:id', async (req, res) => {
  try {
    const result = await runAsync('DELETE FROM notices WHERE id = ?', [req.params.id]);
    res.json({ message: 'Notice deleted successfully', changes: result.changes });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ----------------------------------------------------
// 5. Expenses Management
// ----------------------------------------------------
app.get('/api/expenses', async (req, res) => {
  try {
    const expenses = await allAsync('SELECT * FROM expenses ORDER BY date DESC, id DESC');
    res.json(expenses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/expenses', async (req, res) => {
  try {
    const { title, category, amount, date, status } = req.body;
    const expDate = date || new Date().toISOString().split('T')[0];
    const result = await runAsync(
      `INSERT INTO expenses (title, category, amount, date, status) VALUES (?, ?, ?, ?, ?)`,
      [title, category || 'General', Number(amount) || 0, expDate, status || 'Paid']
    );
    res.status(201).json({ message: 'Expense recorded successfully', id: result.lastID });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/expenses/:id', async (req, res) => {
  try {
    const result = await runAsync('DELETE FROM expenses WHERE id = ?', [req.params.id]);
    res.json({ message: 'Expense deleted successfully', changes: result.changes });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ----------------------------------------------------
// 6. Visitors / Security Desk
// ----------------------------------------------------
app.get('/api/visitors', async (req, res) => {
  try {
    const visitors = await allAsync('SELECT * FROM visitors ORDER BY created_at DESC');
    const formatted = visitors.map(v => ({
      id: v.id,
      visitorName: v.visitor_name,
      hostTenant: v.host_tenant,
      room: v.room,
      relation: v.relation,
      entryTime: v.entry_time,
      exitTime: v.exit_time,
      status: v.status
    }));
    res.json(formatted);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/visitors', async (req, res) => {
  try {
    const { id, visitorName, visitor_name, hostTenant, host_tenant, room, relation, entryTime, entry_time } = req.body;
    // Use crypto.randomUUID() — the old Math.floor(500 + Math.random()*500)
    // had only 500 possible values and would collide quickly.
    const vId = id || `V-${randomUUID()}`;
    const vName = visitorName || visitor_name;
    const vHost = hostTenant || host_tenant;
    const vEntry = entryTime || entry_time || new Date().toLocaleString();

    await runAsync(
      `INSERT INTO visitors (id, visitor_name, host_tenant, room, relation, entry_time, exit_time, status)
       VALUES (?, ?, ?, ?, ?, ?, 'Active inside', 'Checked In')`,
      [vId, vName, vHost, room, relation || 'Guest', vEntry]
    );

    res.status(201).json({ message: 'Visitor checked in successfully', id: vId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/visitors/:id/checkout', async (req, res) => {
  try {
    const { exitTime, exit_time } = req.body;
    const vExit = exitTime || exit_time || new Date().toLocaleString();
    await runAsync(
      `UPDATE visitors SET exit_time = ?, status = 'Checked Out' WHERE id = ?`,
      [vExit, req.params.id]
    );
    res.json({ message: 'Visitor checked out successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ----------------------------------------------------
// 7. Bookings / New Joiner Applications
// ----------------------------------------------------
app.get('/api/bookings', async (req, res) => {
  try {
    const bookings = await allAsync('SELECT * FROM bookings ORDER BY created_at DESC');
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/bookings', async (req, res) => {
  try {
    const {
      id, applicant_name, applicantName, email, phone, gender,
      room_id, roomId, room_number, roomNumber, bed_id, bedId,
      plan_duration, planDuration, college_office, collegeOffice,
      emergency_contact, emergencyContact, advance_paid, advancePaid
    } = req.body;

    const bId = id || `BK-${Date.now().toString(36).toUpperCase()}`;

    await runAsync(
      `INSERT INTO bookings (id, applicant_name, email, phone, gender, room_id, room_number, bed_id, plan_duration, college_office, emergency_contact, status, advance_paid)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'Pending', ?)`,
      [
        bId,
        applicant_name || applicantName,
        email,
        phone,
        gender || 'Not specified',
        room_id || roomId || null,
        room_number || roomNumber || null,
        bed_id || bedId || null,
        plan_duration || planDuration || '6 Months',
        college_office || collegeOffice || null,
        emergency_contact || emergencyContact || null,
        Number(advance_paid || advancePaid) || 0
      ]
    );

    res.status(201).json({ message: 'Booking application submitted successfully', id: bId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/bookings/:id', async (req, res) => {
  try {
    const { status } = req.body;
    await runAsync('UPDATE bookings SET status = ? WHERE id = ?', [status, req.params.id]);
    res.json({ message: 'Booking status updated successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ----------------------------------------------------
// 8. Reviews / Customer Feedback
// ----------------------------------------------------
app.get('/api/reviews', async (req, res) => {
  try {
    const reviews = await allAsync('SELECT * FROM reviews ORDER BY id DESC');
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/reviews', async (req, res) => {
  try {
    const { name, room, rating, date, comment } = req.body;
    const revDate = date || new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    const result = await runAsync(
      `INSERT INTO reviews (name, room, rating, date, comment) VALUES (?, ?, ?, ?, ?)`,
      [name, room || 'General Resident', Number(rating) || 5, revDate, comment]
    );
    res.status(201).json({ message: 'Review added successfully', id: result.lastID });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ----------------------------------------------------
// 9. Menu & Staff
// ----------------------------------------------------
app.get('/api/menu', async (req, res) => {
  try {
    const menu = await allAsync('SELECT * FROM menu');
    res.json(menu);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/menu/:id', async (req, res) => {
  try {
    const { breakfast, lunch, snack, dinner } = req.body;
    await runAsync(
      `UPDATE menu SET
        breakfast = COALESCE(?, breakfast),
        lunch = COALESCE(?, lunch),
        snack = COALESCE(?, snack),
        dinner = COALESCE(?, dinner)
       WHERE id = ? OR day = ?`,
      [breakfast, lunch, snack, dinner, req.params.id, req.params.id]
    );
    res.json({ message: 'Menu updated successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/staff', async (req, res) => {
  try {
    const staff = await allAsync('SELECT * FROM staff');
    res.json(staff);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/staff', async (req, res) => {
  try {
    const { name, role, shift, phone, image } = req.body;
    const result = await runAsync(
      `INSERT INTO staff (name, role, shift, phone, image) VALUES (?, ?, ?, ?, ?)`,
      [name, role, shift, phone, image || null]
    );
    res.status(201).json({ message: 'Staff member added successfully', id: result.lastID });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ----------------------------------------------------
// 10. Dashboard Analytics & Statistics
// ----------------------------------------------------
app.get('/api/stats', async (req, res) => {
  try {
    const roomCount = await getAsync('SELECT COUNT(*) as total FROM rooms');
    const bedStats = await getAsync(`
      SELECT
        COUNT(*) as totalBeds,
        SUM(CASE WHEN status = 'Occupied' THEN 1 ELSE 0 END) as occupiedBeds,
        SUM(CASE WHEN status = 'Available' THEN 1 ELSE 0 END) as availableBeds
      FROM beds
    `);
    const pendingTickets = await getAsync("SELECT COUNT(*) as count FROM tickets WHERE status != 'Resolved'");
    const activeVisitors = await getAsync("SELECT COUNT(*) as count FROM visitors WHERE status = 'Checked In'");
    const totalExpenses = await getAsync("SELECT SUM(amount) as total FROM expenses");
    const totalBookings = await getAsync("SELECT COUNT(*) as count FROM bookings");

    const totalBeds = bedStats.totalBeds || 0;
    const occupiedBeds = bedStats.occupiedBeds || 0;
    const occupancyRate = totalBeds > 0 ? Math.round((occupiedBeds / totalBeds) * 100) : 0;

    res.json({
      totalRooms: roomCount.total || 0,
      totalBeds,
      occupiedBeds,
      availableBeds: bedStats.availableBeds || 0,
      occupancyRate,
      pendingTickets: pendingTickets.count || 0,
      activeVisitors: activeVisitors.count || 0,
      totalExpenses: totalExpenses.total || 0,
      totalBookings: totalBookings.count || 0
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ----------------------------------------------------
// Frontend Static Files
// ----------------------------------------------------
const frontendDir = path.resolve(__dirname, '..');

// The frontend lives in the repository root, so a plain express.static(frontendDir)
// also publishes everything sitting next to it - including backend/hostel.db
// (tenant names and phone numbers) and the backend sources. Only files that live
// directly in the frontend directory are exposed here.
function isFrontendAsset(reqPath) {
  if (reqPath === '/' || reqPath === '') return true;

  let decoded;
  try {
    decoded = decodeURIComponent(reqPath);
  } catch (err) {
    return false;
  }

  if (decoded.includes('\0')) return false;

  const resolved = path.resolve(frontendDir, '.' + decoded);
  return path.dirname(resolved) === frontendDir;
}

app.use((req, res, next) => {
  if (!isFrontendAsset(req.path)) {
    return res.status(404).json({ error: `Route ${req.method} ${req.originalUrl} not found` });
  }
  next();
});

app.use(express.static(frontendDir, { dotfiles: 'ignore' }));

app.get('/', (req, res) => {
  res.sendFile(path.join(frontendDir, 'index.html'));
});

// ----------------------------------------------------
// 404 & Error Handling
// ----------------------------------------------------
// Always answer with JSON. The previous version served index.html for any
// client that accepted text/html - including fetch()'s default `Accept: */*` -
// so a typo'd /api/* URL looked like a successful 200 response.
app.use((req, res) => {
  res.status(404).json({ error: `Route ${req.method} ${req.originalUrl} not found` });
});

app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({ error: 'Internal Server Error', message: err.message });
});

// Initialize database and start server
async function startServer() {
  try {
    await initDatabase();
    const server = app.listen(PORT, () => {
      // Read the bound port back from the server: PORT=0 asks the OS for a free
      // port, in which case the configured value is not the one actually used.
      const { port } = server.address();
      console.log(`========================================`);
      console.log(` StayEase Hostel Management API Running `);
      console.log(` Server URL: http://localhost:${port}   `);
      console.log(` Health Check: http://localhost:${port}/api/health `);
      console.log(`========================================`);
    });
  } catch (err) {
    console.error('Failed to initialize database or start server:', err);
    process.exit(1);
  }
}

startServer();

module.exports = app;
