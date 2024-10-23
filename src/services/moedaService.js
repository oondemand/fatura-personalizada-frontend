// src/services/moedaService.js
import api from './api';

// Listar todas as Moedas
const listarMoedas = () => api.get('/moedas');

// Obter uma Moeda específica por ID
const obterMoeda = (id) => api.get(`/moedas/${id}`);

// Criar uma nova Moeda
const criarMoeda = (dados) => api.post('/moedas', dados);

// Atualizar uma Moeda existente
const atualizarMoeda = (id, dados) => api.patch(`/moedas/${id}`, dados);

// Deletar uma Moeda
const deletarMoeda = (id) => api.delete(`/moedas/${id}`);

export default {
  listarMoedas,
  obterMoeda,
  criarMoeda,
  atualizarMoeda,
  deletarMoeda,
};
