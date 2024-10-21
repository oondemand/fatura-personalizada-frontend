// src/pages/Dashboard.jsx
import { Box, Heading, VStack, Button, Flex, Spacer } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <Box p={6}>
      <Flex mb={6}>
        <Heading>Dashboard</Heading>
        <Spacer />
        <Button colorScheme="red" onClick={handleLogout}>
          Logout
        </Button>
      </Flex>
      <VStack spacing={4}>
        <Button colorScheme="teal" width="200px" onClick={() => navigate('/usuarios')}>
          Gerenciar Usuários
        </Button>
        <Button colorScheme="teal" width="200px" onClick={() => navigate('/configuracoes')}>
          Gerenciar Configurações
        </Button>
        <Button colorScheme="teal" width="200px" onClick={() => navigate('/moedas')}>
          moedas
        </Button>
         <Button colorScheme="teal" width="200px" onClick={() => navigate('/baseomie')}>
         base-omies
        </Button>
        <Button colorScheme="teal" width="200px" onClick={() => navigate('/includes')}>
        includes
        </Button>
        <Button colorScheme="teal" width="200px" onClick={() => navigate('/templates')}>
        templates
        </Button>
      </VStack>
    </Box>
  );
}

export default Dashboard;
