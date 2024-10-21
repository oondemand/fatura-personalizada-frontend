// src/pages/IncludeForm.jsx
import React, { useState, useEffect } from 'react';
import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Select,
  Button,
  VStack,
  useToast,
  Spinner,
  Flex,
  FormErrorMessage,
} from '@chakra-ui/react';
import { useNavigate, useParams } from 'react-router-dom';
import includeService from '../services/includeService';
import templateService from '../services/templateService';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';

function IncludeForm() {
  const { id } = useParams();
  const isEdit = !!id;
  const [initialValues, setInitialValues] = useState({
    nome: '',
    codigo: '',
    descricao: '',
    conteudo: '',
    contenType: '',
    status: 'ativo',
  });
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(isEdit);
  const [loadingTemplates, setLoadingTemplates] = useState(true);
  const toast = useToast();
  const navigate = useNavigate();

  // Função para obter os Templates
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
      setLoadingTemplates(false);
    }
  };

  // Função para obter dados do Include para edição
  const fetchInclude = async () => {
    try {
      const response = await includeService.obterInclude(id);
      const data = response.data;
      setInitialValues({
        nome: data.nome,
        codigo: data.codigo,
        descricao: data.descricao,
        conteudo: data.conteudo,
        contenType: data.contenType,
        status: data.status,
      });
    } catch (err) {
      console.error('Erro ao obter Include:', err); // Debug
      toast({
        title: 'Erro ao carregar Include.',
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
    if (isEdit) {
      fetchInclude();
    } else {
      setLoading(false);
    }
  }, [id, isEdit]);

  const validationSchema = Yup.object({
    nome: Yup.string().required('Nome é obrigatório'),
    codigo: Yup.string().required('Código é obrigatório'),
    conteudo: Yup.string().required('Conteúdo é obrigatório'),
    contenType: Yup.string().required('Content Type é obrigatório'),
    status: Yup.string()
      .oneOf(['ativo', 'inativo', 'arquivado'], 'Status inválido')
      .required('Status é obrigatório'),
  });

  const handleSubmit = async (values, actions) => {
    try {
      const dados = {
        nome: values.nome,
        codigo: values.codigo,
        descricao: values.descricao,
        conteudo: values.conteudo,
        contenType: values.contenType,
        status: values.status,
      };

      if (isEdit) {
        await includeService.atualizarInclude(id, dados);
        toast({
          title: 'Include atualizado com sucesso.',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      } else {
        await includeService.criarInclude(dados);
        toast({
          title: 'Include criado com sucesso.',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      }
      navigate('/includes');
    } catch (err) {
      console.error('Erro ao salvar Include:', err); // Debug
      toast({
        title: 'Erro ao salvar Include.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      actions.setSubmitting(false);
    }
  };

  if (loading || loadingTemplates) {
    return (
      <Flex justify="center" align="center" height="100vh">
        <Spinner size="xl" />
      </Flex>
    );
  }

  return (
    <Box p={6}>
      <Heading mb={6}>{isEdit ? 'Editar Include' : 'Adicionar Include'}</Heading>
      <Formik
        initialValues={initialValues}
        enableReinitialize
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {(props) => (
          <Form>
            <VStack spacing={4}>
              <Field name="nome">
                {({ field, form }) => (
                  <FormControl isInvalid={form.errors.nome && form.touched.nome} isRequired>
                    <FormLabel>Nome</FormLabel>
                    <Input {...field} placeholder="Nome do Include" />
                    <FormErrorMessage>{form.errors.nome}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name="codigo">
                {({ field, form }) => (
                  <FormControl isInvalid={form.errors.codigo && form.touched.codigo} isRequired>
                    <FormLabel>Código</FormLabel>
                    <Input {...field} placeholder="Código do Include" />
                    <FormErrorMessage>{form.errors.codigo}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name="descricao">
                {({ field, form }) => (
                  <FormControl
                    isInvalid={form.errors.descricao && form.touched.descricao}
                    
                  >
                    <FormLabel>descricao</FormLabel>
                    <Textarea {...field} placeholder="descricao do Include" />
                    <FormErrorMessage>{form.errors.descricao}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name="conteudo">
                {({ field, form }) => (
                  <FormControl
                    isInvalid={form.errors.conteudo && form.touched.conteudo}
                    isRequired
                  >
                    <FormLabel>Conteúdo</FormLabel>
                    <Textarea {...field} placeholder="Conteúdo do Include" />
                    <FormErrorMessage>{form.errors.conteudo}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name="contenType">
                {({ field, form }) => (
                  <FormControl
                    isInvalid={form.errors.contenType && form.touched.contenType}
                    isRequired
                  >
                    <FormLabel>Content Type</FormLabel>
                    <Input {...field} placeholder="Content Type do Include" />
                    <FormErrorMessage>{form.errors.contenType}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name="status">
                {({ field, form }) => (
                  <FormControl isInvalid={form.errors.status && form.touched.status} isRequired>
                    <FormLabel>Status</FormLabel>
                    <Select {...field} placeholder="Selecione o Status">
                      <option value="ativo">Ativo</option>
                      <option value="inativo">Inativo</option>
                      <option value="arquivado">Arquivado</option>
                    </Select>
                    <FormErrorMessage>{form.errors.status}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Button
                colorScheme="teal"
                isLoading={props.isSubmitting}
                type="submit"
              >
                {isEdit ? 'Atualizar' : 'Registrar'}
              </Button>
            </VStack>
          </Form>
        )}
      </Formik>
    </Box>
  );
}

export default IncludeForm;
