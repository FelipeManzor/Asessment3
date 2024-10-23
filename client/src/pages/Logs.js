import React, { useState, useEffect } from 'react';
import { Box, Heading, Text, Spinner } from '@chakra-ui/react';

const Logs = ({ username, apiUrl }) => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

useEffect(() => {
  const fetchLogs = async () => {
    // console.log(username);
    // console.log(apiUrl);
    try {
      const response = await fetch(`${apiUrl}/images/activity/${username}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // Log response status to see what's happening
      console.log('Response Status:', response.status);
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error fetching logs:', errorText);
        throw new Error('Error fetching logs');
      }

      const data = await response.json();
      setLogs(data);
      setLoading(false);
    } catch (err) {
      console.error('Error:', err);
      setError('Error fetching logs');
      setLoading(false);
    }
  };

  if (username) {
    fetchLogs();
  }
}, [username, apiUrl]);


  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <Text color="red.500">{error}</Text>;
  }

  return (
    <Box p={4}>
      <Heading as="h2" mb={4}>User Activity Logs</Heading>
      {logs.length === 0 ? (
        <Text>No logs found.</Text>
      ) : (
        logs.map((log) => (
          <Box key={log.log_id} p={4} mb={2} borderWidth="1px" borderRadius="md">
            <Text><strong>Activity Type:</strong> {log.activity_type}</Text>
            <Text><strong>Description:</strong> {log.activity_description}</Text>
            <Text><strong>Time:</strong> {new Date(log.activity_time).toLocaleString()}</Text>
            <Text><strong>Additional Data:</strong> {log.additional_data ? JSON.stringify(log.additional_data) : 'None'}</Text>
          </Box>
        ))
      )}
    </Box>
  );
};

export default Logs;
