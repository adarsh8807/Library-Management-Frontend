import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  BookOpen, 
  Users, 
  TrendingUp, 
  AlertTriangle, 
  DollarSign,
  LogOut,
  Moon,
  Sun,
  Bell,
  Settings,
  BarChart3,
  PieChart,
  Activity
} from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useToast } from '../hooks/use-toast';
import { mockAnalyticsEnhanced } from '../mockDataEnhanced';
import EnhancedBorrowerManagement from './EnhancedBorrowerManagement';
import AdvancedAnalytics from './AdvancedAnalytics';
import EnhancedBookManagement from './EnhancedBookManagement';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const { toast } = useToast();

  const handleLogout = () => {
    localStorage.removeItem('userRole');
    localStorage.removeItem('isAuthenticated');
    toast({
      title: "Logged out successfully",
      description: "See you again soon!",
    });
    navigate('/admin');
  };

  const AnalyticsCard = ({ title, value, icon: Icon, trend, color = "blue", subtitle }) => (
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
            {subtitle && (
              <p className="text-xs text-slate-500 mt-1">{subtitle}</p>
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
                    Library Admin Pro
                  </h1>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Advanced Management Dashboard
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
              <Button variant="outline" size="icon">
                <Settings className="h-4 w-4" />
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
        {/* Enhanced Analytics Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 mb-8">
          <AnalyticsCard
            title="Total Books"
            value={mockAnalyticsEnhanced.totalBooks}
            subtitle="In collection"
            icon={BookOpen}
            trend={5}
            color="blue"
          />
          <AnalyticsCard
            title="Borrowed Books"
            value={mockAnalyticsEnhanced.borrowedBooks}
            subtitle="Currently out"
            icon={TrendingUp}
            trend={12}
            color="green"
          />
          <AnalyticsCard
            title="Active Borrowers"
            value={mockAnalyticsEnhanced.activeBorrowers}
            subtitle="This month"
            icon={Users}
            trend={8}
            color="purple"
          />
          <AnalyticsCard
            title="Overdue Books"
            value={mockAnalyticsEnhanced.overdueBooks}
            subtitle="Need attention"
            icon={AlertTriangle}
            color="red"
          />
          <AnalyticsCard
            title="Fines Collected"
            value={`₹${mockAnalyticsEnhanced.finesCollected.toLocaleString()}`}
            subtitle="This month"
            icon={DollarSign}
            trend={-15}
            color="yellow"
          />
          <AnalyticsCard
            title="New Members"
            value={mockAnalyticsEnhanced.newMembersThisMonth}
            subtitle="This month"
            icon={Users}
            trend={25}
            color="indigo"
          />
        </div>

        {/* Enhanced Main Content */}
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
              Advanced Analytics
            </TabsTrigger>
          </TabsList>

          {/* Enhanced Books Tab */}
          <TabsContent value="books">
            <EnhancedBookManagement />
          </TabsContent>

          {/* Enhanced Borrowers Tab */}
          <TabsContent value="borrowers">
            <EnhancedBorrowerManagement />
          </TabsContent>

          {/* Enhanced Analytics Tab */}
          <TabsContent value="analytics">
            <AdvancedAnalytics />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;