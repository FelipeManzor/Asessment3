import React from 'react';
import { Box, Heading, Text, Image, VStack, Flex, useColorModeValue } from '@chakra-ui/react';
import { motion } from 'framer-motion';


// picture from https://www.pinterest.es/pin/578360777181619269/
// Import images from the src/img folder
import tessellationImage1 from '../img/tessellation1.png';
import tessellationImage2 from '../img/tessellation2.png';

const About = () => {
  // Chakra UI color modes
  const bg = useColorModeValue('gray.100', 'gray.700');
  const headingColor = useColorModeValue('teal.600', 'teal.300');
  const textColor = useColorModeValue('gray.800', 'gray.200');

  return (
    <Box as="main" p={6} bg={bg} borderRadius="md" boxShadow="xl">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: 'easeOut' }}
      >
        <Heading as="h2" size="2xl" mb={6} color={headingColor} textAlign="center">
          About This Application
        </Heading>
      </motion.div>

      <Flex direction={{ base: 'column', md: 'row' }} align="center" justify="space-between">
        {/* Text Section */}
        <VStack spacing={6} align="start" flex="1" mr={{ md: 8 }}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 1 }}
          >
            <Text fontSize="lg" fontWeight="bold" color={headingColor}>
              What is Tessellation?
            </Text>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 1 }}
          >
            <Text fontSize="md" color={textColor}>
              Tessellation is a pattern made of identical shapes that fit together without any gaps.
              The word 'tessellate' is derived from the Latin word 'tessera', meaning a small,
              square-shaped tile used in mosaics. Tessellations can be found in nature, art, and
              architecture, and they are often used in mathematics to study patterns and symmetries.
            </Text>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 1 }}
          >
            <Text fontSize="md" color={textColor}>
              Tessellations can be regular, where all tiles are the same regular polygon, or
              semi-regular, where two or more different regular polygons are used to create the
              pattern. They are used in various applications, from creating artistic designs to
              solving problems in mathematics and science.
            </Text>
          </motion.div>
        </VStack>

        {/* Images Section */}
        <VStack spacing={6} align="center" flex="1">
          <Flex align="center" justify="center">
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.95, rotate: -5 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <Image src={tessellationImage1} alt="Tessellation example 1" borderRadius="md" boxShadow="lg" />
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.1, rotate: -5 }}
              whileTap={{ scale: 0.95, rotate: 5 }}
              transition={{ type: 'spring', stiffness: 300 }}
              style={{ marginLeft: '-100px', zIndex: -1 }}
            >
              <Image src={tessellationImage2} alt="Tessellation example 2" borderRadius="md" boxShadow="lg" />
            </motion.div>
          </Flex>
        </VStack>
      </Flex>
    </Box>
  );
};

export default About;
