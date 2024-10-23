import React from 'react';
import { Box, Progress, Text, Heading, Image } from '@chakra-ui/react';



const ProgressComponent = ({ status, progress, imageUrl, collageUrl, headingColor, imageBoxShadow }) => {
  // Log props to debug
  console.log('ProgressComponent props:');
  console.log('Status:', status);
  console.log('Progress:', progress);
  console.log('Image URL:', imageUrl);

  return (
    <Box mt={4} p={4} borderRadius="md" bg="white" boxShadow="md">
      <Heading as="h4" size="sm" mb={2} color={headingColor}>Processing Status</Heading>
      <Text mb={2} color={headingColor}>{status}</Text>
      <Progress value={progress} size="lg" colorScheme="blue" hasStripe isAnimated mb={4} />
      <Text mb={2} color={headingColor}>{progress}%</Text>
      {imageUrl && (
        <Box mt={4}>
          <Heading as="h5" size="sm" mb={2} color={headingColor}>Processed Image</Heading>
          <Image src={imageUrl} alt="Processed" borderRadius="md" boxShadow={imageBoxShadow} />
        </Box>
      )}
      {collageUrl && (
        <Box mt={4}>
          <Heading as="h5" size="sm" mb={2} color={headingColor}>Collage Image</Heading>
          <Image src={collageUrl} alt="Collage" borderRadius="md" boxShadow={imageBoxShadow} />
        </Box>
      )}
    </Box>
  );
};

export default ProgressComponent;
