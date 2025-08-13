// Enhanced Mock data for Advanced Library Management System

export const mockBooksEnhanced = [
  {
    id: 1,
    title: "The Art of Computer Programming, Volume 1",
    author: "Donald E. Knuth",
    category: "Computer Science",
    tags: ["algorithms", "programming", "mathematics"],
    isbn: "978-0201896831",
    quantity: 5,
    available: 3,
    condition: "Good",
    location: "A-001",
    coverImages: [
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=300&h=400&fit=crop",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop"
    ],
    description: "Fundamental algorithms and analysis of algorithms",
    publishedYear: 1997,
    pages: 672,
    rating: 4.8,
    borrowCount: 45,
    lastBorrowed: "2024-01-10",
    addedDate: "2023-01-15",
    status: "Available"
  },
  {
    id: 2,
    title: "Clean Code: A Handbook of Agile Software Craftsmanship",
    author: "Robert C. Martin",
    category: "Software Engineering",
    tags: ["clean code", "best practices", "software development"],
    isbn: "978-0132350884", 
    quantity: 8,
    available: 6,
    condition: "Excellent",
    location: "B-015",
    coverImages: [
      "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=400&fit=crop",
      "https://images.unsplash.com/photo-1456324504439-367cee3b3c32?w=300&h=400&fit=crop"
    ],
    description: "A handbook of agile software craftsmanship principles",
    publishedYear: 2008,
    pages: 464,
    rating: 4.7,
    borrowCount: 38,
    lastBorrowed: "2024-01-12",
    addedDate: "2023-02-20",
    status: "Available"
  },
  {
    id: 3,
    title: "Introduction to Algorithms",
    author: "Thomas H. Cormen",
    category: "Computer Science",
    tags: ["algorithms", "data structures", "computer science"],
    isbn: "978-0262033848",
    quantity: 6,
    available: 4,
    condition: "Good",
    location: "A-025",
    coverImages: [
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop"
    ],
    description: "Comprehensive introduction to algorithms and data structures", 
    publishedYear: 2009,
    pages: 1312,
    rating: 4.9,
    borrowCount: 62,
    lastBorrowed: "2024-01-08",
    addedDate: "2023-01-10",
    status: "Available"
  },
  {
    id: 4,
    title: "Data Science from Scratch",
    author: "Joel Grus",
    category: "Data Science",
    tags: ["data science", "python", "machine learning"],
    isbn: "978-1492041139",
    quantity: 4,
    available: 2,
    condition: "Fair",
    location: "C-008",
    coverImages: [
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=300&h=400&fit=crop"
    ],
    description: "First principles approach to data science",
    publishedYear: 2019,
    pages: 406,
    rating: 4.5,
    borrowCount: 32,
    lastBorrowed: "2024-01-15",
    addedDate: "2023-03-05",
    status: "Available"
  },
  {
    id: 5,
    title: "Artificial Intelligence: A Modern Approach",
    author: "Stuart Russell, Peter Norvig",
    category: "Artificial Intelligence",
    tags: ["AI", "machine learning", "neural networks"],
    isbn: "978-0134610993",
    quantity: 7,
    available: 5,
    condition: "Excellent",
    location: "D-012",
    coverImages: [
      "https://images.unsplash.com/photo-1555255707-c07966088b7b?w=300&h=400&fit=crop"
    ],
    description: "Comprehensive introduction to artificial intelligence",
    publishedYear: 2020,
    pages: 1152,
    rating: 4.8,
    borrowCount: 28,
    lastBorrowed: "2024-01-05",
    addedDate: "2023-04-12",
    status: "Available"
  }
];

export const mockBorrowersEnhanced = [
  {
    id: 1,
    studentId: "2021001",
    name: "Arjun Sharma",
    email: "arjun.sharma@college.edu",
    phone: "+91 9876543210",
    department: "BSC-IT",
    year: "3rd",
    semester: "Sem 5",
    status: "Active",
    membership: "Premium",
    joinedDate: "2021-07-01",
    lastActivity: "2024-01-15",
    totalBorrowed: 25,
    currentlyBorrowed: 2,
    overdueCount: 0,
    fines: 0,
    maxBooksAllowed: 5,
    borrowingHistory: [
      {
        id: 1,
        bookId: 1,
        bookTitle: "The Art of Computer Programming",
        borrowedDate: "2024-01-10",
        dueDate: "2024-02-10",
        returnedDate: null,
        status: "borrowed",
        renewalCount: 0,
        fine: 0
      },
      {
        id: 2,
        bookId: 2,
        bookTitle: "Clean Code",
        borrowedDate: "2024-01-05",
        dueDate: "2024-02-05",
        returnedDate: null,
        status: "borrowed",
        renewalCount: 1,
        fine: 0
      }
    ],
    notifications: [
      {
        id: 1,
        type: "reminder",
        message: "Book 'Clean Code' is due in 3 days",
        date: "2024-01-13",
        read: false
      }
    ]
  },
  {
    id: 2,
    studentId: "2022003",
    name: "Priya Patel",
    email: "priya.patel@college.edu", 
    phone: "+91 9876543211",
    department: "BSC-DS",
    year: "2nd",
    semester: "Sem 4",
    status: "Active",
    membership: "Standard",
    joinedDate: "2022-07-01",
    lastActivity: "2024-01-12",
    totalBorrowed: 18,
    currentlyBorrowed: 1,
    overdueCount: 1,
    fines: 120,
    maxBooksAllowed: 3,
    borrowingHistory: [
      {
        id: 3,
        bookId: 4,
        bookTitle: "Data Science from Scratch",
        borrowedDate: "2023-12-15",
        dueDate: "2024-01-15",
        returnedDate: null,
        status: "overdue",
        renewalCount: 0,
        fine: 120
      }
    ],
    notifications: [
      {
        id: 2,
        type: "overdue",
        message: "Book 'Data Science from Scratch' is 3 days overdue. Fine: ₹120",
        date: "2024-01-18",
        read: false
      }
    ]
  },
  {
    id: 3,
    studentId: "2023005",
    name: "Rahul Verma",
    email: "rahul.verma@college.edu",
    phone: "+91 9876543212",
    department: "BSC-AIML",
    year: "1st", 
    semester: "Sem 2",
    status: "Inactive",
    membership: "Standard",
    joinedDate: "2023-07-01",
    lastActivity: "2023-12-20",
    totalBorrowed: 5,
    currentlyBorrowed: 0,
    overdueCount: 0,
    fines: 0,
    maxBooksAllowed: 3,
    borrowingHistory: [
      {
        id: 4,
        bookId: 5,
        bookTitle: "Artificial Intelligence: A Modern Approach",
        borrowedDate: "2023-12-01",
        dueDate: "2023-12-31",
        returnedDate: "2023-12-20",
        status: "returned",
        renewalCount: 0,
        fine: 0
      }
    ],
    notifications: []
  },
  {
    id: 4,
    studentId: "2020007",
    name: "Sneha Krishnan",
    email: "sneha.krishnan@college.edu",
    phone: "+91 9876543213",
    department: "BCA",
    year: "3rd",
    semester: "Sem 6",
    status: "Suspended",
    membership: "Standard",
    joinedDate: "2020-07-01",
    lastActivity: "2023-11-15",
    totalBorrowed: 42,
    currentlyBorrowed: 0,
    overdueCount: 3,
    fines: 450,
    maxBooksAllowed: 0,
    borrowingHistory: [],
    notifications: [
      {
        id: 3,
        type: "suspension",
        message: "Account suspended due to excessive fines. Please contact administration.",
        date: "2023-11-20",
        read: true
      }
    ]
  }
];

export const mockAnalyticsEnhanced = {
  totalBooks: 156,
  borrowedBooks: 23,
  returnedBooks: 1240,
  overdueBooks: 8,
  finesCollected: 12450,
  activeBorrowers: 89,
  newMembersThisMonth: 12,
  avgBooksPerBorrower: 2.8,
  monthlyTrends: [
    { month: "Jan", borrowed: 45, returned: 42, newMembers: 8, fines: 1200 },
    { month: "Feb", borrowed: 52, returned: 48, newMembers: 12, fines: 950 },
    { month: "Mar", borrowed: 38, returned: 41, newMembers: 6, fines: 1100 },
    { month: "Apr", borrowed: 61, returned: 58, newMembers: 15, fines: 800 },
    { month: "May", borrowed: 55, returned: 52, newMembers: 9, fines: 1350 },
    { month: "Jun", borrowed: 47, returned: 44, newMembers: 11, fines: 1050 }
  ],
  categoryDemand: [
    { category: "Computer Science", borrowed: 145, returned: 132, demand: 89 },
    { category: "Software Engineering", borrowed: 128, returned: 120, demand: 78 },
    { category: "Data Science", borrowed: 95, returned: 88, demand: 85 },
    { category: "AI/ML", borrowed: 87, returned: 79, demand: 92 },
    { category: "Programming", borrowed: 76, returned: 71, demand: 68 },
    { category: "Others", borrowed: 52, returned: 48, demand: 45 }
  ],
  borrowerActivityHeatmap: [
    { day: "Mon", hour: 9, activity: 25 },
    { day: "Mon", hour: 10, activity: 45 },
    { day: "Mon", hour: 11, activity: 35 },
    { day: "Mon", hour: 14, activity: 55 },
    { day: "Mon", hour: 15, activity: 38 },
    { day: "Tue", hour: 9, activity: 30 },
    { day: "Tue", hour: 10, activity: 50 },
    { day: "Tue", hour: 11, activity: 42 },
    { day: "Wed", hour: 9, activity: 28 },
    { day: "Wed", hour: 10, activity: 48 },
    { day: "Thu", hour: 9, activity: 35 },
    { day: "Thu", hour: 10, activity: 52 },
    { day: "Fri", hour: 9, activity: 20 },
    { day: "Fri", hour: 10, activity: 35 }
  ],
  predictiveInsights: [
    {
      type: "demand_forecast",
      title: "High Demand Expected",
      description: "AI/ML books expected to see 25% increase in borrowing next month",
      confidence: 85,
      impact: "high"
    },
    {
      type: "inventory_alert",
      title: "Stock Alert",
      description: "Programming category needs 15 more books to meet demand",
      confidence: 92,
      impact: "medium"
    },
    {
      type: "borrower_behavior",
      title: "Peak Hours",
      description: "Library usage peaks at 10 AM and 2 PM on weekdays",
      confidence: 78,
      impact: "low"
    }
  ]
};

export const departments = ["BSC-IT", "BSC-DS", "BSC-AIML", "BSC-VFX", "BCA", "BCOM", "BMS", "BFM"];
export const years = ["1st", "2nd", "3rd"];
export const semesters = ["Sem 1", "Sem 2", "Sem 3", "Sem 4", "Sem 5", "Sem 6"];
export const categories = ["Computer Science", "Software Engineering", "Data Science", "Artificial Intelligence", "Programming", "Statistics", "Mathematics", "Others"];
export const conditions = ["Excellent", "Good", "Fair", "Poor", "Damaged"];
export const membershipTypes = ["Standard", "Premium", "Faculty"];
export const borrowerStatuses = ["Active", "Inactive", "Suspended"];