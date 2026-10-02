const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Resolve DB_PATH against the backend directory rather than the process cwd, so
// a relative value (the default './hostel.db' in .env) always points at the same
// file no matter which directory the server was launched from. Absolute paths
// are returned unchanged.
const dbPath = path.resolve(__dirname, process.env.DB_PATH || 'hostel.db');

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Failed to open database at ' + dbPath, err.message);
  } else {
    console.log('Connected to SQLite database at: ' + dbPath);
    // Enforce referential integrity for every connection.
    db.run('PRAGMA foreign_keys = ON');
  }
});

// Helper for promise-based db.run
function runAsync(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function (err) {
      if (err) reject(err);
      else resolve(this);
    });
  });
}

// Helper for promise-based db.get
function getAsync(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.get(sql, params, (err, row) => {
      if (err) reject(err);
      else resolve(row);
    });
  });
}

// Helper for promise-based db.all
function allAsync(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
}

async function initDatabase() {
  // 1. Hostels table
  await runAsync(`CREATE TABLE IF NOT EXISTS hostels (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    address TEXT,
    contact_phone TEXT,
    contact_email TEXT,
    manager_name TEXT,
    total_floors INTEGER DEFAULT 4,
    total_rooms INTEGER DEFAULT 7,
    total_beds INTEGER DEFAULT 120,
    washing_machines INTEGER DEFAULT 8,
    rules TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

  // 2. Rooms table
  await runAsync(`CREATE TABLE IF NOT EXISTS rooms (
    id TEXT PRIMARY KEY,
    room_number TEXT NOT NULL,
    floor INTEGER NOT NULL,
    type TEXT NOT NULL,
    category TEXT NOT NULL,
    ac BOOLEAN DEFAULT 1,
    price_per_month INTEGER NOT NULL,
    deposit INTEGER NOT NULL,
    total_beds INTEGER NOT NULL,
    available_beds INTEGER NOT NULL,
    amenities TEXT,
    image_url TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

  // 3. Beds table
  await runAsync(`CREATE TABLE IF NOT EXISTS beds (
    id TEXT PRIMARY KEY,
    room_id TEXT NOT NULL,
    bed_id TEXT NOT NULL,
    status TEXT DEFAULT 'Available',
    tenant_name TEXT,
    tenant_phone TEXT,
    join_date TEXT,
    payment_status TEXT,
    FOREIGN KEY (room_id) REFERENCES rooms (id) ON DELETE CASCADE
  )`);

  // 4. Tickets table
  await runAsync(`CREATE TABLE IF NOT EXISTS tickets (
    id TEXT PRIMARY KEY,
    tenant TEXT NOT NULL,
    room TEXT NOT NULL,
    category TEXT NOT NULL,
    priority TEXT NOT NULL,
    description TEXT NOT NULL,
    status TEXT DEFAULT 'Pending',
    date TEXT NOT NULL,
    photo TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

  // 5. Notices table
  await runAsync(`CREATE TABLE IF NOT EXISTS notices (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    date TEXT NOT NULL,
    category TEXT NOT NULL,
    author TEXT NOT NULL,
    content TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

  // 6. Expenses table
  await runAsync(`CREATE TABLE IF NOT EXISTS expenses (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    category TEXT NOT NULL,
    amount REAL NOT NULL,
    date TEXT NOT NULL,
    status TEXT DEFAULT 'Paid',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

  // 7. Visitors table
  await runAsync(`CREATE TABLE IF NOT EXISTS visitors (
    id TEXT PRIMARY KEY,
    visitor_name TEXT NOT NULL,
    host_tenant TEXT NOT NULL,
    room TEXT NOT NULL,
    relation TEXT NOT NULL,
    entry_time TEXT NOT NULL,
    exit_time TEXT DEFAULT 'Active inside',
    status TEXT DEFAULT 'Checked In',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

  // 8. Bookings table
  await runAsync(`CREATE TABLE IF NOT EXISTS bookings (
    id TEXT PRIMARY KEY,
    applicant_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    gender TEXT,
    room_id TEXT,
    room_number TEXT,
    bed_id TEXT,
    plan_duration TEXT,
    college_office TEXT,
    emergency_contact TEXT,
    status TEXT DEFAULT 'Pending',
    advance_paid REAL DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

  // 9. Reviews table
  await runAsync(`CREATE TABLE IF NOT EXISTS reviews (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    room TEXT NOT NULL,
    rating REAL NOT NULL,
    date TEXT NOT NULL,
    comment TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

  // 10. Menu table
  await runAsync(`CREATE TABLE IF NOT EXISTS menu (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    day TEXT NOT NULL UNIQUE,
    breakfast TEXT NOT NULL,
    lunch TEXT NOT NULL,
    snack TEXT NOT NULL,
    dinner TEXT NOT NULL
  )`);

  // 11. Staff table
  await runAsync(`CREATE TABLE IF NOT EXISTS staff (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    role TEXT NOT NULL,
    shift TEXT NOT NULL,
    phone TEXT NOT NULL,
    image TEXT
  )`);

  await seedDatabase();
}

async function seedDatabase() {
  // Seed Hostel info
  const hostelCount = await getAsync('SELECT COUNT(*) as count FROM hostels');
  if (hostelCount.count === 0) {
    await runAsync(
      `INSERT INTO hostels (id, name, address, contact_phone, contact_email, manager_name, total_floors, total_rooms, total_beds, washing_machines, rules)
       VALUES (1, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        // NOTE: All values below are fictional demo data for development.
        // The hostel admin can update these via the Settings tab in the UI.
        'StayEase Demo Hostel',
        'Plot 42, University Road, Sector 5, Knowledge City',
        '+91 98000 00001',
        'info@stayease-demo.example',
        'Ramesh Sharma',
        4,
        7,   // matches the 7 rooms actually seeded below
        14,  // matches the 14 beds actually seeded below
        8,
        JSON.stringify([
          'Gate closes strictly at 10:30 PM.',
          'Visitors permitted only in lounge between 9 AM to 7 PM.',
          'Silent hours from 11:00 PM to 6:00 AM.',
          'No smoking, alcohol, or contraband inside premises.',
          'Monthly fees payable by 5th of each calendar month.'
        ])
      ]
    );
  }

  // Seed Rooms & Beds
  const roomCount = await getAsync('SELECT COUNT(*) as count FROM rooms');
  if (roomCount.count === 0) {
    const initialRooms = [
      {
        id: 'R101',
        roomNumber: '101',
        floor: 1,
        type: 'Single Non-AC',
        category: 'Single',
        ac: 0,
        pricePerMonth: 7000,
        deposit: 9000,
        // totalBeds must equal the number of beds in the beds array below.
        totalBeds: 1,
        availableBeds: 1,
        amenities: ['Attached Bath', 'Study Desk', 'Ceiling Fan', 'Spacious Locker'],
        image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=800&q=80',
        beds: [
          { id: '101-A', status: 'Available', tenant: null, phone: null, joinDate: null, paymentStatus: null }
        ]
      },
      {
        id: 'R102',
        roomNumber: '102',
        floor: 1,
        type: 'Double Sharing AC',
        category: 'Double',
        ac: 1,
        pricePerMonth: 8500,
        deposit: 10000,
        totalBeds: 2,
        availableBeds: 1,
        amenities: ['Attached Bath', 'Individual Closets', 'Study Desk', 'Geyser', 'High-Speed WiFi'],
        image: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=800&q=80',
        beds: [
          { id: '102-A', status: 'Occupied', tenant: 'Rahul Verma', phone: '+91 98765 43210', joinDate: '2026-01-10', paymentStatus: 'Paid' },
          { id: '102-B', status: 'Available', tenant: null, phone: null, joinDate: null, paymentStatus: null }
        ]
      },
      {
        id: 'R103',
        roomNumber: '103',
        floor: 1,
        type: 'Triple Sharing Non-AC',
        category: 'Triple',
        ac: 0,
        pricePerMonth: 6000,
        deposit: 8000,
        totalBeds: 3,
        availableBeds: 0,
        amenities: ['Common Bath', 'Ceiling Fan', 'Study Desks', 'Spacious Locker'],
        image: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=800&q=80',
        beds: [
          { id: '103-A', status: 'Occupied', tenant: 'Vikram Singh', phone: '+91 98111 22334', joinDate: '2025-11-15', paymentStatus: 'Overdue' },
          { id: '103-B', status: 'Occupied', tenant: 'Amit Sharma', phone: '+91 98222 33445', joinDate: '2026-02-01', paymentStatus: 'Paid' },
          { id: '103-C', status: 'Occupied', tenant: 'Karthik Raja', phone: '+91 98333 44556', joinDate: '2026-01-05', paymentStatus: 'Paid' }
        ]
      },
      {
        id: 'R201',
        roomNumber: '201',
        floor: 2,
        type: 'Single AC Standard',
        category: 'Single',
        ac: 1,
        pricePerMonth: 11000,
        deposit: 14000,
        totalBeds: 1,
        availableBeds: 0,
        amenities: ['Attached Bath', 'Study Desk', 'Compact Fridge', 'WiFi'],
        image: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=800&q=80',
        beds: [
          { id: '201-A', status: 'Occupied', tenant: 'Aarav Patel', phone: '+91 98444 55667', joinDate: '2026-03-01', paymentStatus: 'Paid' }
        ]
      },
      {
        id: 'R202',
        roomNumber: '202',
        floor: 2,
        type: 'Double Sharing AC',
        category: 'Double',
        ac: 1,
        pricePerMonth: 8500,
        deposit: 10000,
        totalBeds: 2,
        availableBeds: 2,
        amenities: ['Attached Bath', 'Dual Study Stations', 'Balcony', 'Geyser'],
        image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80',
        beds: [
          { id: '202-A', status: 'Available', tenant: null, phone: null, joinDate: null, paymentStatus: null },
          { id: '202-B', status: 'Available', tenant: null, phone: null, joinDate: null, paymentStatus: null }
        ]
      },
      {
        id: 'R301',
        roomNumber: '301',
        floor: 3,
        type: 'Triple Sharing AC',
        category: 'Triple',
        ac: 1,
        pricePerMonth: 7200,
        deposit: 9000,
        totalBeds: 3,
        availableBeds: 1,
        amenities: ['AC', 'Attached Bath', 'Fast WiFi', 'Personal Lockers'],
        image: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=800&q=80',
        beds: [
          { id: '301-A', status: 'Occupied', tenant: 'Siddharth Roy', phone: '+91 98555 66778', joinDate: '2026-01-20', paymentStatus: 'Paid' },
          { id: '301-B', status: 'Occupied', tenant: 'Deepak Kumar', phone: '+91 98666 77889', joinDate: '2026-02-12', paymentStatus: 'Overdue' },
          { id: '301-C', status: 'Available', tenant: null, phone: null, joinDate: null, paymentStatus: null }
        ]
      },
      {
        id: 'R401',
        roomNumber: '401',
        floor: 4,
        type: 'Executive Suite Single',
        category: 'Single',
        ac: 1,
        pricePerMonth: 14000,
        deposit: 18000,
        totalBeds: 1,
        availableBeds: 1,
        amenities: ['Penthouse Balcony', 'Smart TV', 'Mini Kitchenette', 'Attached Bath', 'Geyser'],
        image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80',
        beds: [
          { id: '401-A', status: 'Available', tenant: null, phone: null, joinDate: null, paymentStatus: null }
        ]
      }
    ];

    for (const r of initialRooms) {
      await runAsync(
        `INSERT INTO rooms (id, room_number, floor, type, category, ac, price_per_month, deposit, total_beds, available_beds, amenities, image_url)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          r.id,
          r.roomNumber,
          r.floor,
          r.type,
          r.category,
          r.ac,
          r.pricePerMonth,
          r.deposit,
          r.totalBeds,
          r.availableBeds,
          JSON.stringify(r.amenities),
          r.image
        ]
      );

      for (const b of r.beds) {
        await runAsync(
          `INSERT INTO beds (id, room_id, bed_id, status, tenant_name, tenant_phone, join_date, payment_status)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            `${r.id}-${b.id}`,
            r.id,
            b.id,
            b.status,
            b.tenant,
            b.phone,
            b.joinDate,
            b.paymentStatus
          ]
        );
      }
    }
  }

  // Seed Notices
  const noticeCount = await getAsync('SELECT COUNT(*) as count FROM notices');
  if (noticeCount.count === 0) {
    const notices = [
      { id: 101, title: 'Annual Cultural Night & Dinner', date: '2026-08-20', category: 'Event', author: 'Hostel Committee', content: 'Join us in the Main Dining Hall for music, games, and a special buffet dinner starting at 7:00 PM.' },
      { id: 102, title: 'Scheduled Water Tank Cleaning', date: '2026-08-16', category: 'Maintenance', author: 'Manager Operations', content: 'Water supply will be temporarily paused from 10 AM to 1 PM this Saturday for deep tank sanitization.' },
      { id: 103, title: 'Mess Timings Update', date: '2026-08-10', category: 'Notice', author: 'Mess Warden', content: 'Breakfast now starts 15 minutes earlier at 7:30 AM to accommodate early college commuters.' }
    ];
    for (const n of notices) {
      await runAsync(
        `INSERT INTO notices (id, title, date, category, author, content) VALUES (?, ?, ?, ?, ?, ?)`,
        [n.id, n.title, n.date, n.category, n.author, n.content]
      );
    }
  }

  // Seed Tickets
  const ticketCount = await getAsync('SELECT COUNT(*) as count FROM tickets');
  if (ticketCount.count === 0) {
    const tickets = [
      { id: 'T-108', tenant: 'Rahul Verma', room: '102', category: 'Plumbing', priority: 'High', description: 'Bathroom geyser temperature knob broken.', status: 'In Progress', date: '2026-08-12', photo: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=400&q=80' },
      { id: 'T-105', tenant: 'Vikram Singh', room: '103', category: 'WiFi', priority: 'Medium', description: 'Signal dropping in corner desk of Room 103.', status: 'Pending', date: '2026-08-13', photo: null },
      { id: 'T-099', tenant: 'Aarav Patel', room: '201', category: 'Electrical', priority: 'Low', description: 'Study lamp plug replacement needed.', status: 'Resolved', date: '2026-08-08', photo: null }
    ];
    for (const t of tickets) {
      await runAsync(
        `INSERT INTO tickets (id, tenant, room, category, priority, description, status, date, photo) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [t.id, t.tenant, t.room, t.category, t.priority, t.description, t.status, t.date, t.photo]
      );
    }
  }

  // Seed Expenses
  const expCount = await getAsync('SELECT COUNT(*) as count FROM expenses');
  if (expCount.count === 0) {
    const expenses = [
      { id: 1, title: 'Electricity Bill (July)', category: 'Utilities', amount: 42500, date: '2026-08-02', status: 'Paid' },
      { id: 2, title: 'Commercial Water Supply', category: 'Utilities', amount: 18200, date: '2026-08-05', status: 'Paid' },
      { id: 3, title: 'Staff Salaries (4 Wardens/Cleaners)', category: 'Salaries', amount: 85000, date: '2026-08-01', status: 'Paid' },
      { id: 4, title: 'Washing Machine Repair (Unit 3)', category: 'Repairs', amount: 3400, date: '2026-08-09', status: 'Paid' }
    ];
    for (const e of expenses) {
      await runAsync(
        `INSERT INTO expenses (id, title, category, amount, date, status) VALUES (?, ?, ?, ?, ?, ?)`,
        [e.id, e.title, e.category, e.amount, e.date, e.status]
      );
    }
  }

  // Seed Visitors
  const visCount = await getAsync('SELECT COUNT(*) as count FROM visitors');
  if (visCount.count === 0) {
    const visitors = [
      { id: 'V-501', visitorName: 'Sanjay Verma', hostTenant: 'Rahul Verma', room: '102', relation: 'Father', entryTime: '2026-08-13 10:30 AM', exitTime: '2026-08-13 02:15 PM', status: 'Checked Out' },
      { id: 'V-502', visitorName: 'Anil Singh', hostTenant: 'Vikram Singh', room: '103', relation: 'Brother', entryTime: '2026-08-13 04:00 PM', exitTime: 'Active inside', status: 'Checked In' }
    ];
    for (const v of visitors) {
      await runAsync(
        `INSERT INTO visitors (id, visitor_name, host_tenant, room, relation, entry_time, exit_time, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [v.id, v.visitorName, v.hostTenant, v.room, v.relation, v.entryTime, v.exitTime, v.status]
      );
    }
  }

  // Seed Reviews
  const revCount = await getAsync('SELECT COUNT(*) as count FROM reviews');
  if (revCount.count === 0) {
    const reviews = [
      { id: 1, name: 'Ananya Deshmukh', room: 'Room 201 (Single AC)', rating: 5, date: 'Feb 2026', comment: 'Extremely clean hostel! High-speed WiFi made my remote work super smooth. High security and delicious Sunday meals.' },
      { id: 2, name: 'Rohan Mehta', room: 'Room 102 (Double Sharing)', rating: 4.8, date: 'Jan 2026', comment: 'The manager responds quickly to maintenance tickets. Washing area with 8 machines is super convenient.' },
      { id: 3, name: 'Praveen Kumar', room: 'Room 301 (Triple AC)', rating: 4.5, date: 'Dec 2025', comment: 'Great community vibe! landmark distances are exact; metro station is just a 8 min walk.' }
    ];
    for (const r of reviews) {
      await runAsync(
        `INSERT INTO reviews (id, name, room, rating, date, comment) VALUES (?, ?, ?, ?, ?, ?)`,
        [r.id, r.name, r.room, r.rating, r.date, r.comment]
      );
    }
  }

  // Seed Menu
  const menuCount = await getAsync('SELECT COUNT(*) as count FROM menu');
  if (menuCount.count === 0) {
    const weeklyMenu = [
      { day: 'Monday', breakfast: 'Puri Bhaji / Idli Sambar + Tea/Coffee', lunch: 'Paneer Butter Masala, Dal Tadka, Roti, Rice, Salad', snack: 'Samosa / Biscuits + Tea', dinner: 'Aloo Gobi, Chana Dal, Rice, Chapati, Kheer' },
      { day: 'Tuesday', breakfast: 'Aloo Paratha with Curd / Toast', lunch: 'Rajma Masala, Jeera Rice, Chapati, Boondi Raita', snack: 'Veg Cutlet + Coffee', dinner: 'Egg Curry / Kadai Paneer, Yellow Dal, Chapati, Rice' },
      { day: 'Wednesday', breakfast: 'Masala Dosa / Vada + Chutney', lunch: 'Chicken Curry / Butter Paneer, Veg Biryani, Mirchi Salan', snack: 'Onion Pakoda + Tea', dinner: 'Mixed Veg, Dal Fry, Roti, Rice, Gulab Jamun' },
      { day: 'Thursday', breakfast: 'Poha / Uttapam + Coffee', lunch: 'Kadi Pakoda, Steamed Rice, Bhindi Fry, Chapati', snack: 'Bread Pakoda + Tea', dinner: 'Soyabean Masala, Dal Makhani, Roti, Rice, Ice Cream' },
      { day: 'Friday', breakfast: 'Chole Bhature / Upma', lunch: 'Dal Tadka, Sev Tamatar, Rice, Phulka, Butter Milk', snack: 'Maggi / French Fries + Coffee', dinner: 'Chicken Biryani / Veg Hyderabadi Biryani, Raita, Rasgulla' },
      { day: 'Saturday', breakfast: 'Pav Bhaji / Stuffed Paratha', lunch: 'Baingan Bharta, Chana Dal, Rice, Chapati, Salad', snack: 'Pav Vada + Tea', dinner: 'Paneer Do Pyaza, Dal Kolhapuri, Naan/Roti, Jeera Rice' },
      { day: 'Sunday', breakfast: 'Masala Omelette / Paneer Sandwich + Juice', lunch: 'Special Sunday Feast: Paneer Tikka Masala, Veg Pulao, Puri, Shrikhand', snack: 'Pastry / Cookies + Tea', dinner: 'Light Khichdi / Egg Bhurji, Chapti, Curd, Fruit Salad' }
    ];
    for (const m of weeklyMenu) {
      await runAsync(
        `INSERT INTO menu (day, breakfast, lunch, snack, dinner) VALUES (?, ?, ?, ?, ?)`,
        [m.day, m.breakfast, m.lunch, m.snack, m.dinner]
      );
    }
  }

  // Seed Staff
  const staffCount = await getAsync('SELECT COUNT(*) as count FROM staff');
  if (staffCount.count === 0) {
    const staff = [
      { name: 'Ramesh Sharma', role: 'Chief Warden', shift: 'Day (8 AM - 6 PM)', phone: '+91 98999 11111', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80' },
      { name: 'Sunita Devi', role: 'Head Mess Manager', shift: 'Morning & Evening', phone: '+91 98999 22222', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80' },
      { name: 'Manoj Kumar', role: 'Security Supervisor', shift: 'Night (8 PM - 8 AM)', phone: '+91 98999 33333', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80' }
    ];
    for (const s of staff) {
      await runAsync(
        `INSERT INTO staff (name, role, shift, phone, image) VALUES (?, ?, ?, ?, ?)`,
        [s.name, s.role, s.shift, s.phone, s.image]
      );
    }
  }
}

module.exports = {
  db,
  initDatabase,
  runAsync,
  getAsync,
  allAsync
};
