import React from 'react';
import { styled } from '@mui/system';
import { Container, Link, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button } from '@mui/material';
import { DeleteForever as DeleteForeverIcon, Edit as EditIcon } from '@mui/icons-material';

const CardMedia = styled('div')(({ theme }) => ({
  paddingTop: '56.25%', // 16:9
}));

const StyledLink = styled(Link)(({ theme }) => ({
  margin: theme.spacing(1, 1.5),
}));

const CardHeader = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'light' ? theme.palette.grey[200] : theme.palette.grey[700],
}));

const PostTitle = styled('div')({
  fontSize: '16px',
  textAlign: 'left',
});

const PostText = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'left',
  alignItems: 'baseline',
  fontSize: '12px',
  textAlign: 'left',
  marginBottom: theme.spacing(2),
}));

const Posts = (props) => {
  const { posts } = props;
  if (!posts || posts.length === 0) return <p>Can not find any posts, sorry</p>;
  return (
    <Container maxWidth="md" component="main">
      <Paper>
        <TableContainer>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell>Id</TableCell>
                <TableCell align="left">Category</TableCell>
                <TableCell align="left">Title</TableCell>
                <TableCell align="left">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {posts.map((post) => (
                <TableRow key={post.id}>
                  <TableCell component="th" scope="row">
                    {post.id}
                  </TableCell>
                  <TableCell align="left">{post.category}</TableCell>
                  <TableCell align="left">
                    <StyledLink color="textPrimary" href={'/post/' + post.slug}>
                      {post.title}
                    </StyledLink>
                  </TableCell>
                  <TableCell align="left">
                    <StyledLink color="textPrimary" href={'/admin/edit/' + post.id}>
                      <EditIcon />
                    </StyledLink>
                    <StyledLink color="textPrimary" href={'/admin/delete/' + post.id}>
                      <DeleteForeverIcon />
                    </StyledLink>
                  </TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell colSpan={4} align="right">
                  <Button href={'/admin/create'} variant="contained" color="primary">
                    New Post
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Container>
  );
};

export default Posts;
