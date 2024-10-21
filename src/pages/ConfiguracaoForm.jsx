// src/pages/ConfiguracaoForm.jsx
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
import configuracaoService from '../services/configuracaoService';
import baseOmieService from '../services/baseOmieService';

function ConfiguracaoForm() {
  const { id } = useParams();
  const isEdit = !!id;
  const [nome, setNome] = useState('');
  const [codigo, setCodigo] = useState('');
  const [valor, setValor] = useState('');
  const [baseOmie, setBaseOmie] = useState('');
  const [baseOmieList, setBaseOmieList] = useState([]);
  const [loading, setLoading] = useState(isEdit);
  const [loadingBaseOmie, setLoadingBaseOmie] = useState(true);
  const toast = useToast();
  const navigate = useNavigate();

  // Função para obter as BaseOmie
  const fetchBaseOmie = async () => {
    try {
      const response = await baseOmieService.listarBaseOmie();
      setBaseOmieList(response.data);
    } catch (err) {
      console.error('Erro ao listar BaseOmie:', err);
      toast({
        title: 'Erro ao carregar BaseOmie.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setLoadingBaseOmie(false);
    }
  };

  // Função para obter dados da Configuracao para edição
  const fetchConfiguracao = async () => {
    try {
      const response = await configuracaoService.obterConfiguracao(id);
      const data = response.data;
      setNome(data.nome);
      setCodigo(data.codigo);
      setValor(data.valor);
      setBaseOmie(data.baseOmie); // Deve ser o ObjectId
    } catch (err) {
      console.error('Erro ao obter configuração:', err);
      toast({
        title: 'Erro ao carregar configuração.',
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
    if (isEdit) {
      fetchConfiguracao();
    }
  }, [id, isEdit]);

  const handleSubmit = async () => {
    try {
      const dados = { nome, codigo, valor, baseOmie };
      if (isEdit) {
        await configuracaoService.atualizarConfiguracao(id, dados);
        toast({
          title: 'Configuração atualizada com sucesso.',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      } else {
        await configuracaoService.criarConfiguracao(dados);
        toast({
          title: 'Configuração criada com sucesso.',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      }
      navigate('/configuracoes');
    } catch (err) {
      console.error('Erro ao salvar configuração:', err);
      toast({
        title: 'Erro ao salvar configuração.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  if (loading || loadingBaseOmie) {
    return (
      <Flex justify="center" align="center" height="100vh">
        <Spinner size="xl" />
      </Flex>
    );
  }

  return (
    <Box p={6}>
      <Heading mb={6}>{isEdit ? 'Editar Configuração' : 'Adicionar Configuração'}</Heading>
      <VStack spacing={4}>
        <FormControl id="nome" isRequired>
          <FormLabel>Nome</FormLabel>
          <Input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Nome da configuração"
          />
        </FormControl>
        <FormControl id="codigo" isRequired>
          <FormLabel>Código</FormLabel>
          <Input
            type="text"
            value={codigo}
            onChange={(e) => setCodigo(e.target.value)}
            placeholder="Código da configuração"
          />
        </FormControl>
        <FormControl id="valor" isRequired>
          <FormLabel>Valor</FormLabel>
          <Input
            type="text"
            value={valor}
            onChange={(e) => setValor(e.target.value)}
            placeholder="Valor da configuração"
          />
        </FormControl>
        <FormControl id="baseOmie" isRequired>
          <FormLabel>Base Omie</FormLabel>
          <Select
            placeholder="Selecione uma Base Omie"
            value={baseOmie}
            onChange={(e) => setBaseOmie(e.target.value)}
          >
            {baseOmieList.map((base) => (
              <option key={base._id} value={base._id}>
                {base.nome}
              </option>
            ))}
          </Select>
        </FormControl>
        <Button colorScheme="teal" onClick={handleSubmit}>
          {isEdit ? 'Atualizar' : 'Registrar'}
        </Button>
      </VStack>
    </Box>
  );
}

export default ConfiguracaoForm;
