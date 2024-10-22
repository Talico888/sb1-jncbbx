export interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
  barcode: string;
  expirationDate?: Date;
  cost?: number;
  minStock: number;
  supplierId: number;
}

export interface Supplier {
  id: number;
  name: string;
  email: string;
}

export interface Notification {
  id: number;
  type: 'low_stock' | 'expiration' | 'promotion' | 'order_placed';
  message: string;
  date: Date;
}

export interface User {
  id: number;
  username: string;
  role: 'admin' | 'cashier' | 'supervisor';
}

export interface Sale {
  id: number;
  products: Product[];
  total: number;
  date: Date;
  cashier: User;
}

export interface ActivityLog {
  id: number;
  user: User;
  action: string;
  date: Date;
}

export interface Discount {
  id: number;
  productId: number;
  percentage: number;
  startDate: Date;
  endDate: Date;
}

export interface Order {
  id: number;
  supplierId: number;
  products: { productId: number; quantity: number }[];
  date: Date;
  status: 'pending' | 'shipped' | 'received';
}