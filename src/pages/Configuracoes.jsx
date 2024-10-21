// src/pages/Configuracoes.jsx
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
  Select,
} from '@chakra-ui/react';
import { EditIcon, DeleteIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';
import configuracaoService from '../services/configuracaoService';
import baseOmieService from '../services/baseOmieService';

function Configuracoes() {
  const [configuracoes, setConfiguracoes] = useState([]);
  const [baseOmies, setBaseOmies] = useState([]);
  const [loading, setLoading] = useState(true);
  const toast = useToast();
  const navigate = useNavigate();

  const fetchConfiguracoes = async () => {
    try {
      const response = await configuracaoService.listarConfiguracoes();
      setConfiguracoes(response.data);
    } catch (err) {
      console.error('Erro ao listar configurações:', err); // Debug
      toast({
        title: 'Erro ao carregar configurações.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const fetchBaseOmie = async () => {
    try {
      const response = await baseOmieService.listarBaseOmie();
      setBaseOmies(response.data);
    } catch (err) {
      console.error('Erro ao listar BaseOmie:', err); // Debug
      toast({
        title: 'Erro ao carregar BaseOmie.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await Promise.all([fetchConfiguracoes(), fetchBaseOmie()]);
      setLoading(false);
    };
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      await configuracaoService.deletarConfiguracao(id);
      toast({
        title: 'Configuração deletada com sucesso.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      fetchConfiguracoes();
    } catch (err) {
      console.error('Erro ao deletar configuração:', err); // Debug
      toast({
        title: 'Erro ao deletar configuração.',
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

  return (
    <Box p={6}>
      <Heading mb={6}>Configurações</Heading>
      <Button colorScheme="teal" mb={4} onClick={() => navigate('/configuracoes/novo')}>
        Adicionar Configuração
      </Button>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Nome</Th>
            <Th>Código</Th>
            <Th>Valor</Th>
            <Th>Base Omie</Th>
            <Th>Ações</Th>
          </Tr>
        </Thead>
        <Tbody>
          {configuracoes.map((config) => (
            <Tr key={config._id}>
              <Td>{config.nome}</Td>
              <Td>{config.codigo}</Td>
              <Td>{config.valor}</Td>
              <Td>
                {baseOmies.find((base) => base._id === config.baseOmie)?.nome || 'Não encontrado'}
              </Td>
              <Td>
                <IconButton
                  aria-label="Editar"
                  icon={<EditIcon />}
                  mr={2}
                  onClick={() => navigate(`/configuracoes/editar/${config._id}`)}
                />
                <IconButton
                  aria-label="Deletar"
                  icon={<DeleteIcon />}
                  colorScheme="red"
                  onClick={() => handleDelete(config._id)}
                />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
}

export default Configuracoes;
