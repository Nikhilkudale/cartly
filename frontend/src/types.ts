export interface Product {
  id: number;
  title: string;
  category: string;
  price: number;
  originalPrice: number;
  discount: number;
  rating: number;
  reviewsCount: number;
  image: string;
  stock: number;
  brand: string;
  description: string;
  specifications: Record<string, string>;
}

export interface CartItem {
  id: number; // cart_item_id in MySQL
  product: Product;
  quantity: number;
}

export interface Order {
  id: number;
  date: string;
  items: {
    productId: number;
    title: string;
    quantity: number;
    price: number;
  }[];
  totalAmount: number;
  status: 'PENDING' | 'SUCCESS' | 'CANCELLED';
  transactionId: string;
}

export interface SpringLog {
  id: string;
  timestamp: string;
  level: 'INFO' | 'WARN' | 'ERROR';
  className: string;
  message: string;
  endpoint?: string;
  method?: string;
  requestBody?: string;
  responseBody?: string;
  sqlQuery?: string;
}

export interface MySQLRow {
  [key: string]: string | number | boolean | null;
}

export interface MySQLTable {
  name: string;
  columns: string[];
  rows: MySQLRow[];
}
