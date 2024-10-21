// src/services/templateService.js
import api from './api';

// Listar todos os Templates
const listarTemplates = () => api.get('/templates');

// Obter um Template específico por ID
const obterTemplate = (id) => api.get(`/templates/${id}`);

// Criar um novo Template
const criarTemplate = (dados) => api.post('/templates', dados);

// Atualizar um Template existente
const atualizarTemplate = (id, dados) => api.put(`/templates/${id}`, dados);

// Deletar um Template
const deletarTemplate = (id) => api.delete(`/templates/${id}`);

export default {
  listarTemplates,
  obterTemplate,
  criarTemplate,
  atualizarTemplate,
  deletarTemplate,
};
