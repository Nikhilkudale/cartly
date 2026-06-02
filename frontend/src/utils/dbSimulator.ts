import { Product, CartItem, Order, SpringLog, MySQLTable, MySQLRow } from "../types";
import { PRODUCTS_DATA } from "../data/products";

export interface MockUser {
  id: number;
  username: string;
  email: string;
  role: 'CUSTOMER' | 'ADMIN';
  fullName: string;
  passwordHash: string;
}

// Initial table data matching the real starting products
let mockProducts = [...PRODUCTS_DATA];
let mockCartItems: { id: number; userId: number; productId: number; quantity: number }[] = [];
let mockOrders: { id: number; orderDate: string; totalAmount: number; status: string; transactionId: string }[] = [];
let mockOrderDetails: { id: number; orderId: number; productId: number; quantity: number; price: number }[] = [];

export let mockUsers: MockUser[] = [
  {
    id: 1,
    username: 'nikhil_customer',
    email: 'nikhil@cartly.com',
    role: 'CUSTOMER',
    fullName: 'Nikhil Kudale',
    passwordHash: '$2a$10$vN9fPZ38ZAt8zLhVvXo5xe1R04t0kUp1wZ9vQzU0.W4O.H6A9FvU.'
  },
  {
    id: 2,
    username: 'admin_flipkart',
    email: 'admin@flipkart.com',
    role: 'ADMIN',
    fullName: 'Flipkart Administrator',
    passwordHash: '$2a$10$vN9fPZ38ZAt8zLhVvXo5xe1R04t0kUp1wZ9vQzU0.W4O.H6A9FvU.'
  },
  {
    id: 3,
    username: 'admin_cartly',
    email: 'admin@cartly.com',
    role: 'ADMIN',
    fullName: 'Cartly Administrator',
    passwordHash: '$2a$10$vN9fPZ38ZAt8zLhVvXo5xe1R04t0kUp1wZ9vQzU0.W4O.H6A9FvU.'
  }
];

let orderCounter = 1001;
let cartCounter = 1;
let orderDetailCounter = 2001;

export function resetDatabase() {
  mockProducts = [...PRODUCTS_DATA];
  mockCartItems = [];
  mockOrders = [];
  mockOrderDetails = [];
  orderCounter = 1001;
  cartCounter = 1;
  orderDetailCounter = 2001;
  mockUsers = [
    {
      id: 1,
      username: 'nikhil_customer',
      email: 'nikhil@cartly.com',
      role: 'CUSTOMER',
      fullName: 'Nikhil Kudale',
      passwordHash: '$2a$10$vN9fPZ38ZAt8zLhVvXo5xe1R04t0kUp1wZ9vQzU0.W4O.H6A9FvU.'
    },
    {
      id: 2,
      username: 'admin_flipkart',
      email: 'admin@flipkart.com',
      role: 'ADMIN',
      fullName: 'Flipkart Administrator',
      passwordHash: '$2a$10$vN9fPZ38ZAt8zLhVvXo5xe1R04t0kUp1wZ9vQzU0.W4O.H6A9FvU.'
    },
    {
      id: 3,
      username: 'admin_cartly',
      email: 'admin@cartly.com',
      role: 'ADMIN',
      fullName: 'Cartly Administrator',
      passwordHash: '$2a$10$vN9fPZ38ZAt8zLhVvXo5xe1R04t0kUp1wZ9vQzU0.W4O.H6A9FvU.'
    }
  ];
}

export function registerMockUser(username: string, email: string, role: 'CUSTOMER' | 'ADMIN', fullName: string, passwordHash: string) {
  const newId = mockUsers.length + 1;
  const newUser: MockUser = { id: newId, username, email, role, fullName, passwordHash };
  mockUsers.push(newUser);
  return newUser;
}

export function bulkRestockProducts(stockAmt: number): void {
  mockProducts.forEach(p => {
    p.stock = stockAmt;
  });
}

export function getDatabaseTables(): MySQLTable[] {
  return [
    {
      name: "products",
      columns: ["id", "title", "category", "price", "stock", "brand"],
      rows: mockProducts.map(p => ({
        id: p.id,
        title: p.title.substring(0, 30) + (p.title.length > 30 ? "..." : ""),
        category: p.category,
        price: `₹${p.price.toLocaleString("en-IN")}`,
        stock: p.stock,
        brand: p.brand
      }))
    },
    {
      name: "users",
      columns: ["id", "username", "email", "role", "full_name"],
      rows: mockUsers.map(u => ({
        id: u.id,
        username: u.username,
        email: u.email,
        role: u.role,
        full_name: u.fullName
      }))
    },
    {
      name: "orders",
      columns: ["id", "order_date", "total_amount", "status", "transaction_id"],
      rows: mockOrders.map(o => ({
        id: o.id,
        order_date: o.orderDate.split("T")[0] + " " + o.orderDate.split("T")[1].substring(0, 5),
        total_amount: `₹${o.totalAmount.toLocaleString("en-IN")}`,
        status: o.status,
        transaction_id: o.transactionId
      }))
    },
    {
      name: "order_items",
      columns: ["id", "order_id", "product_id", "quantity", "price"],
      rows: mockOrderDetails.map(od => ({
        id: od.id,
        order_id: od.orderId,
        product_id: od.productId,
        quantity: od.quantity,
        price: `₹${od.price.toLocaleString("en-IN")}`
      }))
    },
    {
      name: "cart_items",
      columns: ["id", "user_id", "product_id", "quantity"],
      rows: mockCartItems.map(c => ({
        id: c.id,
        user_id: c.userId,
        product_id: c.productId,
        quantity: c.quantity
      }))
    }
  ];
}

// Generate spring boot formatted logging line
function createLog(level: 'INFO' | 'WARN' | 'ERROR', className: string, message: string, endpoint?: string, method?: 'GET' | 'POST' | 'PUT' | 'DELETE', reqObj?: any, resObj?: any, sql?: string): SpringLog {
  return {
    id: Math.random().toString(36).substring(7),
    timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19) + '.284',
    level,
    className,
    message,
    endpoint,
    method,
    requestBody: reqObj ? JSON.stringify(reqObj, null, 2) : undefined,
    responseBody: resObj ? JSON.stringify(resObj, null, 2) : undefined,
    sqlQuery: sql
  };
}

export function logProductFetch(category: string): SpringLog[] {
  let sql = "SELECT * FROM products;";
  let msg = "Fetching all active products from DB";
  let endpoint = "/api/products";

  if (category && category !== "All") {
    sql = `SELECT * FROM products p WHERE LOWER(p.category) = '${category.toLowerCase()}';`;
    msg = `Fetching products for category: ${category}`;
    endpoint = `/api/products/category/${category.toLowerCase()}`;
  }

  return [
    createLog('INFO', 'ProductController', `Handling GET request at ${endpoint}`, endpoint, 'GET'),
    createLog('INFO', 'ProductRepository', `Executing Hibernate select query mapped from repository: Query: ${sql}`),
    createLog('INFO', 'ProductController', "Returning HTTP 200 OK with query payload results")
  ];
}

export function logProductSearch(query: string): SpringLog[] {
  const sql = `SELECT * FROM products p WHERE LOWER(p.title) LIKE '%${query.toLowerCase()}%' OR LOWER(p.brand) LIKE '%${query.toLowerCase()}%';`;
  const endpoint = `/api/products/search?q=${encodeURIComponent(query)}`;

  return [
    createLog('INFO', 'ProductController', `Handling GET search request for keyword: "${query}"`, endpoint, 'GET'),
    createLog('INFO', 'ProductRepository', `Executing Hibernate Full-text / LIKE query: Query: ${sql}`),
    createLog('INFO', 'ProductController', "Returning HTTP 200 OK with matched products list")
  ];
}

export function logAddToCart(productId: number, qty: number): SpringLog[] {
  const product = mockProducts.find(p => p.id === productId);
  if (!product) return [];

  // Check if cart item already exists
  const existingIndex = mockCartItems.findIndex(c => c.productId === productId);
  let sql = "";
  let modeMsg = "";

  if (existingIndex > -1) {
    mockCartItems[existingIndex].quantity += qty;
    sql = `UPDATE cart_items SET quantity = ${mockCartItems[existingIndex].quantity} WHERE id = ${mockCartItems[existingIndex].id};`;
    modeMsg = `Updated existing cart entry qty for productId: ${productId}`;
  } else {
    const newId = cartCounter++;
    mockCartItems.push({ id: newId, userId: 1, productId, quantity: qty });
    sql = `INSERT INTO cart_items (id, user_id, product_id, quantity) VALUES (${newId}, 1, ${productId}, ${qty});`;
    modeMsg = `Inserted new cart entry for productId: ${productId}`;
  }

  const endpoint = "/api/carts/items";
  const reqPayload = { user_id: 1, product_id: productId, quantity: qty };

  return [
    createLog('INFO', 'CartController', `Handling POST item to cart`, endpoint, 'POST', reqPayload),
    createLog('INFO', 'CartRepository', `Executing Hibernate persistence operation: SQL: ${sql}`),
    createLog('INFO', 'CartController', `HTTP 201 Created. ${modeMsg}`, undefined, undefined, undefined, { success: true, cart_size: mockCartItems.length })
  ];
}

export function logUpdateCartQty(productId: number, qty: number): SpringLog[] {
  const index = mockCartItems.findIndex(c => c.productId === productId);
  if (index === -1) return [];

  let sql = "";
  let listLogs: SpringLog[] = [];
  const endpoint = `/api/carts/items/${productId}`;

  if (qty <= 0) {
    sql = `DELETE FROM cart_items WHERE product_id = ${productId} AND user_id = 1;`;
    mockCartItems.splice(index, 1);
    listLogs = [
      createLog('INFO', 'CartController', `Handling DELETE item in cart`, endpoint, 'DELETE'),
      createLog('INFO', 'CartRepository', `Executing Hibernate delete: SQL: ${sql}`),
      createLog('INFO', 'CartController', `HTTP 200 OK. Product ${productId} removed from user cart`)
    ];
  } else {
    mockCartItems[index].quantity = qty;
    sql = `UPDATE cart_items SET quantity = ${qty} WHERE product_id = ${productId} AND user_id = 1;`;
    listLogs = [
      createLog('INFO', 'CartController', `Handling PUT item update in cart`, endpoint, 'PUT', { quantity: qty }),
      createLog('INFO', 'CartRepository', `Executing Hibernate update: SQL: ${sql}`),
      createLog('INFO', 'CartController', `HTTP 200 OK. Product ${productId} qty updated to ${qty}`)
    ];
  }

  return listLogs;
}

export function logOrderPlacement(cart: CartItem[]): { logs: SpringLog[]; orderId: number; success: boolean; errorMsg?: string } {
  // Validate stock
  for (const item of cart) {
    const dbProd = mockProducts.find(p => p.id === item.product.id);
    if (!dbProd) {
      return {
        success: false,
        orderId: 0,
        logs: [createLog('ERROR', 'OrderService', `Cart verification failed: Product with ID ${item.product.id} does not exist`)],
        errorMsg: "Product not found during database validation."
      };
    }
    if (dbProd.stock < item.quantity) {
      return {
        success: false,
        orderId: 0,
        logs: [
          createLog('INFO', 'OrderController', `Handling POST request for checkout`, "/api/orders/create", 'POST'),
          createLog('WARN', 'OrderService', `Validation Alert: Insufficient stock for product [${dbProd.title}]. Requested: ${item.quantity}, Available: ${dbProd.stock}`),
          createLog('ERROR', 'OrderController', `HTTP 400 Bad Request. Transaction aborted: Stock depleted`)
        ],
        errorMsg: `Oops! We are short on stock for ${dbProd.title}. Available in MySQL DB: ${dbProd.stock}.`
      };
    }
  }

  // Deduct stock, make orders
  const logs: SpringLog[] = [
    createLog('INFO', 'OrderController', `Handling POST checkout request`, "/api/orders/create", 'POST', {
      userId: 1,
      items: cart.map(c => ({ productId: c.product.id, quantity: c.quantity }))
    }),
    createLog('INFO', 'OrderService', "Initiating database ACID @Transactional block..."),
    createLog('INFO', 'OrderService', "Securing pessimistic write locks for product stock rows")
  ];

  const totalAmount = cart.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  const orderId = orderCounter++;
  const txnId = "TXN" + Date.now();

  // 1. Deduct Stock
  cart.forEach(item => {
    const dbProd = mockProducts.find(p => p.id === item.product.id)!;
    const oldStock = dbProd.stock;
    dbProd.stock -= item.quantity;
    const updateSql = `UPDATE products SET stock = ${dbProd.stock} WHERE id = ${dbProd.id};`;
    logs.push(
      createLog('INFO', 'ProductRepository', `Executing stock write: SQL: ${updateSql} (Stock row updated from ${oldStock} to ${dbProd.stock})`)
    );
  });

  // 2. Insert Order
  mockOrders.push({
    id: orderId,
    orderDate: new Date().toISOString(),
    totalAmount,
    status: "SUCCESS",
    transactionId: txnId
  });
  const orderSql = `INSERT INTO orders (id, order_date, total_amount, status, transaction_id) VALUES (${orderId}, NOW(), ${totalAmount}, 'SUCCESS', '${txnId}');`;
  logs.push(
    createLog('INFO', 'OrderRepository', `Saving root order metadata: SQL: ${orderSql}`)
  );

  // 3. Insert Order details
  cart.forEach(item => {
    const odId = orderDetailCounter++;
    mockOrderDetails.push({
      id: odId,
      orderId,
      productId: item.product.id,
      quantity: item.quantity,
      price: item.product.price
    });
    const odSql = `INSERT INTO order_items (id, order_id, product_id, quantity, price) VALUES (${odId}, ${orderId}, ${item.product.id}, ${item.quantity}, ${item.product.price});`;
    logs.push(
      createLog('INFO', 'OrderItemRepository', `Saving child order item: SQL: ${odSql}`)
    );
  });

  // 4. Clear Cart
  mockCartItems = [];
  const clearCartSql = `DELETE FROM cart_items WHERE user_id = 1;`;
  logs.push(
    createLog('INFO', 'CartRepository', `Clearing user cart state in database: SQL: ${clearCartSql}`),
    createLog('INFO', 'OrderService', `ACID Transaction committed successfully for Order ID ${orderId}`),
    createLog('INFO', 'OrderController', `HTTP 201 Created. Returning finalized Order body.`, undefined, undefined, undefined, {
      id: orderId,
      orderDate: new Date().toISOString().substring(0, 10),
      totalAmount,
      status: "SUCCESS",
      transactionId: txnId
    })
  );

  return { success: true, orderId, logs };
}

// User-Facing MySQL Query Execution Helper
export function runCustomSQLQuery(query: string): { success: boolean; columns?: string[]; rows?: MySQLRow[]; error?: string } {
  try {
    const cleanQuery = query.trim().replace(/;$/, "").toLowerCase();

    if (cleanQuery.startsWith("select * from products")) {
      const dbTables = getDatabaseTables();
      const productTable = dbTables[0];
      return { success: true, columns: productTable.columns, rows: productTable.rows };
    }
    else if (cleanQuery.startsWith("select * from users")) {
      const dbTables = getDatabaseTables();
      const usersTable = dbTables[1];
      return { success: true, columns: usersTable.columns, rows: usersTable.rows };
    }
    else if (cleanQuery.startsWith("select * from orders")) {
      const dbTables = getDatabaseTables();
      const ordersTable = dbTables[2];
      return { success: true, columns: ordersTable.columns, rows: ordersTable.rows };
    }
    else if (cleanQuery.startsWith("select * from order_items")) {
      const dbTables = getDatabaseTables();
      const oiTable = dbTables[3];
      return { success: true, columns: oiTable.columns, rows: oiTable.rows };
    }
    else if (cleanQuery.startsWith("select * from cart_items")) {
      const dbTables = getDatabaseTables();
      const cartTable = dbTables[4];
      return { success: true, columns: cartTable.columns, rows: cartTable.rows };
    }
    else if (cleanQuery.startsWith("select") && cleanQuery.includes("from products") && cleanQuery.includes("where")) {
      // Basic filter emulator
      const matchingArr = mockProducts.filter(p => {
        if (cleanQuery.includes("stock <") || cleanQuery.includes("stock <=")) {
          const match = cleanQuery.match(/stock\s*<[=]?\s*(\d+)/);
          if (match && match[1]) {
            return p.stock < parseInt(match[1]);
          }
        }
        if (cleanQuery.includes("category")) {
          const match = cleanQuery.match(/category\s*=\s*'([^']+)'/);
          if (match && match[1]) {
            return p.category.toLowerCase() === match[1];
          }
        }
        if (cleanQuery.includes("brand")) {
          const match = cleanQuery.match(/brand\s*=\s*'([^']+)'/);
          if (match && match[1]) {
            return p.brand.toLowerCase() === match[1];
          }
        }
        return true;
      });

      return {
        success: true,
        columns: ["id", "title", "category", "price", "stock"],
        rows: matchingArr.map(p => ({
          id: p.id,
          title: p.title.substring(0, 25),
          category: p.category,
          price: `₹${p.price.toLocaleString("en-IN")}`,
          stock: p.stock
        }))
      };
    }
    else {
      return {
        success: false,
        error: "MySQL Syntax Error: Only read-only queries (SELECT * FROM [products/users/orders/order_items/cart_items]) are currently allowed during sandbox operations."
      };
    }
  } catch (err: any) {
    return { success: false, error: `MySQL Driver Exception: ${err.message || 'unknown issue'}` };
  }
}
