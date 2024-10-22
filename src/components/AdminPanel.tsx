import React, { useState, useEffect } from 'react';
import { Container, Typography, Tabs, Tab, Box } from '@mui/material';
import UserManagement from './admin/UserManagement';
import ProductManagement from './admin/ProductManagement';
import SupplierManagement from './admin/SupplierManagement';
import ReportsManagement from './admin/ReportsManagement';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

const AdminPanel: React.FC = () => {
  const [value, setValue] = useState(0);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" component="h1" gutterBottom>
        Admin Panel
      </Typography>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="admin panel tabs">
          <Tab label="User Management" />
          <Tab label="Product Management" />
          <Tab label="Supplier Management" />
          <Tab label="Reports" />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <UserManagement />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <ProductManagement />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <SupplierManagement />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <ReportsManagement />
      </TabPanel>
    </Container>
  );
};

export default AdminPanel;