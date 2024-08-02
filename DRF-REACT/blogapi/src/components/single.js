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
  const [error, setError] = useState(null);

  useEffect(() => {
    axiosInstance.get('post/' + slug).then((res) => {
      setData({ posts: res.data });
      console.log(res.data);
    }).catch((err) => {
      setError('An error occurred while fetching the data.');
      console.error('Error fetching data:', err);
    });
  }, [setData]);

  return (
    <Container component="main" maxWidth="md">
      <CssBaseline />
      <Paper></Paper>
      {error ? (
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
