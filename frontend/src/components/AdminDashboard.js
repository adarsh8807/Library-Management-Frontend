import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';
import { 
  BookOpen, 
  Users, 
  TrendingUp, 
  AlertTriangle, 
  DollarSign,
  Search,
  Plus,
  Edit,
  Trash2,
  LogOut,
  Moon,
  Sun,
  Filter,
  BarChart3,
  PieChart,
  Bell,
  Settings,
  Calendar,
  Download
} from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useToast } from '../hooks/use-toast';
import { mockBooks, mockBorrowers, mockAnalytics, categories } from '../mockData';

const AdminDashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [books, setBooks] = useState(mockBooks);
  const [borrowers, setBorrowers] = useState(mockBorrowers);
  const [isAddBookOpen, setIsAddBookOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [newBook, setNewBook] = useState({
    title: '',
    author: '',
    category: '',
    isbn: '',
    quantity: 1,
    description: '',
    coverImage: ''
  });

  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const { toast } = useToast();

  // Filter books based on search and category
  const filteredBooks = useMemo(() => {
    return books.filter(book => {
      const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           book.author.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || book.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [books, searchTerm, selectedCategory]);

  const handleLogout = () => {
    localStorage.removeItem('userRole');
    localStorage.removeItem('isAuthenticated');
    toast({
      title: "Logged out successfully",
      description: "See you again soon!",
    });
    navigate('/admin');
  };

  const handleAddBook = () => {
    if (!newBook.title || !newBook.author || !newBook.category) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    const book = {
      id: Date.now(),
      ...newBook,
      available: newBook.quantity,
      coverImage: newBook.coverImage || "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=300&h=400&fit=crop"
    };

    setBooks(prev => [...prev, book]);
    setNewBook({
      title: '',
      author: '',
      category: '',
      isbn: '',
      quantity: 1,
      description: '',
      coverImage: ''
    });
    setIsAddBookOpen(false);
    
    toast({
      title: "Book Added",
      description: `"${book.title}" has been added to the library.`,
    });
  };

  const handleDeleteBook = (bookId) => {
    setBooks(prev => prev.filter(book => book.id !== bookId));
    toast({
      title: "Book Removed",
      description: "Book has been removed from the library.",
    });
  };

  const AnalyticsCard = ({ title, value, icon: Icon, trend, color = "blue" }) => (
    <Card className="relative overflow-hidden bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900 border-slate-200 dark:border-slate-700 hover:shadow-lg transition-all duration-300">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">{title}</p>
            <p className="text-3xl font-bold text-slate-800 dark:text-slate-100">{value}</p>
            {trend && (
              <p className="text-sm text-green-600 dark:text-green-400 mt-1">
                +{trend}% from last month
              </p>
            )}
          </div>
          <div className={`p-3 rounded-full bg-${color}-100 dark:bg-${color}-900/30`}>
            <Icon className={`h-6 w-6 text-${color}-600 dark:text-${color}-400`} />
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* Header */}
      <header className="bg-white dark:bg-slate-800 shadow-sm border-b border-slate-200 dark:border-slate-700">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                  <BookOpen className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-slate-800 dark:text-slate-100">
                    Library Admin
                  </h1>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Management Dashboard
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Button variant="outline" size="icon" onClick={toggleTheme}>
                {theme === 'light' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
              </Button>
              <Button variant="outline" size="icon">
                <Bell className="h-4 w-4" />
              </Button>
              <Button variant="outline" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="p-6">
        {/* Analytics Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <AnalyticsCard
            title="Total Books"
            value={mockAnalytics.totalBooks}
            icon={BookOpen}
            trend={5}
            color="blue"
          />
          <AnalyticsCard
            title="Borrowed Books"
            value={mockAnalytics.borrowedBooks}
            icon={TrendingUp}
            trend={12}
            color="green"
          />
          <AnalyticsCard
            title="Total Borrowers"
            value={borrowers.length}
            icon={Users}
            trend={8}
            color="purple"
          />
          <AnalyticsCard
            title="Overdue Books"
            value={mockAnalytics.overdueBooks}
            icon={AlertTriangle}
            color="red"
          />
          <AnalyticsCard
            title="Fines Collected"
            value={`₹${mockAnalytics.finesCollected}`}
            icon={DollarSign}
            trend={15}
            color="yellow"
          />
        </div>

        {/* Main Content */}
        <Tabs defaultValue="books" className="space-y-6">
          <TabsList className="bg-white dark:bg-slate-800 p-1 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700">
            <TabsTrigger value="books" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              <BookOpen className="h-4 w-4 mr-2" />
              Book Management
            </TabsTrigger>
            <TabsTrigger value="borrowers" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              <Users className="h-4 w-4 mr-2" />
              Borrower Management
            </TabsTrigger>
            <TabsTrigger value="analytics" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              <BarChart3 className="h-4 w-4 mr-2" />
              Reports & Analytics
            </TabsTrigger>
          </TabsList>

          {/* Books Tab */}
          <TabsContent value="books" className="space-y-6">
            {/* Search and Add Book */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Book Management</CardTitle>
                    <CardDescription>Manage your library's book collection</CardDescription>
                  </div>
                  <Dialog open={isAddBookOpen} onOpenChange={setIsAddBookOpen}>
                    <DialogTrigger asChild>
                      <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                        <Plus className="h-4 w-4 mr-2" />
                        Add New Book
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-md">
                      <DialogHeader>
                        <DialogTitle>Add New Book</DialogTitle>
                        <DialogDescription>
                          Enter the details of the new book to add to the library.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="title">Title *</Label>
                          <Input
                            id="title"
                            value={newBook.title}
                            onChange={(e) => setNewBook(prev => ({ ...prev, title: e.target.value }))}
                            placeholder="Enter book title"
                          />
                        </div>
                        <div>
                          <Label htmlFor="author">Author *</Label>
                          <Input
                            id="author"
                            value={newBook.author}
                            onChange={(e) => setNewBook(prev => ({ ...prev, author: e.target.value }))}
                            placeholder="Enter author name"
                          />
                        </div>
                        <div>
                          <Label htmlFor="category">Category *</Label>
                          <Select value={newBook.category} onValueChange={(value) => setNewBook(prev => ({ ...prev, category: value }))}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                            <SelectContent>
                              {categories.map(category => (
                                <SelectItem key={category} value={category}>{category}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="isbn">ISBN</Label>
                          <Input
                            id="isbn"
                            value={newBook.isbn}
                            onChange={(e) => setNewBook(prev => ({ ...prev, isbn: e.target.value }))}
                            placeholder="Enter ISBN"
                          />
                        </div>
                        <div>
                          <Label htmlFor="quantity">Quantity</Label>
                          <Input
                            id="quantity"
                            type="number"
                            min="1"
                            value={newBook.quantity}
                            onChange={(e) => setNewBook(prev => ({ ...prev, quantity: parseInt(e.target.value) || 1 }))}
                          />
                        </div>
                        <div>
                          <Label htmlFor="description">Description</Label>
                          <Textarea
                            id="description"
                            value={newBook.description}
                            onChange={(e) => setNewBook(prev => ({ ...prev, description: e.target.value }))}
                            placeholder="Enter book description"
                          />
                        </div>
                        <Button onClick={handleAddBook} className="w-full">
                          Add Book
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                    <Input
                      placeholder="Search books by title or author..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="w-full sm:w-48">
                      <SelectValue placeholder="Filter by category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      {categories.map(category => (
                        <SelectItem key={category} value={category}>{category}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Books Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredBooks.map(book => (
                    <Card key={book.id} className="group hover:shadow-lg transition-all duration-300 border-slate-200 dark:border-slate-700">
                      <div className="aspect-[3/4] relative overflow-hidden rounded-t-lg">
                        <img
                          src={book.coverImage}
                          alt={book.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute top-2 right-2">
                          <Badge variant={book.available > 0 ? "default" : "destructive"} className="bg-white/90 text-slate-800">
                            {book.available}/{book.quantity}
                          </Badge>
                        </div>
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-semibold text-slate-800 dark:text-slate-100 mb-1 line-clamp-2">
                          {book.title}
                        </h3>
                        <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                          {book.author}
                        </p>
                        <Badge variant="outline" className="mb-3">
                          {book.category}
                        </Badge>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" className="flex-1">
                            <Edit className="h-3 w-3 mr-1" />
                            Edit
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => handleDeleteBook(book.id)}
                            className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Borrowers Tab */}
          <TabsContent value="borrowers">
            <Card>
              <CardHeader>
                <CardTitle>Borrower Management</CardTitle>
                <CardDescription>Manage library members and their borrowing activities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {borrowers.map(borrower => (
                    <div key={borrower.id} className="flex items-center justify-between p-4 border border-slate-200 dark:border-slate-700 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                          {borrower.name.charAt(0)}
                        </div>
                        <div>
                          <h3 className="font-semibold text-slate-800 dark:text-slate-100">
                            {borrower.name}
                          </h3>
                          <p className="text-sm text-slate-600 dark:text-slate-400">
                            {borrower.studentId} • {borrower.department} • {borrower.year}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <Badge variant={borrower.fines > 0 ? "destructive" : "default"}>
                          {borrower.fines > 0 ? `₹${borrower.fines} Fine` : 'No Fines'}
                        </Badge>
                        <Badge variant="outline">
                          {borrower.borrowedBooks.length} Books
                        </Badge>
                        <Button variant="outline" size="sm">
                          View Profile
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BarChart3 className="h-5 w-5 mr-2" />
                    Monthly Trends
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center text-slate-500">
                    Chart visualization would be here
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <PieChart className="h-5 w-5 mr-2" />
                    Category Usage
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockAnalytics.categoryUsage.map(item => (
                      <div key={item.category} className="flex items-center justify-between">
                        <span className="text-sm font-medium">{item.category}</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-20 h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"
                              style={{ width: `${item.percentage}%` }}
                            />
                          </div>
                          <span className="text-sm text-slate-600 dark:text-slate-400">
                            {item.percentage}%
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;