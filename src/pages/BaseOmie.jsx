// src/pages/BaseOmie.jsx
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
import baseOmieService from '../services/baseOmieService';

function BaseOmie() {
  const [baseOmies, setBaseOmies] = useState([]);
  const [loading, setLoading] = useState(true);
  const toast = useToast();
  const navigate = useNavigate();

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
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBaseOmie();
  }, []);

  const handleDelete = async (id) => {
    try {
      await baseOmieService.deletarBaseOmie(id);
      toast({
        title: 'BaseOmie deletada com sucesso.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      fetchBaseOmie();
    } catch (err) {
      console.error('Erro ao deletar BaseOmie:', err); // Debug
      toast({
        title: 'Erro ao deletar BaseOmie.',
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
      <Heading mb={6}>BaseOmie</Heading>
      <Button colorScheme="teal" mb={4} onClick={() => navigate('/baseomie/novo')}>
        Adicionar BaseOmie
      </Button>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Nome</Th>
            <Th>CNPJ</Th>
            <Th>App Key</Th>
            <Th>App Secret</Th>
            <Th>Status</Th>
            <Th>Ações</Th>
          </Tr>
        </Thead>
        <Tbody>
          {baseOmies.map((base) => (
            <Tr key={base._id}>
              <Td>{base.nome}</Td>
              <Td>{base.cnpj}</Td>
              <Td>{base.appKey}</Td>
              <Td>{base.appSecret}</Td>
              <Td>{base.status}</Td>
              <Td>
                <IconButton
                  aria-label="Editar"
                  icon={<EditIcon />}
                  mr={2}
                  onClick={() => navigate(`/baseomie/editar/${base._id}`)}
                />
                <IconButton
                  aria-label="Deletar"
                  icon={<DeleteIcon />}
                  colorScheme="red"
                  onClick={() => handleDelete(base._id)}
                />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
}

export default BaseOmie;
