import React from 'react';
import { Box, Image, Heading } from '@chakra-ui/react';

const ImageDisplay = ({ imageUrl, collageUrl, headingColor, imageBoxShadow }) => (
  <Box>
    {imageUrl && (
      <Box mt={4}>
        <Heading as="h4" size="sm" mb={2} color={headingColor}>Processed Image</Heading>
        <Image src={imageUrl} alt="Processed" borderRadius="md" boxShadow={imageBoxShadow} />
      </Box>
    )}
    {collageUrl && (
      <Box mt={4}>
        <Heading as="h4" size="sm" mb={2} color={headingColor}>Collage Image</Heading>
        <Image src={collageUrl} alt="Collage" borderRadius="md" boxShadow={imageBoxShadow} />
      </Box>
    )}
  </Box>
);

export default ImageDisplay;
