/*
 * AUTO-GENERATED FILE - DO NOT EDIT.
 * Built from app.js by "npm run build" (see scripts/build.js).
 * Manual changes here are overwritten on the next build; edit app.js instead.
 */
const {
  useState,
  useEffect,
  useMemo
} = React;

// --- INITIAL MOCK DATA ---
const INITIAL_ROOMS = [{
  id: 'R101',
  roomNumber: '101',
  floor: 1,
  type: 'three sharing',
  category: 'triple',
  ac: true,
  pricePerMonth: 12000,
  deposit: 15000,
  totalBeds: 3,
  availableBeds: 1,
  amenities: ['Private Balcony', 'Attached Bath', 'Study Desk', 'Ergonomic Chair', '1Gbps WiFi', 'Geyser'],
  image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=800&q=80',
  beds: [{
    id: '101-A',
    status: 'Available',
    tenant: null
  }]
}, {
  id: 'R102',
  roomNumber: '102',
  floor: 1,
  type: 'Double Sharing AC',
  category: 'Double',
  ac: true,
  pricePerMonth: 8500,
  deposit: 10000,
  totalBeds: 2,
  availableBeds: 1,
  amenities: ['Attached Bath', 'Individual Closets', 'Study Desk', 'Geyser', 'High-Speed WiFi'],
  image: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=800&q=80',
  beds: [{
    id: '102-A',
    status: 'Occupied',
    tenant: 'Rahul Verma',
    phone: '+91 98765 43210',
    joinDate: '2026-01-10',
    paymentStatus: 'Paid'
  }, {
    id: '102-B',
    status: 'Available',
    tenant: null
  }]
}, {
  id: 'R103',
  roomNumber: '103',
  floor: 1,
  type: 'Triple Sharing Non-AC',
  category: 'Triple',
  ac: false,
  pricePerMonth: 6000,
  deposit: 8000,
  totalBeds: 3,
  availableBeds: 0,
  amenities: ['Common Bath', 'Ceiling Fan', 'Study Desks', 'Spacious Locker'],
  image: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=800&q=80',
  beds: [{
    id: '103-A',
    status: 'Occupied',
    tenant: 'Vikram Singh',
    phone: '+91 98111 22334',
    joinDate: '2025-11-15',
    paymentStatus: 'Overdue'
  }, {
    id: '103-B',
    status: 'Occupied',
    tenant: 'Amit Sharma',
    phone: '+91 98222 33445',
    joinDate: '2026-02-01',
    paymentStatus: 'Paid'
  }, {
    id: '103-C',
    status: 'Occupied',
    tenant: 'Karthik Raja',
    phone: '+91 98333 44556',
    joinDate: '2026-01-05',
    paymentStatus: 'Paid'
  }]
}, {
  id: 'R201',
  roomNumber: '201',
  floor: 2,
  type: 'Single AC Standard',
  category: 'Single',
  ac: true,
  pricePerMonth: 11000,
  deposit: 14000,
  totalBeds: 1,
  availableBeds: 0,
  amenities: ['Attached Bath', 'Study Desk', 'Compact Fridge', 'WiFi'],
  image: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=800&q=80',
  beds: [{
    id: '201-A',
    status: 'Occupied',
    tenant: 'Aarav Patel',
    phone: '+91 98444 55667',
    joinDate: '2026-03-01',
    paymentStatus: 'Paid'
  }]
}, {
  id: 'R202',
  roomNumber: '202',
  floor: 2,
  type: 'Double Sharing AC',
  category: 'Double',
  ac: true,
  pricePerMonth: 8500,
  deposit: 10000,
  totalBeds: 2,
  availableBeds: 2,
  amenities: ['Attached Bath', 'Dual Study Stations', 'Balcony', 'Geyser'],
  image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80',
  beds: [{
    id: '202-A',
    status: 'Available',
    tenant: null
  }, {
    id: '202-B',
    status: 'Available',
    tenant: null
  }]
}, {
  id: 'R301',
  roomNumber: '301',
  floor: 3,
  type: 'Triple Sharing AC',
  category: 'Triple',
  ac: true,
  pricePerMonth: 7200,
  deposit: 9000,
  totalBeds: 3,
  availableBeds: 1,
  amenities: ['AC', 'Attached Bath', 'Fast WiFi', 'Personal Lockers'],
  image: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=800&q=80',
  beds: [{
    id: '301-A',
    status: 'Occupied',
    tenant: 'Siddharth Roy',
    phone: '+91 98555 66778',
    joinDate: '2026-01-20',
    paymentStatus: 'Paid'
  }, {
    id: '301-B',
    status: 'Occupied',
    tenant: 'Deepak Kumar',
    phone: '+91 98666 77889',
    joinDate: '2026-02-12',
    paymentStatus: 'Overdue'
  }, {
    id: '301-C',
    status: 'Available',
    tenant: null
  }]
}, {
  id: 'R401',
  roomNumber: '401',
  floor: 4,
  type: 'Executive Suite Single',
  category: 'Single',
  ac: true,
  pricePerMonth: 14000,
  deposit: 18000,
  totalBeds: 1,
  availableBeds: 1,
  amenities: ['Penthouse Balcony', 'Smart TV', 'Mini Kitchenette', 'Attached Bath', 'Geyser'],
  image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80',
  beds: [{
    id: '401-A',
    status: 'Available',
    tenant: null
  }]
}];
const INITIAL_TICKETS = [{
  id: 'T-108',
  tenant: 'Rahul Verma',
  room: '102',
  category: 'Plumbing',
  priority: 'High',
  description: 'Bathroom geyser temperature knob broken.',
  status: 'In Progress',
  date: '2026-08-12',
  photo: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=400&q=80'
}, {
  id: 'T-105',
  tenant: 'Vikram Singh',
  room: '103',
  category: 'WiFi',
  priority: 'Medium',
  description: 'Signal dropping in corner desk of Room 103.',
  status: 'Pending',
  date: '2026-08-13',
  photo: null
}, {
  id: 'T-099',
  tenant: 'Aarav Patel',
  room: '201',
  category: 'Electrical',
  priority: 'Low',
  description: 'Study lamp plug replacement needed.',
  status: 'Resolved',
  date: '2026-08-08',
  photo: null
}];
const INITIAL_EXPENSES = [{
  id: 1,
  title: 'Electricity Bill (July)',
  category: 'Utilities',
  amount: 42500,
  date: '2026-08-02',
  status: 'Paid'
}, {
  id: 2,
  title: 'Commercial Water Supply',
  category: 'Utilities',
  amount: 18200,
  date: '2026-08-05',
  status: 'Paid'
}, {
  id: 3,
  title: 'Staff Salaries (4 Wardens/Cleaners)',
  category: 'Salaries',
  amount: 85000,
  date: '2026-08-01',
  status: 'Paid'
}, {
  id: 4,
  title: 'Washing Machine Repair (Unit 3)',
  category: 'Repairs',
  amount: 3400,
  date: '2026-08-09',
  status: 'Paid'
}];
const STAFF_ROSTER = [{
  name: 'Ramesh Sharma',
  role: 'Chief Warden',
  shift: 'Day (8 AM - 6 PM)',
  phone: '+91 98999 11111',
  image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80'
}, {
  name: 'Sunita Devi',
  role: 'Head Mess Manager',
  shift: 'Morning & Evening',
  phone: '+91 98999 22222',
  image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80'
}, {
  name: 'Manoj Kumar',
  role: 'Security Supervisor',
  shift: 'Night (8 PM - 8 AM)',
  phone: '+91 98999 33333',
  image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80'
}];
const INITIAL_VISITORS = [{
  id: 'V-501',
  visitorName: 'Sanjay Verma',
  hostTenant: 'Rahul Verma',
  room: '102',
  relation: 'Father',
  entryTime: '2026-08-13 10:30 AM',
  exitTime: '2026-08-13 02:15 PM',
  status: 'Checked Out'
}, {
  id: 'V-502',
  visitorName: 'Anil Singh',
  hostTenant: 'Vikram Singh',
  room: '103',
  relation: 'Brother',
  entryTime: '2026-08-13 04:00 PM',
  exitTime: 'Active inside',
  status: 'Checked In'
}];

// --- INITIAL HOSTEL PROFILE DATA ---
const INITIAL_HOSTEL = {
  name: 'StayEase Luxury Student & Executive Hostel',
  tagline: 'Modern, Safe & Comfortable Hostel Living',
  address: 'Plot 42, University Road, Sector 5, Knowledge City',
  contactPhone: '+91 98999 11111',
  contactEmail: 'info@stayease.com',
  managerName: 'Ramesh Sharma',
  emergencyPhone: '+91 98999 33333',
  totalFloors: 4,
  washingMachines: 8,
  rules: ['Gate closes strictly at 10:30 PM.', 'Visitors permitted only in lounge between 9 AM to 7 PM.', 'Silent hours from 11:00 PM to 6:00 AM.', 'No smoking, alcohol, or contraband inside premises.', 'Monthly fees payable by 5th of each calendar month.']
};

// --- PRESET HOSTEL TEMPLATES (ONE-CLICK SWITCHER) ---
const HOSTEL_TEMPLATES = {
  COLLEGE: {
    name: 'GreenValley University Campus Hostel',
    tagline: 'Affordable, secure student community with 24/7 library & sports',
    address: 'Near Tech University North Gate, Academic Zone',
    contactPhone: '+91 98111 22233',
    contactEmail: 'warden@greenvalleyhostel.in',
    managerName: 'Prof. Arvind Menon',
    emergencyPhone: '+91 98111 99999',
    totalFloors: 4,
    washingMachines: 6,
    rules: ['Strict curfew at 9:30 PM (Biometric sign-in required).', 'Study quiet hours strictly enforced from 10 PM to 6 AM.', 'Visitors allowed only in common study hall till 6 PM.', 'Ragging or unruly behavior leads to immediate expulsion.']
  },
  PROFESSIONAL: {
    name: 'UrbanNest Executive Co-Living & PG',
    tagline: 'Work-ready suites with ergonomic desks, 1 Gbps WiFi & cleaning',
    address: 'Opposite Cyber Towers, Phase 2, IT Hub',
    contactPhone: '+91 98222 44455',
    contactEmail: 'stay@urbannestcoliving.com',
    managerName: 'Vikramaditya Rao',
    emergencyPhone: '+91 98222 00000',
    totalFloors: 5,
    washingMachines: 10,
    rules: ['24/7 keycard access with zero curfew for working professionals.', 'Guests permitted until 10 PM in individual rooms.', 'Workspaces and phone booths to be kept clean after meetings.', 'Quiet hours in residential wings after 11:30 PM.']
  },
  WOMEN: {
    name: 'SafeHaven Women Residence & PG',
    tagline: 'High-security women-only premium residence with full CCTV & warden desk',
    address: 'Road 12, Green Park Enclave, Metro South',
    contactPhone: '+91 98333 55566',
    contactEmail: 'care@safehavenliving.org',
    managerName: 'Mrs. Kalyani Sundaram',
    emergencyPhone: '+91 98333 91111',
    totalFloors: 4,
    washingMachines: 8,
    rules: ['Security desk check-in before 10:00 PM (Late pass via portal).', 'Male visitors strictly restricted to Reception Lobby only.', '24/7 CCTV surveillance & biometric attendance in effect.', 'In-house resident doctor available on call.']
  }
};

// --- TRANSLATION DICTIONARY ---
const TRANSLATIONS = {
  en: {
    appTitle: 'StayEase Hostel Management',
    roleManager: 'Manager Dashboard',
    occupancyRate: 'Occupancy Rate',
    totalFloors: 'Total Floors',
    totalBeds: 'Total Beds',
    washingMachines: 'Washing Machines'
  },
  hi: {
    appTitle: 'स्टे-ईज़ हॉस्टल प्रबंधन',
    roleManager: 'प्रबंधक डैशबोर्ड',
    occupancyRate: 'ऑक्यूपेंसी दर',
    totalFloors: 'कुल मंजिलें',
    totalBeds: 'कुल बेड',
    washingMachines: 'वाशिंग मशीनें'
  },
  ta: {
    appTitle: 'ஸ்டே-ஈஸ் விடுதி மேலாண்மை',
    roleManager: 'மேலாளர் டேஷ்போர்டு',
    occupancyRate: 'தங்குமிடம் அளவு',
    totalFloors: 'மொத்த தளங்கள்',
    totalBeds: 'மொத்த படுக்கைகள்',
    washingMachines: 'சலவை இயந்திரங்கள்'
  }
};

// --- MAIN REACT APPLICATION APP COMPONENT (MANAGER DASHBOARD ONLY) ---
function App() {
  const [lang, setLang] = useState('en');
  const [darkMode, setDarkMode] = useState(false);
  const [toast, setToast] = useState(null);

  // Core App Data State
  const [rooms, setRooms] = useState(() => {
    const saved = localStorage.getItem('stayease_rooms');
    return saved ? JSON.parse(saved) : INITIAL_ROOMS;
  });
  const [tickets, setTickets] = useState(() => {
    const saved = localStorage.getItem('stayease_tickets');
    return saved ? JSON.parse(saved) : INITIAL_TICKETS;
  });
  const [expenses, setExpenses] = useState(() => {
    const saved = localStorage.getItem('stayease_expenses');
    return saved ? JSON.parse(saved) : INITIAL_EXPENSES;
  });
  const [visitors, setVisitors] = useState(() => {
    const saved = localStorage.getItem('stayease_visitors');
    return saved ? JSON.parse(saved) : INITIAL_VISITORS;
  });
  const [hostelInfo, setHostelInfo] = useState(() => {
    const saved = localStorage.getItem('stayease_hostel_info');
    return saved ? JSON.parse(saved) : INITIAL_HOSTEL;
  });

  // Sync with LocalStorage
  useEffect(() => {
    localStorage.setItem('stayease_rooms', JSON.stringify(rooms));
  }, [rooms]);
  useEffect(() => {
    localStorage.setItem('stayease_tickets', JSON.stringify(tickets));
  }, [tickets]);
  useEffect(() => {
    localStorage.setItem('stayease_expenses', JSON.stringify(expenses));
  }, [expenses]);
  useEffect(() => {
    localStorage.setItem('stayease_visitors', JSON.stringify(visitors));
  }, [visitors]);
  useEffect(() => {
    localStorage.setItem('stayease_hostel_info', JSON.stringify(hostelInfo));
  }, [hostelInfo]);

  // Initial sync from backend API if online
  useEffect(() => {
    if (window.StayEaseApi) {
      window.StayEaseApi.getHostel().then(data => {
        if (data && data.name) {
          setHostelInfo(prev => ({
            ...prev,
            name: data.name,
            address: data.address || prev.address,
            contactPhone: data.contact_phone || prev.contactPhone,
            contactEmail: data.contact_email || prev.contactEmail,
            managerName: data.manager_name || prev.managerName,
            totalFloors: data.total_floors || prev.totalFloors,
            washingMachines: data.washing_machines || prev.washingMachines,
            rules: Array.isArray(data.rules) ? data.rules : data.rules ? JSON.parse(data.rules) : prev.rules
          }));
        }
      }).catch(() => {});
    }
  }, []);

  // Dark mode class toggle
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Re-initialize Lucide Icons after render
  useEffect(() => {
    if (window.lucide) {
      window.lucide.createIcons();
    }
  });
  const showToast = (message, type = 'info') => {
    setToast({
      message,
      type
    });
    setTimeout(() => setToast(null), 4000);
  };
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;
  return /*#__PURE__*/React.createElement("div", {
    className: "min-h-screen flex flex-col selection:bg-brand-500 selection:text-white"
  }, toast && /*#__PURE__*/React.createElement("div", {
    className: `fixed top-4 right-4 z-50 px-5 py-3.5 rounded-xl shadow-2xl flex items-center gap-3 text-white transition-all transform animate-bounce ${toast.type === 'success' ? 'bg-emerald-600' : toast.type === 'error' ? 'bg-rose-600' : 'bg-brand-600'}`
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": toast.type === 'success' ? 'check-circle' : toast.type === 'error' ? 'alert-triangle' : 'info',
    className: "w-5 h-5"
  }), /*#__PURE__*/React.createElement("span", {
    className: "font-semibold text-sm"
  }, toast.message)), /*#__PURE__*/React.createElement("header", {
    className: "sticky top-0 z-40 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors"
  }, /*#__PURE__*/React.createElement("div", {
    className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-wrap items-center justify-between gap-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 to-indigo-500 flex items-center justify-center text-white shadow-md shadow-brand-500/30 shrink-0"
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "building-2",
    className: "w-6 h-6"
  })), /*#__PURE__*/React.createElement("div", {
    className: "min-w-0"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-base sm:text-lg font-extrabold tracking-tight text-slate-900 dark:text-white flex items-center gap-1.5 truncate max-w-[240px] sm:max-w-xs md:max-w-md",
    title: hostelInfo.name
  }, hostelInfo.name), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-slate-500 dark:text-slate-400 truncate max-w-[240px] sm:max-w-xs md:max-w-md"
  }, hostelInfo.tagline || 'Complete Management Suite'))), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-brand-50 dark:bg-brand-950/60 border border-brand-200 dark:border-brand-800 text-brand-700 dark:text-brand-300 font-bold text-xs shadow-sm"
  }, /*#__PURE__*/React.createElement("span", {
    className: "w-2 h-2 rounded-full bg-emerald-500 animate-pulse"
  }), /*#__PURE__*/React.createElement("i", {
    "data-lucide": "shield-check",
    className: "w-4 h-4 text-brand-600 dark:text-brand-400"
  }), /*#__PURE__*/React.createElement("span", null, t.roleManager || 'Manager Dashboard')), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2"
  }, /*#__PURE__*/React.createElement("select", {
    value: lang,
    onChange: e => setLang(e.target.value),
    className: "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-semibold px-2.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-500 cursor-pointer"
  }, /*#__PURE__*/React.createElement("option", {
    value: "en"
  }, "English (EN)"), /*#__PURE__*/React.createElement("option", {
    value: "hi"
  }, "हिंदी (HI)"), /*#__PURE__*/React.createElement("option", {
    value: "ta"
  }, "தமிழ் (TA)")), /*#__PURE__*/React.createElement("button", {
    onClick: () => setDarkMode(!darkMode),
    className: "p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition",
    title: "Toggle Theme"
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": darkMode ? 'sun' : 'moon',
    className: "w-4 h-4"
  }))))), /*#__PURE__*/React.createElement("main", {
    className: "flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6"
  }, /*#__PURE__*/React.createElement(ManagerDashboardView, {
    rooms: rooms,
    setRooms: setRooms,
    tickets: tickets,
    setTickets: setTickets,
    expenses: expenses,
    setExpenses: setExpenses,
    visitors: visitors,
    setVisitors: setVisitors,
    staff: STAFF_ROSTER,
    showToast: showToast,
    hostelInfo: hostelInfo,
    setHostelInfo: setHostelInfo
  })), /*#__PURE__*/React.createElement("footer", {
    className: "bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 mt-12 py-8 text-xs text-slate-500 dark:text-slate-400"
  }, /*#__PURE__*/React.createElement("div", {
    className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-6 h-6 rounded-lg bg-brand-600 text-white flex items-center justify-center font-bold"
  }, "M"), /*#__PURE__*/React.createElement("span", {
    className: "font-semibold text-slate-800 dark:text-slate-200"
  }, hostelInfo.name, " • Manager Portal"), /*#__PURE__*/React.createElement("span", null, "© 2026")), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-6"
  }, /*#__PURE__*/React.createElement("span", null, "Logged in as Chief Warden: ", /*#__PURE__*/React.createElement("strong", {
    className: "text-slate-700 dark:text-slate-300"
  }, hostelInfo.managerName))))));
}

// ----------------------------------------------------------------------
// MANAGER & ADMIN DASHBOARD VIEW MODULE
// ----------------------------------------------------------------------
function ManagerDashboardView({
  rooms,
  setRooms,
  tickets,
  setTickets,
  expenses,
  setExpenses,
  visitors,
  setVisitors,
  staff,
  showToast,
  hostelInfo,
  setHostelInfo
}) {
  const [activeTab, setActiveTab] = useState(() => {
    return window.location.hash === '#settings' ? 'SETTINGS' : 'OCCUPANCY';
  });

  // Stats calculation
  const totalBeds = useMemo(() => rooms.reduce((acc, r) => acc + r.totalBeds, 0), [rooms]);
  const occupiedBeds = useMemo(() => rooms.reduce((acc, r) => acc + (r.totalBeds - r.availableBeds), 0), [rooms]);
  const occupancyPercentage = Math.round(occupiedBeds / totalBeds * 100);

  // New Expense form state
  const [newExpense, setNewExpense] = useState({
    title: '',
    category: 'Utilities',
    amount: ''
  });

  // Admin Hostel Profile & Customization State
  const [hostelForm, setHostelForm] = useState({
    name: hostelInfo?.name || '',
    tagline: hostelInfo?.tagline || '',
    address: hostelInfo?.address || '',
    managerName: hostelInfo?.managerName || '',
    contactPhone: hostelInfo?.contactPhone || '',
    contactEmail: hostelInfo?.contactEmail || '',
    emergencyPhone: hostelInfo?.emergencyPhone || '',
    totalFloors: hostelInfo?.totalFloors || 4,
    washingMachines: hostelInfo?.washingMachines || 8,
    rules: hostelInfo?.rules ? [...hostelInfo.rules] : []
  });
  useEffect(() => {
    if (hostelInfo) {
      setHostelForm({
        name: hostelInfo.name || '',
        tagline: hostelInfo.tagline || '',
        address: hostelInfo.address || '',
        managerName: hostelInfo.managerName || '',
        contactPhone: hostelInfo.contactPhone || '',
        contactEmail: hostelInfo.contactEmail || '',
        emergencyPhone: hostelInfo.emergencyPhone || '',
        totalFloors: hostelInfo.totalFloors || 4,
        washingMachines: hostelInfo.washingMachines || 8,
        rules: hostelInfo.rules ? [...hostelInfo.rules] : []
      });
    }
  }, [hostelInfo]);
  const [newRuleText, setNewRuleText] = useState('');
  const [showAddRoomModal, setShowAddRoomModal] = useState(false);
  const [jsonModalOpen, setJsonModalOpen] = useState(false);
  const [importJsonText, setImportJsonText] = useState('');
  const [newRoomForm, setNewRoomForm] = useState({
    roomNumber: '',
    floor: 1,
    category: 'Double',
    type: 'Double Sharing AC',
    ac: true,
    pricePerMonth: 8500,
    deposit: 10000,
    totalBeds: 2,
    amenities: 'Attached Bath, Fast WiFi, Study Desk, Geyser',
    image: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=800&q=80'
  });
  const handleSaveHostelProfile = e => {
    e.preventDefault();
    if (!hostelForm.name || !hostelForm.address || !hostelForm.contactPhone) {
      showToast('Please fill in required fields: Name, Address, and Phone.', 'error');
      return;
    }
    const updated = {
      ...hostelInfo,
      ...hostelForm,
      totalFloors: Number(hostelForm.totalFloors) || 4,
      washingMachines: Number(hostelForm.washingMachines) || 0
    };
    setHostelInfo(updated);
    if (window.StayEaseApi) {
      window.StayEaseApi.updateHostel({
        name: updated.name,
        address: updated.address,
        contact_phone: updated.contactPhone,
        contact_email: updated.contactEmail,
        manager_name: updated.managerName,
        total_floors: updated.totalFloors,
        total_rooms: rooms.length,
        total_beds: totalBeds,
        washing_machines: updated.washingMachines,
        rules: updated.rules
      }).catch(() => {});
    }
    showToast('Hostel profile, rules, and contact info updated successfully!', 'success');
  };
  const handleAddRule = () => {
    if (!newRuleText.trim()) return;
    setHostelForm({
      ...hostelForm,
      rules: [...hostelForm.rules, newRuleText.trim()]
    });
    setNewRuleText('');
  };
  const handleDeleteRule = index => {
    setHostelForm({
      ...hostelForm,
      rules: hostelForm.rules.filter((_, i) => i !== index)
    });
  };
  const handleAddRoom = e => {
    e.preventDefault();
    if (!newRoomForm.roomNumber) {
      showToast('Please provide a Room Number.', 'error');
      return;
    }
    if (rooms.some(r => String(r.roomNumber) === String(newRoomForm.roomNumber))) {
      showToast(`Room ${newRoomForm.roomNumber} already exists in inventory!`, 'error');
      return;
    }
    const bedCount = Number(newRoomForm.totalBeds) || 1;
    const bedLetters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
    const generatedBeds = [];
    for (let i = 0; i < bedCount; i++) {
      generatedBeds.push({
        id: `${newRoomForm.roomNumber}-${bedLetters[i] || i + 1}`,
        status: 'Available',
        tenant: null
      });
    }
    const createdRoom = {
      id: `R${newRoomForm.roomNumber}`,
      roomNumber: String(newRoomForm.roomNumber),
      floor: Number(newRoomForm.floor) || 1,
      type: newRoomForm.type || `${newRoomForm.category} Sharing`,
      category: newRoomForm.category,
      ac: Boolean(newRoomForm.ac),
      pricePerMonth: Number(newRoomForm.pricePerMonth) || 8000,
      deposit: Number(newRoomForm.deposit) || 10000,
      totalBeds: bedCount,
      availableBeds: bedCount,
      amenities: typeof newRoomForm.amenities === 'string' ? newRoomForm.amenities.split(',').map(s => s.trim()).filter(Boolean) : newRoomForm.amenities,
      image: newRoomForm.image || 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=800&q=80',
      beds: generatedBeds
    };
    setRooms([...rooms, createdRoom]);
    if (window.StayEaseApi) {
      window.StayEaseApi.createRoom({
        id: createdRoom.id,
        roomNumber: createdRoom.roomNumber,
        floor: createdRoom.floor,
        type: createdRoom.type,
        category: createdRoom.category,
        ac: createdRoom.ac ? 1 : 0,
        pricePerMonth: createdRoom.pricePerMonth,
        deposit: createdRoom.deposit,
        totalBeds: createdRoom.totalBeds,
        availableBeds: createdRoom.availableBeds,
        amenities: createdRoom.amenities,
        image: createdRoom.image,
        beds: createdRoom.beds
      }).catch(() => {});
    }
    showToast(`Room ${createdRoom.roomNumber} created with ${bedCount} beds!`, 'success');
    setShowAddRoomModal(false);
    setNewRoomForm({
      roomNumber: '',
      floor: 1,
      category: 'Double',
      type: 'Double Sharing AC',
      ac: true,
      pricePerMonth: 8500,
      deposit: 10000,
      totalBeds: 2,
      amenities: 'Attached Bath, Fast WiFi, Study Desk, Geyser',
      image: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=800&q=80'
    });
  };
  const handleDeleteRoom = (roomId, roomNum) => {
    if (confirm(`Are you sure you want to delete Room ${roomNum} and its beds?`)) {
      setRooms(rooms.filter(r => r.id !== roomId));
      if (window.StayEaseApi) {
        window.StayEaseApi.deleteRoom(roomId).catch(() => {});
      }
      showToast(`Room ${roomNum} deleted from inventory.`, 'info');
    }
  };
  const handleApplyTemplate = templateKey => {
    const tpl = HOSTEL_TEMPLATES[templateKey];
    if (!tpl) return;
    const updated = {
      ...hostelInfo,
      name: tpl.name,
      tagline: tpl.tagline,
      address: tpl.address,
      managerName: tpl.managerName,
      contactPhone: tpl.contactPhone,
      contactEmail: tpl.contactEmail,
      emergencyPhone: tpl.emergencyPhone,
      totalFloors: tpl.totalFloors,
      washingMachines: tpl.washingMachines,
      rules: [...tpl.rules]
    };
    setHostelForm({
      name: tpl.name,
      tagline: tpl.tagline,
      address: tpl.address,
      managerName: tpl.managerName,
      contactPhone: tpl.contactPhone,
      contactEmail: tpl.contactEmail,
      emergencyPhone: tpl.emergencyPhone,
      totalFloors: tpl.totalFloors,
      washingMachines: tpl.washingMachines,
      rules: [...tpl.rules]
    });
    setHostelInfo(updated);
    showToast(`Loaded "${tpl.name}" preset!`, 'success');
  };
  const handleExportJson = () => {
    const data = {
      hostel: hostelInfo,
      rooms: rooms
    };
    const jsonStr = JSON.stringify(data, null, 2);
    setImportJsonText(jsonStr);
    if (navigator.clipboard) {
      navigator.clipboard.writeText(jsonStr).then(() => {
        showToast('Hostel setup JSON copied to clipboard!', 'success');
      }).catch(() => {
        showToast('Hostel JSON ready in the box below.', 'info');
      });
    } else {
      showToast('Hostel JSON ready in the box below.', 'info');
    }
  };
  const handleImportJson = () => {
    try {
      const parsed = JSON.parse(importJsonText);
      if (!parsed.hostel && !parsed.rooms) {
        throw new Error('Invalid JSON format. Expecting "hostel" or "rooms" fields.');
      }
      if (parsed.hostel) {
        setHostelInfo(parsed.hostel);
        setHostelForm({
          name: parsed.hostel.name || '',
          tagline: parsed.hostel.tagline || '',
          address: parsed.hostel.address || '',
          managerName: parsed.hostel.managerName || '',
          contactPhone: parsed.hostel.contactPhone || '',
          contactEmail: parsed.hostel.contactEmail || '',
          emergencyPhone: parsed.hostel.emergencyPhone || '',
          totalFloors: parsed.hostel.totalFloors || 4,
          washingMachines: parsed.hostel.washingMachines || 8,
          rules: parsed.hostel.rules || []
        });
      }
      if (Array.isArray(parsed.rooms) && parsed.rooms.length > 0) {
        setRooms(parsed.rooms);
      }
      showToast('Hostel details and inventory imported successfully!', 'success');
      setJsonModalOpen(false);
    } catch (err) {
      showToast('Failed to parse JSON: ' + err.message, 'error');
    }
  };
  const handleAddExpense = e => {
    e.preventDefault();
    if (!newExpense.title || !newExpense.amount) return;
    const expObj = {
      id: Date.now(),
      title: newExpense.title,
      category: newExpense.category,
      amount: Number(newExpense.amount),
      date: new Date().toISOString().split('T')[0],
      status: 'Paid'
    };
    setExpenses([expObj, ...expenses]);
    setNewExpense({
      title: '',
      category: 'Utilities',
      amount: ''
    });
    showToast('New operational expense recorded.', 'success');
  };
  const handleSendBulkReminder = () => {
    showToast('Automated SMS & Push rent reminders sent to 4 overdue tenants!', 'success');
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "space-y-8"
  }, /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-2"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex justify-between items-center text-xs font-bold text-slate-400"
  }, /*#__PURE__*/React.createElement("span", null, "REAL-TIME OCCUPANCY"), /*#__PURE__*/React.createElement("i", {
    "data-lucide": "pie-chart",
    className: "w-4 h-4 text-brand-600"
  })), /*#__PURE__*/React.createElement("div", {
    className: "text-3xl font-black text-slate-900 dark:text-white"
  }, occupancyPercentage, "%"), /*#__PURE__*/React.createElement("div", {
    className: "w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden"
  }, /*#__PURE__*/React.createElement("div", {
    className: "h-full bg-brand-600 rounded-full",
    style: {
      width: `${occupancyPercentage}%`
    }
  })), /*#__PURE__*/React.createElement("p", {
    className: "text-[11px] text-slate-500"
  }, occupiedBeds, " occupied / ", totalBeds, " total beds")), /*#__PURE__*/React.createElement("div", {
    className: "bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-2"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex justify-between items-center text-xs font-bold text-slate-400"
  }, /*#__PURE__*/React.createElement("span", null, "MONTHLY RENTAL REVENUE"), /*#__PURE__*/React.createElement("i", {
    "data-lucide": "indian-rupee",
    className: "w-4 h-4 text-emerald-500"
  })), /*#__PURE__*/React.createElement("div", {
    className: "text-3xl font-black text-emerald-600"
  }, "₹1,42,500"), /*#__PURE__*/React.createElement("p", {
    className: "text-[11px] text-emerald-500 font-semibold"
  }, "↑ 12% vs last month")), /*#__PURE__*/React.createElement("div", {
    className: "bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-2"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex justify-between items-center text-xs font-bold text-slate-400"
  }, /*#__PURE__*/React.createElement("span", null, "OPEN TICKETS"), /*#__PURE__*/React.createElement("i", {
    "data-lucide": "wrench",
    className: "w-4 h-4 text-amber-500"
  })), /*#__PURE__*/React.createElement("div", {
    className: "text-3xl font-black text-amber-500"
  }, tickets.filter(t => t.status !== 'Resolved').length), /*#__PURE__*/React.createElement("p", {
    className: "text-[11px] text-slate-500"
  }, "Requires warden attention")), /*#__PURE__*/React.createElement("div", {
    className: "bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-2"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex justify-between items-center text-xs font-bold text-slate-400"
  }, /*#__PURE__*/React.createElement("span", null, "OVERDUE DEFAULTERS"), /*#__PURE__*/React.createElement("i", {
    "data-lucide": "alert-circle",
    className: "w-4 h-4 text-rose-500"
  })), /*#__PURE__*/React.createElement("div", {
    className: "text-3xl font-black text-rose-600"
  }, "2 Tenants"), /*#__PURE__*/React.createElement("button", {
    onClick: handleSendBulkReminder,
    className: "text-[11px] font-bold text-brand-600 hover:underline"
  }, "Send Bulk Reminder SMS"))), /*#__PURE__*/React.createElement("div", {
    className: "flex border-b border-slate-200 dark:border-slate-800 overflow-x-auto"
  }, [{
    id: 'OCCUPANCY',
    label: 'Occupancy Grid',
    icon: 'grid'
  }, {
    id: 'TENANTS',
    label: 'Tenant Directory',
    icon: 'users'
  }, {
    id: 'MAINTENANCE',
    label: 'Maintenance Hub',
    icon: 'wrench'
  }, {
    id: 'EXPENSES',
    label: 'Expense Tracker',
    icon: 'dollar-sign'
  }, {
    id: 'VISITORS',
    label: 'Visitor Log',
    icon: 'clipboard-list'
  }, {
    id: 'SETTINGS',
    label: 'Hostel Settings & Setup',
    icon: 'settings'
  }].map(tab => /*#__PURE__*/React.createElement("button", {
    key: tab.id,
    onClick: () => setActiveTab(tab.id),
    className: `pb-3 px-4 font-bold text-xs sm:text-sm transition border-b-2 flex items-center gap-2 whitespace-nowrap ${activeTab === tab.id ? 'border-brand-600 text-brand-600 dark:text-brand-400' : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'}`
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": tab.icon,
    className: "w-4 h-4"
  }), tab.label))), activeTab === 'OCCUPANCY' && /*#__PURE__*/React.createElement("div", {
    className: "space-y-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex justify-between items-center"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "text-xl font-bold text-slate-900 dark:text-white"
  }, "Floor-by-Floor Bed Availability Matrix"), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-4 text-xs font-semibold"
  }, /*#__PURE__*/React.createElement("span", {
    className: "flex items-center gap-1.5"
  }, /*#__PURE__*/React.createElement("span", {
    className: "w-3 h-3 rounded-full bg-emerald-500"
  }), " Available"), /*#__PURE__*/React.createElement("span", {
    className: "flex items-center gap-1.5"
  }, /*#__PURE__*/React.createElement("span", {
    className: "w-3 h-3 rounded-full bg-rose-500"
  }), " Occupied"))), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
  }, rooms.map(room => /*#__PURE__*/React.createElement("div", {
    key: room.id,
    className: "bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex justify-between items-center"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h4", {
    className: "font-extrabold text-base text-slate-900 dark:text-white"
  }, "Room ", room.roomNumber), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-slate-400 font-medium"
  }, "Floor ", room.floor, " • ", room.type)), /*#__PURE__*/React.createElement("span", {
    className: "text-xs font-bold text-brand-600"
  }, "₹", room.pricePerMonth, "/mo")), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-2 gap-2"
  }, room.beds.map(bed => /*#__PURE__*/React.createElement("div", {
    key: bed.id,
    className: `p-3 rounded-xl border text-xs flex flex-col justify-between space-y-2 ${bed.status === 'Occupied' ? 'bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-900 text-rose-900 dark:text-rose-200' : 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-900 text-emerald-900 dark:text-emerald-200'}`
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex justify-between font-bold"
  }, /*#__PURE__*/React.createElement("span", null, "Bed ", bed.id), /*#__PURE__*/React.createElement("span", {
    className: "text-[10px] uppercase font-black"
  }, bed.status)), bed.status === 'Occupied' ? /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "font-semibold text-slate-800 dark:text-slate-100"
  }, bed.tenant), /*#__PURE__*/React.createElement("div", {
    className: "text-[10px] text-slate-500"
  }, bed.phone)) : /*#__PURE__*/React.createElement("span", {
    className: "text-[10px] text-emerald-600 dark:text-emerald-400 font-bold"
  }, "Ready for Allotment")))))))), activeTab === 'TENANTS' && /*#__PURE__*/React.createElement("div", {
    className: "bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden"
  }, /*#__PURE__*/React.createElement("div", {
    className: "p-6 border-b border-slate-200 dark:border-slate-800"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "text-xl font-bold text-slate-900 dark:text-white"
  }, "Active Tenant Records & Lease Verification")), /*#__PURE__*/React.createElement("div", {
    className: "overflow-x-auto"
  }, /*#__PURE__*/React.createElement("table", {
    className: "w-full text-left text-xs"
  }, /*#__PURE__*/React.createElement("thead", {
    className: "bg-slate-50 dark:bg-slate-800/80 text-slate-400 font-bold uppercase tracking-wider"
  }, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", {
    className: "p-4"
  }, "Tenant Name"), /*#__PURE__*/React.createElement("th", {
    className: "p-4"
  }, "Bed & Room"), /*#__PURE__*/React.createElement("th", {
    className: "p-4"
  }, "Phone Number"), /*#__PURE__*/React.createElement("th", {
    className: "p-4"
  }, "Joining Date"), /*#__PURE__*/React.createElement("th", {
    className: "p-4"
  }, "Rent Status"), /*#__PURE__*/React.createElement("th", {
    className: "p-4"
  }, "Actions"))), /*#__PURE__*/React.createElement("tbody", {
    className: "divide-y divide-slate-100 dark:divide-slate-800"
  }, rooms.flatMap(r => r.beds.filter(b => b.status === 'Occupied').map(b => ({
    ...b,
    roomNumber: r.roomNumber
  }))).map((tenant, idx) => /*#__PURE__*/React.createElement("tr", {
    key: idx,
    className: "hover:bg-slate-50/50 dark:hover:bg-slate-800/50"
  }, /*#__PURE__*/React.createElement("td", {
    className: "p-4 font-bold text-slate-900 dark:text-white"
  }, tenant.tenant), /*#__PURE__*/React.createElement("td", {
    className: "p-4 font-medium text-slate-600 dark:text-slate-300"
  }, "Room ", tenant.roomNumber, " (", tenant.id, ")"), /*#__PURE__*/React.createElement("td", {
    className: "p-4 font-medium text-slate-600 dark:text-slate-300"
  }, tenant.phone), /*#__PURE__*/React.createElement("td", {
    className: "p-4 font-medium text-slate-600 dark:text-slate-300"
  }, tenant.joinDate), /*#__PURE__*/React.createElement("td", {
    className: "p-4"
  }, /*#__PURE__*/React.createElement("span", {
    className: `px-2.5 py-1 rounded-full text-[10px] font-extrabold ${tenant.paymentStatus === 'Paid' ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-100 text-rose-600'}`
  }, tenant.paymentStatus)), /*#__PURE__*/React.createElement("td", {
    className: "p-4"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => showToast(`Lease document for ${tenant.tenant} downloaded.`, 'info'),
    className: "text-brand-600 font-bold hover:underline"
  }, "View Govt ID")))))))), activeTab === 'MAINTENANCE' && /*#__PURE__*/React.createElement("div", {
    className: "space-y-4"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "text-xl font-bold text-slate-900 dark:text-white"
  }, "Maintenance Operations & Ticket Resolution"), /*#__PURE__*/React.createElement("div", {
    className: "space-y-3"
  }, tickets.map(t => /*#__PURE__*/React.createElement("div", {
    key: t.id,
    className: "p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "font-extrabold text-sm text-slate-900 dark:text-white"
  }, t.id), /*#__PURE__*/React.createElement("span", {
    className: "text-xs font-bold text-slate-500"
  }, "• ", t.tenant, " (Room ", t.room, ")")), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-slate-700 dark:text-slate-300 mt-1"
  }, t.description)), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-3"
  }, /*#__PURE__*/React.createElement("select", {
    value: t.status,
    onChange: e => {
      const updated = tickets.map(item => item.id === t.id ? {
        ...item,
        status: e.target.value
      } : item);
      setTickets(updated);
      showToast(`Ticket ${t.id} status updated to ${e.target.value}`, 'success');
    },
    className: "bg-slate-100 dark:bg-slate-800 text-xs font-bold px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700"
  }, /*#__PURE__*/React.createElement("option", {
    value: "Pending"
  }, "Pending"), /*#__PURE__*/React.createElement("option", {
    value: "In Progress"
  }, "In Progress"), /*#__PURE__*/React.createElement("option", {
    value: "Resolved"
  }, "Resolved"))))))), activeTab === 'EXPENSES' && /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 lg:grid-cols-3 gap-8"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "text-lg font-bold text-slate-900 dark:text-white"
  }, "Record New Expense"), /*#__PURE__*/React.createElement("form", {
    onSubmit: handleAddExpense,
    className: "space-y-3"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1"
  }, "Title"), /*#__PURE__*/React.createElement("input", {
    type: "text",
    placeholder: "e.g. Water Tank Repair",
    value: newExpense.title,
    onChange: e => setNewExpense({
      ...newExpense,
      title: e.target.value
    }),
    className: "w-full bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-semibold p-2.5 rounded-xl border",
    required: true
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1"
  }, "Category"), /*#__PURE__*/React.createElement("select", {
    value: newExpense.category,
    onChange: e => setNewExpense({
      ...newExpense,
      category: e.target.value
    }),
    className: "w-full bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-semibold p-2.5 rounded-xl border"
  }, /*#__PURE__*/React.createElement("option", {
    value: "Utilities"
  }, "Utilities (Electricity/Water)"), /*#__PURE__*/React.createElement("option", {
    value: "Salaries"
  }, "Staff Salaries"), /*#__PURE__*/React.createElement("option", {
    value: "Repairs"
  }, "Repairs & Maintenance"))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1"
  }, "Amount (₹)"), /*#__PURE__*/React.createElement("input", {
    type: "number",
    placeholder: "5000",
    value: newExpense.amount,
    onChange: e => setNewExpense({
      ...newExpense,
      amount: e.target.value
    }),
    className: "w-full bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-semibold p-2.5 rounded-xl border",
    required: true
  })), /*#__PURE__*/React.createElement("button", {
    type: "submit",
    className: "w-full py-2.5 bg-brand-600 text-white font-bold rounded-xl text-xs shadow-md"
  }, "Add Expense Record"))), /*#__PURE__*/React.createElement("div", {
    className: "lg:col-span-2 space-y-4"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "text-lg font-bold text-slate-900 dark:text-white"
  }, "Recent Operating Expenses"), /*#__PURE__*/React.createElement("div", {
    className: "space-y-3"
  }, expenses.map(exp => /*#__PURE__*/React.createElement("div", {
    key: exp.id,
    className: "p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex justify-between items-center"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h4", {
    className: "font-bold text-sm text-slate-900 dark:text-white"
  }, exp.title), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-slate-400"
  }, exp.category, " • ", exp.date)), /*#__PURE__*/React.createElement("span", {
    className: "font-black text-sm text-rose-600"
  }, "-₹", exp.amount.toLocaleString())))))), activeTab === 'VISITORS' && /*#__PURE__*/React.createElement("div", {
    className: "bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden space-y-4 p-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex justify-between items-center"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "text-xl font-bold text-slate-900 dark:text-white"
  }, "Visitor Entry Register"), /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      const newV = {
        id: `V-${Date.now()}`,
        visitorName: 'Sunil Mehta',
        hostTenant: 'Rahul Verma',
        room: '102',
        relation: 'Friend',
        entryTime: 'Just Now',
        exitTime: 'Active inside',
        status: 'Checked In'
      };
      setVisitors([newV, ...visitors]);
      showToast('New visitor logged in register.', 'success');
    },
    className: "px-4 py-2 bg-brand-600 text-white text-xs font-bold rounded-xl"
  }, "+ Log Guest Entry")), /*#__PURE__*/React.createElement("div", {
    className: "overflow-x-auto"
  }, /*#__PURE__*/React.createElement("table", {
    className: "w-full text-left text-xs"
  }, /*#__PURE__*/React.createElement("thead", {
    className: "bg-slate-50 dark:bg-slate-800/80 text-slate-400 font-bold uppercase"
  }, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", {
    className: "p-3"
  }, "Visitor Name"), /*#__PURE__*/React.createElement("th", {
    className: "p-3"
  }, "Host Tenant"), /*#__PURE__*/React.createElement("th", {
    className: "p-3"
  }, "Room"), /*#__PURE__*/React.createElement("th", {
    className: "p-3"
  }, "Entry Time"), /*#__PURE__*/React.createElement("th", {
    className: "p-3"
  }, "Exit Time"), /*#__PURE__*/React.createElement("th", {
    className: "p-3"
  }, "Status"))), /*#__PURE__*/React.createElement("tbody", {
    className: "divide-y divide-slate-100 dark:divide-slate-800"
  }, visitors.map(v => /*#__PURE__*/React.createElement("tr", {
    key: v.id
  }, /*#__PURE__*/React.createElement("td", {
    className: "p-3 font-bold text-slate-900 dark:text-white"
  }, v.visitorName, " (", v.relation, ")"), /*#__PURE__*/React.createElement("td", {
    className: "p-3 text-slate-600 dark:text-slate-300"
  }, v.hostTenant), /*#__PURE__*/React.createElement("td", {
    className: "p-3 text-slate-600 dark:text-slate-300"
  }, "Room ", v.room), /*#__PURE__*/React.createElement("td", {
    className: "p-3 text-slate-500"
  }, v.entryTime), /*#__PURE__*/React.createElement("td", {
    className: "p-3 text-slate-500"
  }, v.exitTime), /*#__PURE__*/React.createElement("td", {
    className: "p-3"
  }, /*#__PURE__*/React.createElement("span", {
    className: `px-2 py-0.5 rounded text-[10px] font-extrabold ${v.status === 'Checked In' ? 'bg-amber-100 text-amber-600' : 'bg-slate-100 text-slate-600'}`
  }, v.status)))))))), activeTab === 'SETTINGS' && /*#__PURE__*/React.createElement("div", {
    className: "space-y-8"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bg-gradient-to-r from-brand-900/50 via-indigo-900/40 to-slate-900/60 p-6 sm:p-8 rounded-3xl border border-brand-500/30 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "px-2.5 py-0.5 rounded-full bg-brand-500/20 text-brand-300 border border-brand-500/30 text-[10px] font-bold uppercase tracking-wider"
  }, "Admin Control Center"), /*#__PURE__*/React.createElement("h3", {
    className: "text-xl font-bold text-slate-900 dark:text-white"
  }, "Hostel Profile & Customization")), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-slate-500 dark:text-slate-300 mt-1 max-w-xl"
  }, "Customize this system for any hostel: update branding, warden contacts, curfew rules, and rooms inventory, or switch between pre-configured presets.")), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-wrap items-center gap-2.5"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setJsonModalOpen(true),
    className: "px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-xl border border-slate-700 transition flex items-center gap-1.5"
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "file-json",
    className: "w-4 h-4"
  }), "Import / Export JSON"), /*#__PURE__*/React.createElement("button", {
    onClick: () => setShowAddRoomModal(true),
    className: "px-4 py-2 bg-brand-600 hover:bg-brand-500 text-white text-xs font-bold rounded-xl shadow-md shadow-brand-600/30 transition flex items-center gap-1.5"
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "plus-circle",
    className: "w-4 h-4"
  }), "+ Add New Room"))), /*#__PURE__*/React.createElement("div", {
    className: "bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between"
  }, /*#__PURE__*/React.createElement("h4", {
    className: "font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2"
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "sparkles",
    className: "w-4 h-4 text-amber-500"
  }), "One-Click Hostel Type Presets"), /*#__PURE__*/React.createElement("span", {
    className: "text-[11px] text-slate-400"
  }, "Instantly applies tailored rules, branding & contact structures")), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => handleApplyTemplate('COLLEGE'),
    className: "p-4 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-brand-500/50 hover:bg-brand-500/5 text-left transition group"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2 font-bold text-xs text-slate-900 dark:text-white group-hover:text-brand-500"
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "graduation-cap",
    className: "w-4 h-4"
  }), "College / Student Hostel"), /*#__PURE__*/React.createElement("p", {
    className: "text-[11px] text-slate-400 mt-1 line-clamp-2"
  }, "Biometric curfew, study hours, mess schedule, shared student bunks.")), /*#__PURE__*/React.createElement("button", {
    onClick: () => handleApplyTemplate('PROFESSIONAL'),
    className: "p-4 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-emerald-500/50 hover:bg-emerald-500/5 text-left transition group"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2 font-bold text-xs text-slate-900 dark:text-white group-hover:text-emerald-500"
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "briefcase",
    className: "w-4 h-4"
  }), "Executive Co-Living / PG"), /*#__PURE__*/React.createElement("p", {
    className: "text-[11px] text-slate-400 mt-1 line-clamp-2"
  }, "Flexible curfew, 1 Gbps WiFi, AC suites, quiet zones for remote work.")), /*#__PURE__*/React.createElement("button", {
    onClick: () => handleApplyTemplate('WOMEN'),
    className: "p-4 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-pink-500/50 hover:bg-pink-500/5 text-left transition group"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2 font-bold text-xs text-slate-900 dark:text-white group-hover:text-pink-500"
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "shield",
    className: "w-4 h-4"
  }), "Women's Safety First PG"), /*#__PURE__*/React.createElement("p", {
    className: "text-[11px] text-slate-400 mt-1 line-clamp-2"
  }, "Strict visitor lounge access, 24/7 CCTV, warden check-ins & health care.")))), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 lg:grid-cols-3 gap-8"
  }, /*#__PURE__*/React.createElement("div", {
    className: "lg:col-span-2 bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h4", {
    className: "font-extrabold text-base text-slate-900 dark:text-white"
  }, "General Information & Branding"), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-slate-400"
  }, "These details appear across resident onboarding, public pages, and invoices.")), /*#__PURE__*/React.createElement("span", {
    className: "text-xs font-mono font-bold text-brand-600 bg-brand-50 dark:bg-brand-950 px-2 py-1 rounded-lg"
  }, "ID: #HOSTEL-1")), /*#__PURE__*/React.createElement("form", {
    onSubmit: handleSaveHostelProfile,
    className: "space-y-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 sm:grid-cols-2 gap-4"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1"
  }, "Hostel / PG Name *"), /*#__PURE__*/React.createElement("input", {
    type: "text",
    value: hostelForm.name,
    onChange: e => setHostelForm({
      ...hostelForm,
      name: e.target.value
    }),
    className: "w-full bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-semibold p-3 rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-500",
    placeholder: "e.g. Royal Orchid Student Hostel",
    required: true
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1"
  }, "Subtitle / Tagline"), /*#__PURE__*/React.createElement("input", {
    type: "text",
    value: hostelForm.tagline,
    onChange: e => setHostelForm({
      ...hostelForm,
      tagline: e.target.value
    }),
    className: "w-full bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-semibold p-3 rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-500",
    placeholder: "e.g. Premium Living Near Tech University"
  }))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1"
  }, "Full Physical Address *"), /*#__PURE__*/React.createElement("input", {
    type: "text",
    value: hostelForm.address,
    onChange: e => setHostelForm({
      ...hostelForm,
      address: e.target.value
    }),
    className: "w-full bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-semibold p-3 rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-500",
    placeholder: "e.g. Plot 42, University Road, Sector 5",
    required: true
  })), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 sm:grid-cols-3 gap-4"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1"
  }, "Warden / Manager Name"), /*#__PURE__*/React.createElement("input", {
    type: "text",
    value: hostelForm.managerName,
    onChange: e => setHostelForm({
      ...hostelForm,
      managerName: e.target.value
    }),
    className: "w-full bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-semibold p-3 rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-500",
    placeholder: "e.g. Ramesh Sharma"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1"
  }, "Official Contact Phone *"), /*#__PURE__*/React.createElement("input", {
    type: "text",
    value: hostelForm.contactPhone,
    onChange: e => setHostelForm({
      ...hostelForm,
      contactPhone: e.target.value
    }),
    className: "w-full bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-semibold p-3 rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-500",
    placeholder: "e.g. +91 98999 11111",
    required: true
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1"
  }, "Contact Email"), /*#__PURE__*/React.createElement("input", {
    type: "email",
    value: hostelForm.contactEmail,
    onChange: e => setHostelForm({
      ...hostelForm,
      contactEmail: e.target.value
    }),
    className: "w-full bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-semibold p-3 rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-500",
    placeholder: "e.g. info@stayease.com"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 sm:grid-cols-3 gap-4"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1"
  }, "Emergency SOS Phone"), /*#__PURE__*/React.createElement("input", {
    type: "text",
    value: hostelForm.emergencyPhone,
    onChange: e => setHostelForm({
      ...hostelForm,
      emergencyPhone: e.target.value
    }),
    className: "w-full bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-semibold p-3 rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-500",
    placeholder: "e.g. +91 98999 33333"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1"
  }, "Total Floors"), /*#__PURE__*/React.createElement("input", {
    type: "number",
    min: "1",
    max: "20",
    value: hostelForm.totalFloors,
    onChange: e => setHostelForm({
      ...hostelForm,
      totalFloors: e.target.value
    }),
    className: "w-full bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-semibold p-3 rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-500"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1"
  }, "Washing Machines"), /*#__PURE__*/React.createElement("input", {
    type: "number",
    min: "0",
    max: "50",
    value: hostelForm.washingMachines,
    onChange: e => setHostelForm({
      ...hostelForm,
      washingMachines: e.target.value
    }),
    className: "w-full bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-semibold p-3 rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-500"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "pt-2"
  }, /*#__PURE__*/React.createElement("button", {
    type: "submit",
    className: "px-6 py-3 bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-brand-600/30 transition flex items-center gap-2"
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "check",
    className: "w-4 h-4"
  }), "Save & Apply Hostel Details")))), /*#__PURE__*/React.createElement("div", {
    className: "bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between space-y-4"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3"
  }, /*#__PURE__*/React.createElement("h4", {
    className: "font-extrabold text-base text-slate-900 dark:text-white"
  }, "Hostel Rules & Curfew"), /*#__PURE__*/React.createElement("span", {
    className: "text-[11px] font-bold text-slate-400"
  }, hostelForm.rules.length, " Rules Active")), /*#__PURE__*/React.createElement("div", {
    className: "space-y-2 mt-4 max-h-72 overflow-y-auto pr-1"
  }, hostelForm.rules.map((rule, idx) => /*#__PURE__*/React.createElement("div", {
    key: idx,
    className: "flex items-start justify-between gap-2 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/60 text-xs"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-slate-700 dark:text-slate-300 font-medium leading-relaxed"
  }, /*#__PURE__*/React.createElement("span", {
    className: "font-bold text-brand-600 mr-1.5"
  }, idx + 1, "."), " ", rule), /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: () => handleDeleteRule(idx),
    className: "text-slate-400 hover:text-rose-500 transition p-1 shrink-0",
    title: "Remove rule"
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "x",
    className: "w-3.5 h-3.5"
  }))))), /*#__PURE__*/React.createElement("div", {
    className: "mt-4 flex gap-2"
  }, /*#__PURE__*/React.createElement("input", {
    type: "text",
    value: newRuleText,
    onChange: e => setNewRuleText(e.target.value),
    onKeyDown: e => {
      if (e.key === 'Enter') {
        e.preventDefault();
        handleAddRule();
      }
    },
    placeholder: "e.g. Gate closes strictly at 10 PM",
    className: "flex-1 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-semibold p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none"
  }), /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: handleAddRule,
    className: "px-3.5 py-2.5 bg-slate-200 dark:bg-slate-700 hover:bg-brand-600 hover:text-white text-slate-700 dark:text-slate-200 text-xs font-bold rounded-xl transition"
  }, "+ Add"))), /*#__PURE__*/React.createElement("p", {
    className: "text-[10px] text-slate-400 italic"
  }, "Rules are shown to all new applicants in the onboarding portal."))), /*#__PURE__*/React.createElement("div", {
    className: "bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 sm:p-8 space-y-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h4", {
    className: "font-extrabold text-base text-slate-900 dark:text-white"
  }, "Active Rooms & Beds Inventory"), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-slate-400"
  }, "Total ", rooms.length, " rooms configured with ", totalBeds, " total beds across ", hostelForm.totalFloors, " floors.")), /*#__PURE__*/React.createElement("button", {
    onClick: () => setShowAddRoomModal(true),
    className: "px-4 py-2 bg-brand-600 hover:bg-brand-500 text-white text-xs font-bold rounded-xl shadow-md shadow-brand-600/30 transition flex items-center gap-1.5 self-start sm:self-auto"
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "plus",
    className: "w-4 h-4"
  }), "Add Room")), /*#__PURE__*/React.createElement("div", {
    className: "overflow-x-auto"
  }, /*#__PURE__*/React.createElement("table", {
    className: "w-full text-left text-xs"
  }, /*#__PURE__*/React.createElement("thead", {
    className: "bg-slate-50 dark:bg-slate-800/80 text-slate-400 font-bold uppercase"
  }, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", {
    className: "p-3"
  }, "Room #"), /*#__PURE__*/React.createElement("th", {
    className: "p-3"
  }, "Floor"), /*#__PURE__*/React.createElement("th", {
    className: "p-3"
  }, "Category & Type"), /*#__PURE__*/React.createElement("th", {
    className: "p-3"
  }, "AC"), /*#__PURE__*/React.createElement("th", {
    className: "p-3"
  }, "Rent / Mo"), /*#__PURE__*/React.createElement("th", {
    className: "p-3"
  }, "Deposit"), /*#__PURE__*/React.createElement("th", {
    className: "p-3"
  }, "Beds (Avail / Total)"), /*#__PURE__*/React.createElement("th", {
    className: "p-3 text-right"
  }, "Actions"))), /*#__PURE__*/React.createElement("tbody", {
    className: "divide-y divide-slate-100 dark:divide-slate-800"
  }, rooms.map(r => /*#__PURE__*/React.createElement("tr", {
    key: r.id,
    className: "hover:bg-slate-50 dark:hover:bg-slate-800/40 transition"
  }, /*#__PURE__*/React.createElement("td", {
    className: "p-3 font-bold text-slate-900 dark:text-white"
  }, "Room ", r.roomNumber), /*#__PURE__*/React.createElement("td", {
    className: "p-3 text-slate-600 dark:text-slate-300 font-medium"
  }, "Floor ", r.floor), /*#__PURE__*/React.createElement("td", {
    className: "p-3 text-slate-600 dark:text-slate-300"
  }, /*#__PURE__*/React.createElement("span", {
    className: "font-semibold"
  }, r.type), /*#__PURE__*/React.createElement("span", {
    className: "text-[10px] text-slate-400 ml-1.5"
  }, "(", r.category, ")")), /*#__PURE__*/React.createElement("td", {
    className: "p-3"
  }, /*#__PURE__*/React.createElement("span", {
    className: `px-2 py-0.5 rounded text-[10px] font-extrabold ${r.ac ? 'bg-sky-100 dark:bg-sky-950 text-sky-600' : 'bg-slate-100 dark:bg-slate-800 text-slate-400'}`
  }, r.ac ? 'AC' : 'Non-AC')), /*#__PURE__*/React.createElement("td", {
    className: "p-3 font-bold text-brand-600"
  }, "₹", r.pricePerMonth?.toLocaleString()), /*#__PURE__*/React.createElement("td", {
    className: "p-3 text-slate-500"
  }, "₹", r.deposit?.toLocaleString()), /*#__PURE__*/React.createElement("td", {
    className: "p-3 font-semibold"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-emerald-600 font-bold"
  }, r.availableBeds), /*#__PURE__*/React.createElement("span", {
    className: "text-slate-400"
  }, " / ", r.totalBeds, " beds"), /*#__PURE__*/React.createElement("div", {
    className: "flex gap-1 mt-1"
  }, r.beds.map(b => /*#__PURE__*/React.createElement("span", {
    key: b.id,
    title: `Bed ${b.id}: ${b.status}`,
    className: `w-2 h-2 rounded-full ${b.status === 'Available' ? 'bg-emerald-500' : 'bg-rose-500'}`
  })))), /*#__PURE__*/React.createElement("td", {
    className: "p-3 text-right"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => handleDeleteRoom(r.id, r.roomNumber),
    className: "p-1.5 text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-lg transition",
    title: "Delete Room"
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "trash-2",
    className: "w-4 h-4"
  })))))))))), showAddRoomModal && /*#__PURE__*/React.createElement("div", {
    className: "fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bg-white dark:bg-slate-900 max-w-lg w-full rounded-3xl shadow-2xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 space-y-4 max-h-[90vh] overflow-y-auto"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-3"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2"
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "door-open",
    className: "w-5 h-5 text-brand-600"
  }), "Add New Room to Inventory"), /*#__PURE__*/React.createElement("button", {
    onClick: () => setShowAddRoomModal(false),
    className: "text-slate-400 hover:text-slate-600 p-1"
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "x",
    className: "w-5 h-5"
  }))), /*#__PURE__*/React.createElement("form", {
    onSubmit: handleAddRoom,
    className: "space-y-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-2 gap-3"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1"
  }, "Room Number *"), /*#__PURE__*/React.createElement("input", {
    type: "text",
    placeholder: "e.g. 204",
    value: newRoomForm.roomNumber,
    onChange: e => setNewRoomForm({
      ...newRoomForm,
      roomNumber: e.target.value
    }),
    className: "w-full bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-semibold p-2.5 rounded-xl border border-slate-200 dark:border-slate-700",
    required: true
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1"
  }, "Floor *"), /*#__PURE__*/React.createElement("input", {
    type: "number",
    min: "1",
    max: "20",
    value: newRoomForm.floor,
    onChange: e => setNewRoomForm({
      ...newRoomForm,
      floor: e.target.value
    }),
    className: "w-full bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-semibold p-2.5 rounded-xl border border-slate-200 dark:border-slate-700",
    required: true
  }))), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-2 gap-3"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1"
  }, "Category"), /*#__PURE__*/React.createElement("select", {
    value: newRoomForm.category,
    onChange: e => {
      const cat = e.target.value;
      const totalB = cat === 'Single' ? 1 : cat === 'Double' ? 2 : cat === 'Triple' ? 3 : 4;
      setNewRoomForm({
        ...newRoomForm,
        category: cat,
        totalBeds: totalB,
        type: `${cat} Sharing ${newRoomForm.ac ? 'AC' : 'Non-AC'}`
      });
    },
    className: "w-full bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-semibold p-2.5 rounded-xl border border-slate-200 dark:border-slate-700"
  }, /*#__PURE__*/React.createElement("option", {
    value: "Single"
  }, "Single (1 Bed)"), /*#__PURE__*/React.createElement("option", {
    value: "Double"
  }, "Double (2 Beds)"), /*#__PURE__*/React.createElement("option", {
    value: "Triple"
  }, "Triple (3 Beds)"), /*#__PURE__*/React.createElement("option", {
    value: "Four Sharing"
  }, "Four Sharing (4 Beds)"))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1"
  }, "Beds to Generate"), /*#__PURE__*/React.createElement("input", {
    type: "number",
    min: "1",
    max: "8",
    value: newRoomForm.totalBeds,
    onChange: e => setNewRoomForm({
      ...newRoomForm,
      totalBeds: e.target.value
    }),
    className: "w-full bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-semibold p-2.5 rounded-xl border border-slate-200 dark:border-slate-700",
    required: true
  }))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1"
  }, "Display Title / Type"), /*#__PURE__*/React.createElement("input", {
    type: "text",
    placeholder: "e.g. Deluxe Double Sharing AC",
    value: newRoomForm.type,
    onChange: e => setNewRoomForm({
      ...newRoomForm,
      type: e.target.value
    }),
    className: "w-full bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-semibold p-2.5 rounded-xl border border-slate-200 dark:border-slate-700",
    required: true
  })), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-2 gap-3"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1"
  }, "Monthly Rent (₹) *"), /*#__PURE__*/React.createElement("input", {
    type: "number",
    placeholder: "8500",
    value: newRoomForm.pricePerMonth,
    onChange: e => setNewRoomForm({
      ...newRoomForm,
      pricePerMonth: e.target.value
    }),
    className: "w-full bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-semibold p-2.5 rounded-xl border border-slate-200 dark:border-slate-700",
    required: true
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1"
  }, "Security Deposit (₹)"), /*#__PURE__*/React.createElement("input", {
    type: "number",
    placeholder: "10000",
    value: newRoomForm.deposit,
    onChange: e => setNewRoomForm({
      ...newRoomForm,
      deposit: e.target.value
    }),
    className: "w-full bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-semibold p-2.5 rounded-xl border border-slate-200 dark:border-slate-700",
    required: true
  }))), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-800 rounded-xl"
  }, /*#__PURE__*/React.createElement("input", {
    type: "checkbox",
    id: "ac-toggle",
    checked: newRoomForm.ac,
    onChange: e => setNewRoomForm({
      ...newRoomForm,
      ac: e.target.checked
    }),
    className: "w-4 h-4 rounded text-brand-600 focus:ring-brand-500"
  }), /*#__PURE__*/React.createElement("label", {
    htmlFor: "ac-toggle",
    className: "text-xs font-bold text-slate-700 dark:text-slate-300 cursor-pointer"
  }, "Air Conditioning (AC) Included in this Room")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1"
  }, "Amenities (comma separated)"), /*#__PURE__*/React.createElement("input", {
    type: "text",
    placeholder: "Attached Bath, Study Desk, Geyser, High-Speed WiFi",
    value: newRoomForm.amenities,
    onChange: e => setNewRoomForm({
      ...newRoomForm,
      amenities: e.target.value
    }),
    className: "w-full bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-semibold p-2.5 rounded-xl border border-slate-200 dark:border-slate-700"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1"
  }, "Room Photo URL"), /*#__PURE__*/React.createElement("input", {
    type: "url",
    placeholder: "https://images.unsplash.com/...",
    value: newRoomForm.image,
    onChange: e => setNewRoomForm({
      ...newRoomForm,
      image: e.target.value
    }),
    className: "w-full bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-semibold p-2.5 rounded-xl border border-slate-200 dark:border-slate-700"
  })), /*#__PURE__*/React.createElement("div", {
    className: "pt-2 flex justify-end gap-2"
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: () => setShowAddRoomModal(false),
    className: "px-4 py-2.5 text-xs font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition"
  }, "Cancel"), /*#__PURE__*/React.createElement("button", {
    type: "submit",
    className: "px-5 py-2.5 bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs rounded-xl shadow-md transition"
  }, "Create Room & Beds"))))), jsonModalOpen && /*#__PURE__*/React.createElement("div", {
    className: "fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bg-white dark:bg-slate-900 max-w-lg w-full rounded-3xl shadow-2xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 space-y-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-3"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2"
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "file-json",
    className: "w-5 h-5 text-brand-600"
  }), "Backup & Import Hostel Configuration"), /*#__PURE__*/React.createElement("button", {
    onClick: () => setJsonModalOpen(false),
    className: "text-slate-400 hover:text-slate-600 p-1"
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "x",
    className: "w-5 h-5"
  }))), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-slate-500 leading-relaxed"
  }, "Export your current hostel setup and room inventory as a JSON backup, or paste a new hostel configuration to reconfigure the system in 1 click."), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("button", {
    onClick: handleExportJson,
    className: "w-full py-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-brand-600 hover:text-white text-slate-700 dark:text-slate-200 font-bold text-xs rounded-xl transition flex items-center justify-center gap-2 border border-slate-200 dark:border-slate-700"
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "download",
    className: "w-4 h-4"
  }), "Export / Copy Current Config JSON")), /*#__PURE__*/React.createElement("div", {
    className: "space-y-1"
  }, /*#__PURE__*/React.createElement("label", {
    className: "block text-xs font-bold text-slate-700 dark:text-slate-300"
  }, "Paste JSON to Import"), /*#__PURE__*/React.createElement("textarea", {
    rows: "6",
    value: importJsonText,
    onChange: e => setImportJsonText(e.target.value),
    placeholder: `{\n  "hostel": { "name": "...", "address": "..." },\n  "rooms": [ ... ]\n}`,
    className: "w-full bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-mono text-[11px] p-3 rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none"
  })), /*#__PURE__*/React.createElement("div", {
    className: "pt-2 flex justify-end gap-2"
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: () => setJsonModalOpen(false),
    className: "px-4 py-2 text-xs font-bold text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl"
  }, "Cancel"), /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: handleImportJson,
    className: "px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-md transition flex items-center gap-1.5"
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "upload",
    className: "w-4 h-4"
  }), "Apply & Overwrite")))));
}

// Render React App
const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);
root.render(/*#__PURE__*/React.createElement(App, null));
