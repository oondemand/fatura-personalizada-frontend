// src/pages/BaseOmieForm.jsx
import React, { useState, useEffect } from 'react';
import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Select,
  Button,
  VStack,
  useToast,
  Spinner,
  Flex,
} from '@chakra-ui/react';
import { useNavigate, useParams } from 'react-router-dom';
import baseOmieService from '../services/baseOmieService';

function BaseOmieForm() {
  const { id } = useParams();
  const isEdit = !!id;
  const [nome, setNome] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [appKey, setAppKey] = useState('');
  const [appSecret, setAppSecret] = useState('');
  const [status, setStatus] = useState('ativo');
  const [loading, setLoading] = useState(isEdit);
  const toast = useToast();
  const navigate = useNavigate();

  // Função para obter dados da BaseOmie para edição
  const fetchBaseOmie = async () => {
    try {
      const response = await baseOmieService.obterBaseOmie(id);
      const data = response.data;
      setNome(data.nome);
      setCnpj(data.cnpj);
      setAppKey(data.appKey);
      setAppSecret(data.appSecret);
      setStatus(data.status);
    } catch (err) {
      console.error('Erro ao obter BaseOmie:', err); // Debug
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
    if (isEdit) {
      fetchBaseOmie();
    }
  }, [id, isEdit]);

  const handleSubmit = async () => {
    try {
      const dados = { nome, cnpj, appKey, appSecret, status };
      if (isEdit) {
        await baseOmieService.atualizarBaseOmie(id, dados);
        toast({
          title: 'BaseOmie atualizada com sucesso.',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      } else {
        await baseOmieService.criarBaseOmie(dados);
        toast({
          title: 'BaseOmie criada com sucesso.',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      }
      navigate('/baseomie');
    } catch (err) {
      console.error('Erro ao salvar BaseOmie:', err); // Debug
      toast({
        title: 'Erro ao salvar BaseOmie.',
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
      <Heading mb={6}>{isEdit ? 'Editar BaseOmie' : 'Adicionar BaseOmie'}</Heading>
      <VStack spacing={4}>
        <FormControl id="nome" isRequired>
          <FormLabel>Nome</FormLabel>
          <Input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Nome da BaseOmie"
          />
        </FormControl>
        <FormControl id="cnpj" isRequired>
          <FormLabel>CNPJ</FormLabel>
          <Input
            type="text"
            value={cnpj}
            onChange={(e) => setCnpj(e.target.value)}
            placeholder="CNPJ da BaseOmie"
          />
        </FormControl>
        <FormControl id="appKey" isRequired>
          <FormLabel>App Key</FormLabel>
          <Input
            type="text"
            value={appKey}
            onChange={(e) => setAppKey(e.target.value)}
            placeholder="App Key"
          />
        </FormControl>
        <FormControl id="appSecret" isRequired>
          <FormLabel>App Secret</FormLabel>
          <Input
            type="text"
            value={appSecret}
            onChange={(e) => setAppSecret(e.target.value)}
            placeholder="App Secret"
          />
        </FormControl>
        <FormControl id="status" isRequired>
          <FormLabel>Status</FormLabel>
          <Select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="ativo">Ativo</option>
            <option value="inativo">Inativo</option>
            <option value="arquivado">Arquivado</option>
          </Select>
        </FormControl>
        <Button colorScheme="teal" onClick={handleSubmit}>
          {isEdit ? 'Atualizar' : 'Registrar'}
        </Button>
      </VStack>
    </Box>
  );
}

export default BaseOmieForm;
