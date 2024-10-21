// src/pages/MoedaForm.jsx
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
  FormErrorMessage,
} from '@chakra-ui/react';
import { useNavigate, useParams } from 'react-router-dom';
import moedaService from '../services/moedaService';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';

function MoedaForm() {
  const { id } = useParams();
  const isEdit = !!id;
  const [initialValues, setInitialValues] = useState({
    nome: '',
    simbolo: '',
    tipoCotacao: '',
    valor: '',
    status: 'ativo',
  });
  const [loading, setLoading] = useState(isEdit);
  const toast = useToast();
  const navigate = useNavigate();

  // Função para obter dados da Moeda para edição
  const fetchMoeda = async () => {
    try {
      const response = await moedaService.obterMoeda(id);
      const data = response.data;
      setInitialValues({
        nome: data.nome,
        simbolo: data.simbolo,
        tipoCotacao: data.tipoCotacao,
        valor: data.valor,
        status: data.status,
      });
    } catch (err) {
      console.error('Erro ao obter Moeda:', err); // Debug
      toast({
        title: 'Erro ao carregar Moeda.',
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
      fetchMoeda();
    }
  }, [id, isEdit]);

  const validationSchema = Yup.object({
    nome: Yup.string().required('Nome é obrigatório'),
    simbolo: Yup.string()
      .max(5, 'Símbolo deve ter no máximo 5 caracteres')
      .required('Símbolo é obrigatório'),
    tipoCotacao: Yup.string()
      .oneOf(['cotacao', 'porcentagem', 'valorFixo'], 'Tipo de Cotação inválido')
      .required('Tipo de Cotação é obrigatório'),
    valor: Yup.number()
      .positive('Valor deve ser positivo')
      .required('Valor é obrigatório'),
    status: Yup.string()
      .oneOf(['ativo', 'inativo', 'arquivado'], 'Status inválido')
      .required('Status é obrigatório'),
  });

  const handleSubmit = async (values, actions) => {
    try {
      const dados = {
        nome: values.nome,
        simbolo: values.simbolo,
        tipoCotacao: values.tipoCotacao,
        valor: values.tipoCotacao === 'cotacao' ? 0 : parseFloat(values.valor),
        status: values.status,
      };

      if (isEdit) {
        await moedaService.atualizarMoeda(id, dados);
        toast({
          title: 'Moeda atualizada com sucesso.',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      } else {
        await moedaService.criarMoeda(dados);
        toast({
          title: 'Moeda criada com sucesso.',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      }
      navigate('/moedas');
    } catch (err) {
      console.error('Erro ao salvar Moeda:', err); // Debug
      toast({
        title: 'Erro ao salvar Moeda.',
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
      <Heading mb={6}>{isEdit ? 'Editar Moeda' : 'Adicionar Moeda'}</Heading>
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
                    <Input {...field} placeholder="Nome da Moeda" />
                    <FormErrorMessage>{form.errors.nome}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name="simbolo">
                {({ field, form }) => (
                  <FormControl isInvalid={form.errors.simbolo && form.touched.simbolo} isRequired>
                    <FormLabel>Símbolo</FormLabel>
                    <Input {...field} placeholder="Símbolo da Moeda (e.g., USD)" />
                    <FormErrorMessage>{form.errors.simbolo}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name="tipoCotacao">
                {({ field, form }) => (
                  <FormControl
                    isInvalid={form.errors.tipoCotacao && form.touched.tipoCotacao}
                    isRequired
                  >
                    <FormLabel>Tipo de Cotação</FormLabel>
                    <Select {...field} placeholder="Selecione o Tipo de Cotação">
                      <option value="cotacao">Cotação</option>
                      <option value="porcentagem">Porcentagem</option>
                      <option value="valorFixo">Valor Fixo</option>
                    </Select>
                    <FormErrorMessage>{form.errors.tipoCotacao}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name="valor">
                {({ field, form }) => (
                  <FormControl
                    isInvalid={form.errors.valor && form.touched.valor}
                    isRequired={form.values.tipoCotacao !== 'cotacao'}
                  >
                    <FormLabel>Valor</FormLabel>
                    <Input
                      {...field}
                      type="number"
                      step="0.01"
                      placeholder={
                        form.values.tipoCotacao === 'cotacao'
                          ? 'Será calculado automaticamente'
                          : 'Valor para porcentagem ou valor fixo'
                      }
                      disabled={form.values.tipoCotacao === 'cotacao'}
                    />
                    <FormErrorMessage>{form.errors.valor}</FormErrorMessage>
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

export default MoedaForm;
