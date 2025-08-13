// Mock data for Library Management System

export const mockBooks = [
  {
    id: 1,
    title: "The Art of Computer Programming, Volume 1",
    author: "Donald E. Knuth",
    category: "Computer Science",
    isbn: "978-0201896831",
    quantity: 5,
    available: 3,
    coverImage: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=300&h=400&fit=crop",
    description: "Fundamental algorithms and analysis of algorithms",
    publishedYear: 1997,
    pages: 672
  },
  {
    id: 2,
    title: "Clean Code: A Handbook of Agile Software Craftsmanship",
    author: "Robert C. Martin",
    category: "Software Engineering",
    isbn: "978-0132350884", 
    quantity: 8,
    available: 6,
    coverImage: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=400&fit=crop",
    description: "A handbook of agile software craftsmanship principles",
    publishedYear: 2008,
    pages: 464
  },
  {
    id: 3,
    title: "Introduction to Algorithms",
    author: "Thomas H. Cormen",
    category: "Computer Science",
    isbn: "978-0262033848",
    quantity: 6,
    available: 4,
    coverImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop",
    description: "Comprehensive introduction to algorithms and data structures", 
    publishedYear: 2009,
    pages: 1312
  },
  {
    id: 4,
    title: "Data Science from Scratch",
    author: "Joel Grus",
    category: "Data Science",
    isbn: "978-1492041139",
    quantity: 4,
    available: 2,
    coverImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=300&h=400&fit=crop",
    description: "First principles approach to data science",
    publishedYear: 2019,
    pages: 406
  },
  {
    id: 5,
    title: "Artificial Intelligence: A Modern Approach",
    author: "Stuart Russell, Peter Norvig",
    category: "Artificial Intelligence",
    isbn: "978-0134610993",
    quantity: 7,
    available: 5,
    coverImage: "https://images.unsplash.com/photo-1555255707-c07966088b7b?w=300&h=400&fit=crop",
    description: "Comprehensive introduction to artificial intelligence",
    publishedYear: 2020,
    pages: 1152
  },
  {
    id: 6,
    title: "The Elements of Statistical Learning",
    author: "Trevor Hastie",
    category: "Statistics",
    isbn: "978-0387848570",
    quantity: 3,
    available: 1,
    coverImage: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=300&h=400&fit=crop",
    description: "Data mining, inference and prediction",
    publishedYear: 2016,
    pages: 745
  },
  {
    id: 7,
    title: "Design Patterns: Elements of Reusable Object-Oriented Software",
    author: "Erich Gamma",
    category: "Software Engineering",
    isbn: "978-0201633612",
    quantity: 5,
    available: 3,
    coverImage: "https://images.unsplash.com/photo-1456324504439-367cee3b3c32?w=300&h=400&fit=crop",
    description: "Classic book on software design patterns",
    publishedYear: 1994,
    pages: 395
  },
  {
    id: 8,
    title: "Python Crash Course",
    author: "Eric Matthes",
    category: "Programming",
    isbn: "978-1593279288",
    quantity: 10,
    available: 8,
    coverImage: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=300&h=400&fit=crop",
    description: "A hands-on, project-based introduction to programming",
    publishedYear: 2019,
    pages: 544
  }
];

export const mockBorrowers = [
  {
    id: 1,
    studentId: "2021001",
    name: "Arjun Sharma",
    email: "arjun.sharma@college.edu",
    phone: "+91 9876543210",
    department: "BSC-IT",
    year: "3rd",
    semester: "Sem 5",
    borrowedBooks: [
      {
        bookId: 1,
        borrowedDate: "2024-01-15",
        dueDate: "2024-02-15",
        status: "borrowed"
      }
    ],
    fines: 50,
    joinedDate: "2021-07-01"
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
    borrowedBooks: [
      {
        bookId: 4,
        borrowedDate: "2024-01-20",
        dueDate: "2024-02-20",
        status: "overdue"
      }
    ],
    fines: 120,
    joinedDate: "2022-07-01"
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
    borrowedBooks: [],
    fines: 0,
    joinedDate: "2023-07-01"
  }
];

export const mockAnalytics = {
  totalBooks: 48,
  borrowedBooks: 12,
  returnedBooks: 156,
  overdueBooks: 3,
  finesCollected: 2450,
  monthlyTrends: [
    { month: "Jan", borrowed: 45, returned: 42 },
    { month: "Feb", borrowed: 52, returned: 48 },
    { month: "Mar", borrowed: 38, returned: 41 },
    { month: "Apr", borrowed: 61, returned: 58 },
    { month: "May", borrowed: 55, returned: 52 },
    { month: "Jun", borrowed: 47, returned: 44 }
  ],
  categoryUsage: [
    { category: "Computer Science", count: 45, percentage: 28 },
    { category: "Software Engineering", count: 38, percentage: 24 },
    { category: "Data Science", count: 32, percentage: 20 },
    { category: "AI/ML", count: 25, percentage: 16 },
    { category: "Others", count: 20, percentage: 12 }
  ]
};

export const departments = ["BSC-IT", "BSC-DS", "BSC-AIML", "BSC-VFX", "BCA", "BCOM", "BMS", "BFM"];
export const years = ["1st", "2nd", "3rd"];
export const semesters = ["Sem 1", "Sem 2", "Sem 3", "Sem 4", "Sem 5", "Sem 6"];
export const categories = ["Computer Science", "Software Engineering", "Data Science", "Artificial Intelligence", "Programming", "Statistics", "Mathematics", "Others"];