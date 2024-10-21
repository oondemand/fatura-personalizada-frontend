// src/pages/Includes.jsx
import React, { useEffect, useState, useRef } from 'react';
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
import includeService from '../services/includeService';

function Includes() {
  const [includes, setIncludes] = useState([]);
  const [loading, setLoading] = useState(true);
  const toast = useToast();
  const navigate = useNavigate();

  // Estados para o AlertDialog de confirmação de deleção
  const [isOpen, setIsOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const cancelRef = useRef();

  const fetchIncludes = async () => {
    try {
      const response = await includeService.listarIncludes();
      setIncludes(response.data);
    } catch (err) {
      console.error('Erro ao listar Includes:', err); // Debug
      toast({
        title: 'Erro ao carregar Includes.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIncludes();
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
      await includeService.deletarInclude(id);
      toast({
        title: 'Include deletado com sucesso.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      fetchIncludes();
    } catch (err) {
      console.error('Erro ao deletar Include:', err); // Debug
      toast({
        title: 'Erro ao deletar Include.',
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

  return (
    <Box p={6}>
      <Heading mb={6}>Includes</Heading>
      <Button colorScheme="teal" mb={4} onClick={() => navigate('/includes/novo')}>
        Adicionar Include
      </Button>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Nome</Th>
            <Th>Código</Th>
            <Th>Template</Th>
            <Th>Conteúdo</Th>
            <Th>Content Type</Th>
            <Th>Status</Th>
            <Th>Ações</Th>
          </Tr>
        </Thead>
        <Tbody>
          {includes.map((include) => (
            <Tr key={include._id}>
              <Td>{include.nome}</Td>
              <Td>{include.codigo}</Td>
              <Td>{include.templateId}</Td>
              <Td>
                <Box as="pre" whiteSpace="pre-wrap" wordBreak="break-all">
                  {include.conteudo}
                </Box>
              </Td>
              <Td>{include.contenType}</Td>
              <Td>{include.status}</Td>
              <Td>
                <IconButton
                  aria-label="Editar"
                  icon={<EditIcon />}
                  mr={2}
                  onClick={() => navigate(`/includes/editar/${include._id}`)}
                />
                <IconButton
                  aria-label="Deletar"
                  icon={<DeleteIcon />}
                  colorScheme="red"
                  onClick={() => openDeleteDialog(include._id)}
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
              Deletar Include
            </AlertDialogHeader>

            <AlertDialogBody>
              Tem certeza que deseja deletar este Include? Esta ação não pode ser desfeita.
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

export default Includes;
