import React, { useState } from 'react';
import { Discount, Product } from '../types';

interface DiscountManagerProps {
  products: Product[];
  addDiscount: (discount: Discount) => void;
}

const DiscountManager: React.FC<DiscountManagerProps> = ({ products, addDiscount }) => {
  const [selectedProduct, setSelectedProduct] = useState<number>(0);
  const [percentage, setPercentage] = useState<number>(0);
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedProduct && percentage && startDate && endDate) {
      addDiscount({
        id: Date.now(),
        productId: selectedProduct,
        percentage,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
      });
      setSelectedProduct(0);
      setPercentage(0);
      setStartDate('');
      setEndDate('');
    }
  };

  return (
    <div>
      <h2>Gestor de Descuentos</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Producto:</label>
          <select
            value={selectedProduct}
            onChange={(e) => setSelectedProduct(Number(e.target.value))}
          >
            <option value={0}>Seleccione un producto</option>
            {products.map((product) => (
              <option key={product.id} value={product.id}>
                {product.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Porcentaje de descuento:</label>
          <input
            type="number"
            value={percentage}
            onChange={(e) => setPercentage(Number(e.target.value))}
            min={0}
            max={100}
          />
        </div>
        <div>
          <label>Fecha de inicio:</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        <div>
          <label>Fecha de fin:</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
        <button type="submit">Agregar Descuento</button>
      </form>
    </div>
  );
};

export default DiscountManager;