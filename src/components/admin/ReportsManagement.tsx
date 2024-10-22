import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';
import { openDb } from '../../db/database';

const ReportsManagement: React.FC = () => {
  const [salesReport, setSalesReport] = useState<any[]>([]);
  const [inventoryReport, setInventoryReport] = useState<any[]>([]);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    const db = await openDb();
    
    // Fetch sales report
    const sales = await db.all(`
      SELECT s.id, s.total, s.date, u.username as cashier
      FROM sales s
      JOIN users u ON s.cashier_id = u.id
      ORDER BY s.date DESC
      LIMIT 10
    `);
    setSalesReport(sales);

    // Fetch inventory report
    const inventory = await db.all(`
      SELECT p.id, p.name, p.stock, p.min_stock, s.name as supplier
      FROM products p
      LEFT JOIN suppliers s ON p.supplier_id = s.id
      ORDER BY p.stock ASC
    `);
    setInventoryReport(inventory);
  };

  return (
    <div>
      <Typography variant="h5" gutterBottom>Reports Management</Typography>
      
      <Typography variant="h6" gutterBottom>Recent Sales</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Total</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Cashier</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {salesReport.map((sale) => (
              <TableRow key={sale.id}>
                <TableCell>{sale.id}</TableCell>
                <TableCell>${sale.total.toFixed(2)}</TableCell>
                <TableCell>{new Date(sale.date).toLocaleString()}</TableCell>
                <TableCell>{sale.cashier}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Typography variant="h6" gutterBottom style={{ marginTop: '2rem' }}>Inventory Status</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Current Stock</TableCell>
              <TableCell>Min Stock</TableCell>
              <TableCell>Supplier</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {inventoryReport.map((item) => (
              <TableRow key={item.id} style={{ backgroundColor: item.stock <= item.min_stock ? '#ffcccb' : 'inherit' }}>
                <TableCell>{item.id}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.stock}</TableCell>
                <TableCell>{item.min_stock}</TableCell>
                <TableCell>{item.supplier}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ReportsManagement;