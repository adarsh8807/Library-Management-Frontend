import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Checkbox } from './ui/checkbox';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Eye, EyeOff, User, Phone, Mail, GraduationCap, Moon, Sun, AlertCircle, CheckCircle2, UserPlus } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useToast } from '../hooks/use-toast';
import { departments, years, semesters } from '../mockDataEnhanced';

const BorrowerLogin = () => {
  const [activeTab, setActiveTab] = useState('login');
  const [loginData, setLoginData] = useState({
    studentId: '',
    password: '',
    rememberMe: false
  });
  const [registerData, setRegisterData] = useState({
    name: '',
    studentId: '',
    password: '',
    confirmPassword: '',
    department: '',
    year: '',
    semester: '',
    phone: '',
    email: '',
    acceptTerms: false
  });
  const [showPassword, setShowPassword] = useState({
    login: false,
    register: false,
    confirm: false
  });
  const [isLoading, setIsLoading] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const { toast } = useToast();

  const validateStudentId = (id) => {
    const regex = /^\d{7}$/;
    return regex.test(id);
  };

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const calculatePasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength += 25;
    if (/[A-Z]/.test(password)) strength += 25;
    if (/[0-9]/.test(password)) strength += 25;
    if (/[^A-Za-z0-9]/.test(password)) strength += 25;
    return strength;
  };

  const handleInputChange = (type, field, value) => {
    if (type === 'login') {
      setLoginData(prev => ({
        ...prev,
        [field]: value
      }));
    } else {
      setRegisterData(prev => ({
        ...prev,
        [field]: value
      }));
    }

    // Real-time validation
    const errors = { ...validationErrors };
    
    switch (field) {
      case 'studentId':
        if (value && !validateStudentId(value)) {
          errors[`${type}_${field}`] = 'Student ID must be 7 digits';
        } else {
          delete errors[`${type}_${field}`];
        }
        break;
      case 'email':
        if (value && !validateEmail(value)) {
          errors[`${type}_${field}`] = 'Please enter a valid email address';
        } else {
          delete errors[`${type}_${field}`];
        }
        break;
      case 'password':
        if (type === 'register') {
          const strength = calculatePasswordStrength(value);
          setPasswordStrength(strength);
          if (value && strength < 50) {
            errors[`${type}_${field}`] = 'Password should be stronger';
          } else {
            delete errors[`${type}_${field}`];
          }
        }
        break;
      case 'confirmPassword':
        if (value && value !== registerData.password) {
          errors[`${type}_${field}`] = 'Passwords do not match';
        } else {
          delete errors[`${type}_${field}`];
        }
        break;
      case 'phone':
        if (value && value.length < 10) {
          errors[`${type}_${field}`] = 'Phone number should be at least 10 digits';
        } else {
          delete errors[`${type}_${field}`];
        }
        break;
    }
    
    setValidationErrors(errors);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Validate required fields
    const errors = {};
    if (!loginData.studentId) errors.login_studentId = 'Student ID is required';
    if (!loginData.password) errors.login_password = 'Password is required';

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      setIsLoading(false);
      return;
    }

    // Simulate login process
    setTimeout(() => {
      // Demo credentials check
      if (loginData.studentId === '2021001' && loginData.password === 'student123') {
        toast({
          title: "Login Successful",
          description: `Welcome back, ${loginData.studentId}!`,
        });
        localStorage.setItem('userRole', 'borrower');
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('studentData', JSON.stringify(loginData));
        navigate('/borrower/dashboard');
      } else {
        toast({
          title: "Login Failed",
          description: "Invalid credentials. Please check your details.",
          variant: "destructive"
        });
      }
      setIsLoading(false);
    }, 1500);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Validate required fields
    const errors = {};
    if (!registerData.name) errors.register_name = 'Full name is required';
    if (!registerData.studentId) errors.register_studentId = 'Student ID is required';
    if (!registerData.password) errors.register_password = 'Password is required';
    if (!registerData.confirmPassword) errors.register_confirmPassword = 'Please confirm password';
    if (!registerData.department) errors.register_department = 'Department is required';
    if (!registerData.year) errors.register_year = 'Year is required';
    if (!registerData.semester) errors.register_semester = 'Semester is required';
    if (!registerData.email) errors.register_email = 'Email is required';
    if (!registerData.phone) errors.register_phone = 'Phone is required';
    if (!registerData.acceptTerms) errors.register_acceptTerms = 'Please accept terms and conditions';

    if (registerData.password !== registerData.confirmPassword) {
      errors.register_confirmPassword = 'Passwords do not match';
    }

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      setIsLoading(false);
      return;
    }

    // Simulate registration process
    setTimeout(() => {
      toast({
        title: "Registration Successful",
        description: `Welcome to the library, ${registerData.name}!`,
      });
      localStorage.setItem('userRole', 'borrower');
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('studentData', JSON.stringify(registerData));
      navigate('/borrower/dashboard');
      setIsLoading(false);
    }, 2000);
  };

  const handleForgotPassword = () => {
    toast({
      title: "Reset Link Sent",
      description: `Password reset instructions sent to ${forgotEmail}`,
    });
    setIsForgotPasswordOpen(false);
    setForgotEmail('');
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrength < 25) return 'bg-red-500';
    if (passwordStrength < 50) return 'bg-orange-500';
    if (passwordStrength < 75) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const getPasswordStrengthText = () => {
    if (passwordStrength < 25) return 'Weak';
    if (passwordStrength < 50) return 'Fair';
    if (passwordStrength < 75) return 'Good';
    return 'Strong';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100 dark:from-slate-900 dark:via-indigo-900 dark:to-purple-900 flex items-center justify-center p-4">
      {/* Theme Toggle */}
      <Button
        variant="outline"
        size="icon"
        className="fixed top-4 right-4 z-50 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-slate-200 dark:border-slate-700"
        onClick={toggleTheme}
      >
        {theme === 'light' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
      </Button>

      <div className="w-full max-w-2xl">
        {/* Logo/Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full mb-4 shadow-lg">
            <GraduationCap className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-2">
            Student Portal
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Access your library account and discover amazing books
          </p>
        </div>

        {/* Login Card */}
        <Card className="shadow-xl border-0 bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm">
          <CardHeader className="space-y-1 pb-6">
            <CardTitle className="text-2xl font-semibold text-center text-slate-800 dark:text-slate-100">
              Student Login
            </CardTitle>
            <CardDescription className="text-center text-slate-600 dark:text-slate-400">
              Enter your details to access your library account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Student ID */}
                <div className="space-y-2">
                  <Label htmlFor="studentId" className="text-slate-700 dark:text-slate-300 font-medium">
                    Student ID *
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                    <Input
                      id="studentId"
                      type="text"
                      value={formData.studentId}
                      onChange={(e) => handleInputChange('studentId', e.target.value)}
                      className={`pl-10 h-12 transition-all duration-200 ${
                        validationErrors.studentId 
                          ? 'border-red-500 focus:border-red-500' 
                          : formData.studentId && validateStudentId(formData.studentId)
                            ? 'border-green-500 focus:border-green-500'
                            : 'border-slate-200 dark:border-slate-700 focus:border-indigo-500'
                      }`}
                      placeholder="Enter 7-digit student ID"
                      maxLength={7}
                    />
                    {formData.studentId && validateStudentId(formData.studentId) && (
                      <CheckCircle2 className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500 h-4 w-4" />
                    )}
                    {validationErrors.studentId && (
                      <AlertCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 text-red-500 h-4 w-4" />
                    )}
                  </div>
                  {validationErrors.studentId && (
                    <p className="text-red-500 text-sm flex items-center">
                      <AlertCircle className="h-3 w-3 mr-1" />
                      {validationErrors.studentId}
                    </p>
                  )}
                </div>

                {/* Password */}
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-slate-700 dark:text-slate-300 font-medium">
                    Password *
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      value={formData.password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
                      className="pr-10 h-12 border-slate-200 dark:border-slate-700 focus:border-indigo-500 transition-all duration-200"
                      placeholder="Enter your password"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-slate-400" />
                      ) : (
                        <Eye className="h-4 w-4 text-slate-400" />
                      )}
                    </Button>
                  </div>
                  {formData.password && (
                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-slate-600 dark:text-slate-400">Password Strength:</span>
                        <span className={`text-xs font-medium ${
                          passwordStrength < 50 ? 'text-red-600' : 'text-green-600'
                        }`}>
                          {getPasswordStrengthText()}
                        </span>
                      </div>
                      <div className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                        <div 
                          className={`h-full transition-all duration-300 ${getPasswordStrengthColor()}`}
                          style={{ width: `${passwordStrength}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Department */}
                <div className="space-y-2">
                  <Label className="text-slate-700 dark:text-slate-300 font-medium">
                    Department *
                  </Label>
                  <Select value={formData.department} onValueChange={(value) => handleInputChange('department', value)}>
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder="Select your department" />
                    </SelectTrigger>
                    <SelectContent>
                      {departments.map(dept => (
                        <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Year */}
                <div className="space-y-2">
                  <Label className="text-slate-700 dark:text-slate-300 font-medium">
                    Year *
                  </Label>
                  <Select value={formData.year} onValueChange={(value) => handleInputChange('year', value)}>
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder="Select year" />
                    </SelectTrigger>
                    <SelectContent>
                      {years.map(year => (
                        <SelectItem key={year} value={year}>{year}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Semester */}
                <div className="space-y-2">
                  <Label className="text-slate-700 dark:text-slate-300 font-medium">
                    Semester *
                  </Label>
                  <Select value={formData.semester} onValueChange={(value) => handleInputChange('semester', value)}>
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder="Select semester" />
                    </SelectTrigger>
                    <SelectContent>
                      {semesters.map(sem => (
                        <SelectItem key={sem} value={sem}>{sem}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Phone */}
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-slate-700 dark:text-slate-300 font-medium">
                    Phone Number *
                  </Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                    <div className="flex">
                      <div className="flex items-center px-3 bg-slate-100 dark:bg-slate-700 border border-r-0 border-slate-200 dark:border-slate-600 rounded-l-md text-sm text-slate-600 dark:text-slate-400">
                        +91
                      </div>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className="pl-4 h-12 rounded-l-none border-slate-200 dark:border-slate-700 focus:border-indigo-500"
                        placeholder="Enter phone number"
                        maxLength={10}
                      />
                    </div>
                  </div>
                  {validationErrors.phone && (
                    <p className="text-red-500 text-sm">{validationErrors.phone}</p>
                  )}
                </div>

                {/* Email */}
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="email" className="text-slate-700 dark:text-slate-300 font-medium">
                    Email Address *
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className={`pl-10 h-12 transition-all duration-200 ${
                        validationErrors.email 
                          ? 'border-red-500' 
                          : formData.email && validateEmail(formData.email)
                            ? 'border-green-500'
                            : 'border-slate-200 dark:border-slate-700 focus:border-indigo-500'
                      }`}
                      placeholder="Enter your email address"
                    />
                    {formData.email && validateEmail(formData.email) && (
                      <CheckCircle2 className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500 h-4 w-4" />
                    )}
                  </div>
                  {validationErrors.email && (
                    <p className="text-red-500 text-sm">{validationErrors.email}</p>
                  )}
                </div>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="rememberMe"
                    checked={formData.rememberMe}
                    onCheckedChange={(checked) => handleInputChange('rememberMe', checked)}
                  />
                  <Label htmlFor="rememberMe" className="text-sm text-slate-600 dark:text-slate-400">
                    Remember me
                  </Label>
                </div>
                <Dialog open={isForgotPasswordOpen} onOpenChange={setIsForgotPasswordOpen}>
                  <DialogTrigger asChild>
                    <Button variant="link" className="text-indigo-600 hover:text-indigo-700 p-0">
                      Forgot Password?
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Reset Password</DialogTitle>
                      <DialogDescription>
                        Enter your email address to receive password reset instructions.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <Input
                        type="email"
                        placeholder="Enter your email"
                        value={forgotEmail}
                        onChange={(e) => setForgotEmail(e.target.value)}
                      />
                      <Button onClick={handleForgotPassword} className="w-full">
                        Send Reset Link
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full h-12 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-medium shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Signing in...</span>
                  </div>
                ) : (
                  'Sign In to Library'
                )}
              </Button>
            </form>

            {/* Demo Credentials */}
            <div className="mt-6 p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg">
              <p className="text-sm text-slate-600 dark:text-slate-400 text-center mb-2">
                Demo Credentials:
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-500 text-center">
                Student ID: <span className="font-mono font-semibold">2021001</span> | 
                Password: <span className="font-mono font-semibold">student123</span>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Need help? Contact library administration
          </p>
        </div>
      </div>
    </div>
  );
};

export default BorrowerLogin;