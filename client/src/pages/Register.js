import React from 'react';
import { Box, Heading, FormControl, FormLabel, Input, Button, Text, Flex, useColorModeValue } from '@chakra-ui/react';
import { motion } from 'framer-motion';

// Motion component for animations
const MotionBox = motion(Box);
const MotionButton = motion(Button);

const Register = ({ username, setUsername, password, setPassword, handleRegister, message }) => {
  // Chakra UI color modes
  const bg = useColorModeValue('gray.100', 'gray.800');
  const headingColor = useColorModeValue('teal.600', 'teal.300');
  const textColor = useColorModeValue('gray.800', 'gray.200');
  const inputBg = useColorModeValue('white', 'gray.600');

  return (
    <Box as="main" p={6} bg={bg} borderRadius="md" boxShadow="xl" minHeight="100vh">
      <Flex
        direction={{ base: 'column', md: 'row' }}
        align="center"
        justify="center"
        minHeight="100vh"
        p={6}
      >
        {/* Form Section */}
        <MotionBox
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          bg={bg}
          p={8}
          borderRadius="md"
          boxShadow="lg"
          maxWidth="400px"
          width="100%"
        >
          <Heading as="h2" size="xl" mb={6} color={headingColor} textAlign="center">
            Register
          </Heading>
          <form onSubmit={handleRegister}>
            <FormControl id="username" mb={4}>
              <FormLabel>Email:</FormLabel>
              <Input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                bg={inputBg}
                borderColor={headingColor}
              />
            </FormControl>
            <FormControl id="password" mb={6}>
              <FormLabel>Password:</FormLabel>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                bg={inputBg}
                borderColor={headingColor}
              />
            </FormControl>
            <MotionButton
              type="submit"
              colorScheme="teal"
              size="lg"
              width="full"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              Register
            </MotionButton>
            <Text mt={4} color={textColor} textAlign="center">{message}</Text>
          </form>
        </MotionBox>
      </Flex>
    </Box>
  );
};

export default Register;
