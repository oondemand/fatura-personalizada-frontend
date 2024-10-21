// src/pages/Templates.jsx
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
import templateService from '../services/templateService';

function Templates() {
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const toast = useToast();
  const navigate = useNavigate();

  // Estados para o AlertDialog de confirmação de deleção
  const [isOpen, setIsOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const cancelRef = useRef();

  const fetchTemplates = async () => {
    try {
      const response = await templateService.listarTemplates();
      setTemplates(response.data);
    } catch (err) {
      console.error('Erro ao listar Templates:', err); // Debug
      toast({
        title: 'Erro ao carregar Templates.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTemplates();
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
      await templateService.deletarTemplate(id);
      toast({
        title: 'Template deletado com sucesso.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      fetchTemplates();
    } catch (err) {
      console.error('Erro ao deletar Template:', err); // Debug
      toast({
        title: 'Erro ao deletar Template.',
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
      <Heading mb={6}>Templates</Heading>
      <Button colorScheme="teal" mb={4} onClick={() => navigate('/templates/novo')}>
        Adicionar Template
      </Button>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Nome</Th>
            <Th>Código</Th>
            <Th>Descrição</Th>
         
            <Th>Status</Th>
            <Th>Ações</Th>
          </Tr>
        </Thead>
        <Tbody>
          {templates.map((template) => (
            <Tr key={template._id}>
              <Td>{template.nome}</Td>
              <Td>{template.codigo}</Td>
              <Td>{template.descricao}</Td>
      
              <Td>{template.status}</Td>
              <Td>
                <IconButton
                  aria-label="Editar"
                  icon={<EditIcon />}
                  mr={2}
                  onClick={() => navigate(`/templates/editar/${template._id}`)}
                />
                <IconButton
                  aria-label="Deletar"
                  icon={<DeleteIcon />}
                  colorScheme="red"
                  onClick={() => openDeleteDialog(template._id)}
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
              Deletar Template
            </AlertDialogHeader>

            <AlertDialogBody>
              Tem certeza que deseja deletar este Template? Esta ação não pode ser desfeita.
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

export default Templates;
