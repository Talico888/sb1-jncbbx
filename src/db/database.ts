import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

let db: any;

export async function openDb() {
  if (!db) {
    db = await open({
      filename: './pos_database.sqlite',
      driver: sqlite3.Database
    });
  }
  return db;
}

export async function initDb() {
  const db = await openDb();
  
  await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE,
      password TEXT,
      role TEXT
    );

    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      price REAL,
      stock INTEGER,
      barcode TEXT UNIQUE,
      min_stock INTEGER,
      supplier_id INTEGER
    );

    CREATE TABLE IF NOT EXISTS suppliers (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      email TEXT
    );

    CREATE TABLE IF NOT EXISTS sales (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      total REAL,
      date TEXT,
      cashier_id INTEGER
    );

    CREATE TABLE IF NOT EXISTS sale_items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      sale_id INTEGER,
      product_id INTEGER,
      quantity INTEGER,
      price REAL
    );

    CREATE TABLE IF NOT EXISTS discounts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      product_id INTEGER,
      percentage REAL,
      start_date TEXT,
      end_date TEXT
    );
  `);

  // Insert a default admin user if not exists
  await db.run(`
    INSERT OR IGNORE INTO users (username, password, role)
    VALUES ('admin', 'admin123', 'admin')
  `);
}