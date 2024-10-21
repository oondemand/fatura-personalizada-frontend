// src/pages/Moedas.jsx
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
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
} from '@chakra-ui/react';
import { EditIcon, DeleteIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';
import moedaService from '../services/moedaService';
import { useRef } from 'react';

function Moedas() {
  const [moedas, setMoedas] = useState([]);
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  // Estados para o AlertDialog de confirmação de deleção
  const [isOpen, setIsOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const cancelRef = useRef();

  const fetchMoedas = async () => {
    try {
      const response = await moedaService.listarMoedas();
      setMoedas(response.data);
    } catch (err) {
      console.error('Erro ao listar Moedas:', err); // Debug
      toast({
        title: 'Erro ao carregar Moedas.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMoedas();
  }, []);

  const openDeleteDialog = (id) => {
    setDeleteId(id);
    setIsOpen(true);
  };

  const closeDeleteDialog = () => {
    setIsOpen(false);
    setDeleteId(null);
  };

  const handleDelete = async (id) => {
    try {
      await moedaService.deletarMoeda(id);
      toast({
        title: 'Moeda deletada com sucesso.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      fetchMoedas();
    } catch (err) {
      console.error('Erro ao deletar Moeda:', err); // Debug
      toast({
        title: 'Erro ao deletar Moeda.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const confirmDelete = async () => {
    if (deleteId) {
      await handleDelete(deleteId);
    }
    closeDeleteDialog();
  };

  if (loading) {
    return (
      <Flex justify="center" align="center" height="100vh">
        <Spinner size="xl" />
      </Flex>
    );
  }
console.log(moedas, "modas")
  return (
    <Box p={6}>
      <Heading mb={6}>Moedas</Heading>
      <Button colorScheme="teal" mb={4} onClick={() => navigate('/moedas/novo')}>
        Adicionar Moeda
      </Button>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Nome</Th>
            <Th>Símbolo</Th>
            <Th>Tipo de Cotação</Th>
            <Th>Valor</Th>
            <Th>Status</Th>
            <Th>Ações</Th>
          </Tr>
        </Thead>
        <Tbody>
          {moedas.map((moeda) => (
            <Tr key={moeda._id}>
              <Td>{moeda.nome}</Td>
              <Td>{moeda.simbolo}</Td>
              <Td>{moeda.tipoCotacao}</Td>
              <Td>{moeda.valor}</Td>
              <Td>{moeda.status}</Td>
              <Td>
                <IconButton
                  aria-label="Editar"
                  icon={<EditIcon />}
                  mr={2}
                  onClick={() => navigate(`/moedas/editar/${moeda._id}`)}
                />
                <IconButton
                  aria-label="Deletar"
                  icon={<DeleteIcon />}
                  colorScheme="red"
                  onClick={() => openDeleteDialog(moeda._id)}
                />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      {/* AlertDialog para confirmação de deleção */}
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={closeDeleteDialog}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Deletar Moeda
            </AlertDialogHeader>

            <AlertDialogBody>
              Tem certeza que deseja deletar esta Moeda? Esta ação não pode ser desfeita.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={closeDeleteDialog}>
                Cancelar
              </Button>
              <Button colorScheme="red" onClick={confirmDelete} ml={3}>
                Deletar
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Box>
  );
}

export default Moedas;
