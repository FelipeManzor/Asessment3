// src/pages/ValidationCode.jsx

import React, { useState } from 'react';
import axios from 'axios';
import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Flex,
  useColorModeValue,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';

// Motion components for animations
const MotionBox = motion(Box);
const MotionButton = motion(Button);

const ValidationCode = ({ username, setPage, apiUrl }) => {
  const [code, setCode] = useState('');
  const [message, setMessage] = useState('');

  // Chakra UI color modes
  const bg = useColorModeValue('gray.100', 'gray.800');
  const headingColor = useColorModeValue('teal.600', 'teal.300');
  const textColor = useColorModeValue('gray.800', 'gray.200');
  const inputBg = useColorModeValue('white', 'gray.600');

  const handleCodeSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${apiUrl}/auth/verify`, { username, code });
      setMessage('Account verified successfully! Please log in.');
      setPage('login');
    } catch (error) {
      setMessage(
        error.response?.data?.message || 'Invalid code. Please try again.'
      );
    }
  };

  return (
    <Box as="main" p={6} bg={bg} minHeight="100vh">
      <Flex
        direction="column"
        align="center"
        justify="center"
        minHeight="100vh"
        p={6}
      >
        {/* Animated container */}
        <MotionBox
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          bg={bg}
          p={8}
          borderRadius="md"
          boxShadow="lg"
          maxWidth="400px"
          width="100%"
        >
          <Heading
            as="h2"
            size="xl"
            mb={6}
            color={headingColor}
            textAlign="center"
          >
            Verify Your Account
          </Heading>
          <Text mb={4} color={textColor} textAlign="center">
            We've sent a 6-digit code to your email for username:{' '}
            <strong>{username}</strong>
          </Text>
          <form onSubmit={handleCodeSubmit}>
            <FormControl id="code" mb={6}>
              <FormLabel>Verification Code:</FormLabel>
              <Input
                type="text"
                placeholder="Enter 6-digit code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                maxLength={6}
                required
                bg={inputBg}
                borderColor={headingColor}
                _hover={{ borderColor: 'teal.500' }}
                _focus={{ borderColor: 'teal.500', boxShadow: 'outline' }}
              />
            </FormControl>
            <MotionButton
              type="submit"
              colorScheme="teal"
              size="lg"
              width="full"
              mt={4}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              Verify Account
            </MotionButton>
          </form>
          {message && (
            <Text mt={4} color={message.includes('successfully') ? 'green.500' : 'red.500'} textAlign="center">
              {message}
            </Text>
          )}
        </MotionBox>
      </Flex>
    </Box>
  );
};

export default ValidationCode;
