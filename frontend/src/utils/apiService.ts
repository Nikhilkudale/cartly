import axios from "axios";

// Target production API URL or relative API endpoint via dev proxy
const API_URL = import.meta.env.VITE_API_URL || "/api";

const api = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
});

// Request Interceptor to attach Spring Security JWT token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export interface Category {
  id: number;
  name: string;
  description: string;
}

export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  stock: number;
  brand: string;
  category: string;
  imageUrl: string;
}

export interface SpringLog {
  id: string;
  timestamp: string;
  level: "INFO" | "WARN" | "ERROR";
  className: string;
  message: string;
  endpoint?: string;
  method?: string;
  sqlQuery?: string;
}

export interface MySQLTable {
  name: string;
  columns: string[];
  rows: any[];
}

// ----------------------------------------------------
// TELEMETRY SIMULATION ENGINE (CLIENT-SIDE CLIENT LOGS)
// ----------------------------------------------------
let simulatedLogs: SpringLog[] = [
  {
    id: "init-1",
    timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19) + '.024',
    level: "INFO",
    className: "com.ecommerce.security.JwtAuthenticationFilter",
    message: "Spring Security Filter Chain configured successfully. JWT filters active."
  },
  {
    id: "init-2",
    timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19) + '.089',
    level: "INFO",
    className: "com.ecommerce.service.ProductService",
    message: "Hibernate ORM loaded categories and pre-seeded catalog from system metadata."
  }
];

function addSimulatedLog(
  level: "INFO" | "WARN" | "ERROR",
  className: string,
  message: string,
  endpoint?: string,
  method?: string,
  sqlQuery?: string
) {
  const timestamp = new Date().toISOString().replace('T', ' ').substring(0, 19) + '.812';
  simulatedLogs.push({
    id: Math.random().toString(36).substring(7),
    timestamp,
    level,
    className: `com.ecommerce.${className}`,
    message,
    endpoint,
    method,
    sqlQuery
  });
  if (simulatedLogs.length > 300) {
    simulatedLogs.shift();
  }
}

// In-Memory product list cache to build SQL workbench views
let localProductsCache: Product[] = [];
let localOrdersCache: any[] = [];

export const apiService = {
  // 1. Authentication Service
  auth: {
    async login(email: string, password: string) {
      addSimulatedLog("INFO", "security.JwtAuthenticationFilter", `Intercepting authentication credentials for user email: ${email}`, "/api/auth/login", "POST");
      try {
        const response = await api.post("/auth/login", { email, password });
        if (response.data && response.data.token) {
          localStorage.setItem("token", response.data.token);
          const mappedUser = {
            id: response.data.userId,
            email: response.data.email,
            username: response.data.email, // Map username to email for frontend compatibility
            fullName: response.data.fullName,
            role: response.data.role?.replace("ROLE_", "") || "USER"
          };
          localStorage.setItem("user", JSON.stringify(mappedUser));
          addSimulatedLog("INFO", "service.AuthService", "JWT generated. Principal matching authority initialized.", undefined, undefined, `SELECT * FROM users WHERE email = '${email}';`);
          return {
            success: true,
            token: response.data.token,
            user: mappedUser
          };
        }
        throw new Error("Missing authentication token.");
      } catch (err: any) {
        addSimulatedLog("WARN", "service.AuthService", `Bad Credentials request aborted for principal: ${email}`);
        throw err;
      }
    },
    async register(fullName: string, email: string, username: string, password: string, role: string) {
      addSimulatedLog("INFO", "service.AuthService", `Registering candidate principal account: ${email}`, "/api/auth/register", "POST");
      try {
        const response = await api.post("/auth/register", { fullName, email, password });
        if (response.data && response.data.token) {
          localStorage.setItem("token", response.data.token);
          const mappedUser = {
            id: response.data.userId,
            email: response.data.email,
            username: response.data.email, // Map username to email for frontend compatibility
            fullName: response.data.fullName,
            role: response.data.role?.replace("ROLE_", "") || "USER"
          };
          localStorage.setItem("user", JSON.stringify(mappedUser));
          addSimulatedLog("INFO", "service.AuthService", "User entry saved. Securing credentials using BCrypt.", undefined, undefined, `INSERT INTO users (email, full_name, password, role) VALUES ('${email}', '${fullName}', 'BCRYPT_HASH', 'ROLE_USER');`);
          return {
            success: true,
            token: response.data.token,
            user: mappedUser
          };
        }
        throw new Error("Missing authentication token.");
      } catch (err: any) {
        addSimulatedLog("ERROR", "service.AuthService", `Failed to complete registration flow: ${err.message}`);
        throw err;
      }
    },
    async getMe() {
      const userStr = localStorage.getItem("user");
      if (!userStr) return null;
      return { success: true, user: JSON.parse(userStr) };
    },
    logout() {
      addSimulatedLog("INFO", "security.JwtAuthenticationFilter", "Invalidating JWT bearer security context.");
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }
  },

  // 2. Product Catalog Service
  products: {
    async list() {
      addSimulatedLog("INFO", "controller.CatalogController", "Mapping GET catalog request for products list.", "/api/products", "GET");
      try {
        const response = await api.get<any[]>("/products");
        const mappedProducts: Product[] = response.data.map((p) => ({
          id: p.id,
          title: p.name,
          description: p.description,
          price: p.price,
          stock: p.stock,
          brand: p.categoryName || "Premium",
          category: p.categoryName || "General",
          imageUrl: p.imageUrl || "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&auto=format&fit=crop&q=80"
        }));
        localProductsCache = mappedProducts;
        addSimulatedLog("INFO", "service.ProductService", `Returned ${mappedProducts.length} catalog active entities.`, undefined, undefined, "SELECT * FROM products p JOIN categories c ON p.category_id = c.id;");
        return mappedProducts;
      } catch (err: any) {
        addSimulatedLog("ERROR", "service.ProductService", `Failed fetching active catalog items: ${err.message}`);
        throw err;
      }
    },
    async getCategories() {
      addSimulatedLog("INFO", "controller.CatalogController", "Fetching category records.", "/api/categories", "GET");
      try {
        const response = await api.get<Category[]>("/categories");
        const categoryNames = ["All", ...response.data.map(c => c.name)];
        addSimulatedLog("INFO", "service.CategoryService", `Loaded ${response.data.length} categories.`, undefined, undefined, "SELECT name FROM categories;");
        return categoryNames;
      } catch (err: any) {
        addSimulatedLog("ERROR", "service.CategoryService", `Failed categories fetch: ${err.message}`);
        throw err;
      }
    },
    async get(id: number) {
      addSimulatedLog("INFO", "controller.CatalogController", `Fetching detail entity: ${id}`, `/api/products/${id}`, "GET");
      try {
        const response = await api.get<any>(`/products/${id}`);
        const p = response.data;
        const mapped: Product = {
          id: p.id,
          title: p.name,
          description: p.description,
          price: p.price,
          stock: p.stock,
          brand: p.categoryName || "Premium",
          category: p.categoryName || "General",
          imageUrl: p.imageUrl || "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&auto=format&fit=crop&q=80"
        };
        return mapped;
      } catch (err: any) {
        addSimulatedLog("WARN", "service.ProductService", `Product ID not found: ${id}`);
        throw err;
      }
    }
  },

  // 3. Database-Persisted Cart Service
  cart: {
    async get() {
      addSimulatedLog("INFO", "controller.CartController", "Intercepting session cart fetch request.", "/api/cart", "GET");
      try {
        const response = await api.get<any>("/cart");
        addSimulatedLog("INFO", "service.CartService", "JPA Join mapping resolved for cart items.", undefined, undefined, `SELECT * FROM cart WHERE user_id = current_user_id;`);
        return response.data;
      } catch (err: any) {
        addSimulatedLog("WARN", "service.CartService", `No active cart found or unauthorized.`);
        throw err;
      }
    },
    async addItem(productId: number, quantity: number) {
      addSimulatedLog("INFO", "controller.CartController", `Appending product: ${productId} quantity: ${quantity} to cart.`, "/api/cart/items", "POST");
      try {
        const response = await api.post("/cart/items", { productId, quantity });
        addSimulatedLog("INFO", "service.CartService", "Cart quantity sync successful.", undefined, undefined, `INSERT INTO cart_items (cart_id, product_id, quantity) VALUES (user_cart_id, ${productId}, ${quantity}) ON DUPLICATE KEY UPDATE quantity = quantity + ${quantity};`);
        return response.data;
      } catch (err: any) {
        addSimulatedLog("ERROR", "service.CartService", `Cart write failure: ${err.message}`);
        throw err;
      }
    },
    async updateItem(productId: number, quantity: number) {
      addSimulatedLog("INFO", "controller.CartController", `Mutating item: ${productId} count to ${quantity}`, `/api/cart/items/${productId}`, "PUT");
      try {
        const response = await api.put(`/cart/items/${productId}`, null, { params: { quantity } });
        addSimulatedLog("INFO", "service.CartService", "Updated quantity record in database.", undefined, undefined, `UPDATE cart_items SET quantity = ${quantity} WHERE product_id = ${productId};`);
        return response.data;
      } catch (err: any) {
        throw err;
      }
    },
    async removeItem(productId: number) {
      addSimulatedLog("INFO", "controller.CartController", `Deleting product: ${productId} from cart mapping.`, `/api/cart/items/${productId}`, "DELETE");
      try {
        const response = await api.delete(`/cart/items/${productId}`);
        addSimulatedLog("INFO", "service.CartService", "Cascade items row deleted from MySQL database.", undefined, undefined, `DELETE FROM cart_items WHERE product_id = ${productId};`);
        return response.data;
      } catch (err: any) {
        throw err;
      }
    }
  },

  // 4. Order and Checkout Service
  orders: {
    async checkout(payload: any) {
      addSimulatedLog("INFO", "controller.OrderController", "Processing placing order checkout transactional session.", "/api/orders", "POST");
      try {
        const shippingAddress = typeof payload.shippingAddress === 'object'
          ? `${payload.shippingAddress.fullName}, ${payload.shippingAddress.street}, ${payload.shippingAddress.city}, ${payload.shippingAddress.state} - ${payload.shippingAddress.pincode}. Phone: ${payload.shippingAddress.phone}`
          : String(payload.shippingAddress);
        const paymentMethod = String(payload.paymentMethod);

        const response = await api.post("/orders", { shippingAddress, paymentMethod });
        const o = response.data;
        localOrdersCache.push(o);
        
        // Mock payment process to match cartly workflow
        addSimulatedLog("INFO", "service.OrderService", `Checkout transaction completed successfully. Order ID: ${o.id}`, undefined, undefined, `INSERT INTO orders (id, total_amount, status, shipping_address) VALUES (${o.id}, ${o.totalAmount}, 'PENDING', '${shippingAddress}');`);
        
        addSimulatedLog("INFO", "controller.PaymentController", `Auto processing Mock Payment for Order: ${o.id}`, "/api/payments/process", "POST");
        await api.post("/payments/process", { orderId: o.id, paymentMethod });
        addSimulatedLog("INFO", "service.PaymentService", `Payment success generated for Order ID: ${o.id}`, undefined, undefined, `INSERT INTO payments (order_id, payment_method, status) VALUES (${o.id}, '${paymentMethod}', 'COMPLETED');`);
        
        return {
          success: true,
          order: o,
          message: "Order placed successfully matching enterprise Spring Boot specs."
        };
      } catch (err: any) {
        addSimulatedLog("ERROR", "service.OrderService", `Order placing aborted: ${err.message}`);
        throw err;
      }
    },
    async listForUser() {
      addSimulatedLog("INFO", "controller.OrderController", "Mapping orders list fetch request.", "/api/orders", "GET");
      try {
        const response = await api.get<any[]>("/orders");
        localOrdersCache = response.data;
        addSimulatedLog("INFO", "service.OrderService", `Returned ${response.data.length} client order rows.`, undefined, undefined, `SELECT * FROM orders WHERE user_id = current_user_id;`);
        return response.data;
      } catch (err: any) {
        throw err;
      }
    }
  },

  // 5. High-Fidelity Simulated Developer Companion Endpoints
  developer: {
    async getLogs() {
      return simulatedLogs;
    },
    async getTables() {
      const userStr = localStorage.getItem("user");
      const currentUsr = userStr ? JSON.parse(userStr) : null;
      
      return [
        {
          name: "products",
          columns: ["id", "name", "category", "price", "stock"],
          rows: localProductsCache.map(p => ({
            id: p.id,
            name: p.title.substring(0, 30) + (p.title.length > 30 ? "..." : ""),
            category: p.category,
            price: `₹${p.price.toLocaleString("en-IN")}`,
            stock: p.stock
          }))
        },
        {
          name: "users",
          columns: ["id", "email", "role", "full_name"],
          rows: currentUsr ? [
            {
              id: currentUsr.id,
              email: currentUsr.email,
              role: currentUsr.role,
              full_name: currentUsr.fullName
            }
          ] : [
            {
              id: 1,
              email: "user@shop.com",
              role: "USER",
              full_name: "Customer Seed User"
            },
            {
              id: 2,
              email: "admin@shop.com",
              role: "ADMIN",
              full_name: "Administrator Seed User"
            }
          ]
        },
        {
          name: "orders",
          columns: ["id", "total_amount", "status", "address"],
          rows: localOrdersCache.map(o => ({
            id: o.id,
            total_amount: `₹${o.totalAmount.toLocaleString("en-IN")}`,
            status: o.status || "COMPLETED",
            address: o.shippingAddress?.substring(0, 20) + (o.shippingAddress?.length > 20 ? "..." : "")
          }))
        }
      ];
    },
    async reset() {
      simulatedLogs = [
        {
          id: "init-reset",
          timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19) + '.901',
          level: "INFO",
          className: "com.ecommerce.service.CatalogService",
          message: "Triggered active JPA cache flush. Reloading entities."
        }
      ];
      addSimulatedLog("INFO", "service.ProductService", "Catalog and logs cached memory cleared.");
      return { success: true };
    },
    async restock(amount: number) {
      addSimulatedLog("INFO", "service.ProductService", `Simulating Restock request inside JPA Context. Restocking item stocks: ${amount}`);
      return { success: true };
    }
  }
};
