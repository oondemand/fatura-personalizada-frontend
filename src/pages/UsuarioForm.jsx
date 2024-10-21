// src/pages/UsuarioForm.jsx
import React, { useState, useEffect } from 'react';
import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Select,
  Checkbox,
  CheckboxGroup,
  Button,
  VStack,
  useToast,
  Spinner,
  Flex,
} from '@chakra-ui/react';
import { useNavigate, useParams } from 'react-router-dom';
import usuarioService from '../services/usuarioService';

function UsuarioForm() {
  const parns = useParams();
 console.log(parns)
  const { id } = useParams();
  const isEdit = !!id;
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [status, setStatus] = useState('ativo');
  const [permissoes, setPermissoes] = useState([]);
  const [loading, setLoading] = useState(isEdit);
  const toast = useToast();
  const navigate = useNavigate();

console.log(id)

  useEffect(() => {
    if (isEdit) {
      // Buscar os dados do usuário
      const fetchUsuario = async () => {
        try {
          const response = await usuarioService.obterUsuario(id);
          const data = response.data;
          setNome(data.nome);
          setEmail(data.email);
          setStatus(data.status);
          setPermissoes(data.permissoes);
        } catch (err) {
          toast({
            title: 'Erro ao carregar usuário.',
            status: 'error',
            duration: 5000,
            isClosable: true,
          });
        } finally {
          setLoading(false);
        }
      };
      fetchUsuario();
    }
  }, [id, isEdit, toast]);

  const handleSubmit = async () => {
    try {
      const dados = { nome, email, senha, status, permissoes };
      if (isEdit) {
        await usuarioService.atualizarUsuario(id, dados);
        toast({
          title: 'Usuário atualizado com sucesso.',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      } else {
        await usuarioService.registrarUsuario(dados);
        toast({
          title: 'Usuário registrado com sucesso.',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      }
      navigate('/usuarios');
    } catch (err) {
      toast({
        title: 'Erro ao salvar usuário.',
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
      <Heading mb={6}>{isEdit ? 'Editar Usuário' : 'Adicionar Usuário'}</Heading>
      <VStack spacing={4}>
        <FormControl id="nome" isRequired>
          <FormLabel>Nome</FormLabel>
          <Input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Nome do usuário"
          />
        </FormControl>
        <FormControl id="email" isRequired>
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email do usuário"
          />
        </FormControl>
        {!isEdit && (
          <FormControl id="senha" isRequired>
            <FormLabel>Senha</FormLabel>
            <Input
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              placeholder="Senha do usuário"
            />
          </FormControl>
        )}
        <FormControl id="status" isRequired>
          <FormLabel>Status</FormLabel>
          <Select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="ativo">Ativo</option>
            <option value="inativo">Inativo</option>
            <option value="arquivado">Arquivado</option>
          </Select>
        </FormControl>
        <FormControl id="permissoes" isRequired>
          <FormLabel>Permissões</FormLabel>
          <CheckboxGroup
            colorScheme="teal"
            value={permissoes}
            onChange={(values) => setPermissoes(values)}
          >
            <VStack align="start">
              <Checkbox value="leitura">Leitura</Checkbox>
              <Checkbox value="escrita">Escrita</Checkbox>
              <Checkbox value="admin">Admin</Checkbox>
              {/* Adicione mais permissões conforme necessário */}
            </VStack>
          </CheckboxGroup>
        </FormControl>
        <Button colorScheme="teal" onClick={handleSubmit}>
          {isEdit ? 'Atualizar' : 'Registrar'}
        </Button>
      </VStack>
    </Box>
  );
}

export default UsuarioForm;
