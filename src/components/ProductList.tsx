import React, { useState } from 'react';
import { Product, Discount } from '../types';

interface ProductListProps {
  addToCart: (product: Product) => void;
  products: Product[];
  discounts: Discount[];
}

const ProductList: React.FC<ProductListProps> = ({ addToCart, products, discounts }) => {
  const [barcode, setBarcode] = useState<string>('');

  const handleAddToCart = (product: Product) => {
    if (product.stock > 0) {
      addToCart(product);
    }
  };

  const handleBarcodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const product = products.find(p => p.barcode === barcode);
    if (product) {
      handleAddToCart(product);
      setBarcode('');
    } else {
      alert('Producto no encontrado');
    }
  };

  const getDiscountedPrice = (product: Product) => {
    const discount = discounts.find(d => d.productId === product.id && new Date() >= d.startDate && new Date() <= d.endDate);
    if (discount) {
      return product.price * (1 - discount.percentage / 100);
    }
    return product.price;
  };

  return (
    <div style={{ flex: 1, padding: '20px' }}>
      <h2>Lista de Productos</h2>
      <form onSubmit={handleBarcodeSubmit}>
        <input 
          type="text" 
          value={barcode} 
          onChange={(e) => setBarcode(e.target.value)}
          placeholder="Escanear código de barras"
        />
        <button type="submit">Agregar</button>
      </form>
      {products.map((product) => {
        const discountedPrice = getDiscountedPrice(product);
        return (
          <div key={product.id} style={{ marginBottom: '10px' }}>
            <span>{product.name} - ${discountedPrice.toFixed(2)} {discountedPrice < product.price && `(Oferta: $${product.price.toFixed(2)})`} - Stock: {product.stock}</span>
            <button 
              onClick={() => handleAddToCart(product)} 
              style={{ marginLeft: '10px' }}
              disabled={product.stock === 0}
            >
              Agregar al carrito
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default ProductList;