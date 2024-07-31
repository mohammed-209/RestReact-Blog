import React, { useState, useEffect } from 'react';
import axiosInstance from '../axios';
import { useParams } from 'react-router-dom';
// MUI
import { CssBaseline, Container, Typography } from '@mui/material';
import { styled } from '@mui/system';

const Paper = styled('div')(({ theme }) => ({
  marginTop: theme.spacing(8),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
}));

export default function Post() {
  const { slug } = useParams();
  const [data, setData] = useState({ posts: [] });
  const [error, setError] = useState(null); // Add state for error handling

  useEffect(() => {
    axiosInstance.get(slug)
      .then((res) => {
        console.log('Response data:', res.data); // Log the entire response
        setData({ posts: res.data });
      })
      .catch((error) => {
        console.error('Error fetching data:', error); // Log the error
        setError('Failed to load data.'); // Set an error message
      });
  }, [slug]);

  return (
    <Container component="main" maxWidth="md">
      <CssBaseline />
      <Paper></Paper>
      {error ? ( // Conditionally render error message
        <Typography color="error" align="center">
          {error}
        </Typography>
      ) : (
        <Container maxWidth="sm">
          <Typography
            component="h1"
            variant="h2"
            align="center"
            color="textPrimary"
            gutterBottom
          >
            {data.posts.title}
          </Typography>
          <Typography
            variant="h5"
            align="center"
            color="textSecondary"
            paragraph
          >
            {data.posts.excerpt}
          </Typography>
        </Container>
      )}
    </Container>
  );
}
