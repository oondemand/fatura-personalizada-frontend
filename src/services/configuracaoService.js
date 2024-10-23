// src/services/configuracaoService.js
import api from './api';

// Listar todas as configurações
const listarConfiguracoes = () => api.get('/configuracoes');

// Obter uma configuração específica por ID
const obterConfiguracao = (id) => api.get(`/configuracoes/${id}`);

// Criar uma nova configuração
const criarConfiguracao = (dados) => api.post('/configuracoes', dados);

// Atualizar uma configuração existente
const atualizarConfiguracao = (id, dados) => api.patch(`/configuracoes/${id}`, dados);

// Deletar uma configuração
const deletarConfiguracao = (id) => api.delete(`/configuracoes/${id}`);

export default {
  listarConfiguracoes,
  obterConfiguracao,
  criarConfiguracao,
  atualizarConfiguracao,
  deletarConfiguracao,
};
