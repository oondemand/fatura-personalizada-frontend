// src/App.jsx
// eslint-disable-next-line no-unused-vars
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Usuarios from './pages/Usuarios';
import UsuarioForm from './pages/UsuarioForm';
import Configuracoes from './pages/Configuracoes';
import ConfiguracaoForm from './pages/ConfiguracaoForm';
import BaseOmie from './pages/BaseOmie';
import BaseOmieForm from './pages/BaseOmieForm';
import ProtectedRoute from './components/ProtectedRoute';
// Importe outras páginas conforme necessário

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        {/* Rotas protegidas */}
        <Route
          path="/usuarios"
          element={
            <ProtectedRoute>
              <Usuarios />
            </ProtectedRoute>
          }
        />
        <Route
          path="/usuarios/novo"
          element={
            <ProtectedRoute>
              <UsuarioForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/usuarios/editar/:id"
          element={
            <ProtectedRoute>
              <UsuarioForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/configuracoes"
          element={
            <ProtectedRoute>
              <Configuracoes />
            </ProtectedRoute>
          }
        />
        <Route
          path="/configuracoes/novo"
          element={
            <ProtectedRoute>
              <ConfiguracaoForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/configuracoes/editar/:id"
          element={
            <ProtectedRoute>
              <ConfiguracaoForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/baseomie"
          element={
            <ProtectedRoute>
              <BaseOmie />
            </ProtectedRoute>
          }
        />
        <Route
          path="/baseomie/novo"
          element={
            <ProtectedRoute>
              <BaseOmieForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/baseomie/editar/:id"
          element={
            <ProtectedRoute>
              <BaseOmieForm />
            </ProtectedRoute>
          }
        />
        {/* Adicione rotas para outras models */}
        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
