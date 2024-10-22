import React, { useState, useEffect } from 'react';
import { Product, Supplier, Order, Notification } from '../types';

interface InventoryManagementProps {
  products: Product[];
  suppliers: Supplier[];
  updateProduct: (product: Product) => void;
  addNotification: (notification: Notification) => void;
  placeOrder: (order: Order) => void;
}

const InventoryManagement: React.FC<InventoryManagementProps> = ({
  products,
  suppliers,
  updateProduct,
  addNotification,
  placeOrder,
}) => {
  useEffect(() => {
    checkLowStock();
  }, [products]);

  const checkLowStock = () => {
    products.forEach((product) => {
      if (product.stock <= product.minStock) {
        addNotification({
          id: Date.now(),
          type: 'low_stock',
          message: `Stock bajo para ${product.name}`,
          date: new Date(),
        });
        
        const supplier = suppliers.find((s) => s.id === product.supplierId);
        if (supplier) {
          const order: Order = {
            id: Date.now(),
            supplierId: supplier.id,
            products: [{ productId: product.id, quantity: product.minStock * 2 - product.stock }],
            date: new Date(),
            status: 'pending',
          };
          placeOrder(order);
          addNotification({
            id: Date.now() + 1,
            type: 'order_placed',
            message: `Pedido automático realizado para ${product.name}`,
            date: new Date(),
          });
        }
      }
    });
  };

  return (
    <div>
      <h2>Gestión de Inventario</h2>
      <table>
        <thead>
          <tr>
            <th>Producto</th>
            <th>Stock</th>
            <th>Stock Mínimo</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.stock}</td>
              <td>{product.minStock}</td>
              <td>
                <button onClick={() => updateProduct({ ...product, stock: product.stock + 10 })}>
                  Añadir Stock
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InventoryManagement;