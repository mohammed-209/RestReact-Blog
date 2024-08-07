import React from 'react';
import { styled } from '@mui/system';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from "@mui/material/Grid";
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';


const CardMediaStyled = styled(CardMedia)(({ theme }) => ({
  paddingTop: '56.25%', // 16:9
  
  
}));

// const CardHeaderStyled = styled('div')(({ theme }) => ({
//   backgroundColor:
//     theme.palette.mode === 'light'
//       ? theme.palette.grey[200]
//       : theme.palette.grey[700],
// }));

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

const LinkStyled = styled(Link)(({ theme }) => ({
  margin: theme.spacing(1, 1.5),
}));

const Posts = (props) => {
  const { posts } = props;
  if (!posts || posts.length === 0) return <p>Can not find any posts, sorry</p>;
  return (
    <React.Fragment>
      <Container maxWidth="md" component="main">
        <Grid container spacing={5} alignItems="flex-end" >
          {posts.map((post) => {
            return (
              <Grid item key={post.id} xs={12} md={4}>
                <Card>
                  <LinkStyled 
                    color="textPrimary" 
                    href={'post/' + post.slug}>
                    
                    <CardMediaStyled
                    image="https://picsum.photos/1000"
                    title="Image title"
                    />
                  </LinkStyled>
                  
                  <CardContent>
                    <PostTitleStyled
                      gutterBottom
                      variant="h6"
                      component="h2"
                    >
                      {post.title.substr(0, 50)}...
                    </PostTitleStyled>
                    <PostTextStyled>
                      <Typography
                        component="p"
                        color="textPrimary"
                      ></Typography>
                      <Typography variant="body2" color="textSecondary">
                        {post.excerpt.substr(0, 60)}...
                      </Typography>
                    </PostTextStyled>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </React.Fragment>
  );
};

export default Posts;