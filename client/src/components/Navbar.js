import React from 'react';
import { Flex, HStack, Button, useColorModeValue } from '@chakra-ui/react';
import { motion } from 'framer-motion';

// Create a motion-enhanced Button component
const MotionButton = motion(Button);

const Navbar = ({ authToken, handleLogout, setPage, userGroups }) => {
  // Chakra UI color modes
  const buttonBg = useColorModeValue('teal.500', 'teal.300');
  const buttonHoverBg = useColorModeValue('teal.600', 'teal.400');
  const buttonActiveBg = useColorModeValue('teal.700', 'teal.500');

  const isUserInGroup = (group) => {
    return userGroups.includes(group);
  };

  return (
    <Flex justify="center" mb={4}>
      <HStack spacing={4}>
        <MotionButton
          onClick={() => setPage('home')}
          bg={buttonBg}
          color="white"
          _hover={{ bg: buttonHoverBg }}
          _active={{ bg: buttonActiveBg }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          Home
        </MotionButton>

        <MotionButton
          onClick={() => setPage('about')}
          bg={buttonBg}
          color="white"
          _hover={{ bg: buttonHoverBg }}
          _active={{ bg: buttonActiveBg }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          About
        </MotionButton>

        {authToken && (
          <>
            <MotionButton
              onClick={() => setPage('PictureGallery')}
              bg={buttonBg}
              color="white"
              _hover={{ bg: buttonHoverBg }}
              _active={{ bg: buttonActiveBg }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              History
            </MotionButton>




            {isUserInGroup('Admins') && (
            <MotionButton
            onClick={() => setPage('logs')}  // Add Logs button for authenticated users
            bg={buttonBg}
            color="white"
            _hover={{ bg: buttonHoverBg }}
            _active={{ bg: buttonActiveBg }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            Logs
          </MotionButton>
            )}

            {/* MFA button here */}
            <MotionButton
              onClick={() => setPage('mfaSetup')}
              bg={buttonBg}
              color="white"
              _hover={{ bg: buttonHoverBg }}
              _active={{ bg: buttonActiveBg }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              MFA
            </MotionButton>

            <MotionButton
              onClick={handleLogout}
              bg={buttonBg}
              color="white"
              _hover={{ bg: buttonHoverBg }}
              _active={{ bg: buttonActiveBg }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              Logout
            </MotionButton>
          </>
        )}

        {!authToken && (
          <>
            <MotionButton
              onClick={() => setPage('login')}
              bg={buttonBg}
              color="white"
              _hover={{ bg: buttonHoverBg }}
              _active={{ bg: buttonActiveBg }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              Login
            </MotionButton>

            <MotionButton
              onClick={() => setPage('register')}
              bg={buttonBg}
              color="white"
              _hover={{ bg: buttonHoverBg }}
              _active={{ bg: buttonActiveBg }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              Register
            </MotionButton>
          </>
        )}
      </HStack>
    </Flex>
  );
};

export default Navbar;
