// src/services/baseOmieService.js
import api from './api';

// Listar todas as BaseOmie
const listarBaseOmie = () => api.get('/base-omies');

// Obter uma BaseOmie específica por ID
const obterBaseOmie = (id) => api.get(`/base-omies/${id}`);

// Criar uma nova BaseOmie
const criarBaseOmie = (dados) => api.post('/base-omies', dados);

// Atualizar uma BaseOmie existente
const atualizarBaseOmie = (id, dados) => api.put(`/base-omies/${id}`, dados);

// Deletar uma BaseOmie
const deletarBaseOmie = (id) => api.delete(`/base-omies/${id}`);

export default {
  listarBaseOmie,
  obterBaseOmie,
  criarBaseOmie,
  atualizarBaseOmie,
  deletarBaseOmie,
};
