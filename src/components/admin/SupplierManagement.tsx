import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TextField } from '@mui/material';
import { openDb } from '../../db/database';
import { Supplier } from '../../types';

const SupplierManagement: React.FC = () => {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [newSupplier, setNewSupplier] = useState({ name: '', email: '' });

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const fetchSuppliers = async () => {
    const db = await openDb();
    const fetchedSuppliers = await db.all('SELECT * FROM suppliers');
    setSuppliers(fetchedSuppliers);
  };

  const handleAddSupplier = async () => {
    const db = await openDb();
    await db.run('INSERT INTO suppliers (name, email) VALUES (?, ?)', [newSupplier.name, newSupplier.email]);
    setNewSupplier({ name: '', email: '' });
    fetchSuppliers();
  };

  const handleDeleteSupplier = async (id: number) => {
    const db = await openDb();
    await db.run('DELETE FROM suppliers WHERE id = ?', [id]);
    fetchSuppliers();
  };

  return (
    <div>
      <h2>Supplier Management</h2>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {suppliers.map((supplier) => (
              <TableRow key={supplier.id}>
                <TableCell>{supplier.id}</TableCell>
                <TableCell>{supplier.name}</TableCell>
                <TableCell>{supplier.email}</TableCell>
                <TableCell>
                  <Button variant="contained" color="secondary" onClick={() => handleDeleteSupplier(supplier.id)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <h3>Add New Supplier</h3>
      <TextField
        label="Name"
        value={newSupplier.name}
        onChange={(e) => setNewSupplier({ ...newSupplier, name: e.target.value })}
      />
      <TextField
        label="Email"
        value={newSupplier.email}
        onChange={(e) => setNewSupplier({ ...newSupplier, email: e.target.value })}
      />
      <Button variant="contained" color="primary" onClick={handleAddSupplier}>Add Supplier</Button>
    </div>
  );
};

export default SupplierManagement;