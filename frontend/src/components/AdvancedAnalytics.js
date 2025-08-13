import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { 
  BarChart3, 
  PieChart, 
  TrendingUp, 
  Calendar, 
  Download, 
  Filter,
  Activity,
  Users,
  BookOpen,
  DollarSign,
  AlertTriangle,
  Target,
  Zap,
  Brain,
  Eye
} from 'lucide-react';
import { mockAnalyticsEnhanced } from '../mockDataEnhanced';

const AdvancedAnalytics = () => {
  const [dateRange, setDateRange] = useState('6months');
  const [selectedMetric, setSelectedMetric] = useState('borrowing');
  const analytics = mockAnalyticsEnhanced;

  const MetricCard = ({ title, value, change, icon: Icon, color, trend }) => (
    <Card className="relative overflow-hidden">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">{title}</p>
            <p className="text-2xl font-bold text-slate-800 dark:text-slate-100">{value}</p>
            {change && (
              <div className="flex items-center mt-1">
                <TrendingUp className={`h-3 w-3 mr-1 ${trend === 'up' ? 'text-green-600' : 'text-red-600'}`} />
                <span className={`text-sm ${trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                  {change}% vs last period
                </span>
              </div>
            )}
          </div>
          <div className={`p-3 rounded-full ${color}`}>
            <Icon className="h-5 w-5 text-white" />
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const ChartPlaceholder = ({ title, type, height = "h-64" }) => (
    <div className={`${height} flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-800 rounded-lg border-2 border-dashed border-slate-300 dark:border-slate-600`}>
      <div className="text-center">
        {type === 'bar' && <BarChart3 className="h-12 w-12 text-slate-400 mx-auto mb-2" />}
        {type === 'pie' && <PieChart className="h-12 w-12 text-slate-400 mx-auto mb-2" />}
        {type === 'activity' && <Activity className="h-12 w-12 text-slate-400 mx-auto mb-2" />}
        <p className="text-slate-600 dark:text-slate-400 font-medium">{title}</p>
        <p className="text-sm text-slate-500 mt-1">Interactive chart would render here</p>
      </div>
    </div>
  );

  const HeatmapCell = ({ day, hour, activity }) => {
    const intensity = Math.min(activity / 60, 1); // Normalize to 0-1
    const opacity = 0.1 + (intensity * 0.9);
    
    return (
      <div
        className="w-8 h-6 rounded-sm flex items-center justify-center text-xs font-medium transition-all hover:scale-110 cursor-pointer"
        style={{
          backgroundColor: `rgba(59, 130, 246, ${opacity})`,
          color: intensity > 0.5 ? 'white' : '#1e293b'
        }}
        title={`${day} ${hour}:00 - ${activity} activities`}
      >
        {activity}
      </div>
    );
  };

  const PredictiveInsightCard = ({ insight }) => {
    const getImpactColor = (impact) => {
      switch (impact) {
        case 'high': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
        case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
        case 'low': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
        default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
      }
    };

    const getTypeIcon = (type) => {
      switch (type) {
        case 'demand_forecast': return Target;
        case 'inventory_alert': return AlertTriangle;
        case 'borrower_behavior': return Users;
        default: return Brain;
      }
    };

    const Icon = getTypeIcon(insight.type);

    return (
      <Card className="hover:shadow-md transition-shadow">
        <CardContent className="p-4">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                <Icon className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h4 className="font-semibold text-slate-800 dark:text-slate-100">{insight.title}</h4>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">{insight.description}</p>
              </div>
            </div>
            <Badge className={getImpactColor(insight.impact)}>
              {insight.impact} impact
            </Badge>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-slate-600 dark:text-slate-400">Confidence:</span>
              <div className="flex items-center space-x-1">
                <div className="w-20 h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"
                    style={{ width: `${insight.confidence}%` }}
                  />
                </div>
                <span className="text-sm font-medium text-slate-800 dark:text-slate-100">
                  {insight.confidence}%
                </span>
              </div>
            </div>
            <Button variant="outline" size="sm">
              <Eye className="h-3 w-3 mr-1" />
              Details
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-6">
      {/* Controls */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center">
                <BarChart3 className="h-5 w-5 mr-2" />
                Advanced Analytics Dashboard
              </CardTitle>
              <CardDescription>Comprehensive insights and predictive analytics</CardDescription>
            </div>
            <div className="flex gap-2">
              <Select value={dateRange} onValueChange={setDateRange}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1month">Last Month</SelectItem>
                  <SelectItem value="3months">Last 3 Months</SelectItem>
                  <SelectItem value="6months">Last 6 Months</SelectItem>
                  <SelectItem value="1year">Last Year</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Total Books"
          value={analytics.totalBooks}
          change={12}
          icon={BookOpen}
          color="bg-blue-500"
          trend="up"
        />
        <MetricCard
          title="Active Borrowers"
          value={analytics.activeBorrowers}
          change={8}
          icon={Users}
          color="bg-green-500"
          trend="up"
        />
        <MetricCard
          title="Avg Books/Borrower"
          value={analytics.avgBooksPerBorrower}
          change={-3}
          icon={TrendingUp}
          color="bg-purple-500"
          trend="down"
        />
        <MetricCard
          title="Fines Collected"
          value={`₹${analytics.finesCollected}`}
          change={-15}
          icon={DollarSign}
          color="bg-orange-500"
          trend="down"
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Trends */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart3 className="h-4 w-4 mr-2" />
              Monthly Borrowing Trends
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ChartPlaceholder title="Interactive Bar Chart" type="bar" />
            <div className="mt-4 grid grid-cols-4 gap-4 text-sm">
              <div className="text-center">
                <p className="font-semibold text-blue-600">Borrowed</p>
                <p className="text-slate-600">298 books</p>
              </div>
              <div className="text-center">
                <p className="font-semibold text-green-600">Returned</p>
                <p className="text-slate-600">285 books</p>
              </div>
              <div className="text-center">
                <p className="font-semibold text-purple-600">New Members</p>
                <p className="text-slate-600">61 joined</p>
              </div>
              <div className="text-center">
                <p className="font-semibold text-orange-600">Fines</p>
                <p className="text-slate-600">₹6,450</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Category Demand */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <PieChart className="h-4 w-4 mr-2" />
              Category Demand Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ChartPlaceholder title="Interactive Pie Chart" type="pie" />
            <div className="mt-4 space-y-2">
              {analytics.categoryDemand.slice(0, 4).map((item, index) => (
                <div key={item.category} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className={`w-3 h-3 rounded-full bg-blue-${500 + index * 100}`}></div>
                    <span className="text-sm font-medium">{item.category}</span>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold">{item.borrowed}</p>
                    <p className="text-xs text-slate-500">{item.demand}% demand</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Activity Heatmap */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Activity className="h-4 w-4 mr-2" />
            Borrower Activity Heatmap
          </CardTitle>
          <CardDescription>Library usage patterns by day and hour</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <span className="text-sm font-medium">Peak Hours:</span>
                <Badge>10 AM - 11 AM</Badge>
                <Badge>2 PM - 3 PM</Badge>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <span>Low</span>
                <div className="flex space-x-1">
                  {[0.1, 0.3, 0.5, 0.7, 0.9].map((opacity, i) => (
                    <div
                      key={i}
                      className="w-4 h-4 rounded-sm"
                      style={{ backgroundColor: `rgba(59, 130, 246, ${opacity})` }}
                    />
                  ))}
                </div>
                <span>High</span>
              </div>
            </div>
            <div className="overflow-x-auto">
              <div className="grid grid-cols-5 gap-2">
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map(day => (
                  <div key={day} className="space-y-1">
                    <div className="text-xs font-medium text-center text-slate-600 dark:text-slate-400 mb-2">
                      {day}
                    </div>
                    {[9, 10, 11, 14, 15].map(hour => {
                      const activityData = analytics.borrowerActivityHeatmap.find(
                        item => item.day === day && item.hour === hour
                      );
                      return (
                        <HeatmapCell
                          key={`${day}-${hour}`}
                          day={day}
                          hour={hour}
                          activity={activityData?.activity || 0}
                        />
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Predictive Analytics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Brain className="h-4 w-4 mr-2" />
            Predictive Insights & AI Recommendations
          </CardTitle>
          <CardDescription>AI-powered analytics and future predictions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {analytics.predictiveInsights.map((insight, index) => (
              <PredictiveInsightCard key={index} insight={insight} />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdvancedAnalytics;