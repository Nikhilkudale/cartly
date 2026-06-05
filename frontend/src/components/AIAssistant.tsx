import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Sparkles, ShoppingBag, ArrowRight, Bot, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Product } from '../types';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  products?: Product[];
  timestamp: Date;
}

interface AIAssistantProps {
  products: Product[];
  categories: string[];
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

const QUICK_SUGGESTIONS = [
  { label: '🔥 Best deals', query: 'Show me the best deals' },
  { label: '📱 Top phones', query: 'What are the best phones?' },
  { label: '👗 Fashion picks', query: 'Show me fashion items' },
  { label: '💡 Help me choose', query: 'Help me choose a product' },
];

function parsePrice(text: string): { min?: number; max?: number } {
  const result: { min?: number; max?: number } = {};
  
  // "under 50000" or "below 50k"
  const underMatch = text.match(/(?:under|below|less than|max|upto|up to)\s*(?:₹|rs\.?|inr)?\s*(\d+\.?\d*)\s*(k|lakh|lac)?/i);
  if (underMatch) {
    let val = parseFloat(underMatch[1]);
    if (underMatch[2]?.toLowerCase() === 'k') val *= 1000;
    if (underMatch[2]?.toLowerCase() === 'lakh' || underMatch[2]?.toLowerCase() === 'lac') val *= 100000;
    result.max = val;
  }

  // "above 10000" or "over 10k"
  const aboveMatch = text.match(/(?:above|over|more than|min|starting|from)\s*(?:₹|rs\.?|inr)?\s*(\d+\.?\d*)\s*(k|lakh|lac)?/i);
  if (aboveMatch) {
    let val = parseFloat(aboveMatch[1]);
    if (aboveMatch[2]?.toLowerCase() === 'k') val *= 1000;
    if (aboveMatch[2]?.toLowerCase() === 'lakh' || aboveMatch[2]?.toLowerCase() === 'lac') val *= 100000;
    result.min = val;
  }

  // "between 10k and 50k"
  const betweenMatch = text.match(/between\s*(?:₹|rs\.?|inr)?\s*(\d+\.?\d*)\s*(k|lakh|lac)?\s*(?:and|to|-)\s*(?:₹|rs\.?|inr)?\s*(\d+\.?\d*)\s*(k|lakh|lac)?/i);
  if (betweenMatch) {
    let min = parseFloat(betweenMatch[1]);
    if (betweenMatch[2]?.toLowerCase() === 'k') min *= 1000;
    if (betweenMatch[2]?.toLowerCase() === 'lakh' || betweenMatch[2]?.toLowerCase() === 'lac') min *= 100000;
    let max = parseFloat(betweenMatch[3]);
    if (betweenMatch[4]?.toLowerCase() === 'k') max *= 1000;
    if (betweenMatch[4]?.toLowerCase() === 'lakh' || betweenMatch[4]?.toLowerCase() === 'lac') max *= 100000;
    result.min = min;
    result.max = max;
  }

  return result;
}

function processQuery(query: string, products: Product[], categories: string[]): { text: string; matchedProducts: Product[] } {
  const q = query.toLowerCase().trim();
  
  // Greeting
  if (/^(hi|hello|hey|howdy|good\s*(morning|evening|afternoon)|yo)[\s!.?]*$/i.test(q)) {
    return {
      text: "Hey there! 👋 I'm your Cartly shopping assistant. I can help you find products, compare prices, or recommend items. What are you looking for today?",
      matchedProducts: []
    };
  }

  // Help
  if (/^(help|what can you do|how does this work)/i.test(q)) {
    return {
      text: "I can help you with:\n\n🔍 **Find products** — \"Show me phones under ₹50k\"\n📂 **Browse categories** — \"What fashion items do you have?\"\n🏷️ **Search brands** — \"Show me Samsung products\"\n💰 **Price filters** — \"Products between ₹10k and ₹30k\"\n⭐ **Recommendations** — \"What's popular?\" or \"Best deals\"\n\nJust type your question!",
      matchedProducts: []
    };
  }

  let filtered = [...products];
  let appliedFilters: string[] = [];

  // Category matching
  const matchedCategory = categories.find(cat => 
    cat !== 'All' && q.includes(cat.toLowerCase())
  );
  if (matchedCategory) {
    filtered = filtered.filter(p => p.category === matchedCategory);
    appliedFilters.push(`category: ${matchedCategory}`);
  }

  // Common category keywords
  const categoryKeywords: Record<string, string[]> = {
    'phone': ['Mobiles', 'Mobiles & Tablets'],
    'mobile': ['Mobiles', 'Mobiles & Tablets'],
    'smartphone': ['Mobiles', 'Mobiles & Tablets'],
    'laptop': ['Electronics', 'Laptops & Computers'],
    'computer': ['Electronics', 'Laptops & Computers'],
    'fashion': ['Fashion', 'Clothing'],
    'cloth': ['Fashion', 'Clothing'],
    'wear': ['Fashion', 'Clothing'],
    'dress': ['Fashion', 'Clothing'],
    'shoe': ['Fashion', 'Clothing'],
    'tv': ['Appliances', 'TV & Appliances'],
    'appliance': ['Appliances', 'TV & Appliances'],
    'furniture': ['Home & Furniture'],
    'home': ['Home & Furniture'],
  };

  if (!matchedCategory) {
    for (const [keyword, cats] of Object.entries(categoryKeywords)) {
      if (q.includes(keyword)) {
        const matchCat = categories.find(c => cats.includes(c));
        if (matchCat) {
          filtered = filtered.filter(p => p.category === matchCat);
          appliedFilters.push(`category: ${matchCat}`);
          break;
        }
      }
    }
  }

  // Brand matching
  const allBrands = [...new Set(products.map(p => p.brand))];
  const matchedBrand = allBrands.find(brand => q.includes(brand.toLowerCase()));
  if (matchedBrand) {
    filtered = filtered.filter(p => p.brand === matchedBrand);
    appliedFilters.push(`brand: ${matchedBrand}`);
  }

  // Price filtering
  const priceRange = parsePrice(q);
  if (priceRange.min !== undefined) {
    filtered = filtered.filter(p => p.price >= priceRange.min!);
    appliedFilters.push(`min price: ₹${priceRange.min.toLocaleString('en-IN')}`);
  }
  if (priceRange.max !== undefined) {
    filtered = filtered.filter(p => p.price <= priceRange.max!);
    appliedFilters.push(`max price: ₹${priceRange.max.toLocaleString('en-IN')}`);
  }

  // Keyword search in title/description
  const searchTerms = q.replace(/(?:show|me|find|search|get|what|are|the|best|top|good|great|popular|i want|looking for|do you have|any)/gi, '').trim().split(/\s+/).filter(t => t.length > 2);
  
  if (appliedFilters.length === 0 && searchTerms.length > 0) {
    const keywordFiltered = products.filter(p => 
      searchTerms.some(term => 
        p.title.toLowerCase().includes(term) || 
        p.description.toLowerCase().includes(term) ||
        p.brand.toLowerCase().includes(term) ||
        p.category.toLowerCase().includes(term)
      )
    );
    if (keywordFiltered.length > 0) {
      filtered = keywordFiltered;
      appliedFilters.push(`keyword search`);
    }
  }

  // Sort: best deals (biggest discount) or by price
  if (/(?:deal|cheap|affordable|discount|offer|sale|budget)/i.test(q)) {
    filtered.sort((a, b) => {
      const discA = (a.originalPrice || a.price) - a.price;
      const discB = (b.originalPrice || b.price) - b.price;
      return discB - discA || a.price - b.price;
    });
  } else if (/(?:expensive|premium|luxury|high.?end|top)/i.test(q)) {
    filtered.sort((a, b) => b.price - a.price);
  } else {
    filtered.sort((a, b) => a.price - b.price);
  }

  // If no filters applied, suggest popular items
  if (appliedFilters.length === 0) {
    if (/(?:popular|trending|best.?sell|recommend|suggest|what.?should)/i.test(q)) {
      const topPicks = products.slice(0, 6);
      return {
        text: `Here are some popular picks from our collection! 🌟`,
        matchedProducts: topPicks
      };
    }
    
    return {
      text: "I couldn't find an exact match for that. Try asking about specific categories like **phones**, **fashion**, or **electronics**, or use price filters like \"under ₹50k\". You can also ask me for **recommendations**! 💡",
      matchedProducts: []
    };
  }

  const resultProducts = filtered.slice(0, 6);

  if (resultProducts.length === 0) {
    return {
      text: `Sorry, I couldn't find any products matching your criteria (${appliedFilters.join(', ')}). Try broadening your search or ask me for recommendations! 🔍`,
      matchedProducts: []
    };
  }

  const filterDesc = appliedFilters.join(', ');
  const countText = filtered.length > 6 ? `Here are the top 6 of ${filtered.length} results` : `I found ${filtered.length} product${filtered.length > 1 ? 's' : ''}`;

  return {
    text: `${countText} for you (${filterDesc}). Click any product to see full details! 🛍️`,
    matchedProducts: resultProducts
  };
}

export default function AIAssistant({ products, categories, onSelectProduct, onAddToCart }: AIAssistantProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: "Hi! I'm your Cartly AI assistant 🛍️\n\nI can help you find products, compare prices, and get personalized recommendations. What are you looking for today?",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  const handleSend = (text?: string) => {
    const messageText = text || input.trim();
    if (!messageText) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: messageText,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // Simulate a brief thinking delay for natural feel
    setTimeout(() => {
      const result = processQuery(messageText, products, categories);
      const assistantMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: result.text,
        products: result.matchedProducts.length > 0 ? result.matchedProducts : undefined,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, assistantMsg]);
      setIsTyping(false);
    }, 600 + Math.random() * 400);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full bg-gold-gradient text-luxury-obsidian shadow-2xl shadow-luxury-gold/20 flex items-center justify-center cursor-pointer hover:scale-105 active:scale-95 transition-transform group"
            aria-label="Open AI Shopping Assistant"
          >
            <Bot className="h-6 w-6 group-hover:rotate-12 transition-transform" />
            <span className="absolute -top-1 -right-1 h-4 w-4 bg-emerald-500 rounded-full border-2 border-luxury-obsidian animate-pulse" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="fixed bottom-6 right-6 z-50 w-[380px] max-w-[calc(100vw-2rem)] h-[560px] max-h-[calc(100vh-3rem)] bg-[#0B0F1A] border border-white/10 rounded-3xl shadow-2xl shadow-black/40 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/5 bg-[#0D1221]/80 backdrop-blur-xl shrink-0">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-full bg-gold-gradient flex items-center justify-center">
                  <Bot className="h-5 w-5 text-luxury-obsidian" />
                </div>
                <div>
                  <h3 className="text-sm font-display font-extrabold text-white">Cartly AI</h3>
                  <div className="flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-[9px] text-emerald-400 font-mono uppercase tracking-widest">Online</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-full text-white/40 hover:text-white hover:bg-white/5 transition-all cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-none">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] ${msg.role === 'user' ? 'order-1' : ''}`}>
                    <div
                      className={`px-4 py-3 rounded-2xl text-[12px] leading-relaxed whitespace-pre-wrap ${
                        msg.role === 'user'
                          ? 'bg-luxury-gold/15 text-white border border-luxury-gold/10 rounded-br-md'
                          : 'bg-white/[0.04] text-white/80 border border-white/5 rounded-bl-md'
                      }`}
                      dangerouslySetInnerHTML={{
                        __html: msg.content
                          .replace(/\*\*(.*?)\*\*/g, '<strong class="text-white font-semibold">$1</strong>')
                          .replace(/\n/g, '<br/>')
                      }}
                    />

                    {/* Product Cards */}
                    {msg.products && msg.products.length > 0 && (
                      <div className="mt-3 space-y-2">
                        {msg.products.map((product) => (
                          <div
                            key={product.id}
                            className="bg-white/[0.03] border border-white/5 rounded-xl p-3 flex items-center gap-3 hover:border-luxury-gold/20 hover:bg-white/[0.06] transition-all cursor-pointer group"
                            onClick={() => onSelectProduct(product)}
                          >
                            <img
                              src={product.image}
                              alt={product.title}
                              className="h-12 w-12 object-cover rounded-lg bg-white/5 shrink-0"
                            />
                            <div className="flex-1 min-w-0">
                              <p className="text-[11px] text-white font-medium truncate group-hover:text-luxury-gold transition-colors">
                                {product.title}
                              </p>
                              <p className="text-[10px] text-white/40 font-mono">{product.brand}</p>
                              <div className="flex items-center gap-2 mt-0.5">
                                <span className="text-[11px] font-bold text-luxury-gold font-mono">
                                  ₹{product.price.toLocaleString('en-IN')}
                                </span>
                                {product.originalPrice && product.originalPrice > product.price && (
                                  <span className="text-[9px] text-white/30 line-through font-mono">
                                    ₹{product.originalPrice.toLocaleString('en-IN')}
                                  </span>
                                )}
                              </div>
                            </div>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                onAddToCart(product);
                              }}
                              className="p-2 rounded-lg bg-luxury-gold/10 text-luxury-gold hover:bg-luxury-gold/20 transition-all cursor-pointer shrink-0"
                              title="Add to cart"
                            >
                              <ShoppingBag className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}

                    <span className="text-[8px] text-white/20 font-mono mt-1 block px-1">
                      {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white/[0.04] border border-white/5 rounded-2xl rounded-bl-md px-4 py-3 flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 bg-luxury-gold rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="h-1.5 w-1.5 bg-luxury-gold rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="h-1.5 w-1.5 bg-luxury-gold rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Suggestions (shown only if few messages) */}
            {messages.length <= 2 && (
              <div className="px-4 pb-2 flex flex-wrap gap-1.5 shrink-0">
                {QUICK_SUGGESTIONS.map((sug) => (
                  <button
                    key={sug.label}
                    onClick={() => handleSend(sug.query)}
                    className="px-3 py-1.5 text-[10px] bg-white/[0.04] border border-white/5 rounded-full text-white/60 hover:text-white hover:border-luxury-gold/20 hover:bg-luxury-gold/5 transition-all cursor-pointer font-medium"
                  >
                    {sug.label}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <div className="px-4 pb-4 pt-2 border-t border-white/5 shrink-0">
              <div className="flex items-center gap-2 bg-white/[0.04] border border-white/5 rounded-xl px-3 py-2 focus-within:border-luxury-gold/30 transition-colors">
                <Sparkles className="h-4 w-4 text-luxury-gold/50 shrink-0" />
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask me anything..."
                  className="flex-1 bg-transparent text-xs text-white outline-none placeholder:text-white/25 font-sans"
                />
                <button
                  onClick={() => handleSend()}
                  disabled={!input.trim()}
                  className={`p-1.5 rounded-lg transition-all cursor-pointer ${
                    input.trim()
                      ? 'bg-luxury-gold/20 text-luxury-gold hover:bg-luxury-gold/30'
                      : 'text-white/15'
                  }`}
                >
                  <Send className="h-3.5 w-3.5" />
                </button>
              </div>
              <p className="text-[8px] text-white/15 text-center mt-1.5 font-mono">
                Powered by Cartly AI • Product recommendations from your catalog
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
