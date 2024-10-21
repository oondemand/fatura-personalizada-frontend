// src/App.jsx
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
import Moedas from './pages/Moedas';
import MoedaForm from './pages/MoedaForm';
import Templates from './pages/Templates';
import TemplateForm from './pages/TemplateForm';
import Includes from './pages/Includes';
import IncludeForm from './pages/IncludeForm';
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
        {/* Rotas para Moeda */}
        <Route
          path="/moedas"
          element={
            <ProtectedRoute>
              <Moedas />
            </ProtectedRoute>
          }
        />
        <Route
          path="/moedas/novo"
          element={
            <ProtectedRoute>
              <MoedaForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/moedas/editar/:id"
          element={
            <ProtectedRoute>
              <MoedaForm />
            </ProtectedRoute>
          }
        />
        {/* Rotas para Templates */}
        <Route
          path="/templates"
          element={
            <ProtectedRoute>
              <Templates />
            </ProtectedRoute>
          }
        />
        <Route
          path="/templates/novo"
          element={
            <ProtectedRoute>
              <TemplateForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/templates/editar/:id"
          element={
            <ProtectedRoute>
              <TemplateForm />
            </ProtectedRoute>
          }
        />
        {/* Rotas para Includes */}
        <Route
          path="/includes"
          element={
            <ProtectedRoute>
              <Includes />
            </ProtectedRoute>
          }
        />
        <Route
          path="/includes/novo"
          element={
            <ProtectedRoute>
              <IncludeForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/includes/editar/:id"
          element={
            <ProtectedRoute>
              <IncludeForm />
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
