// src/services/includeService.js
import api from './api';

// Listar todos os Includes
const listarIncludes = () => api.get('/includes');

// Obter um Include específico por ID
const obterInclude = (id) => api.get(`/includes/${id}`);

// Criar um novo Include
const criarInclude = (dados) => api.post('/includes', dados);

// Atualizar um Include existente
const atualizarInclude = (id, dados) => api.put(`/includes/${id}`, dados);

// Deletar um Include
const deletarInclude = (id) => api.delete(`/includes/${id}`);

export default {
  listarIncludes,
  obterInclude,
  criarInclude,
  atualizarInclude,
  deletarInclude,
};
