import React, { useState } from 'react';
import axios from 'axios';
import { Box, Input, Button, FormControl, FormLabel, Text } from '@chakra-ui/react';

const MFAChallenge = ({ username, session, setAuthToken, setPage, apiUrl, setMessage }) => {
  const [mfaCode, setMfaCode] = useState('');

  const handleMfaSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${apiUrl}/auth/respond-to-mfa-challenge`, {
        username,
        mfaCode,
        session,
      });

      if (response.data.accessToken) {
        setAuthToken(response.data.accessToken);
        localStorage.setItem('authToken', response.data.accessToken);
        localStorage.setItem('Username', username);
        setMessage('Login successful!');
        setPage('home');
      } else {
        setMessage('Failed to authenticate with MFA.');
      }
    } catch (error) {
      setMessage(error.response?.data || 'Error during MFA authentication.');
    }
  };

  return (
    <Box maxW="md" mx="auto" mt={8}>
      <form onSubmit={handleMfaSubmit}>
        <FormControl id="mfaCode" isRequired>
          <FormLabel>Enter your MFA code</FormLabel>
          <Input
            type="text"
            value={mfaCode}
            onChange={(e) => setMfaCode(e.target.value)}
            placeholder="MFA Code"
          />
        </FormControl>
        <Button mt={4} colorScheme="teal" type="submit">
          Submit
        </Button>
      </form>
    </Box>
  );
};

export default MFAChallenge;