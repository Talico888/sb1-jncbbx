import React from 'react';
import { Product } from '../types';

interface CartProps {
  cart: Product[];
  removeFromCart: (index: number) => void;
  onCheckout: () => void;
}

const Cart: React.FC<CartProps> = ({ cart, removeFromCart, onCheckout }) => {
  const total = cart.reduce((sum, product) => sum + product.price, 0);

  return (
    <div style={{ flex: 1, padding: '20px', backgroundColor: '#f0f0f0' }}>
      <h2>Carrito</h2>
      {cart.map((product, index) => (
        <div key={index} style={{ marginBottom: '10px' }}>
          <span>{product.name} - ${product.price}</span>
          <button onClick={() => removeFromCart(index)} style={{ marginLeft: '10px' }}>
            Eliminar
          </button>
        </div>
      ))}
      <h3>Total: ${total.toFixed(2)}</h3>
      <button onClick={onCheckout} style={{ padding: '10px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '5px' }}>
        Finalizar Compra
      </button>
    </div>
  );
};

export default Cart;