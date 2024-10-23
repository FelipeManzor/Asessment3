import React, { useState,useRef } from 'react';
import { Box, Heading, FormControl, FormLabel, Input, Button, Text, Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import ProgressComponent from '../components/ProgressComponent'; // Import ProgressComponent

const Home = ({ 
  authToken, 
  apiUrl, 
  setMessage, 
  colors 
}) => {
  const [resizeWidth, setResizeWidth] = useState(200);
  const [resizeHeight, setResizeHeight] = useState(200);
  const [collageRows, setCollageRows] = useState(3);
  const [collageCols, setCollageCols] = useState(3);
  const [outputSizeWidth, setOutputSizeWidth] = useState(1000);
  const [outputSizeHeight, setOutputSizeHeight] = useState(1000);

  const [uploadId, setUploadId] = useState(null);
  const [processingStatus, setProcessingStatus] = useState('');
  const [processingProgress, setProcessingProgress] = useState(0);
  const [processedImageUrl, setProcessedImageUrl] = useState('');
  const [collageImageUrl, setCollageImageUrl] = useState('');

  const uploadIdRef = useRef(null);
  const handleFileChange = (e) => {
  };


  const handleUpload = async (formData) => {
    try {
      const response = await fetch(`${apiUrl}/images/upload/start`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${authToken}`,
        },
        body: formData,
      });
      // console.log(formData)
      if (response.ok) {
        const data = await response.json();
        const id = data.imageId;
        setProcessingStatus('Uploading')
        monitorProgress(id);
  
        if (typeof id === 'string') {
          setUploadId(id);
          setProcessingStatus('Upload Done')
          monitorProgress(id);
          startProcessing(id);
        } else {
          console.error('Invalid imageId format:', id);
        }
      } else {
        setMessage('Failed to upload image.');
      }
    } catch (error) {
      setMessage(`Error uploading image. ${error}`);
    }
  };
  

  const startProcessing = async (id) => {
    try {
      const formData = new FormData();
      formData.append('resizeWidth', resizeWidth);
      formData.append('resizeHeight', resizeHeight);
      formData.append('collageRows', collageRows);
      formData.append('collageCols', collageCols);
      formData.append('outputSizeWidth', outputSizeWidth);
      formData.append('outputSizeHeight', outputSizeHeight);
      formData.append('username',localStorage.getItem("Username") )
      console.log(`${id} in starprocessing` )
      monitorProgress(id)
      const response = await fetch(`${apiUrl}/images/upload/process/${id}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${authToken}`,
        },
        body: formData,
      });

      if (response.ok) {
        setProcessingStatus('Processing started');
      } else {
        setMessage('Failed to start processing.');
      }
    } catch (error) {
      setMessage(`Error starting processing. ${error}`);
    }
  };

 const monitorProgress = (id) => {
  uploadIdRef.current = id; // Set the ref to the current ID


  const intervalId = setInterval(async () => {
    try {
      const currentId = uploadIdRef.current; 
      const response = await fetch(`${apiUrl}/images/progress/${currentId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${authToken}`,
        },
      });
      console.log(response);
      if (response.ok) {
        const data = await response.json();
        setProcessingStatus(data.processingStatus);
        setProcessingProgress(data.progressPercentage);

        if (data.progressPercentage === 100 && data.collageImageUrl ) {
          setProcessedImageUrl(`${data.processedImageUrl}`);
          setCollageImageUrl(`${data.collageImageUrl}`);
          // console.log('HEREEEEE');
          // console.log(data.collageImageUrl);
          clearInterval(intervalId); 
        }
      } else {
        setMessage('Failed to get progress.');
      }
    } catch (error) {
      setMessage(`Error fetching progress. ${error}`);
    }
  }, 500); // Poll every second
};


  
  const handleSubmit = async (e) => {
    e.preventDefault();

    setProcessingStatus('');
    setProcessingProgress(0);
    setProcessedImageUrl('');
    setCollageImageUrl('');
  

    const formData = new FormData();
    formData.append('resizeWidth', resizeWidth);
    formData.append('resizeHeight', resizeHeight);
    formData.append('collageRows', collageRows);
    formData.append('collageCols', collageCols);
    formData.append('outputSizeWidth', outputSizeWidth);
    formData.append('outputSizeHeight', outputSizeHeight);
    formData.append('username', localStorage.getItem("Username"));
    monitorProgress(uploadId)
    const fileInput = e.target.querySelector('input[type="file"]');
    if (fileInput.files[0]) {
      formData.append('image', fileInput.files[0]);
      await handleUpload(formData); // Use handleUpload to handle the upload and start processing
    } else {
      setMessage('Please select a file');
    }
  };

  // Default color values
  const {
    bgColor = "gray.100",
    cardBgColor = "white",
    headingColor = "teal.600",
    inputBorderColor = "gray.300",
    tabBgColor = "gray.100",
    tabBorderColor = "gray.300",
    imageBoxShadow = "sm",
  } = colors || {};

  return (
    <Box as="main" p={6} bg={bgColor} minH="100vh">
      <Box display="flex" mb={6} borderRadius="md" bg={cardBgColor} boxShadow="md" p={4}>
        <Box flex="1" mr={6} borderRadius="md" bg={tabBgColor} p={4} boxShadow="md">
          
          <Heading as="h2" size="lg" mb={4} color={headingColor}>Upload Image</Heading>
          {authToken ? (
            <form onSubmit={handleSubmit}>
              <Text>Welcome {localStorage.getItem('Username')}</Text>
              <FormControl mb={4}>
                <FormLabel color={headingColor}>Image:</FormLabel>
                <Input type="file" onChange={handleFileChange} required />
              </FormControl>
              <Button mt={4} type="submit" colorScheme="blue">Upload</Button>
            </form>
          ) : (
            <Text color={headingColor}>Please log in to upload an image.</Text>
          )}
        </Box>
  
        <Box flex="2" borderRadius="md" bg={tabBgColor} p={4} boxShadow="md">
          <Heading as="h3" size="md" mb={4} color={headingColor}>Optional Parameters</Heading>
          <Tabs variant="enclosed" colorScheme="blue">
            <TabList>
              <Tab _selected={{ bg: tabBorderColor }}>Input Size</Tab>
              <Tab _selected={{ bg: tabBorderColor }}>Collage Options</Tab>
              <Tab _selected={{ bg: tabBorderColor }}>Output Options</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <FormControl mb={4}>
                  <FormLabel>Resize Width:</FormLabel>
                  <Input
                    type="number"
                    value={resizeWidth}
                    onChange={(e) => setResizeWidth(parseInt(e.target.value, 10))}
                    borderColor={inputBorderColor}
                  />
                </FormControl>
                <FormControl mb={4}>
                  <FormLabel>Resize Height:</FormLabel>
                  <Input
                    type="number"
                    value={resizeHeight}
                    onChange={(e) => setResizeHeight(parseInt(e.target.value, 10))}
                    borderColor={inputBorderColor}
                  />
                </FormControl>
              </TabPanel>
              <TabPanel>
                <FormControl mb={4}>
                  <FormLabel>Collage Rows:</FormLabel>
                  <Input
                    type="number"
                    value={collageRows}
                    onChange={(e) => setCollageRows(parseInt(e.target.value, 10))}
                    borderColor={inputBorderColor}
                  />
                </FormControl>
                <FormControl mb={4}>
                  <FormLabel>Collage Columns:</FormLabel>
                  <Input
                    type="number"
                    value={collageCols}
                    onChange={(e) => setCollageCols(parseInt(e.target.value, 10))}
                    borderColor={inputBorderColor}
                  />
                </FormControl>
              </TabPanel>
              <TabPanel>
                <FormControl mb={4}>
                  <FormLabel>Output Size Width:</FormLabel>
                  <Input
                    type="number"
                    value={outputSizeWidth}
                    onChange={(e) => setOutputSizeWidth(parseInt(e.target.value, 10))}
                    borderColor={inputBorderColor}
                  />
                </FormControl>
                <FormControl mb={4}>
                  <FormLabel>Output Size Height:</FormLabel>
                  <Input
                    type="number"
                    value={outputSizeHeight}
                    onChange={(e) => setOutputSizeHeight(parseInt(e.target.value, 10))}
                    borderColor={inputBorderColor}
                  />
                </FormControl>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
        
      </Box>
      {processingStatus && (
            <ProgressComponent
            status={processingStatus}
            progress={processingProgress}
            imageUrl={processedImageUrl}
            collageUrl={collageImageUrl}
            headingColor={headingColor}
            imageBoxShadow={imageBoxShadow}
            />
          )}
    </Box>
  );
};
  export default Home;