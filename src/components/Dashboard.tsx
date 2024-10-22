import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, Button, Grid } from '@mui/material';
import { useAuth } from '../contexts/AuthContext';
import ProductList from './ProductList';
import Cart from './Cart';
import Notifications from './Notifications';

const Dashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    navigate('/login');
    return null;
  }

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" component="h1" gutterBottom>
        Dashboard
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Welcome, {user.username} ({user.role})
      </Typography>
      <Button variant="contained" color="secondary" onClick={handleLogout}>
        Logout
      </Button>
      {user.role === 'admin' && (
        <Button variant="contained" color="primary" onClick={() => navigate('/admin')} sx={{ ml: 2 }}>
          Admin Panel
        </Button>
      )}
      <Grid container spacing={3} sx={{ mt: 3 }}>
        <Grid item xs={12} md={8}>
          <ProductList />
        </Grid>
        <Grid item xs={12} md={4}>
          <Cart />
        </Grid>
      </Grid>
      <Notifications />
    </Container>
  );
};

export default Dashboard;