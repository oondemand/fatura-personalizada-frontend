// src/services/usuarioService.js
import api from './api';

const listarUsuarios = () => api.get('/usuarios');

const obterUsuario = (id) => api.get(`/usuarios/${id}`);

const registrarUsuario = (dados) => api.post('/usuarios', dados);

const atualizarUsuario = (id, dados) => api.put(`/usuarios/${id}`, dados);

const deletarUsuario = (id) => api.delete(`/usuarios/${id}`);

export default {
  listarUsuarios,
  obterUsuario,
  registrarUsuario,
  atualizarUsuario,
  deletarUsuario,
};
