import React, { useState, useMemo } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { 
  User, 
  Search, 
  Filter, 
  MoreHorizontal, 
  Eye, 
  Edit, 
  Trash2, 
  AlertTriangle, 
  Clock, 
  DollarSign,
  Mail,
  Phone,
  Ban,
  CheckCircle,
  RefreshCw,
  Bell,
  Calendar,
  BookOpen,
  TrendingUp,
  Users
} from 'lucide-react';
import { mockBorrowersEnhanced } from '../mockDataEnhanced';
import { useToast } from '../hooks/use-toast';

const EnhancedBorrowerManagement = () => {
  const [borrowers, setBorrowers] = useState(mockBorrowersEnhanced);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [membershipFilter, setMembershipFilter] = useState('all');
  const [selectedBorrower, setSelectedBorrower] = useState(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { toast } = useToast();

  // Filter borrowers
  const filteredBorrowers = useMemo(() => {
    return borrowers.filter(borrower => {
      const matchesSearch = borrower.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           borrower.studentId.includes(searchTerm) ||
                           borrower.email.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'all' || borrower.status.toLowerCase() === statusFilter;
      const matchesMembership = membershipFilter === 'all' || borrower.membership.toLowerCase() === membershipFilter;
      return matchesSearch && matchesStatus && matchesMembership;
    });
  }, [borrowers, searchTerm, statusFilter, membershipFilter]);

  // Get borrower stats
  const borrowerStats = useMemo(() => {
    const active = borrowers.filter(b => b.status === 'Active').length;
    const inactive = borrowers.filter(b => b.status === 'Inactive').length;
    const suspended = borrowers.filter(b => b.status === 'Suspended').length;
    const premium = borrowers.filter(b => b.membership === 'Premium').length;
    const totalFines = borrowers.reduce((sum, b) => sum + b.fines, 0);
    const totalOverdue = borrowers.reduce((sum, b) => sum + b.overdueCount, 0);

    return { active, inactive, suspended, premium, totalFines, totalOverdue };
  }, [borrowers]);

  const handleQuickAction = (action, borrowerId) => {
    const borrower = borrowers.find(b => b.id === borrowerId);
    
    switch (action) {
      case 'renewal':
        toast({
          title: "Renewal Request Sent",
          description: `Sent renewal reminder to ${borrower.name}`,
        });
        break;
      case 'reminder':
        toast({
          title: "Reminder Sent",
          description: `Sent return reminder to ${borrower.name}`,
        });
        break;
      case 'suspend':
        setBorrowers(prev => prev.map(b => 
          b.id === borrowerId ? { ...b, status: 'Suspended', maxBooksAllowed: 0 } : b
        ));
        toast({
          title: "Account Suspended",
          description: `${borrower.name}'s account has been suspended`,
          variant: "destructive"
        });
        break;
      case 'activate':
        setBorrowers(prev => prev.map(b => 
          b.id === borrowerId ? { ...b, status: 'Active', maxBooksAllowed: 3 } : b
        ));
        toast({
          title: "Account Activated",
          description: `${borrower.name}'s account has been activated`,
        });
        break;
      case 'waive_fine':
        setBorrowers(prev => prev.map(b => 
          b.id === borrowerId ? { ...b, fines: 0 } : b
        ));
        toast({
          title: "Fine Waived",
          description: `Waived fine for ${borrower.name}`,
        });
        break;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'Inactive': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'Suspended': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const getMembershipColor = (membership) => {
    switch (membership) {
      case 'Premium': return 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400';
      case 'Standard': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const StatsCard = ({ title, value, icon: Icon, color, subtitle }) => (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-slate-600 dark:text-slate-400">{title}</p>
            <p className="text-2xl font-bold text-slate-800 dark:text-slate-100">{value}</p>
            {subtitle && <p className="text-xs text-slate-500 mt-1">{subtitle}</p>}
          </div>
          <div className={`p-2 rounded-full ${color}`}>
            <Icon className="h-4 w-4 text-white" />
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <StatsCard
          title="Active Members"
          value={borrowerStats.active}
          icon={Users}
          color="bg-green-500"
        />
        <StatsCard
          title="Inactive"
          value={borrowerStats.inactive}
          icon={Clock}
          color="bg-yellow-500"
        />
        <StatsCard
          title="Suspended"
          value={borrowerStats.suspended}
          icon={Ban}
          color="bg-red-500"
        />
        <StatsCard
          title="Premium"
          value={borrowerStats.premium}
          icon={CheckCircle}
          color="bg-purple-500"
        />
        <StatsCard
          title="Total Fines"
          value={`₹${borrowerStats.totalFines}`}
          icon={DollarSign}
          color="bg-orange-500"
        />
        <StatsCard
          title="Overdue Items"
          value={borrowerStats.totalOverdue}
          icon={AlertTriangle}
          color="bg-red-500"
        />
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center">
                <Users className="h-5 w-5 mr-2" />
                Borrower Management
              </CardTitle>
              <CardDescription>Manage library members and their activities</CardDescription>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Mail className="h-4 w-4 mr-2" />
                Bulk Email
              </Button>
              <Button variant="outline" size="sm">
                <RefreshCw className="h-4 w-4 mr-2" />
                Sync Data
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
              <Input
                placeholder="Search by name, ID, or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-40">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="suspended">Suspended</SelectItem>
              </SelectContent>
            </Select>
            <Select value={membershipFilter} onValueChange={setMembershipFilter}>
              <SelectTrigger className="w-full md:w-40">
                <SelectValue placeholder="Membership" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="standard">Standard</SelectItem>
                <SelectItem value="premium">Premium</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Borrowers List */}
          <div className="space-y-4">
            {filteredBorrowers.map(borrower => (
              <div key={borrower.id} className="flex items-center justify-between p-4 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-lg">
                      {borrower.name.charAt(0)}
                    </div>
                    {borrower.overdueCount > 0 && (
                      <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                        <AlertTriangle className="h-3 w-3 text-white" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="font-semibold text-slate-800 dark:text-slate-100">
                        {borrower.name}
                      </h3>
                      <Badge className={getStatusColor(borrower.status)}>
                        {borrower.status}
                      </Badge>
                      <Badge className={getMembershipColor(borrower.membership)}>
                        {borrower.membership}
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-slate-600 dark:text-slate-400">
                      <span>{borrower.studentId}</span>
                      <span>•</span>
                      <span>{borrower.department}</span>
                      <span>•</span>
                      <span>{borrower.year}</span>
                      <span>•</span>
                      <span>{borrower.email}</span>
                    </div>
                    <div className="flex items-center space-x-4 text-xs text-slate-500 mt-1">
                      <span className="flex items-center">
                        <BookOpen className="h-3 w-3 mr-1" />
                        {borrower.currentlyBorrowed}/{borrower.maxBooksAllowed} books
                      </span>
                      <span className="flex items-center">
                        <TrendingUp className="h-3 w-3 mr-1" />
                        {borrower.totalBorrowed} total
                      </span>
                      {borrower.fines > 0 && (
                        <span className="flex items-center text-red-600">
                          <DollarSign className="h-3 w-3 mr-1" />
                          ₹{borrower.fines} fine
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="flex items-center space-x-2">
                  {borrower.currentlyBorrowed > 0 && (
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleQuickAction('renewal', borrower.id)}
                    >
                      <RefreshCw className="h-3 w-3 mr-1" />
                      Renew
                    </Button>
                  )}
                  {borrower.overdueCount > 0 && (
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleQuickAction('reminder', borrower.id)}
                    >
                      <Bell className="h-3 w-3 mr-1" />
                      Remind
                    </Button>
                  )}
                  {borrower.fines > 0 && (
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleQuickAction('waive_fine', borrower.id)}
                    >
                      <DollarSign className="h-3 w-3 mr-1" />
                      Waive
                    </Button>
                  )}
                  {borrower.status === 'Active' ? (
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleQuickAction('suspend', borrower.id)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                    >
                      <Ban className="h-3 w-3 mr-1" />
                      Suspend
                    </Button>
                  ) : borrower.status === 'Suspended' && (
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleQuickAction('activate', borrower.id)}
                      className="text-green-600 hover:text-green-700 hover:bg-green-50 dark:hover:bg-green-900/20"
                    >
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Activate
                    </Button>
                  )}
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => {
                      setSelectedBorrower(borrower);
                      setIsProfileOpen(true);
                    }}
                  >
                    <Eye className="h-3 w-3 mr-1" />
                    View
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Borrower Profile Dialog */}
      <Dialog open={isProfileOpen} onOpenChange={setIsProfileOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <User className="h-5 w-5 mr-2" />
              {selectedBorrower?.name} - Profile Details
            </DialogTitle>
            <DialogDescription>
              Complete borrower information and activity history
            </DialogDescription>
          </DialogHeader>
          {selectedBorrower && (
            <div className="space-y-6">
              {/* Basic Info */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-slate-600 dark:text-slate-400">Student ID</label>
                  <p className="text-slate-800 dark:text-slate-100">{selectedBorrower.studentId}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-600 dark:text-slate-400">Department</label>
                  <p className="text-slate-800 dark:text-slate-100">{selectedBorrower.department}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-600 dark:text-slate-400">Email</label>
                  <p className="text-slate-800 dark:text-slate-100">{selectedBorrower.email}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-600 dark:text-slate-400">Phone</label>
                  <p className="text-slate-800 dark:text-slate-100">{selectedBorrower.phone}</p>
                </div>
              </div>

              {/* Borrowing History */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Borrowing History</h3>
                <div className="space-y-2">
                  {selectedBorrower.borrowingHistory.map(record => (
                    <div key={record.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">{record.bookTitle}</p>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                          Borrowed: {record.borrowedDate} | Due: {record.dueDate}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant={record.status === 'overdue' ? 'destructive' : 'default'}>
                          {record.status}
                        </Badge>
                        {record.fine > 0 && (
                          <Badge variant="destructive">₹{record.fine}</Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EnhancedBorrowerManagement;