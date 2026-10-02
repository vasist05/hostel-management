// Automated API Test Suite for StayEase Hostel Management Backend
const http = require('http');

const BASE_URL = process.env.TEST_URL || 'http://localhost:5000';

async function request(path, options = {}) {
  const url = `${BASE_URL}${path}`;
  const res = await fetch(url, {
    headers: { 'Content-Type': 'application/json', ...options.headers },
    ...options
  });
  const data = await res.json().catch(() => ({}));
  return { status: res.status, ok: res.ok, data };
}

let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`  [PASS] ${message}`);
    passed++;
  } else {
    console.error(`  [FAIL] ${message}`);
    failed++;
  }
}

async function runTests() {
  console.log(`\n==============================================`);
  console.log(`Starting API Tests against ${BASE_URL}`);
  console.log(`==============================================\n`);

  try {
    // 1. Health Check
    console.log('1. Health Check:');
    const health = await request('/api/health');
    assert(health.ok && health.data.status === 'ok', 'GET /api/health responds with status ok');

    // 2. Hostel Details
    console.log('\n2. Hostel Details:');
    const hostel = await request('/api/hostel');
    assert(hostel.ok && hostel.data.id === 1, 'GET /api/hostel returns seeded hostel (id: 1)');
    
    const updateHostel = await request('/api/hostel', {
      method: 'PUT',
      body: JSON.stringify({ manager_name: 'Ramesh Sharma (Verified)' })
    });
    assert(updateHostel.ok, 'PUT /api/hostel updates manager name');

    // 3. Rooms & Beds
    console.log('\n3. Rooms & Beds:');
    const rooms = await request('/api/rooms');
    assert(rooms.ok && Array.isArray(rooms.data) && rooms.data.length >= 6, `GET /api/rooms returns seeded rooms (${rooms.data?.length || 0} rooms)`);
    assert(rooms.data[0].beds && Array.isArray(rooms.data[0].beds), 'Rooms contain nested beds array');

    const filterFloor = await request('/api/rooms?floor=1');
    assert(filterFloor.ok && filterFloor.data.every(r => r.floor === 1), 'GET /api/rooms?floor=1 correctly filters by floor');

    // Create a new room
    const newRoom = await request('/api/rooms', {
      method: 'POST',
      body: JSON.stringify({
        id: 'R999',
        roomNumber: '999',
        floor: 9,
        type: 'Test Suite Room',
        category: 'Single',
        ac: true,
        pricePerMonth: 9999,
        deposit: 12000,
        totalBeds: 1,
        amenities: ['WiFi', 'Attached Bath'],
        beds: [{ id: '999-A', status: 'Available' }]
      })
    });
    assert(newRoom.ok && newRoom.data.id === 'R999', 'POST /api/rooms creates room R999');

    const getRoom = await request('/api/rooms/R999');
    assert(getRoom.ok && getRoom.data.roomNumber === '999', 'GET /api/rooms/R999 retrieves newly created room');

    const updateBed = await request('/api/beds/999-A', {
      method: 'PUT',
      body: JSON.stringify({
        status: 'Occupied',
        tenant: 'Test Tenant',
        phone: '+91 99999 88888',
        paymentStatus: 'Paid'
      })
    });
    assert(updateBed.ok, 'PUT /api/beds/:id updates bed status & tenant');

    // Regression: a partial update must not blank the fields the caller omitted.
    // The handler used to assign tenant_name / tenant_phone / join_date /
    // payment_status unconditionally, so sending `{ status }` alone wiped the
    // resident's entire record.
    const partialBed = await request('/api/beds/999-A', {
      method: 'PUT',
      body: JSON.stringify({ status: 'Available' })
    });
    assert(partialBed.ok, 'PUT /api/beds/:id accepts a partial (status-only) update');

    const afterPartial = await request('/api/rooms/R999');
    const partialRow = afterPartial.data.beds.find(b => b.id === '999-A');
    assert(
      partialRow && partialRow.tenant === 'Test Tenant',
      'Partial bed update preserves the tenant name'
    );
    assert(
      partialRow && partialRow.phone === '+91 99999 88888' && partialRow.paymentStatus === 'Paid',
      'Partial bed update preserves phone, join date and payment status'
    );
    assert(
      partialRow && partialRow.status === 'Available',
      'Partial bed update still applies the status that was sent'
    );

    // Regression: `availableBeds: 0` is falsy and used to be discarded by a `||`
    // fallback, so COALESCE silently kept the previous value. R998 is left with
    // no bed rows, which makes the rooms list fall back to the stored column.
    await request('/api/rooms', {
      method: 'POST',
      body: JSON.stringify({
        id: 'R998',
        roomNumber: '998',
        floor: 9,
        type: 'Zero Vacancy Test Room',
        category: 'Single',
        ac: true,
        pricePerMonth: 9000,
        deposit: 9000,
        totalBeds: 1,
        availableBeds: 1,
        beds: [{ id: '998-A', status: 'Occupied' }]
      })
    });
    await request('/api/beds/998-A', { method: 'DELETE' });

    const zeroPut = await request('/api/rooms/R998', {
      method: 'PUT',
      body: JSON.stringify({ availableBeds: 0 })
    });
    assert(zeroPut.ok, 'PUT /api/rooms/:id accepts availableBeds: 0');

    const roomsAfterZero = await request('/api/rooms');
    const zeroRoom = roomsAfterZero.data.find(r => r.id === 'R998');
    assert(
      zeroRoom && zeroRoom.availableBeds === 0,
      'availableBeds: 0 is persisted instead of looking like "not provided"'
    );

    await request('/api/rooms/R998', { method: 'DELETE' });

    const deleteRoom = await request('/api/rooms/R999', { method: 'DELETE' });
    assert(deleteRoom.ok, 'DELETE /api/rooms/R999 cleans up test room');

    // 4. Tickets
    console.log('\n4. Maintenance Tickets:');
    const tickets = await request('/api/tickets');
    assert(tickets.ok && Array.isArray(tickets.data) && tickets.data.length >= 3, `GET /api/tickets returns seeded tickets (${tickets.data?.length || 0} tickets)`);

    const newTicket = await request('/api/tickets', {
      method: 'POST',
      body: JSON.stringify({
        tenant: 'Automated Tester',
        room: '101',
        category: 'Electrical',
        priority: 'High',
        description: 'Test electrical issue for verification'
      })
    });
    assert(newTicket.ok && newTicket.data.id, `POST /api/tickets creates ticket ${newTicket.data?.id}`);

    const updateTicket = await request(`/api/tickets/${newTicket.data.id}`, {
      method: 'PUT',
      body: JSON.stringify({ status: 'Resolved' })
    });
    assert(updateTicket.ok, 'PUT /api/tickets/:id marks ticket as Resolved');

    const deleteTicket = await request(`/api/tickets/${newTicket.data.id}`, { method: 'DELETE' });
    assert(deleteTicket.ok, 'DELETE /api/tickets/:id deletes test ticket');

    // 5. Notices
    console.log('\n5. Notices & Circulars:');
    const notices = await request('/api/notices');
    assert(notices.ok && Array.isArray(notices.data) && notices.data.length >= 3, `GET /api/notices returns seeded notices (${notices.data?.length || 0} notices)`);

    const newNotice = await request('/api/notices', {
      method: 'POST',
      body: JSON.stringify({
        title: 'Test Circular Alert',
        category: 'Alert',
        author: 'Chief Admin',
        content: 'Testing notice creation API endpoint.'
      })
    });
    assert(newNotice.ok && newNotice.data.id, `POST /api/notices creates notice ${newNotice.data?.id}`);

    const deleteNotice = await request(`/api/notices/${newNotice.data.id}`, { method: 'DELETE' });
    assert(deleteNotice.ok, 'DELETE /api/notices/:id deletes test notice');

    // 6. Expenses
    console.log('\n6. Expenses:');
    const expenses = await request('/api/expenses');
    assert(expenses.ok && Array.isArray(expenses.data) && expenses.data.length >= 4, `GET /api/expenses returns seeded expenses (${expenses.data?.length || 0} expenses)`);

    const newExpense = await request('/api/expenses', {
      method: 'POST',
      body: JSON.stringify({
        title: 'Test Generator Fuel',
        category: 'Utilities',
        amount: 4500,
        status: 'Paid'
      })
    });
    assert(newExpense.ok && newExpense.data.id, `POST /api/expenses records expense ID ${newExpense.data?.id}`);

    const deleteExpense = await request(`/api/expenses/${newExpense.data.id}`, { method: 'DELETE' });
    assert(deleteExpense.ok, 'DELETE /api/expenses/:id deletes test expense');

    // 7. Visitors
    console.log('\n7. Visitors (Security Desk):');
    const visitors = await request('/api/visitors');
    assert(visitors.ok && Array.isArray(visitors.data) && visitors.data.length >= 2, `GET /api/visitors returns seeded visitors (${visitors.data?.length || 0} visitors)`);

    const newVisitor = await request('/api/visitors', {
      method: 'POST',
      body: JSON.stringify({
        visitorName: 'John Doe Test',
        hostTenant: 'Rahul Verma',
        room: '102',
        relation: 'Friend'
      })
    });
    assert(newVisitor.ok && newVisitor.data.id, `POST /api/visitors checks in visitor ${newVisitor.data?.id}`);

    const checkoutVisitor = await request(`/api/visitors/${newVisitor.data.id}/checkout`, {
      method: 'PUT',
      body: JSON.stringify({ exitTime: '2026-09-12 12:30 PM' })
    });
    assert(checkoutVisitor.ok, 'PUT /api/visitors/:id/checkout checks out visitor');

    // 8. Bookings
    console.log('\n8. Bookings (New Joiners):');
    const newBooking = await request('/api/bookings', {
      method: 'POST',
      body: JSON.stringify({
        applicantName: 'Sneha Patel',
        email: 'sneha@example.com',
        phone: '+91 99887 76655',
        gender: 'Female',
        roomId: 'R101',
        roomNumber: '101',
        bedId: '101-A',
        planDuration: '6 Months',
        collegeOffice: 'Tech Corp',
        emergencyContact: 'Father - 9876543210',
        advancePaid: 5000
      })
    });
    assert(newBooking.ok && newBooking.data.id, `POST /api/bookings submits application ${newBooking.data?.id}`);

    const bookings = await request('/api/bookings');
    assert(bookings.ok && bookings.data.length > 0, `GET /api/bookings returns booking applications`);

    // 9. Reviews
    console.log('\n9. Reviews & Feedback:');
    const reviews = await request('/api/reviews');
    assert(reviews.ok && reviews.data.length >= 3, `GET /api/reviews returns reviews (${reviews.data?.length || 0} reviews)`);

    const newReview = await request('/api/reviews', {
      method: 'POST',
      body: JSON.stringify({
        name: 'Happy Resident',
        room: 'Room 202',
        rating: 5,
        comment: 'Super fast WiFi and great staff!'
      })
    });
    assert(newReview.ok && newReview.data.id, 'POST /api/reviews adds review');

    // 10. Menu & Staff
    console.log('\n10. Menu & Staff:');
    const menu = await request('/api/menu');
    assert(menu.ok && menu.data.length === 7, `GET /api/menu returns 7-day meal schedule`);

    const staff = await request('/api/staff');
    assert(staff.ok && staff.data.length >= 3, `GET /api/staff returns staff roster`);

    // 11. Dashboard Analytics
    console.log('\n11. Dashboard Analytics & Statistics:');
    const stats = await request('/api/stats');
    assert(
      stats.ok &&
      stats.data.totalRooms > 0 &&
      stats.data.totalBeds > 0 &&
      stats.data.occupancyRate !== undefined,
      `GET /api/stats returns analytics (Rooms: ${stats.data?.totalRooms}, Beds: ${stats.data?.totalBeds}, Occupancy: ${stats.data?.occupancyRate}%)`
    );

    // 12. Static exposure & routing guards
    console.log('\n12. Static File Exposure & Routing Guards:');
    for (const guardedPath of ['/backend/hostel.db', '/backend/database.js', '/backend/server.js', '/backend/.env']) {
      const guarded = await request(guardedPath, { headers: { Accept: 'text/html' } });
      assert(guarded.status === 404, `GET ${guardedPath} is not served (got ${guarded.status})`);
    }

    const unknownRoute = await request('/api/definitely-not-a-route');
    assert(unknownRoute.status === 404, 'Unknown /api/* route returns 404 instead of a 200 HTML page');

    const frontendPage = await request('/');
    assert(frontendPage.status === 200, 'GET / still serves the frontend after the guard');

    const appBundle = await request('/app.compiled.js');
    assert(appBundle.status === 200, 'GET /app.compiled.js is still served');

    console.log(`\n==============================================`);
    console.log(`Summary: ${passed} Passed, ${failed} Failed`);
    console.log(`==============================================\n`);

    if (failed > 0) {
      process.exit(1);
    }
  } catch (error) {
    console.error('Test execution error:', error);
    process.exit(1);
  }
}

runTests();
