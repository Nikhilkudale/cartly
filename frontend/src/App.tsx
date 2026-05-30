import React, { useState, useEffect } from 'react';
import { CATEGORIES, PRODUCTS_DATA } from './data/products';
import { CartItem, Product, SpringLog, MySQLTable } from './types';
import OnyxHeader from './components/OnyxHeader';
import ProductCard from './components/ProductCard';
import ProductDetailModal from './components/ProductDetailModal';
import CartDrawer from './components/CartDrawer';
import OrderConfirmationModal from './components/OrderConfirmationModal';
import DeveloperSandbox from './components/DeveloperSandbox';
import MyOrdersDrawer, { SavedOrder } from './components/MyOrdersDrawer';
import SavedItemsDrawer from './components/SavedItemsDrawer';
import CheckoutModal from './components/CheckoutModal';
import Toast, { ToastMessage } from './components/Toast';
import { ShieldCheck, Terminal, Award, ChevronRight, Sparkles, Filter, ShieldAlert, Cpu, ShoppingCart } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { apiService } from './utils/apiService';
import { mockUsers, resetDatabase, registerMockUser, logAddToCart, logProductFetch, bulkRestockProducts } from './utils/dbSimulator';

export default function App() {
  // Storefront catalog states
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [visibleCount, setVisibleCount] = useState<number>(18);

  // Cart & checkout states
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isOrdering, setIsOrdering] = useState(false);
  const [confirmedOrderId, setConfirmedOrderId] = useState<number | null>(null);

  // Luxury wishlist & orders states
  const [savedItems, setSavedItems] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('onyx_saved_items');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [orders, setOrders] = useState<SavedOrder[]>(() => {
    try {
      const saved = localStorage.getItem('onyx_orders');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [isOrdersOpen, setIsOrdersOpen] = useState(false);
  const [isSavedOpen, setIsSavedOpen] = useState(false);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [pendingCheckoutAfterLogin, setPendingCheckoutAfterLogin] = useState(false);

  // Developer companion states
  const [isSandboxOpen, setIsSandboxOpen] = useState(true); // Default open on desktop to highlight the companion!
  const [sandboxActiveTab, setSandboxActiveTab] = useState<'terminal' | 'database' | 'code'>('terminal');
  const [systemLogs, setSystemLogs] = useState<SpringLog[]>([]);
  const [dbTables, setDbTables] = useState<MySQLTable[]>([]);

  const [realProducts, setRealProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<string[]>(['All']);

  // User Security context states
  const [currentUser, setCurrentUser] = useState<{ id?: number; username: string; email: string; role: 'CUSTOMER' | 'ADMIN'; token?: string; fullName: string } | null>(null);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [loginMode, setLoginMode] = useState<'login' | 'register'>('login');
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [registerFullName, setRegisterFullName] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerRole, setRegisterRole] = useState<'CUSTOMER' | 'ADMIN'>('CUSTOMER');

  // Hero curated carousel index states
  const [heroIndex, setHeroIndex] = useState(0);
  const heroSlides = [
    { 
      tag: "THE TITANIUM SERIES", 
      title: "Aerospace Grade Masterpieces.", 
      desc: "Curated collection of smartphones forged from high-density grade 5 titanium alloy. Durable, exceptionally light, and aesthetically absolute.", 
      bg: "from-[#111827] via-[#0E1325] to-[#0A0F1D]",
      image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=850&auto=format&fit=crop&q=80"
    },
    { 
      tag: "LUXE COUTURE WEAR", 
      title: "Asymmetric Modernism.", 
      desc: "Timeless fashion segments featuring minimal silhouettes, premium textures, and breathable technical knits designed to flow seamlessly.", 
      bg: "from-[#0F172A] via-[#0B0F1A] to-[#070A14]",
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=850&auto=format&fit=crop&q=80"
    }
  ];

  // 1. Restore User JWT and Start Regular Polling on Mount
  useEffect(() => {
    const restoreUser = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const res = await apiService.auth.getMe();
          if (res && res.success && res.user) {
            setCurrentUser(res.user);
          }
        } catch {
          localStorage.removeItem("token");
        }
      }
    };
    restoreUser();

    // Fetch initial products and categories from the real Spring Boot backend
    const fetchCatalogData = async () => {
      try {
        const fetchedProds = await apiService.products.list();
        setRealProducts(fetchedProds);
        
        const fetchedCats = await apiService.products.getCategories();
        setCategories(fetchedCats);
        
        syncStorefrontState();
      } catch (err) {
        console.error("Error loading products/categories:", err);
      }
    };
    fetchCatalogData();

    // Slide index interval loop
    const heroTimer = setInterval(() => {
      setHeroIndex(prev => (prev + 1) % heroSlides.length);
    }, 6500);

    return () => clearInterval(heroTimer);
  }, []);

  // Sync / Poll Backend Databases & Server Telemetry Logs in Real-Time
  useEffect(() => {
    if (!isSandboxOpen) return;

    const pollBackend = async () => {
      try {
        const fetchedLogs = await apiService.developer.getLogs();
        setSystemLogs(Array.isArray(fetchedLogs) ? fetchedLogs : []);
        
        const fetchedTables = await apiService.developer.getTables();
        setDbTables(Array.isArray(fetchedTables) ? fetchedTables : []);
      } catch (err) {
        console.error("Poller issue: ", err);
      }
    };

    pollBackend();
    const interval = setInterval(pollBackend, 3000);
    return () => clearInterval(interval);
  }, [isSandboxOpen]);

  // Fetch orders when currentUser is loaded
  useEffect(() => {
    const fetchOrders = async () => {
      if (currentUser?.id) {
        try {
          const fetchedOrders = await apiService.orders.listForUser();
          const mappedOrders = fetchedOrders.map((o: any) => ({
            id: o.id,
            date: new Date(o.createdAt).toLocaleDateString('en-IN', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            }),
            items: o.items.map((i: any) => {
              const productTemplate = CATEGORIES.some(() => true) && PRODUCTS_DATA.find(p => p.id === i.productId) || PRODUCTS_DATA[0];
              return {
                productId: i.productId,
                title: productTemplate.title,
                brand: productTemplate.brand,
                quantity: i.quantity,
                price: productTemplate.price,
                image: productTemplate.image
              };
            }),
            totalAmount: o.totalAmount,
            transactionId: o.payment?.transactionId || "TXN-MOCK",
            shippingAddress: (() => {
              try {
                return typeof o.shippingAddress === 'object' 
                  ? o.shippingAddress 
                  : JSON.parse(o.shippingAddress);
              } catch {
                const parts = String(o.shippingAddress).split(', ');
                const phoneMatch = String(o.shippingAddress).match(/Phone:\s*([^\s,]+)/);
                const pincodeMatch = String(o.shippingAddress).match(/-\s*(\d{6})/);
                return {
                  fullName: parts[0] || '',
                  street: parts[1] || '',
                  city: parts[2] || '',
                  state: parts[3]?.split(' - ')[0] || '',
                  pincode: pincodeMatch ? pincodeMatch[1] : '',
                  phone: phoneMatch ? phoneMatch[1] : ''
                };
              }
            })(),
            paymentMethod: o.payment?.paymentMethod || "UPI",
            status: (o.status === "DELIVERED" ? "Delivered" : o.status === "SHIPPED" ? "Shipped" : o.status === "CONFIRMED" ? "Processing" : "Ordered") as SavedOrder['status'],
            statusTimestamp: new Date(o.createdAt).getTime()
          }));
          setOrders(mappedOrders);
        } catch (err) {
          console.error("Error setting orders list from server: ", err);
        }
      } else {
        setOrders([]);
      }
    };
    fetchOrders();
  }, [currentUser]);

  // Sync wishlist to local storage (Wishlist remains local-storage persistent)
  useEffect(() => {
    localStorage.setItem('onyx_saved_items', JSON.stringify(savedItems));
  }, [savedItems]);

  // Reset pagination limit on filter/search change
  useEffect(() => {
    setVisibleCount(18);
  }, [selectedCategory, searchQuery]);

  const syncStorefrontState = async () => {
    try {
      const fetchedTables = await apiService.developer.getTables();
      setDbTables(Array.isArray(fetchedTables) ? fetchedTables : []);
    } catch (err) {
      console.error(err);
    }
  };

  // 3. Category filter handlers
  const handleSelectCategory = (category: string) => {
    setSelectedCategory(category);
    setSearchQuery('');
  };

  // 4. Searching helper
  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const getCatalogProducts = () => {
    if (realProducts.length === 0) return PRODUCTS_DATA;
    
    return realProducts.map(p => {
      const template = PRODUCTS_DATA.find(t => t.id === p.id) || PRODUCTS_DATA[p.id % PRODUCTS_DATA.length] || PRODUCTS_DATA[0];
      return {
        ...template,
        id: p.id,
        title: p.title,
        description: p.description,
        price: p.price,
        stock: p.stock,
        brand: p.brand,
        category: p.category,
        image: p.imageUrl || template.image
      };
    });
  };

  const catalogList = getCatalogProducts();
  const searchLower = searchQuery.toLowerCase();
  
  const displayedCatalog = catalogList.filter(prod => {
    const matchCat = selectedCategory === 'All' || prod.category === selectedCategory;
    const matchSearch = !searchQuery || 
                        prod.title.toLowerCase().includes(searchLower) || 
                        prod.brand.toLowerCase().includes(searchLower);
    return matchCat && matchSearch;
  });

  const visibleProducts = displayedCatalog.slice(0, visibleCount);

  // Up-selling recommendation logic: up to 10 masterpieces in the same category
  const relatedProducts = selectedProduct
    ? catalogList
        .filter((p: Product) => p.category === selectedProduct.category && p.id !== selectedProduct.id)
        .slice(0, 10)
    : [];

  // 6. Add products to cart
  const handleAddToCart = (product: Product) => {
    setCart(prev => {
      const idx = prev.findIndex(item => item.product.id === product.id);
      if (idx > -1) {
        const copy = [...prev];
        copy[idx].quantity += 1;
        return copy;
      } else {
        return [...prev, { id: Date.now(), product, quantity: 1 }];
      }
    });
    setIsCartOpen(true);
  };

  // 7. Update cart quantity lines
  const handleUpdateCartQty = (productId: number, qty: number) => {
    setCart(prev => {
      if (qty <= 0) {
        return prev.filter(c => c.product.id !== productId);
      }
      return prev.map(c => {
        if (c.product.id === productId) {
          return { ...c, quantity: qty };
        }
        return c;
      });
    });
  };

  // 8. Place Order checkout triggers with guest authentication locks
  const handleCheckoutTrigger = () => {
    if (!currentUser) {
      addToast("Authentication required before Checkout. Initializing secure credential validation...", "warn");
      setPendingCheckoutAfterLogin(true);
      setLoginMode('login');
      setIsLoginModalOpen(true);
    } else {
      setIsCartOpen(false);
      setIsCheckoutModalOpen(true);
    }
  };

  const handlePlaceOrder = async (orderData: {
    shippingAddress: {
      fullName: string;
      phone: string;
      pincode: string;
      street: string;
      city: string;
      state: string;
    };
    paymentMethod: string;
  }) => {
    setIsOrdering(true);

    const subtotal = cart.reduce((total, item) => total + (item.product.price * item.quantity), 0);
    const totalDiscount = cart.reduce((total, item) => total + (((item.product.originalPrice || item.product.price) - item.product.price) * item.quantity), 0);
    const deliveryCharges = subtotal > 150000 ? 0 : 2500;
    const taxAmount = Math.round(subtotal * 0.18);
    const finalTotal = subtotal - totalDiscount + deliveryCharges + taxAmount;

    try {
      // Ensure the backend database cart is in sync with the frontend React cart prior to order checkout
      if (currentUser) {
        try {
          const currentDbCart = await apiService.cart.get();
          if (currentDbCart && currentDbCart.items && currentDbCart.items.length > 0) {
            for (const item of currentDbCart.items) {
              await apiService.cart.removeItem(item.productId);
            }
          }
          for (const cartItem of cart) {
            await apiService.cart.addItem(cartItem.product.id, cartItem.quantity);
          }
        } catch (syncErr) {
          console.error("Failed to sync cart to backend before checkout:", syncErr);
        }
      }

      const payload = {
        userId: currentUser?.id || 1,
        userEmail: currentUser?.email || "customer@onyx.luxe",
        shippingAddress: orderData.shippingAddress,
        items: cart.map(item => ({
          productId: item.product.id,
          quantity: item.quantity
        })),
        originalSubtotal: subtotal,
        totalDiscount,
        deliveryCharges,
        taxAmount,
        finalTotal,
        paymentMethod: orderData.paymentMethod
      };

      const result = await apiService.orders.checkout(payload);

      setIsOrdering(false);

      if (result.success) {
        // Build new SavedOrder object matching UI scheme
        const newOrder: SavedOrder = {
          id: result.order.id,
          date: new Date(result.order.createdAt).toLocaleDateString('en-IN', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          }),
          items: cart.map(item => ({
            productId: item.product.id,
            title: item.product.title,
            brand: item.product.brand,
            quantity: item.quantity,
            price: item.product.price,
            image: item.product.image
          })),
          totalAmount: result.order.totalAmount,
          transactionId: result.order.payment?.transactionId || "TXN-MOCK",
          shippingAddress: orderData.shippingAddress,
          paymentMethod: result.order.payment?.paymentMethod || orderData.paymentMethod,
          status: 'Ordered',
          statusTimestamp: Date.now()
        };

        setOrders(prev => [newOrder, ...prev]);
        setCart([]);
        setIsCartOpen(false);
        setIsCheckoutModalOpen(false);
        setConfirmedOrderId(result.order.id);
        addToast("Transaction complete: Your luxury order has been committed!", "success");
      } else {
        addToast(result.message || "Database rollback occurred.", "error");
      }
    } catch (err: any) {
      setIsOrdering(false);
      console.error("Place order failed details:", err);
      const errMsg = err.response?.data?.message || err.message || "An exception occurred inside standard gateway. Transaction rollback initiated.";
      addToast(errMsg, "error");
    }

    setSandboxActiveTab('terminal');
    syncStorefrontState();
  };

  const handleToggleSaved = (product: Product) => {
    const exists = savedItems.some(item => item.id === product.id);
    if (exists) {
      setSavedItems(prev => prev.filter(item => item.id !== product.id));
      addToast(`"${product.title.replace(new RegExp('^' + product.brand + '\\s*', 'i'), '')}" removed from saved curations.`, 'info');
    } else {
      setSavedItems(prev => [...prev, product]);
      addToast(`Saved "${product.title.replace(new RegExp('^' + product.brand + '\\s*', 'i'), '')}" to your luxury wishlist tray.`, 'success');
    }
  };

  const handleRemoveFromSaved = (productId: number) => {
    setSavedItems(prev => prev.filter(item => item.id !== productId));
  };

  const handleMoveToCart = (product: Product) => {
    handleAddToCart(product);
    handleRemoveFromSaved(product.id);
    addToast('Moved curating piece into your cart allocations tray.', 'success');
  };

  const handleUpdateOrderStatus = (orderId: number, status: 'Ordered' | 'Processing' | 'Shipped' | 'Delivered') => {
    setOrders(prev => prev.map(o => {
      if (o.id === orderId) {
        addToast(`Order #${orderId} state overridden to: ${status}`, 'info');
        // Offset statusTimestamp so the dynamic auto-advance timeline syncs with our selected manual status override!
        const offsetSec = status === 'Ordered' ? 0 : status === 'Processing' ? 16 : status === 'Shipped' ? 36 : 56;
        return { ...o, status, statusTimestamp: Date.now() - (offsetSec * 1000) };
      }
      return o;
    }));
  };

  const addToast = (message: string, type: 'success' | 'warn' | 'error' | 'info' = 'success') => {
    const id = Math.random().toString(36).substring(7);
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  };

  const handleRemoveToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const handleBuyNow = (product: Product) => {
    const logs = logAddToCart(product.id, 1).map(l => ({
      ...l,
      className: l.className.replace('com.flipkart.clone', 'com.onyx.luxe')
    }));
    setSystemLogs(prev => [...prev, ...logs]);
    
    setCart(prev => {
      const idx = prev.findIndex(item => item.product.id === product.id);
      if (idx > -1) {
        const copy = [...prev];
        copy[idx].quantity += 1;
        return copy;
      } else {
        return [...prev, { id: Date.now(), product, quantity: 1 }];
      }
    });

    syncStorefrontState();
    setIsCartOpen(true);
  };

  // 9. Reset simulated JDBC database
  const handleResetDB = () => {
    resetDatabase();
    setCart([]);
    const resetLogs = [
      {
        id: 'initial',
        timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19) + '.000',
        level: 'INFO' as const,
        className: 'org.sqlite.JDBC',
        message: 'Successfully initialized connection wrapper for JDBC Dialect: MySQL8Dialect ( InnoDB )'
      },
      {
        id: 'spring_boot_bootloader',
        timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19) + '.002',
        level: 'INFO' as const,
        className: 'org.springframework.boot.SpringApplication',
        message: 'Starting OnyxLuxeApplication tomcat thread on port 8080. Connected schema logs to port 3306'
      },
      ...logProductFetch('All').map(l => ({
        ...l,
        className: l.className.replace('com.flipkart.clone', 'com.onyx.luxe')
      }))
    ];
    setSystemLogs(resetLogs);
    syncStorefrontState();
  };

  // 10. Spring Security REST Auth controllers & API RBAC endpoints
  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginUsername || !loginPassword) {
      alert("Please enter both email/username and password.");
      return;
    }

    try {
      const res = await apiService.auth.login(loginUsername.trim(), loginPassword);
      if (res && res.success && res.user) {
        setCurrentUser(res.user);
        setIsLoginModalOpen(false);
        addToast(`Successfully authenticated as ${res.user.fullName}! Welcome to Onyx Luxe.`, 'success');

        if (pendingCheckoutAfterLogin) {
          setPendingCheckoutAfterLogin(false);
          setTimeout(() => {
            setIsCartOpen(false);
            setIsCheckoutModalOpen(true);
          }, 500);
        }
      }
    } catch (err: any) {
      console.error("Login failed:", err);
      const errMsg = err.response?.data?.message || err.message || "Invalid credentials.";
      alert(`Authentication Failed: ${errMsg}\n\nPlease try these seed profiles:\n• 'user@shop.com' (password 'user123')\n• 'admin@shop.com' (password 'admin123')`);
    }

    syncStorefrontState();
    setSandboxActiveTab('terminal');
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginUsername || !loginPassword || !registerFullName) {
      alert("Please fill in all security parameter fields.");
      return;
    }
    if (loginPassword.length < 6) {
      alert("Registration Failed: Cryptographic password must be at least 6 characters long.");
      return;
    }
    if (!loginUsername.includes('@') || !loginUsername.includes('.')) {
      alert("Registration Failed: Principal Email Address must be a valid email format (e.g. user@shop.com).");
      return;
    }

    try {
      const res = await apiService.auth.register(
        registerFullName.trim(),
        loginUsername.trim(),
        loginUsername.trim(),
        loginPassword,
        registerRole
      );
      if (res && res.success && res.user) {
        setCurrentUser(res.user);
        setIsLoginModalOpen(false);
        addToast(`Account created! Welcome, ${res.user.fullName}.`, 'success');

        if (pendingCheckoutAfterLogin) {
          setPendingCheckoutAfterLogin(false);
          setTimeout(() => {
            setIsCartOpen(false);
            setIsCheckoutModalOpen(true);
          }, 500);
        }
      }
    } catch (err: any) {
      console.error("Registration failed:", err);
      const errMsg = err.response?.data?.message || err.message || "Failed to complete registration flow.";
      alert(`Registration Failed: ${errMsg}`);
    }

    syncStorefrontState();
    setSandboxActiveTab('terminal');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    const logId = Math.random().toString(36).substring(7);
    const logoutLogs = [
      {
        id: logId + '_1',
        timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19) + '.990',
        level: 'INFO' as const,
        className: 'org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler',
        message: 'Clearing and invalidating active security Principal references in Spring context.'
      },
      {
        id: logId + '_2',
        timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19) + '.992',
        level: 'INFO' as const,
        className: 'com.onyx.luxe.controller.AuthController',
        message: 'Context cleared. JWT session token revoked successfully.'
      }
    ];
    setSystemLogs(prev => [...prev, ...logoutLogs]);
    syncStorefrontState();
    setSandboxActiveTab('terminal');
  };

  const handleTriggerBulkRestock = () => {
    // SECURITY FILTER: Check Admin Role Privilege Authorization
    if (!currentUser || currentUser.role !== 'ADMIN') {
      const logId = Math.random().toString(36).substring(7);
      const errLogs = [
        {
          id: logId + '_1',
          timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19) + '.005',
          level: 'WARN' as const,
          className: 'org.springframework.security.web.access.intercept.FilterSecurityInterceptor',
          message: `Authorization check failed. Protected REST resource '/api/admin/restock' requested but Principal credentials authority is: ${currentUser ? 'ROLE_' + currentUser.role : 'ROLE_ANONYMOUS'}`
        },
        {
          id: logId + '_2',
          timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19) + '.007',
          level: 'ERROR' as const,
          className: 'org.springframework.security.access.AccessDeniedException',
          message: `Access is Denied (HTTP 403 Forbidden). secured method annotated @PreAuthorize("hasRole('ADMIN')") check failed.`
        }
      ];
      setSystemLogs(prev => [...prev, ...errLogs]);
      alert(`Access Protected Resource Fail: HTTP 403 Forbidden!\nSpring @PreAuthorize assessment rejected: Your login authority (${currentUser ? currentUser.role : 'GUEST/ANONYMOUS'}) does not possess administrative access privileges.`);
      setIsSandboxOpen(true);
      setSandboxActiveTab('terminal');
      return;
    }

    bulkRestockProducts(50);
    const logId = Math.random().toString(36).substring(7);
    const okLogs = [
      {
        id: logId + '_1',
        timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19) + '.005',
        level: 'INFO' as const,
        className: 'com.onyx.luxe.controller.AdminController',
        message: `Admin authorization success. Dispatching request mapping: POST '/api/admin/restock'`
      },
      {
        id: logId + '_2',
        timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19) + '.008',
        level: 'INFO' as const,
        className: 'com.onyx.luxe.repository.ProductRepository',
        message: `Database sync transaction: SQL: UPDATE products SET stock = 50; [Result: Bulk refresh OK]`
      },
      {
        id: logId + '_3',
        timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19) + '.012',
        level: 'INFO' as const,
        className: 'com.onyx.luxe.controller.AdminController',
        message: `Success HTTP 200. Restocked all items back to 50 in active MySQL table dataset.`
      }
    ];
    setSystemLogs(prev => [...prev, ...okLogs]);
    syncStorefrontState();
    setIsSandboxOpen(true);
    setSandboxActiveTab('terminal');
  };

  return (
    <div className="min-h-screen bg-luxury-obsidian flex flex-col antialiased text-slate-100 selection:bg-luxury-gold selection:text-luxury-obsidian">
      {/* Prime floating glass Header */}
      <OnyxHeader
        onSearch={handleSearch}
        searchVal={searchQuery}
        cartCount={cart.reduce((t, item) => t + item.quantity, 0)}
        onOpenCart={() => setIsCartOpen(true)}
        savedCount={savedItems.length}
        onOpenSaved={() => setIsSavedOpen(true)}
        onOpenOrders={() => setIsOrdersOpen(true)}
        isSandboxOpen={isSandboxOpen}
        onToggleSandbox={() => setIsSandboxOpen(!isSandboxOpen)}
        sandboxActiveTab={sandboxActiveTab}
        setSandboxActiveTab={setSandboxActiveTab}
        currentUser={currentUser}
        onOpenLogin={() => {
          setLoginMode('login');
          setLoginUsername('');
          setLoginPassword('');
          setRegisterFullName('');
          setRegisterEmail('');
          setRegisterRole('CUSTOMER');
          setIsLoginModalOpen(true);
        }}
        onLogout={handleLogout}
      />

      {/* Main Dual-Column Panel Workspace Layout */}
      <div className="flex-1 flex flex-col lg:flex-row min-h-0 w-full overflow-hidden">
        
        {/* LEFT COMPONENT: Beautiful Curated Storefront Panel */}
        <div className={`flex-1 flex flex-col overflow-y-auto p-6 md:p-10 space-y-8 ${isSandboxOpen ? 'lg:max-w-[55%] xl:max-w-[60%]' : 'max-w-7xl mx-auto w-full'}`}>
          
          {/* Aesthetic minimalist filters category bar */}
          <div className="inline-flex flex-wrap bg-white/[0.02] p-1.5 rounded-2xl border border-white/5 gap-1.5 items-center select-none overflow-x-auto scrollbar-none shrink-0 w-full">
            <div className="flex items-center gap-1.5 px-3.5 text-white/40 border-r border-white/10 shrink-0 text-xs font-mono tracking-widest uppercase">
              <Filter className="h-3 w-3 text-luxury-gold" />
              <span>Filter</span>
            </div>
            <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none w-full sm:w-auto">
              {categories.map(cat => {
                const emMap: Record<string, string> = {
                  'All': '✶',
                  'Mobiles': '📱',
                  'Fashion': '👗',
                  'Electronics': '💻',
                  'Appliances': '📺',
                  'Home & Furniture': '🛋️',
                  'Clothing': '👗',
                  'Mobiles & Tablets': '📱',
                  'Laptops & Computers': '💻',
                  'TV & Appliances': '📺'
                };
                return (
                  <button
                    key={cat}
                    onClick={() => handleSelectCategory(cat)}
                    className={`flex items-center gap-1.5 py-1.5 px-4 rounded-xl text-xs transition-all tracking-normal cursor-pointer whitespace-nowrap border ${
                      selectedCategory === cat
                        ? 'bg-gold-gradient text-luxury-obsidian border-transparent font-extrabold shadow-lg shadow-luxury-gold/5'
                        : 'text-white/65 hover:text-white bg-transparent border-white/5 hover:border-white/20'
                    }`}
                  >
                    <span className="text-[11px] font-mono">{emMap[cat] || '★'}</span>
                    <span className="font-sans text-[11px] uppercase tracking-wider">{cat}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Majestic smooth-fading curations hero canvas with bold typographic alignments */}
          <div className="relative rounded-3xl bg-neutral-950 border border-white/10 text-white shadow-2xl overflow-hidden min-h-[300px] md:min-h-[340px] shrink-0 transition-all duration-700 p-8 md:p-12 flex flex-col md:flex-row items-center gap-8 justify-between">
            {/* Dark abstract luxury radial shader gradient */}
            <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#0B0F19]/45 to-[#0B0F19] pointer-events-none" />
            <div className="absolute -left-20 -bottom-20 h-56 w-56 bg-luxury-gold/5 rounded-full blur-3xl pointer-events-none" />
            
            <div className="space-y-4 relative max-w-md z-10 select-none">
              <span className="text-[9px] uppercase font-bold tracking-widest px-3 py-1 rounded-full bg-white/5 border border-white/15 text-luxury-gold font-mono">
                {heroSlides[heroIndex].tag}
              </span>
              <h1 className="font-display font-extrabold text-2xl md:text-3xl leading-snug tracking-tight text-white">
                {heroSlides[heroIndex].title}
              </h1>
              <p className="text-white/50 text-[11px] sm:text-xs leading-relaxed font-sans font-light">
                {heroSlides[heroIndex].desc}
              </p>
              
              <div className="pt-2">
                <button 
                  onClick={() => {
                    setIsSandboxOpen(true);
                    setSandboxActiveTab('code');
                  }}
                  className="px-5 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono font-medium tracking-wider flex items-center gap-1.5 cursor-pointer text-white hover:text-luxury-gold transition-all"
                >
                  <span>SOURCE MAPPING</span>
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="relative w-full md:w-1/2 h-44 sm:h-56 z-10 shrink-0 select-none pointer-events-none flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.img
                  key={heroIndex}
                  src={heroSlides[heroIndex].image}
                  alt="Curated Collection Piece"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.6 }}
                  className="max-h-full max-w-full object-contain filter drop-shadow-2xl rounded-2xl"
                />
              </AnimatePresence>
            </div>
          </div>

          {/* Secured Java Authority Control Board Dashboard Panel */}
          <div className="bg-[#0D1220]/75 border border-white/5 text-white p-5 rounded-3xl relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-5 select-none font-sans shrink-0 backdrop-blur-xl">
            {/* Subtle glow node */}
            <div className="absolute right-0 top-0 h-24 w-24 bg-luxury-violet/5 rounded-full blur-xl pointer-events-none" />

            <div className="space-y-1.5 flex-1 min-w-0">
              <div className="flex items-center gap-2 text-luxury-gold font-mono text-[9px] font-bold uppercase tracking-widest select-none">
                <ShieldCheck className="h-3.5 w-3.5 text-luxury-gold animate-pulse" />
                <span>REST RBAC API Gateway Authority Module</span>
              </div>
              <h3 className="text-sm font-extrabold text-slate-100 font-display flex items-center gap-1.5">
                <span>Secured Tomcat Authorization Session Filter</span>
                <span className="text-[10px] font-normal text-white/30 font-mono italic">@PreAuthorize("hasRole('ADMIN')")</span>
              </h3>
              <p className="text-[11px] text-white/50 leading-relaxed font-light truncate">
                Principal Candidate: <strong className="text-white font-mono bg-white/5 border border-white/5 px-2 py-0.5 rounded ml-1">{currentUser ? String(currentUser.username) : 'guest_anonymous'}</strong> 
                &nbsp;&bull;&nbsp; Role: <span className={`font-mono text-[10px] px-2 py-0.5 rounded font-bold uppercase tracking-wide inline-flex items-center ${currentUser?.role === 'ADMIN' ? 'bg-luxury-gold/10 text-luxury-gold border border-luxury-gold/20' : currentUser ? 'bg-luxury-violet/10 text-luxury-violet border border-luxury-violet/20' : 'bg-white/5 text-white/40'}`}>{currentUser ? `ROLE_${currentUser.role}` : 'ROLE_ANONYMOUS'}</span>
              </p>
            </div>
            
            <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto justify-end">
              <button
                onClick={handleTriggerBulkRestock}
                className={`px-4 py-2 rounded-xl text-[11px] font-mono font-bold border transition-all cursor-pointer ${
                  currentUser?.role === 'ADMIN'
                    ? 'bg-gold-gradient text-luxury-obsidian border-transparent hover:opacity-90 shadow-lg'
                    : 'bg-white/5 text-white/70 hover:bg-white/10 border-white/5 hover:border-white/10'
                }`}
                title="Strict authority filter!"
              >
                POST /api/admin/restock
              </button>
              
              {!currentUser && (
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setLoginMode('login');
                      setLoginUsername('user@shop.com');
                      setLoginPassword('user123');
                      setIsLoginModalOpen(true);
                    }}
                    className="px-4 py-2 bg-gradient-to-r from-luxury-violet to-luxury-violet/85 text-white rounded-xl text-[11px] font-sans font-bold shadow transition-all cursor-pointer hover:opacity-90 active:scale-95 whitespace-nowrap"
                  >
                    Quick User Preset
                  </button>
                  <button
                    onClick={() => {
                      setLoginMode('login');
                      setLoginUsername('admin@shop.com');
                      setLoginPassword('admin123');
                      setIsLoginModalOpen(true);
                    }}
                    className="px-4 py-2 bg-white/5 text-white border border-white/10 rounded-xl text-[11px] font-sans font-bold shadow transition-all cursor-pointer hover:bg-white/10 active:scale-95 whitespace-nowrap"
                  >
                    Quick Admin Preset
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Staggered dynamic catalog loop */}
          <div className="space-y-6">
            <div className="flex items-end justify-between border-b border-white/5 pb-3">
              <div className="flex items-baseline gap-2">
                <span className="font-display font-extrabold text-base text-white tracking-widest uppercase">
                  {selectedCategory === 'All' ? 'Boutique Collection' : `${selectedCategory}`}
                </span>
                {searchQuery && (
                  <span className="text-xs text-white/40 font-light font-mono">
                    &bull; Query: "{searchQuery}"
                  </span>
                )}
              </div>
              <span className="text-[10px] text-white/40 font-mono">
                {displayedCatalog.length} CURATED RECORDS
              </span>
            </div>

            {displayedCatalog.length === 0 ? (
              <div className="py-20 text-center bg-white/[0.01] rounded-3xl border border-white/5 p-8 flex flex-col items-center">
                <ShoppingCart className="h-10 w-10 text-white/10 mb-3 stroke-1" />
                <h4 className="font-display font-medium text-white text-sm mb-1">No matches found</h4>
                <p className="text-xs text-white/35 max-w-xs font-light leading-relaxed mb-6">
                  Verify query criteria. You can restock items using the simulation control logs widget.
                </p>
                <button
                  onClick={() => handleSelectCategory('All')}
                  className="px-5 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white font-mono font-semibold text-xs transition-colors cursor-pointer"
                >
                  Reset Catalog View
                </button>
              </div>
            ) : (
              // ASYMMETRIC MASONRY PRODUCT GRID
              <div className="space-y-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {visibleProducts.map((product, pIdx) => {
                    // Give selective index items a custom staggered top-margin offset for desktop staggered look
                    const staggeredClass = pIdx % 3 === 1 ? 'lg:translate-y-4' : pIdx % 3 === 2 ? 'lg:translate-y-8' : '';
                    return (
                      <div key={product.id} className={`${staggeredClass} transition-transform duration-500`}>
                        <ProductCard
                          product={product}
                          onAddToCart={handleAddToCart}
                          onSelectProduct={(p) => setSelectedProduct(p)}
                          onBuyNow={handleBuyNow}
                          isSaved={savedItems.some(item => item.id === product.id)}
                          onToggleSaved={handleToggleSaved}
                        />
                      </div>
                    );
                  })}
                </div>

                {displayedCatalog.length > visibleProducts.length && (
                  <div className="flex flex-col items-center justify-center pt-8 border-t border-white/5 pb-4">
                    <p className="text-xs text-white/30 font-mono mb-3">
                      Viewing {visibleProducts.length} of {displayedCatalog.length} curated masterpieces
                    </p>
                    <button
                      onClick={() => setVisibleCount(prev => prev + 18)}
                      className="group px-8 py-3.5 rounded-2xl bg-gradient-to-r from-luxury-violet/15 to-luxury-gold/5 hover:from-luxury-violet/25 hover:to-luxury-gold/15 text-white font-mono font-bold text-xs border border-white/10 hover:border-luxury-gold/30 transition-all cursor-pointer shadow-xl tracking-widest uppercase flex items-center gap-2"
                    >
                      <Sparkles className="h-3.5 w-3.5 text-luxury-gold animate-pulse" />
                      <span>Load More Masterpieces ({displayedCatalog.length - visibleProducts.length} remain)</span>
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* RIGHT COMPONENT: Elegant Developer Companion Live DB Tab Trace split window */}
        {isSandboxOpen && (
          <div className="flex-1 lg:max-w-[45%] xl:max-w-[40%] bg-slate-900 border-l border-white/5 flex flex-col h-full min-h-0 min-w-0">
            <DeveloperSandbox
              logs={systemLogs}
              onClearLogs={() => setSystemLogs([])}
              tables={dbTables}
              onResetDB={handleResetDB}
              activeTab={sandboxActiveTab}
              setActiveTab={setSandboxActiveTab}
            />
          </div>
        )}
      </div>

      {/* Visual slide-drawer overlays */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cart}
        onUpdateQty={handleUpdateCartQty}
        onCheckout={handleCheckoutTrigger}
        isOrdering={isOrdering}
      />

      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
        onBuyNow={handleBuyNow}
        relatedProducts={relatedProducts}
        onSelectRelated={(p) => setSelectedProduct(p)}
      />

      {confirmedOrderId && (
        <OrderConfirmationModal
          orderId={confirmedOrderId}
          isOpen={true}
          onClose={() => setConfirmedOrderId(null)}
          isSandboxOpen={isSandboxOpen}
          onOpenSandboxTab={() => {
            setIsSandboxOpen(true);
            setSandboxActiveTab('terminal');
          }}
        />
      )}

      {/* Luxury user credential Sign-In Authentication popover modal */}
      {isLoginModalOpen && (
        <div className="fixed inset-0 bg-[#070A13]/90 backdrop-blur-md flex items-center justify-center z-50 p-4 font-sans select-none animate-luxury-fade">
          <div className="bg-[#0D1221] rounded-3xl overflow-hidden max-w-2xl w-full flex flex-col md:flex-row shadow-2xl border border-white/10" id="auth-dialog">
            
            {/* Dialog left brand section */}
            <div className="bg-gradient-to-b from-[#111624] to-[#0A0E1A] p-8 md:w-2/5 shrink-0 flex flex-col justify-between border-r border-white/5">
              <div className="space-y-4">
                <span className="font-display font-extrabold text-xl text-white tracking-widest">
                  O<span className="text-luxury-gold text-gold-gradient">N</span>YX
                </span>
                <p className="text-[11px] text-white/40 leading-relaxed font-light">
                  {loginMode === 'login'
                    ? 'Authenticate secure cryptographic tokens containing authority roles and user contexts simulated locally.'
                    : 'Map fresh records, hashing passwords using BCrypt logic and insert values into MySQL schema.'}
                </p>
              </div>
              
              <div className="hidden md:block space-y-4 pt-16">
                <div className="bg-white/[0.02] p-4 rounded-2xl border border-white/5 text-[10px] font-mono space-y-1.5 text-white/60">
                  <span className="text-luxury-gold font-bold uppercase tracking-widest block text-[8px] mb-1 flex items-center gap-1">
                    <Sparkles className="h-3 w-3" /> Credentials Box
                  </span>
                  <p>Customer &bull; <strong className="text-white">user@shop.com</strong></p>
                  <p className="text-white/30 italic">Password: user123</p>
                  <p className="pt-1">Admin &bull; <strong className="text-white">admin@shop.com</strong></p>
                  <p className="text-white/30 italic">Password: admin123</p>
                </div>
              </div>
            </div>

            {/* Dialog right dynamic controller form */}
            <form
              onSubmit={loginMode === 'login' ? handleLoginSubmit : handleRegisterSubmit}
              className="p-8 flex-1 flex flex-col justify-between space-y-5 bg-[#0D1221]"
            >
              <div className="space-y-5">
                {/* Switch form tabs */}
                <div className="flex border-b border-white/5 text-xs font-semibold select-none pb-0.5">
                  <button
                    type="button"
                    onClick={() => {
                      setLoginMode('login');
                      setLoginUsername('');
                      setLoginPassword('');
                    }}
                    className={`flex-1 pb-3 text-center transition-all cursor-pointer font-display font-bold uppercase tracking-wider text-[10px] ${
                      loginMode === 'login' ? 'text-luxury-gold border-b-2 border-luxury-gold' : 'text-white/40 border-b-2 border-transparent'
                    }`}
                  >
                    JWT Log in
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setLoginMode('register');
                      setLoginUsername('');
                      setLoginPassword('');
                      setRegisterFullName('');
                      setRegisterEmail('');
                      setRegisterRole('CUSTOMER');
                    }}
                    className={`flex-1 pb-3 text-center transition-all cursor-pointer font-display font-bold uppercase tracking-wider text-[10px] ${
                      loginMode === 'register' ? 'text-luxury-gold border-b-2 border-luxury-gold' : 'text-white/40 border-b-2 border-transparent'
                    }`}
                  >
                    MySQL Register
                  </button>
                </div>

                {/* Shared username input with custom styled focus state */}
                <div className="space-y-1.5">
                  <label className="text-[9px] uppercase font-bold text-white/40 tracking-widest font-mono">Principal Email Address</label>
                  <input
                    type="text"
                    required
                    value={loginUsername}
                    onChange={(e) => setLoginUsername(e.target.value)}
                    placeholder="e.g. user@shop.com"
                    className="w-full text-xs bg-white/5 border border-white/5 focus:border-luxury-gold/50 rounded-xl px-3 py-2.5 outline-none focus:bg-white/10 transition-all font-mono text-white placeholder:text-white/20"
                  />
                </div>

                {loginMode === 'register' && (
                  <>
                    <div className="space-y-1.5 animate-luxury-fade">
                      <label className="text-[9px] uppercase font-bold text-white/40 tracking-widest font-mono">Full Name</label>
                      <input
                        type="text"
                        required
                        value={registerFullName}
                        onChange={(e) => setRegisterFullName(e.target.value)}
                        placeholder="Nikhil Kudale"
                        className="w-full text-xs bg-white/5 border border-white/5 focus:border-luxury-gold/50 rounded-xl px-3 py-2.5 outline-none focus:bg-white/10 transition-all text-white placeholder:text-white/20"
                      />
                    </div>

                    {/* Authority selector */}
                    <div className="space-y-2 animate-luxury-fade">
                      <label className="text-[9px] uppercase font-bold text-white/40 tracking-widest font-mono">Authorization Level</label>
                      <div className="flex gap-5 pt-1">
                        <label className="flex items-center gap-2 text-xs text-white/70 cursor-pointer">
                          <input
                            type="radio"
                            name="registerRole"
                            checked={registerRole === 'CUSTOMER'}
                            onChange={() => setRegisterRole('CUSTOMER')}
                            className="text-luxury-gold"
                          />
                          <span className="font-mono text-[10px]">ROLE_CUSTOMER</span>
                        </label>
                        <label className="flex items-center gap-2 text-xs text-white/70 cursor-pointer">
                          <input
                            type="radio"
                            name="registerRole"
                            checked={registerRole === 'ADMIN'}
                            onChange={() => setRegisterRole('ADMIN')}
                            className="text-luxury-gold"
                          />
                          <span className="text-luxury-gold font-bold font-mono text-[10px]">ROLE_ADMIN</span>
                        </label>
                      </div>
                    </div>
                  </>
                )}

                {/* Password input */}
                <div className="space-y-1.5">
                  <label className="text-[9px] uppercase font-bold text-white/40 tracking-widest font-mono">Cryptographic Password</label>
                  <input
                    type="password"
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full text-xs bg-white/5 border border-white/5 focus:border-luxury-gold/50 rounded-xl px-3 py-2.5 outline-none focus:bg-white/10 transition-all text-white font-mono placeholder:text-white/20"
                  />
                  {loginMode === 'login' && (
                    <div className="flex justify-between pt-1">
                      <span className="text-[9px] text-white/25 font-mono italic">Demo credential defaults to password123</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Action operations controls */}
              <div className="space-y-3 pt-4">
                <button
                  type="submit"
                  className="w-full py-3 bg-gold-gradient text-luxury-obsidian rounded-xl font-display font-extrabold text-xs uppercase tracking-wider shadow-lg transition-all cursor-pointer hover:opacity-90 active:scale-98"
                >
                  {loginMode === 'login' ? 'Authenticate context' : 'Register & Create JPA Row'}
                </button>
                
                <button
                  type="button"
                  onClick={() => setIsLoginModalOpen(false)}
                  className="w-full py-2.5 bg-white/5 text-white/75 hover:bg-white/10 hover:text-white rounded-xl text-xs font-sans font-semibold text-center cursor-pointer transition-all"
                >
                  Cancel Dialogue
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <MyOrdersDrawer
        isOpen={isOrdersOpen}
        onClose={() => setIsOrdersOpen(false)}
        orders={orders}
        onUpdateOrderStatus={handleUpdateOrderStatus}
      />

      <SavedItemsDrawer
        isOpen={isSavedOpen}
        onClose={() => setIsSavedOpen(false)}
        savedProducts={savedItems}
        onRemoveFromSaved={handleRemoveFromSaved}
        onMoveToCart={handleMoveToCart}
      />

      <CheckoutModal
        isOpen={isCheckoutModalOpen}
        onClose={() => setIsCheckoutModalOpen(false)}
        cartItems={cart}
        currentUser={currentUser}
        onPlaceOrder={handlePlaceOrder}
        isOrdering={isOrdering}
        addToast={addToast}
      />

      <Toast 
        toasts={toasts}
        onRemove={handleRemoveToast}
      />

      {/* Minimalistic Elegant Footer */}
      <footer className="bg-black/40 h-10 flex items-center px-6 md:px-10 gap-8 shrink-0 text-white/50 select-none border-t border-white/5 text-xs font-mono">
        <div className="flex gap-4 md:gap-6 text-[9px] uppercase tracking-widest text-white/40">
          <span className="hover:text-white cursor-pointer transition-all">Collections</span>
          <span className="hover:text-white cursor-pointer transition-all">Support</span>
          <span className="hover:text-white cursor-pointer transition-all">REST APIs</span>
        </div>
        <div className="ml-auto text-[9px] uppercase tracking-widest text-white/30">
          <span>© 2026 Onyx Luxe Inc. &bull; Enterprise Secure Application</span>
        </div>
      </footer>
    </div>
  );
}
