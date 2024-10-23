import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ChakraProvider, Box, Heading, Image } from '@chakra-ui/react';
import Navbar from './components/Navbar';
import Home from './pages/Home'; 
import About from './pages/About'; 
import Login from './pages/Login'; 
import Register from './pages/Register';
import PictureGallery from './pages/Gallery';
import ValidationCode from './pages/ValidationCode'; // Import the new component
import Logs from './pages/Logs'; // Import Logs component
import bannerImage from './img/baner.png';
import MFAChallenge from './pages/MFAChallenge';
import MFASetup from './pages/MFASetup';

const { SSMClient, GetParameterCommand } = require('@aws-sdk/client-ssm');
const client = new SSMClient({ region: "ap-southeast-2" });

function decodeJWT(token) {
  const payload = JSON.parse(atob(token.split('.')[1]));
  return payload['cognito:groups'] || [];
}

const App = () => {
  const [page, setPage] = useState('home');
  const [authToken, setAuthToken] = useState(localStorage.getItem('authToken') || '');
  const [username, setUsername] = useState('');
  const [registeredUsername, setRegisteredUsername] = useState('');
  const [password, setPassword] = useState('');
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const [processedImageUrl, setProcessedImageUrl] = useState('');
  const [collageImageUrl, setCollageImageUrl] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [processingStatus, setProcessingStatus] = useState('');
  const [processingProgress, setProcessingProgress] = useState('');
  const [apiUrl, setApiUrl] = useState('');
  const [session, setSession] = useState('');
  const [userGroups, setUserGroups] = useState([]);

  useEffect(() => {
    const fetchApiUrl = async () => {
      const client = new SSMClient({
        region: 'ap-southeast-2'
      });

      const parameterName = '/n11373725/asessment3/client';

      try {
        const response = await client.send(
          new GetParameterCommand({
            Name: parameterName,
            WithDecryption: true,
          })
        );
        setApiUrl(response.Parameter.Value); // Store the API URL from SSM
      } catch (error) {
        console.error('Error retrieving API URL:', error);
      }
    };

    fetchApiUrl();
  }, []);

const handleLogin = async (e) => {
  e.preventDefault();
  try {
    const response = await axios.post(`${apiUrl}/auth/login`, { username, password });

    if (response.data.ChallengeName === 'MFA_SETUP') {
      // MFA needs to be set up
      setSession(response.data.Session);
      setRegisteredUsername(username);
      setMessage('MFA setup required.');
      setPage('mfaSetup');
    } else if (response.data.ChallengeName === 'SOFTWARE_TOKEN_MFA') {
      // Existing MFA setup, proceed to MFA challenge
      setSession(response.data.Session);
      setMessage('MFA required. Please enter your MFA code.');
      setPage('mfaChallenge');
    } else if (response.data.accessToken) {
      // Login successful
      setAuthToken(response.data.accessToken);
      localStorage.setItem('authToken', response.data.accessToken);
      localStorage.setItem('Username', username);
      setMessage('Login successful!');
      setPage('home');
    } else {
      setMessage('Unexpected response from server.');
    }
  } catch (error) {
    setMessage(error.response?.data.message || 'Invalid credentials');
  }
};


  const handleRegister = async (e) => {
    e.preventDefault();
    if (username.length < 3 || password.length < 5) {
      setMessage('Username must be at least 3 characters and password must be at least 5 characters.');
      return;
    }
    try {
      await axios.post(`${apiUrl}/auth/register`, { username, password });
      setMessage('Registration successful! Please enter the validation code sent to your email.');
      setRegisteredUsername(username);
      setPage('validationCode');
    } catch (error) {
      console.log(error)
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async (formData) => {
    try {
      setUploadProgress(0);

      const response = await axios.post(`${apiUrl}/images/upload`, formData, {
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: (progressEvent) => {
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setUploadProgress(progress);
        }
      });

      setMessage('Image uploaded successfully!');
      setProcessedImageUrl(response.data.processedImageUrl);
      setCollageImageUrl(response.data.collageImageUrl);

    } catch (error) {
      if (error.response?.status === 403) {
        setMessage('Authentication required. Please log in.');
      } else {
        setMessage('Error uploading image');
      }
    }
  };

  const handleLogout = () => {
    setAuthToken('');
    localStorage.removeItem('authToken');
    localStorage.removeItem('Username');
    setMessage('Logged out successfully');
    setPage('home');
    setProcessedImageUrl('');
    setCollageImageUrl('');
  };

  return (
    <ChakraProvider>
      <Box className="App" p={4}>
        <Box 
          textAlign="center" 
          mb={8} 
          display="flex" 
          flexDirection="column" 
          alignItems="center">
          <Image src={bannerImage} alt="Banner" minW="300px" maxW="400px"/>
        </Box>
        <Navbar authToken={authToken} setPage={setPage} handleLogout={handleLogout} userGroups={userGroups} />
        {page === 'home' && (
          <Home
            authToken={authToken}
            file={file}
            handleFileChange={handleFileChange}
            handleUpload={handleUpload}
            message={message}
            processedImageUrl={processedImageUrl}
            collageImageUrl={collageImageUrl}
            apiUrl={apiUrl}
            uploadProgress={uploadProgress}
            setMessage={setMessage}
            setUploadProgress={setUploadProgress}
            processingStatus={processingStatus}
            setProcessingStatus={setProcessingStatus}
            processingProgress={processingProgress}
            setProcessingProgress={setProcessingProgress}
          />
        )}
        {page === 'about' && <About />}
        {page === 'login' && (
          <Login
            username={username}
            setUsername={setUsername}
            password={password}
            setPassword={setPassword}
            handleLogin={handleLogin}
            message={message}
            setMessage={setMessage}
          />
        )}
        {page === 'register' && (
          <Register
            username={username}
            setUsername={setUsername}
            password={password}
            setPassword={setPassword}
            handleRegister={handleRegister}
            message={message}
            setMessage={setMessage}
          />
        )}
        {page === 'validationCode' && (
          <ValidationCode
            username={registeredUsername}
            setPage={setPage}
            apiUrl={apiUrl}
          />
        )}
        {page === 'mfaChallenge' && (
          <MFAChallenge
            username={username}
            session={session}
            setAuthToken={setAuthToken}
            setPage={setPage}
            apiUrl={apiUrl}
            setMessage={setMessage}
          />
        )}
        {page === 'mfaSetup' && (
          <MFASetup
            authToken={authToken}
            setPage={setPage}
            apiUrl={apiUrl}
            setMessage={setMessage}
          />
        )}
        {page === 'PictureGallery' && (
          <PictureGallery apiUrl={apiUrl} username={username} />
        )}
        {page === 'logs' && (
          <Logs
            username={username}
            apiUrl={apiUrl}
          />
        )}
      </Box>
    </ChakraProvider>
  );
  
};

export default App;
