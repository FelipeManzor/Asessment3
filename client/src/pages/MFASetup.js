// src/pages/MFASetup.js
import React, { useState } from 'react';
import axios from 'axios';
import { Box, Button, Image, Input, Text } from '@chakra-ui/react';

const MFASetup = ({ authToken, setPage, apiUrl, setMessage }) => {
  const [qrCode, setQrCode] = useState('');
  const [userCode, setUserCode] = useState('');

  const initiateMfaSetup = async () => {
    try {
      const response = await axios.post(
        `${apiUrl}/auth/mfa/totp/setup`,
        {},
        {
          headers: {
            'Authorization': `Bearer ${authToken}`,
            'Content-Type': 'application/json',
          },
        }
      );

      setQrCode(response.data.qrCode);
    } catch (error) {
      setMessage(error.response?.data.message || 'Error initiating MFA setup.');
    }
  };

  const handleVerifyMfaCode = async () => {
    try {
      await axios.post(
        `${apiUrl}/auth/mfa/totp/verify`,
        { UserCode: userCode },
        {
          headers: {
            'Authorization': `Bearer ${authToken}`,
            'Content-Type': 'application/json',
          },
        }
      );

      setMessage('MFA setup successful!');
      setPage('home');
    } catch (error) {
      setMessage(error.response?.data.message || 'Error verifying MFA code.');
    }
  };

  // Disable MFA function
  const handleDisableMfa = async () => {
    try {
      const response = await axios.post(
        `${apiUrl}/auth/mfa/disable`,
        {},
        {
          headers: {
            'Authorization': `Bearer ${authToken}`,
            'Content-Type': 'application/json',
          },
        }
      );

      setMessage('MFA disabled successfully!');
      setPage('home');
    } catch (error) {
      setMessage(error.response?.data.message || 'Error disabling MFA.');
    }
  };

  return (
    <Box maxW="md" mx="auto" mt={8} textAlign="center">
      {!qrCode ? (
        <>
          <Button onClick={initiateMfaSetup} colorScheme="teal">
            Setup MFA
          </Button>
        </>
      ) : (
        <>
          <Text>Scan the QR code with your authenticator app.</Text>
          <Image src={qrCode} alt="QR Code" my={4} />
          <Text>Then enter the 6-digit code from your authenticator app.</Text>
          <Input
            type="text"
            value={userCode}
            onChange={(e) => setUserCode(e.target.value)}
            placeholder="Enter MFA Code"
            mt={4}
          />
          <Button onClick={handleVerifyMfaCode} colorScheme="teal" mt={4}>
            Verify Code
          </Button>

          {/* Add the button to disable MFA */}
          <Button onClick={handleDisableMfa} colorScheme="red" mt={4}>
            Disable MFA
          </Button>
        </>
      )}
    </Box>
  );
};

export default MFASetup;
