// src/pages/Usuarios.jsx
import React, { useEffect, useState } from 'react';
import {
  Box,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  IconButton,
  useToast,
  Spinner,
  Flex,
} from '@chakra-ui/react';
import { EditIcon, DeleteIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';
import usuarioService from '../services/usuarioService';

function Usuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const toast = useToast();
  const navigate = useNavigate();

  const fetchUsuarios = async () => {
    try {
      const response = await usuarioService.listarUsuarios();
      setUsuarios(response.data);
    } catch (err) {
      toast({
        title: 'Erro ao carregar usuários.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsuarios();
  }, []);

  const handleDelete = async (id) => {
    try {
      await usuarioService.deletarUsuario(id);
      toast({
        title: 'Usuário deletado com sucesso.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      fetchUsuarios();
    } catch (err) {
      toast({
        title: 'Erro ao deletar usuário.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  if (loading) {
    return (
      <Flex justify="center" align="center" height="100vh">
        <Spinner size="xl" />
      </Flex>
    );
  }
console.log(usuarios)
  return (
    <Box p={6}>
      <Heading mb={6}>Usuários</Heading>
      <Button colorScheme="teal" mb={4} onClick={() => navigate('/usuarios/novo')}>
        Adicionar Usuário
      </Button>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Nome</Th>
            <Th>Email</Th>
            <Th>Status</Th>
            <Th>Permissões</Th>
            <Th>Ações</Th>
          </Tr>
        </Thead>
        <Tbody>
          {usuarios.map((usuario) => (
            <Tr key={usuario.id}>
              <Td>{usuario.nome}</Td>
              <Td>{usuario.email}</Td>
              <Td>{usuario.status}</Td>
              <Td>{usuario.permissoes.join(', ')}</Td>
              <Td>
                <IconButton
                  aria-label="Editar"
                  icon={<EditIcon />}
                  mr={2}
                  onClick={() => navigate(`/usuarios/editar/${usuario}`)}
                />
                <IconButton
                  aria-label="Deletar"
                  icon={<DeleteIcon />}
                  colorScheme="red"
                  onClick={() => handleDelete(usuario.id)}
                />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
}

export default Usuarios;
