import React, { useEffect, useState } from 'react';
import { Box, Image, Text, Flex, Spinner, Heading, useColorModeValue } from '@chakra-ui/react';
import axios from 'axios';

const PictureGallery = ({apiUrl, username}) => {
  const [pictures, setPictures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Chakra UI color modes
  const bg = useColorModeValue('gray.100', 'gray.800');
  const textColor = useColorModeValue('gray.800', 'gray.200');
  
  useEffect(() => {
    const fetchPictures = async () => {
      try {
        const username = localStorage.getItem('Username');
        console.log(username)
        if (username) {
          const response = await axios.get(`${apiUrl}/images/pictures/${username}`);
          setPictures(response.data);
        } else {
          setError('No username found in localStorage');
        }
      } catch (error) {
        setError('Error fetching pictures');
      } finally {
        setLoading(false);
      }
    };

    fetchPictures();
  }, []);

  if (loading) {
    return (
      <Flex align="center" justify="center" minHeight="100vh" bg={bg}>
        <Spinner size="xl" />
      </Flex>
    );
  }

  if (error) {
    return (
      <Flex align="center" justify="center" minHeight="100vh" bg={bg}>
        <Text color="red.500">{error}</Text>
      </Flex>
    );
  }

  return (
    <Box as="main" p={6} bg={bg} minHeight="100vh">
      <Heading as="h2" size="xl" mb={6} color={textColor} textAlign="center">
        Picture Gallery
      </Heading>
      <Flex wrap="wrap" justify="center">
        {pictures.map((picture) => (
          <Box key={picture._id} p={4}>
            <Image
              src={`${picture.presignedUrlCollage}`} // Adjust the path based on your setup
              alt={picture.originalName}
              boxSize="200px"
              objectFit="cover"
              borderRadius="md"
              boxShadow="lg"
            />
            <Text color={textColor} mt={2} textAlign="center">{picture.uploadDate}</Text>
          </Box>
        ))}
      </Flex>
    </Box>
  );
};

export default PictureGallery;