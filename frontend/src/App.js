import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "./contexts/ThemeContext";
import { Toaster } from "./components/ui/toaster";
import AdminLogin from "./components/AdminLogin";
import AdminDashboard from "./components/AdminDashboard";
import BorrowerLogin from "./components/BorrowerLogin";
import BorrowerDashboard from "./components/BorrowerDashboard";

// Protected Route Component
const ProtectedRoute = ({ children, requiredRole }) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  const userRole = localStorage.getItem('userRole');

  if (!isAuthenticated || userRole !== requiredRole) {
    return <Navigate to={requiredRole === 'admin' ? '/admin' : '/borrower'} replace />;
  }

  return children;
};

// Home Component (Landing Page)
const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 flex items-center justify-center">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full mb-6 shadow-xl">
          <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        </div>
        <h1 className="text-4xl font-bold text-slate-800 dark:text-slate-100 mb-4">
          Library Management System
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 max-w-md mx-auto">
          A modern, world-class library management solution for academic institutions
        </p>
        <div className="space-y-4">
          <div>
            <a
              href="/admin"
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 mr-4"
            >
              Admin Portal
            </a>
            <a
              href="/borrower"
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Student Portal
            </a>
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Choose your portal to get started
          </p>
        </div>
      </div>
    </div>
  );
};

function App() {
  return (
    <ThemeProvider>
      <div className="App">
        <BrowserRouter>
          <Routes>
            {/* Home/Landing Page */}
            <Route path="/" element={<Home />} />
            
            {/* Admin Routes */}
            <Route path="/admin" element={<AdminLogin />} />
            <Route 
              path="/admin/dashboard" 
              element={
                <ProtectedRoute requiredRole="admin">
                  <AdminDashboard />
                </ProtectedRoute>
              } 
            />
            
            {/* Borrower Routes */}
            <Route path="/borrower" element={<BorrowerLogin />} />
            <Route 
              path="/borrower/dashboard" 
              element={
                <ProtectedRoute requiredRole="borrower">
                  <BorrowerDashboard />
                </ProtectedRoute>
              } 
            />
            
            {/* Catch all route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
        <Toaster />
      </div>
    </ThemeProvider>
  );
}

export default App;