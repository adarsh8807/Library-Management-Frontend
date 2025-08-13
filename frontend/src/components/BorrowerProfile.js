import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  User, 
  Mail, 
  Phone, 
  GraduationCap, 
  Calendar, 
  Edit, 
  Save, 
  Upload,
  BookOpen,
  Clock,
  TrendingUp,
  Award,
  Settings,
  Bell,
  Shield,
  Key,
  Eye,
  EyeOff,
  Camera,
  Download,
  History
} from 'lucide-react';
import { departments, years, semesters } from '../mockDataEnhanced';
import { useToast } from '../hooks/use-toast';

const BorrowerProfile = ({ studentData }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: 'Arjun Sharma',
    email: studentData.email || 'arjun.sharma@college.edu',
    phone: studentData.phone || '+91 9876543210',
    department: studentData.department || 'BSC-IT',
    year: studentData.year || '3rd',
    semester: studentData.semester || 'Sem 5',
    studentId: studentData.studentId || '2021001',
    joinedDate: '2021-07-01',
    avatar: null
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  });
  const [notificationSettings, setNotificationSettings] = useState({
    dueReminders: true,
    bookAvailable: true,
    fineAlerts: true,
    newsletter: false,
    emailNotifications: true,
    smsNotifications: false
  });

  const { toast } = useToast();

  // Mock borrowing statistics
  const borrowingStats = {
    totalBorrowed: 25,
    currentlyBorrowed: 2,
    overdueBooks: 0,
    totalFines: 0,
    favoriteCategory: 'Computer Science',
    averageRating: 4.2,
    readingStreak: 15,
    booksThisMonth: 3
  };

  // Mock borrowing history
  const borrowingHistory = [
    {
      id: 1,
      title: 'Clean Code',
      author: 'Robert C. Martin',
      borrowedDate: '2024-01-05',
      returnedDate: '2024-01-19',
      status: 'returned',
      rating: 5
    },
    {
      id: 2,
      title: 'Introduction to Algorithms',
      author: 'Thomas H. Cormen',
      borrowedDate: '2024-01-10',
      returnedDate: null,
      status: 'borrowed',
      rating: null
    },
    {
      id: 3,
      title: 'Python Crash Course',
      author: 'Eric Matthes',
      borrowedDate: '2023-12-15',
      returnedDate: '2023-12-29',
      status: 'returned',
      rating: 4
    }
  ];

  const handleProfileUpdate = () => {
    if (isEditing) {
      // Save changes
      toast({
        title: "Profile Updated",
        description: "Your profile information has been saved successfully.",
      });
    }
    setIsEditing(!isEditing);
  };

  const handlePasswordChange = () => {
    if (!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword) {
      toast({
        title: "Validation Error",
        description: "Please fill in all password fields.",
        variant: "destructive"
      });
      return;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast({
        title: "Password Mismatch",
        description: "New password and confirmation don't match.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Password Changed",
      description: "Your password has been updated successfully.",
    });

    setPasswordData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
  };

  const handleAvatarUpload = () => {
    toast({
      title: "Avatar Updated",
      description: "Your profile picture has been updated.",
    });
  };

  const handleNotificationChange = (setting, value) => {
    setNotificationSettings(prev => ({
      ...prev,
      [setting]: value
    }));
    
    toast({
      title: "Settings Updated",
      description: "Your notification preferences have been saved.",
    });
  };

  const exportData = () => {
    toast({
      title: "Export Started",
      description: "Your borrowing history is being prepared for download.",
    });
  };

  const StatCard = ({ title, value, icon: Icon, color, subtitle }) => (
    <Card>
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
    <div className="space-y-6">
      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="bg-white dark:bg-slate-800 p-1 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700">
          <TabsTrigger value="profile" className="data-[state=active]:bg-indigo-600 data-[state=active]:text-white">
            <User className="h-4 w-4 mr-2" />
            Profile
          </TabsTrigger>
          <TabsTrigger value="statistics" className="data-[state=active]:bg-indigo-600 data-[state=active]:text-white">
            <TrendingUp className="h-4 w-4 mr-2" />
            Statistics
          </TabsTrigger>
          <TabsTrigger value="history" className="data-[state=active]:bg-indigo-600 data-[state=active]:text-white">
            <History className="h-4 w-4 mr-2" />
            History
          </TabsTrigger>
          <TabsTrigger value="settings" className="data-[state=active]:bg-indigo-600 data-[state=active]:text-white">
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </TabsTrigger>
        </TabsList>

        {/* Profile Tab */}
        <TabsContent value="profile" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center">
                    <User className="h-5 w-5 mr-2" />
                    Profile Information
                  </CardTitle>
                  <CardDescription>Manage your personal information and preferences</CardDescription>
                </div>
                <Button onClick={handleProfileUpdate}>
                  {isEditing ? (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      Save Changes
                    </>
                  ) : (
                    <>
                      <Edit className="h-4 w-4 mr-2" />
                      Edit Profile
                    </>
                  )}
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Avatar Section */}
                <div className="flex items-center space-x-4">
                  <Avatar className="w-20 h-20">
                    <AvatarImage src={profileData.avatar} />
                    <AvatarFallback className="text-2xl bg-indigo-100 text-indigo-600 dark:bg-indigo-900 dark:text-indigo-400">
                      {profileData.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100">{profileData.name}</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">{profileData.studentId}</p>
                    <Button variant="outline" size="sm" className="mt-2" onClick={handleAvatarUpload}>
                      <Camera className="h-4 w-4 mr-2" />
                      Change Photo
                    </Button>
                  </div>
                </div>

                {/* Personal Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={profileData.name}
                      onChange={(e) => setProfileData(prev => ({ ...prev, name: e.target.value }))}
                      disabled={!isEditing}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="studentId">Student ID</Label>
                    <Input
                      id="studentId"
                      value={profileData.studentId}
                      disabled
                      className="mt-1 bg-slate-50 dark:bg-slate-800"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={profileData.email}
                      onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
                      disabled={!isEditing}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      value={profileData.phone}
                      onChange={(e) => setProfileData(prev => ({ ...prev, phone: e.target.value }))}
                      disabled={!isEditing}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label>Department</Label>
                    <Select 
                      value={profileData.department} 
                      onValueChange={(value) => setProfileData(prev => ({ ...prev, department: value }))}
                      disabled={!isEditing}
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {departments.map(dept => (
                          <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Year</Label>
                    <Select 
                      value={profileData.year} 
                      onValueChange={(value) => setProfileData(prev => ({ ...prev, year: value }))}
                      disabled={!isEditing}
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {years.map(year => (
                          <SelectItem key={year} value={year}>{year}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Semester</Label>
                    <Select 
                      value={profileData.semester} 
                      onValueChange={(value) => setProfileData(prev => ({ ...prev, semester: value }))}
                      disabled={!isEditing}
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {semesters.map(sem => (
                          <SelectItem key={sem} value={sem}>{sem}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Member Since</Label>
                    <Input
                      value={new Date(profileData.joinedDate).toLocaleDateString()}
                      disabled
                      className="mt-1 bg-slate-50 dark:bg-slate-800"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Statistics Tab */}
        <TabsContent value="statistics" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
              title="Total Borrowed"
              value={borrowingStats.totalBorrowed}
              subtitle="All time"
              icon={BookOpen}
              color="bg-blue-500"
            />
            <StatCard
              title="Currently Reading"
              value={borrowingStats.currentlyBorrowed}
              subtitle="Active books"
              icon={Clock}
              color="bg-green-500"
            />
            <StatCard
              title="Reading Streak"
              value={`${borrowingStats.readingStreak} days`}
              subtitle="Keep it up!"
              icon={Award}
              color="bg-purple-500"
            />
            <StatCard
              title="Average Rating"
              value={borrowingStats.averageRating}
              subtitle="Given to books"
              icon={TrendingUp}
              color="bg-orange-500"
            />
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Reading Insights</CardTitle>
              <CardDescription>Your reading patterns and preferences</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-slate-800 dark:text-slate-100 mb-2">Favorite Category</h4>
                  <p className="text-lg text-indigo-600 dark:text-indigo-400">{borrowingStats.favoriteCategory}</p>
                </div>
                <div>
                  <h4 className="font-medium text-slate-800 dark:text-slate-100 mb-2">Books This Month</h4>
                  <p className="text-lg text-green-600 dark:text-green-400">{borrowingStats.booksThisMonth}</p>
                </div>
                <div>
                  <h4 className="font-medium text-slate-800 dark:text-slate-100 mb-2">Total Fines</h4>
                  <p className="text-lg text-slate-600 dark:text-slate-400">₹{borrowingStats.totalFines}</p>
                </div>
                <div>
                  <h4 className="font-medium text-slate-800 dark:text-slate-100 mb-2">Overdue Books</h4>
                  <p className="text-lg text-slate-600 dark:text-slate-400">{borrowingStats.overdueBooks}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* History Tab */}
        <TabsContent value="history" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center">
                    <History className="h-5 w-5 mr-2" />
                    Borrowing History
                  </CardTitle>
                  <CardDescription>Complete record of your book borrowing activity</CardDescription>
                </div>
                <Button variant="outline" onClick={exportData}>
                  <Download className="h-4 w-4 mr-2" />
                  Export Data
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {borrowingHistory.map(record => (
                  <div key={record.id} className="flex items-center justify-between p-4 border border-slate-200 dark:border-slate-700 rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-semibold text-slate-800 dark:text-slate-100">{record.title}</h4>
                      <p className="text-sm text-slate-600 dark:text-slate-400">{record.author}</p>
                      <div className="flex items-center space-x-4 text-xs text-slate-500 mt-1">
                        <span>Borrowed: {record.borrowedDate}</span>
                        {record.returnedDate && <span>Returned: {record.returnedDate}</span>}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant={record.status === 'returned' ? 'default' : 'outline'}>
                        {record.status}
                      </Badge>
                      {record.rating && (
                        <div className="flex items-center space-x-1">
                          {[...Array(5)].map((_, i) => (
                            <span key={i} className={`text-xs ${i < record.rating ? 'text-yellow-500' : 'text-slate-300'}`}>
                              ★
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Settings Tab */}
        <TabsContent value="settings" className="space-y-6">
          {/* Password Change */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Key className="h-5 w-5 mr-2" />
                Change Password
              </CardTitle>
              <CardDescription>Update your account password for security</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 max-w-md">
                <div>
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <div className="relative">
                    <Input
                      id="currentPassword"
                      type={showPasswords.current ? 'text' : 'password'}
                      value={passwordData.currentPassword}
                      onChange={(e) => setPasswordData(prev => ({ ...prev, currentPassword: e.target.value }))}
                      className="mt-1 pr-10"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
                      onClick={() => setShowPasswords(prev => ({ ...prev, current: !prev.current }))}
                    >
                      {showPasswords.current ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
                <div>
                  <Label htmlFor="newPassword">New Password</Label>
                  <div className="relative">
                    <Input
                      id="newPassword"
                      type={showPasswords.new ? 'text' : 'password'}
                      value={passwordData.newPassword}
                      onChange={(e) => setPasswordData(prev => ({ ...prev, newPassword: e.target.value }))}
                      className="mt-1 pr-10"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
                      onClick={() => setShowPasswords(prev => ({ ...prev, new: !prev.new }))}
                    >
                      {showPasswords.new ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
                <div>
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      type={showPasswords.confirm ? 'text' : 'password'}
                      value={passwordData.confirmPassword}
                      onChange={(e) => setPasswordData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                      className="mt-1 pr-10"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
                      onClick={() => setShowPasswords(prev => ({ ...prev, confirm: !prev.confirm }))}
                    >
                      {showPasswords.confirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
                <Button onClick={handlePasswordChange}>Update Password</Button>
              </div>
            </CardContent>
          </Card>

          {/* Notification Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Bell className="h-5 w-5 mr-2" />
                Notification Preferences
              </CardTitle>
              <CardDescription>Manage how you receive notifications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Object.entries({
                  dueReminders: 'Due date reminders',
                  bookAvailable: 'Book availability alerts',
                  fineAlerts: 'Fine and overdue notifications',
                  newsletter: 'Library newsletter',
                  emailNotifications: 'Email notifications',
                  smsNotifications: 'SMS notifications'
                }).map(([key, label]) => (
                  <div key={key} className="flex items-center justify-between">
                    <Label htmlFor={key}>{label}</Label>
                    <input
                      id={key}
                      type="checkbox"
                      checked={notificationSettings[key]}
                      onChange={(e) => handleNotificationChange(key, e.target.checked)}
                      className="w-4 h-4 text-indigo-600 bg-gray-100 border-gray-300 rounded focus:ring-indigo-500"
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BorrowerProfile;