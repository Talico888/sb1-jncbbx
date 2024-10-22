import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TextField } from '@mui/material';
import { openDb } from '../../db/database';
import { Product } from '../../types';

const ProductManagement: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [newProduct, setNewProduct] = useState({ name: '', price: 0, stock: 0, barcode: '', minStock: 0, supplierId: 0 });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const db = await openDb();
    const fetchedProducts = await db.all('SELECT * FROM products');
    setProducts(fetchedProducts);
  };

  const handleAddProduct = async () => {
    const db = await openDb();
    await db.run(
      'INSERT INTO products (name, price, stock, barcode, min_stock, supplier_id) VALUES (?, ?, ?, ?, ?, ?)',
      [newProduct.name, newProduct.price, newProduct.stock, newProduct.barcode, newProduct.minStock, newProduct.supplierId]
    );
    setNewProduct({ name: '', price: 0, stock: 0, barcode: '', minStock: 0, supplierId: 0 });
    fetchProducts();
  };

  const handleDeleteProduct = async (id: number) => {
    const db = await openDb();
    await db.run('DELETE FROM products WHERE id = ?', [id]);
    fetchProducts();
  };

  return (
    <div>
      <h2>Product Management</h2>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Stock</TableCell>
              <TableCell>Barcode</TableCell>
              <TableCell>Min Stock</TableCell>
              <TableCell>Supplier ID</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell>{product.id}</TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.price}</TableCell>
                <TableCell>{product.stock}</TableCell>
                <TableCell>{product.barcode}</TableCell>
                <TableCell>{product.minStock}</TableCell>
                <TableCell>{product.supplierId}</TableCell>
                <TableCell>
                  <Button variant="contained" color="secondary" onClick={() => handleDeleteProduct(product.id)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <h3>Add New Product</h3>
      <TextField
        label="Name"
        value={newProduct.name}
        onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
      />
      <TextField
        label="Price"
        type="number"
        value={newProduct.price}
        onChange={(e) => setNewProduct({ ...newProduct, price: Number(e.target.value) })}
      />
      <TextField
        label="Stock"
        type="number"
        value={newProduct.stock}
        onChange={(e) => setNewProduct({ ...newProduct, stock: Number(e.target.value) })}
      />
      <TextField
        label="Barcode"
        value={newProduct.barcode}
        onChange={(e) => setNewProduct({ ...newProduct, barcode: e.target.value })}
      />
      <TextField
        label="Min Stock"
        type="number"
        value={newProduct.minStock}
        onChange={(e) => setNewProduct({ ...newProduct, minStock: Number(e.target.value) })}
      />
      <TextField
        label="Supplier ID"
        type="number"
        value={newProduct.supplierId}
        onChange={(e) => setNewProduct({ ...newProduct, supplierId: Number(e.target.value) })}
      />
      <Button variant="contained" color="primary" onClick={handleAddProduct}>Add Product</Button>
    </div>
  );
};

export default ProductManagement;