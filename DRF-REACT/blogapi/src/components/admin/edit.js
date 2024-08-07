import React, { useState, useEffect } from 'react';
import axiosInstance from '../../axios';
import { useNavigate, useParams } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { styled } from '@mui/system';
import { createTheme, ThemeProvider } from '@mui/material/styles';

// Define your theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#3f51b5', // Adjust as needed
    },
    secondary: {
      main: '#f50057', // Adjust as needed
    },
  },
});

const PaperStyled = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(8),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
}));

const FormStyled = styled(Box)(({ theme }) => ({
  width: '100%', // Fix IE 11 issue.
  marginTop: theme.spacing(3),
}));

const SubmitButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(3, 0, 2),
}));

// Slugify function
const slugify = (string) => {
  const a = 'àáâäæãåāăąçćčđďèéêëēėęěğǵḧîïíīįìłḿñńǹňôöòóœøōõőṕŕřßśšşșťțûüùúūǘůűųẃẍÿýžźż·/_,:;';
  const b = 'aaaaaaaaaacccddeeeeeeeegghiiiiiilmnnnnoooooooooprrsssssttuuuuuuuuuwxyyzzz------';
  const p = new RegExp(a.split('').join('|'), 'g');

  return string
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(p, (c) => b.charAt(a.indexOf(c))) // Replace special characters
    .replace(/&/g, '-and-') // Replace & with 'and'
    .replace(/[^\w-]+/g, '') // Remove all non-word characters
    .replace(/--+/g, '-') // Replace multiple - with single -
    .replace(/^-+/, '') // Trim - from start of text
    .replace(/-+$/, ''); // Trim - from end of text
};

export default function Edit() {
  const navigate = useNavigate();
  const { id } = useParams();
  const initialFormData = Object.freeze({
    id: '',
    title: '',
    slug: '',
    excerpt: '',
    content: '',
  });

  const [formData, updateFormData] = useState(initialFormData);

  useEffect(() => {
    if (id) {
      axiosInstance.get(`admin/edit/postdetail/${id}`).then((res) => {
        updateFormData({
          ...formData,
          title: res.data.title,
          excerpt: res.data.excerpt,
          slug: res.data.slug, // Initialize slug from server data
          content: res.data.content,
        });
      });
    }
  }, [id]);

  // Update slug when title changes
  useEffect(() => {
    updateFormData((prevData) => ({
      ...prevData,
      slug: slugify(prevData.title),
    }));
  }, [formData.title]);

  const handleChange = (e) => {
    updateFormData({
      ...formData,
      [e.target.name]: e.target.value, // Preserve spaces
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axiosInstance.put(`admin/edit/${id}/`, {
      title: formData.title,
      slug: formData.slug,
      author: 1,
      excerpt: formData.excerpt,
      content: formData.content,
    }).then(() => {
      navigate('/admin/');
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container component="main" maxWidth="sm">
        <PaperStyled>
          <Avatar />
          <Typography component="h1" variant="h5">
            Edit Post
          </Typography>
          <FormStyled component="form" noValidate onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="title"
                  label="Post Title"
                  name="title"
                  autoComplete="title"
                  value={formData.title}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="excerpt"
                  label="Post Excerpt"
                  name="excerpt"
                  autoComplete="excerpt"
                  value={formData.excerpt}
                  onChange={handleChange}
                  multiline
                  rows={8}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="slug"
                  label="Slug"
                  name="slug"
                  autoComplete="slug"
                  value={formData.slug}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="content"
                  label="Content"
                  name="content"
                  autoComplete="content"
                  value={formData.content}
                  onChange={handleChange}
                  multiline
                  rows={8}
                />
              </Grid>
            </Grid>
            <SubmitButton
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
            >
              Update Post
            </SubmitButton>
          </FormStyled>
        </PaperStyled>
      </Container>
    </ThemeProvider>
  );
}
