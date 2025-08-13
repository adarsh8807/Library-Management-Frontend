import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Progress } from './ui/progress';
import { 
  BookOpen, 
  Heart, 
  Clock, 
  Award, 
  Zap,
  Bell,
  Search,
  Grid3X3,
  List,
  Star,
  Calendar,
  User,
  Settings,
  LogOut,
  Moon,
  Sun,
  QrCode,
  WifiOff,
  Languages,
  Target,
  TrendingUp,
  BookmarkCheck,
  Timer,
  AlertTriangle,
  CheckCircle,
  Sparkles,
  Brain,
  Trophy,
  Gift,
  RefreshCw
} from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useToast } from '../hooks/use-toast';
import BookBrowsing from './BookBrowsing';
import BorrowerProfile from './BorrowerProfile';

const BorrowerDashboard = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [studentData, setStudentData] = useState({});
  const [notifications, setNotifications] = useState([]);
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [gamificationPoints, setGamificationPoints] = useState(750);
  const [isOffline, setIsOffline] = useState(false);
  const [language, setLanguage] = useState('en');

  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const { toast } = useToast();

  useEffect(() => {
    const data = localStorage.getItem('studentData');
    if (data) {
      setStudentData(JSON.parse(data));
    }

    // Mock data initialization
    setNotifications([
      {
        id: 1,
        type: 'due',
        title: 'Book Due Tomorrow',
        message: 'Clean Code is due tomorrow. Renew or return on time.',
        time: '2 hours ago',
        read: false
      },
      {
        id: 2,
        type: 'available',
        title: 'Wishlist Book Available',
        message: 'Data Science from Scratch is now available for borrowing!',
        time: '1 day ago',
        read: false
      }
    ]);

    setBorrowedBooks([
      {
        id: 1,
        title: 'Clean Code',
        author: 'Robert C. Martin',
        dueDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        renewals: 1,
        maxRenewals: 2,
        fine: 0,
        coverImage: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=400&fit=crop'
      },
      {
        id: 2,
        title: 'Introduction to Algorithms',
        author: 'Thomas H. Cormen',
        dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        renewals: 0,
        maxRenewals: 2,
        fine: 0,
        coverImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop'
      }
    ]);

    setWishlist([
      {
        id: 3,
        title: 'Data Science from Scratch',
        author: 'Joel Grus',
        available: true,
        coverImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=300&h=400&fit=crop'
      }
    ]);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userRole');
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('studentData');
    toast({
      title: "Logged out successfully",
      description: "See you again soon!",
    });
    navigate('/borrower');
  };

  const getDaysUntilDue = (dueDate) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getGamificationLevel = (points) => {
    if (points < 100) return { level: 1, title: 'Book Explorer', progress: points };
    if (points < 300) return { level: 2, title: 'Avid Reader', progress: points - 100 };
    if (points < 600) return { level: 3, title: 'Book Scholar', progress: points - 300 };
    if (points < 1000) return { level: 4, title: 'Library Champion', progress: points - 600 };
    return { level: 5, title: 'Master Bibliophile', progress: 100 };
  };

  const gamification = getGamificationLevel(gamificationPoints);

  // AI Book Recommendations Mock
  const aiRecommendations = [
    {
      id: 1,
      title: 'Design Patterns',
      author: 'Gang of Four',
      reason: 'Based on your interest in Clean Code',
      confidence: 95,
      coverImage: 'https://images.unsplash.com/photo-1456324504439-367cee3b3c32?w=300&h=400&fit=crop'
    },
    {
      id: 2,
      title: 'Python Crash Course',
      author: 'Eric Matthes',
      reason: 'Matches your programming focus',
      confidence: 88,
      coverImage: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=300&h=400&fit=crop'
    }
  ];

  const StatCard = ({ title, value, icon: Icon, color, subtitle }) => (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">{title}</p>
            <p className="text-2xl font-bold text-slate-800 dark:text-slate-100">{value}</p>
            {subtitle && <p className="text-xs text-slate-500 mt-1">{subtitle}</p>}
          </div>
          <div className={`p-3 rounded-full ${color}`}>
            <Icon className="h-5 w-5 text-white" />
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* Offline Banner */}
      {isOffline && (
        <div className="bg-yellow-100 dark:bg-yellow-900/20 border-b border-yellow-200 dark:border-yellow-800 p-3">
          <div className="flex items-center justify-center space-x-2 text-yellow-800 dark:text-yellow-400">
            <WifiOff className="h-4 w-4" />
            <span className="text-sm font-medium">You're offline. Some features may be limited.</span>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="bg-white dark:bg-slate-800 shadow-sm border-b border-slate-200 dark:border-slate-700">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <BookOpen className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-slate-800 dark:text-slate-100">
                    My Library
                  </h1>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Welcome back, {studentData.studentId || 'Student'}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              {/* Language Toggle */}
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
              >
                <Languages className="h-4 w-4 mr-2" />
                {language === 'en' ? 'हिं' : 'EN'}
              </Button>
              
              {/* QR Scanner */}
              <Button variant="outline" size="icon">
                <QrCode className="h-4 w-4" />
              </Button>
              
              <Button variant="outline" size="icon" onClick={toggleTheme}>
                {theme === 'light' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
              </Button>
              
              {/* Notifications */}
              <div className="relative">
                <Button variant="outline" size="icon">
                  <Bell className="h-4 w-4" />
                </Button>
                {notifications.filter(n => !n.read).length > 0 && (
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                    <span className="text-xs text-white font-bold">
                      {notifications.filter(n => !n.read).length}
                    </span>
                  </div>
                )}
              </div>
              
              <Button variant="outline" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-white dark:bg-slate-800 p-1 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700">
            <TabsTrigger value="home" className="data-[state=active]:bg-indigo-600 data-[state=active]:text-white">
              <BookOpen className="h-4 w-4 mr-2" />
              Home
            </TabsTrigger>
            <TabsTrigger value="browse" className="data-[state=active]:bg-indigo-600 data-[state=active]:text-white">
              <Search className="h-4 w-4 mr-2" />
              Browse Books
            </TabsTrigger>
            <TabsTrigger value="mybooks" className="data-[state=active]:bg-indigo-600 data-[state=active]:text-white">
              <BookmarkCheck className="h-4 w-4 mr-2" />
              My Books
            </TabsTrigger>
            <TabsTrigger value="wishlist" className="data-[state=active]:bg-indigo-600 data-[state=active]:text-white">
              <Heart className="h-4 w-4 mr-2" />
              Wishlist
            </TabsTrigger>
            <TabsTrigger value="profile" className="data-[state=active]:bg-indigo-600 data-[state=active]:text-white">
              <User className="h-4 w-4 mr-2" />
              Profile
            </TabsTrigger>
          </TabsList>

          {/* Home Tab */}
          <TabsContent value="home" className="space-y-6">
            {/* Welcome Section with Wave Animation */}
            <Card className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white border-0">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold mb-2 flex items-center">
                      Welcome back, {studentData.studentId || 'Student'}! 
                      <span className="ml-2 animate-bounce">👋</span>
                    </h2>
                    <p className="text-indigo-100 mb-4">
                      Continue your learning journey with amazing books
                    </p>
                    <div className="flex gap-3">
                      <Button 
                        variant="secondary" 
                        onClick={() => setActiveTab('browse')}
                        className="bg-white text-indigo-600 hover:bg-slate-100"
                      >
                        <Search className="h-4 w-4 mr-2" />
                        Browse Books
                      </Button>
                      <Button 
                        variant="outline" 
                        onClick={() => setActiveTab('mybooks')}
                        className="border-white text-white hover:bg-white hover:text-indigo-600"
                      >
                        <BookmarkCheck className="h-4 w-4 mr-2" />
                        My Books
                      </Button>
                    </div>
                  </div>
                  <div className="hidden md:block">
                    <div className="text-6xl opacity-20">📚</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard
                title="Books Borrowed"
                value={borrowedBooks.length}
                subtitle="Currently reading"
                icon={BookOpen}
                color="bg-blue-500"
              />
              <StatCard
                title="Wishlist Items"
                value={wishlist.length}
                subtitle="Books to read"
                icon={Heart}
                color="bg-pink-500"
              />
              <StatCard
                title="Reading Points"
                value={gamificationPoints}
                subtitle={gamification.title}
                icon={Trophy}
                color="bg-yellow-500"
              />
              <StatCard
                title="Days Active"
                value="45"
                subtitle="This semester"
                icon={Calendar}
                color="bg-green-500"
              />
            </div>

            {/* Gamification Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Trophy className="h-5 w-5 mr-2 text-yellow-500" />
                  Reading Achievement
                </CardTitle>
                <CardDescription>Level {gamification.level} - {gamification.title}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Progress to next level</span>
                    <span className="text-sm text-slate-600">{gamification.progress}/100</span>
                  </div>
                  <Progress value={gamification.progress} className="w-full" />
                  <div className="flex items-center justify-center space-x-6 text-sm">
                    <div className="flex items-center space-x-1">
                      <Gift className="h-4 w-4 text-blue-500" />
                      <span>Early Return: +10 pts</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-500" />
                      <span>Book Review: +25 pts</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Target className="h-4 w-4 text-green-500" />
                      <span>Weekly Goal: +50 pts</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* AI Recommendations */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Brain className="h-5 w-5 mr-2 text-purple-500" />
                  AI Book Recommendations
                  <Badge className="ml-2 bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400">
                    <Sparkles className="h-3 w-3 mr-1" />
                    AI Powered
                  </Badge>
                </CardTitle>
                <CardDescription>Personalized suggestions based on your reading history</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {aiRecommendations.map(book => (
                    <div key={book.id} className="flex space-x-4 p-4 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                      <img
                        src={book.coverImage}
                        alt={book.title}
                        className="w-16 h-20 object-cover rounded"
                      />
                      <div className="flex-1">
                        <h4 className="font-semibold text-slate-800 dark:text-slate-100">{book.title}</h4>
                        <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">{book.author}</p>
                        <p className="text-xs text-purple-600 dark:text-purple-400 mb-2">{book.reason}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-1">
                            <TrendingUp className="h-3 w-3 text-green-500" />
                            <span className="text-xs text-slate-500">{book.confidence}% match</span>
                          </div>
                          <Button size="sm" variant="outline">Add to Wishlist</Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Notifications */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Bell className="h-5 w-5 mr-2" />
                  Recent Notifications
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {notifications.slice(0, 3).map(notification => (
                    <div key={notification.id} className={`flex items-start space-x-3 p-3 rounded-lg ${
                      notification.read ? 'bg-slate-50 dark:bg-slate-800/50' : 'bg-blue-50 dark:bg-blue-900/20'
                    }`}>
                      <div className={`p-2 rounded-full ${
                        notification.type === 'due' ? 'bg-orange-100 dark:bg-orange-900/20' : 'bg-green-100 dark:bg-green-900/20'
                      }`}>
                        {notification.type === 'due' ? (
                          <Clock className="h-4 w-4 text-orange-600" />
                        ) : (
                          <CheckCircle className="h-4 w-4 text-green-600" />
                        )}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-slate-800 dark:text-slate-100">{notification.title}</h4>
                        <p className="text-sm text-slate-600 dark:text-slate-400">{notification.message}</p>
                        <p className="text-xs text-slate-500 mt-1">{notification.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Browse Books Tab */}
          <TabsContent value="browse">
            <BookBrowsing />
          </TabsContent>

          {/* My Books Tab */}
          <TabsContent value="mybooks" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BookmarkCheck className="h-5 w-5 mr-2" />
                  Currently Borrowed Books
                </CardTitle>
                <CardDescription>Manage your borrowed books and due dates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {borrowedBooks.map(book => {
                    const daysUntilDue = getDaysUntilDue(book.dueDate);
                    const isOverdue = daysUntilDue < 0;
                    const isDueSoon = daysUntilDue <= 3 && daysUntilDue >= 0;

                    return (
                      <div key={book.id} className="flex items-center space-x-4 p-4 border border-slate-200 dark:border-slate-700 rounded-lg">
                        <img
                          src={book.coverImage}
                          alt={book.title}
                          className="w-16 h-20 object-cover rounded"
                        />
                        <div className="flex-1">
                          <h3 className="font-semibold text-slate-800 dark:text-slate-100">{book.title}</h3>
                          <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">{book.author}</p>
                          <div className="flex items-center space-x-4 text-sm">
                            <div className="flex items-center space-x-1">
                              <Calendar className="h-4 w-4" />
                              <span>Due: {book.dueDate}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <RefreshCw className="h-4 w-4" />
                              <span>Renewals: {book.renewals}/{book.maxRenewals}</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          {isOverdue ? (
                            <Badge variant="destructive" className="mb-2">
                              <AlertTriangle className="h-3 w-3 mr-1" />
                              Overdue
                            </Badge>
                          ) : isDueSoon ? (
                            <Badge className="bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400 mb-2">
                              <Timer className="h-3 w-3 mr-1" />
                              Due Soon
                            </Badge>
                          ) : (
                            <Badge variant="outline" className="mb-2">
                              <CheckCircle className="h-3 w-3 mr-1" />
                              On Time
                            </Badge>
                          )}
                          <div className="space-x-2">
                            <Button size="sm" variant="outline" disabled={book.renewals >= book.maxRenewals}>
                              Renew
                            </Button>
                            <Button size="sm">Return</Button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Wishlist Tab */}
          <TabsContent value="wishlist" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Heart className="h-5 w-5 mr-2 text-pink-500" />
                  My Wishlist
                </CardTitle>
                <CardDescription>Books you want to read later</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {wishlist.map(book => (
                    <div key={book.id} className="border border-slate-200 dark:border-slate-700 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <img
                        src={book.coverImage}
                        alt={book.title}
                        className="w-full h-40 object-cover rounded mb-3"
                      />
                      <h3 className="font-semibold text-slate-800 dark:text-slate-100 mb-1">{book.title}</h3>
                      <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">{book.author}</p>
                      <div className="flex items-center justify-between">
                        {book.available ? (
                          <Badge className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">
                            Available
                          </Badge>
                        ) : (
                          <Badge variant="outline">Not Available</Badge>
                        )}
                        <div className="space-x-1">
                          <Button size="sm" variant="outline">
                            <Heart className="h-3 w-3 text-pink-500 fill-current" />
                          </Button>
                          {book.available && (
                            <Button size="sm">Borrow</Button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Profile Tab */}
          <TabsContent value="profile">
            <BorrowerProfile studentData={studentData} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default BorrowerDashboard;