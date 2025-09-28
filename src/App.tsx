import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import HomePage from './pages/HomePage';
import ScanPage from './pages/ScanPage';
import DrugInfoPage from './pages/DrugInfoPage';
import QRCodePage from './pages/QRCodePage';
import DoctorPage from './pages/DoctorPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import RemindersPage from './pages/RemindersPage';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        
        {/* Protected Routes */}
        <Route path="/" element={
          <ProtectedRoute>
            <Layout>
              <HomePage />
            </Layout>
          </ProtectedRoute>
        } />
        <Route path="/scan" element={
          <ProtectedRoute>
            <Layout>
              <ScanPage />
            </Layout>
          </ProtectedRoute>
        } />
        <Route path="/drug/:id" element={
          <ProtectedRoute>
            <Layout>
              <DrugInfoPage />
            </Layout>
          </ProtectedRoute>
        } />
        <Route path="/qr-codes" element={
          <ProtectedRoute>
            <Layout>
              <QRCodePage />
            </Layout>
          </ProtectedRoute>
        } />
        <Route path="/doctor-recommendation" element={
          <ProtectedRoute>
            <Layout>
              <DoctorPage />
            </Layout>
          </ProtectedRoute>
        } />
        <Route path="/reminders" element={
          <ProtectedRoute>
            <Layout>
              <RemindersPage />
            </Layout>
          </ProtectedRoute>
        } />
      </Routes>
    </Router>
  );
}

export default App;