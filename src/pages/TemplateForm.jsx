// src/pages/TemplateForm.jsx
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
import templateService from '../services/templateService';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';

function TemplateForm() {
  const { id } = useParams();
  const isEdit = !!id;
  const [initialValues, setInitialValues] = useState({
    nome: '',
    codigo: '',
    descricao: '',
    templateEjs: '',
    status: 'ativo',
  });
  const [loading, setLoading] = useState(isEdit);
  const toast = useToast();
  const navigate = useNavigate();

  // Função para obter dados do Template para edição
  const fetchTemplate = async () => {
    try {
      const response = await templateService.obterTemplate(id);
      const data = response.data;
      setInitialValues({
        nome: data.nome,
        codigo: data.codigo,
        descricao: data.descricao,
        templateEjs: data.templateEjs,
        status: data.status,
      });
    } catch (err) {
      console.error('Erro ao obter Template:', err); // Debug
      toast({
        title: 'Erro ao carregar Template.',
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
      fetchTemplate();
    }
  }, [id, isEdit]);

  const validationSchema = Yup.object({
    nome: Yup.string().required('Nome é obrigatório'),
    codigo: Yup.string().required('Código é obrigatório'),
    descricao: Yup.string(),
    templateEjs: Yup.string().required('Template EJS é obrigatório'),
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
        templateEjs: values.templateEjs,
        status: values.status,
      };

      if (isEdit) {
        await templateService.atualizarTemplate(id, dados);
        toast({
          title: 'Template atualizado com sucesso.',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      } else {
        await templateService.criarTemplate(dados);
        toast({
          title: 'Template criado com sucesso.',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      }
      navigate('/templates');
    } catch (err) {
      console.error('Erro ao salvar Template:', err); // Debug
      toast({
        title: 'Erro ao salvar Template.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      actions.setSubmitting(false);
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
      <Heading mb={6}>{isEdit ? 'Editar Template' : 'Adicionar Template'}</Heading>
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
                    <Input {...field} placeholder="Nome do Template" />
                    <FormErrorMessage>{form.errors.nome}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name="codigo">
                {({ field, form }) => (
                  <FormControl isInvalid={form.errors.codigo && form.touched.codigo} isRequired>
                    <FormLabel>Código</FormLabel>
                    <Input {...field} placeholder="Código do Template" />
                    <FormErrorMessage>{form.errors.codigo}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name="descricao">
                {({ field, form }) => (
                  <FormControl isInvalid={form.errors.descricao && form.touched.descricao}>
                    <FormLabel>Descrição</FormLabel>
                    <Textarea {...field} placeholder="Descrição do Template (Opcional)" />
                    <FormErrorMessage>{form.errors.descricao}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name="templateEjs">
                {({ field, form }) => (
                  <FormControl
                    isInvalid={form.errors.templateEjs && form.touched.templateEjs}
                    isRequired
                  >
                    <FormLabel>Template EJS</FormLabel>
                    <Textarea
                      {...field}
                      placeholder="Conteúdo do Template EJS"
                      height="200px"
                    />
                    <FormErrorMessage>{form.errors.templateEjs}</FormErrorMessage>
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

export default TemplateForm;
