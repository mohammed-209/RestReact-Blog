import React, { useState, useEffect } from 'react';
import axiosInstance from '../axios';
import {
  CssBaseline,
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Link
} from '@mui/material';
import { styled } from '@mui/system';
import { useLocation } from 'react-router-dom';

const CardMediaStyled = styled(CardMedia)(({ theme }) => ({
  paddingTop: '56.25%', // 16:9
}));

const LinkStyled = styled(Link)(({ theme }) => ({
  margin: theme.spacing(1, 1.5),
}));

const CardHeaderStyled = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'light' ? theme.palette.grey[200] : theme.palette.grey[700],
}));

const PostTitleStyled = styled(Typography)(({ theme }) => ({
  fontSize: '16px',
  textAlign: 'left',
}));

const PostTextStyled = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'left',
  alignItems: 'baseline',
  fontSize: '12px',
  textAlign: 'left',
  marginBottom: theme.spacing(2),
}));

const Search = () => {
  const search = 'search';
  const [appState, setAppState] = useState({
    search: '',
    posts: [],
  });

  useEffect(() => {
    axiosInstance.get(search + '/' + window.location.search).then((res) => {
      const allPosts = res.data;
      setAppState({ posts: allPosts });
      console.log(res.data);
    });
  }, []);

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="md" component="main">
        <Grid container spacing={5} alignItems="flex-end">
          {appState.posts.map((post) => (
            <Grid item key={post.id} xs={12} md={4}>
              <Card>
                <LinkStyled color="textPrimary" href={'/post/' + post.slug}>
                  <CardMediaStyled
                    image="https://source.unsplash.com/random"
                    title="Image title"
                  />
                </LinkStyled>
                <CardContent>
                  <PostTitleStyled gutterBottom variant="h6" component="h2">
                    {post.title.substr(0, 50)}...
                  </PostTitleStyled>
                  <PostTextStyled>
                    <Typography color="textSecondary">
                      {post.excerpt.substr(0, 40)}...
                    </Typography>
                  </PostTextStyled>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </React.Fragment>
  );
};

export default Search;
