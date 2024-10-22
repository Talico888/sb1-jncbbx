import React from 'react';
import { Sale, Product } from '../types';

interface ReportsProps {
  sales: Sale[];
  products: Product[];
}

const Reports: React.FC<ReportsProps> = ({ sales, products }) => {
  const totalSales = sales.reduce((sum, sale) => sum + sale.total, 0);
  const averageSale = totalSales / sales.length;

  const productSales = sales.flatMap(sale => sale.products)
    .reduce((acc, product) => {
      acc[product.name] = (acc[product.name] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

  const topProducts = Object.entries(productSales)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5);

  const dailySales = sales.reduce((acc, sale) => {
    const date = sale.date.toISOString().split('T')[0];
    acc[date] = (acc[date] || 0) + sale.total;
    return acc;
  }, {} as Record<string, number>);

  const inventoryValue = products.reduce((sum, product) => sum + product.stock * product.price, 0);

  return (
    <div style={{ padding: '20px' }}>
      <h2>Reportes de Ventas y Análisis</h2>
      <div>
        <h3>Resumen de Ventas</h3>
        <p>Total de ventas: ${totalSales.toFixed(2)}</p>
        <p>Venta promedio: ${averageSale.toFixed(2)}</p>
        <p>Número de transacciones: {sales.length}</p>
      </div>
      <div>
        <h3>Top 5 Productos</h3>
        <ul>
          {topProducts.map(([product, count]) => (
            <li key={product}>{product}: {count} ventas</li>
          ))}
        </ul>
      </div>
      <div>
        <h3>Ventas Diarias</h3>
        <ul>
          {Object.entries(dailySales).map(([date, total]) => (
            <li key={date}>{date}: ${total.toFixed(2)}</li>
          ))}
        </ul>
      </div>
      <div>
        <h3>Análisis de Inventario</h3>
        <p>Valor total del inventario: ${inventoryValue.toFixed(2)}</p>
        <h4>Productos con Stock Bajo:</h4>
        <ul>
          {products.filter(p => p.stock <= p.minStock).map(product => (
            <li key={product.id}>{product.name}: {product.stock} unidades (Mínimo: {product.minStock})</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Reports;