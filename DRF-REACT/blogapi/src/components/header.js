import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import { NavLink } from 'react-router-dom';
import { styled } from '@mui/system';

const theme = createTheme({
  palette: {
    divider: '#dcdcdc', // Define the color if not already set
  },
});

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  borderBottom: `1px solid ${theme.palette.divider}`,
}));

const ToolbarStyled = styled(Toolbar)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
}));

const ToolbarTitleStyled = styled(Typography)(({ theme }) => ({
  flexGrow: 1,
}));

const LinkStyled = styled(Link)(({ theme }) => ({
  margin: theme.spacing(1, 1.5),
}));

const LogoutButton = styled(Button)(({ theme }) => ({
  marginLeft: theme.spacing(2),
}));

const Header = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <StyledAppBar position="static" color="inherit" elevation={0}>
        <ToolbarStyled>
          <ToolbarTitleStyled variant="h6" color="inherit" noWrap>
            <LinkStyled component={NavLink} to="/" underline="none" color="textPrimary">
              Blog
            </LinkStyled>
          </ToolbarTitleStyled>
          <nav>
            <LinkStyled color="textPrimary" component={NavLink} underline="none" to="/register">
              Register
            </LinkStyled>
            <Button color="primary" variant="outlined" component={NavLink} to="/login">
              Login
            </Button>
            <LogoutButton color="primary" variant="outlined" component={NavLink} to="/logout">
              Logout
            </LogoutButton>
          </nav>
        </ToolbarStyled>
      </StyledAppBar>
    </ThemeProvider>
  );
};
export default Header;
