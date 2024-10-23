/* eslint-disable no-unused-vars */
// src/pages/Login.jsx
import React, { useState } from "react";
import {
  Box,
  Button,
  Input,
  FormControl,
  FormLabel,
  Heading,
  VStack,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const url = import.meta.env.VITE_API_URL;
      const response = await axios.post(`${url}/auth/login`, {
        email,
        senha,
      });
      localStorage.setItem("token", response.data.token);
      navigate("/");
    } catch (err) {
      setError("Credenciais inválidas");
    }
  };

  return (
    <Box maxW="md" mx="auto" mt={10} p={6} boxShadow="md" borderRadius="md">
      <Heading mb={6}>Login</Heading>
      {error && (
        <Alert status="error" mb={4}>
          <AlertIcon />
          {error}
        </Alert>
      )}
      <VStack spacing={4}>
        <FormControl id="email" isRequired>
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Seu email"
          />
        </FormControl>
        <FormControl id="senha" isRequired>
          <FormLabel>Senha</FormLabel>
          <Input
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            placeholder="Sua senha"
          />
        </FormControl>
        <Button colorScheme="teal" width="full" onClick={handleLogin}>
          Entrar
        </Button>
      </VStack>
      <Box>vs 0.0.2</Box>
    </Box>
  );
}

export default Login;
