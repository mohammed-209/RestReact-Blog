import React from 'react';
import axiosInstance from '../../axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Container, Button, Box } from '@mui/material';
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

const CenteredBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  margin: theme.spacing(1),
  padding: theme.spacing(1),
  backgroundColor: theme.palette.background.paper,
}));

export default function DeletePost() {
  const navigate = useNavigate();
  const { id } = useParams();

  const handleSubmit = (e) => {
    e.preventDefault();
    axiosInstance
      .delete(`admin/delete/${id}`)
      .catch((error) => {
        if (error.response) {
          console.error(error.response.data);
          console.error(error.response.status);
          console.error(error.response.headers);
        }
      })
      .then(() => {
        navigate('/admin/');
        window.location.reload(); // Reload to update the UI after deletion
      });
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="sm">
        <CenteredBox>
          <Button
            variant="contained"
            color="secondary"
            type="submit"
            onClick={handleSubmit}
          >
            Press here to confirm delete
          </Button>
        </CenteredBox>
      </Container>
    </ThemeProvider>
  );
}
