import React, { useState, useEffect } from 'react';
import { 
  X, MapPin, CreditCard, ShieldCheck, Lock, Sparkles, ChevronRight, Check,
  Fingerprint, Smartphone, RefreshCw, Cpu, CheckCircle2, User, Phone, ArrowRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { CartItem, Product } from '../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  currentUser: { id?: number; username: string; email: string; role: 'CUSTOMER' | 'ADMIN'; token?: string; fullName: string } | null;
  onPlaceOrder: (orderData: {
    shippingAddress: {
      fullName: string;
      phone: string;
      pincode: string;
      street: string;
      city: string;
      state: string;
    };
    paymentMethod: string;
  }) => void;
  isOrdering: boolean;
  addToast: (msg: string, type: 'success' | 'warn' | 'error' | 'info') => void;
}

export default function CheckoutModal({
  isOpen,
  onClose,
  cartItems,
  currentUser,
  onPlaceOrder,
  isOrdering,
  addToast
}: CheckoutModalProps) {
  // Steps: 'shipping' | 'payment' | 'processing'
  const [step, setStep] = useState<'shipping' | 'payment' | 'processing'>('shipping');

  // Shipping form states
  const [fullName, setFullName] = useState(currentUser?.fullName || '');
  const [phone, setPhone] = useState('');
  const [pincode, setPincode] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [isPincodeLoading, setIsPincodeLoading] = useState(false);
  const [saveToProfile, setSaveToProfile] = useState(true);

  // Payment form states
  const [paymentMethod, setPaymentMethod] = useState<'CARD' | 'UPI' | 'APPLE_PAY'>('CARD');
  // Card states
  const [cardNumber, setCardNumber] = useState('');
  const [cardHolder, setCardHolder] = useState(currentUser?.fullName || '');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  // UPI states
  const [upiId, setUpiId] = useState('');
  // Biometrics simulation
  const [biometricsStatus, setBiometricsStatus] = useState<'idle' | 'scanning' | 'success'>('idle');

  const totalAmount = cartItems.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  const itemsCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  // Sync user change
  useEffect(() => {
    if (currentUser) {
      if (!fullName) setFullName(currentUser.fullName);
      if (!cardHolder) setCardHolder(currentUser.fullName);
      
      // Attempt to load previously saved address from localStorage for real state persistence
      const savedAddress = localStorage.getItem(`onyx_address_${currentUser.username}`);
      if (savedAddress) {
        try {
          const parsed = JSON.parse(savedAddress);
          setFullName(parsed.fullName || currentUser.fullName);
          setPhone(parsed.phone || '');
          setPincode(parsed.pincode || '');
          setStreet(parsed.street || '');
          setCity(parsed.city || '');
          setState(parsed.state || '');
        } catch (e) {
          // ignore
        }
      }
    }
  }, [currentUser]);

  // Reset step on modal open to prevent starting in the wrong state
  useEffect(() => {
    if (isOpen) {
      setStep('shipping');
    }
  }, [isOpen]);

  // Handle escape/reset of processing step if order fails
  useEffect(() => {
    if (!isOrdering && step === 'processing') {
      setStep('payment');
    }
  }, [isOrdering, step]);

  // Handle active pincode auto-fill
  useEffect(() => {
    if (pincode.length === 6 && /^\d+$/.test(pincode)) {
      setIsPincodeLoading(true);
      // Simulate premium API search latency
      const timer = setTimeout(() => {
        setIsPincodeLoading(false);
        const pincodeDatabase: Record<string, { city: string; state: string }> = {
          '110001': { city: 'New Delhi', state: 'Delhi' },
          '400001': { city: 'Mumbai', state: 'Maharashtra' },
          '560001': { city: 'Bengaluru', state: 'Karnataka' },
          '600001': { city: 'Chennai', state: 'Tamil Nadu' },
          '700001': { city: 'Kolkata', state: 'West Bengal' },
          '411001': { city: 'Pune', state: 'Maharashtra' },
          '500001': { city: 'Hyderabad', state: 'Telangana' },
          '380001': { city: 'Ahmedabad', state: 'Gujarat' },
        };

        const result = pincodeDatabase[pincode];
        if (result) {
          setCity(result.city);
          setState(result.state);
          addToast(`Pincode ${pincode} verified: Auto-selected ${result.city}, ${result.state}`, 'success');
        } else {
          // Dynamic generator for luxury-themed fallbacks
          const mockCities = ['Royal Gardens', 'Gold Coast Hub', 'Luxe Boulevard', 'Sovereign Isle', 'Emerald Heights'];
          const mockStates = ['Maharashtra', 'Karnataka', 'Delhi', 'Tamil Nadu', 'Rajasthan'];
          const cityIndex = parseInt(pincode.substring(0, 2)) % mockCities.length;
          const stateIndex = parseInt(pincode.substring(2, 4)) % mockStates.length;
          setCity(mockCities[cityIndex]);
          setState(mockStates[stateIndex]);
          addToast(`Local circle pincode verified! Synced ${mockCities[cityIndex]}, ${mockStates[stateIndex]}`, 'info');
        }
      }, 750);
      return () => clearTimeout(timer);
    } else if (pincode.length > 0 && pincode.length !== 6) {
      setCity('');
      setState('');
    }
  }, [pincode]);

  if (!isOpen) return null;

  const handleProceedToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone || !pincode || !street || !city || !state) {
      addToast('Please complete all active shipping address fields.', 'warn');
      return;
    }
    if (phone.length < 10) {
      addToast('Enter a valid 10-digit primary mobile connection number.', 'warn');
      return;
    }
    if (pincode.length !== 6) {
      addToast('A valid 6-digit standard Postal Pincode index is required.', 'warn');
      return;
    }

    // Save address locally if desired
    if (saveToProfile && currentUser) {
      const addressData = { fullName, phone, pincode, street, city, state };
      localStorage.setItem(`onyx_address_${currentUser.username}`, JSON.stringify(addressData));
    }

    setStep('payment');
  };

  const handlePlaceOrderSubmit = () => {
    // Input validation base on selected payment channel
    if (paymentMethod === 'CARD') {
      if (cardNumber.replace(/\s+/g, '').length < 16) {
        addToast('Cryptographic Credit Card sequence requires 16 active digits.', 'error');
        return;
      }
      if (!cardExpiry || !/^\d{2}\/\d{2}$/.test(cardExpiry)) {
        addToast('Expiry format must strictly align to MM/YY parameters.', 'warn');
        return;
      }
      if (cardCvv.length < 3) {
        addToast('Card Security check failed. CVV code requires 3 numbers.', 'error');
        return;
      }
    } else if (paymentMethod === 'UPI') {
      if (!upiId.includes('@') || upiId.length < 5) {
        addToast('Security VPA format failed. Verify @handle parameters.', 'error');
        return;
      }
    } else if (paymentMethod === 'APPLE_PAY') {
      if (biometricsStatus !== 'success') {
        addToast('Authorize your biometric footprint key secure token first.', 'warn');
        return;
      }
    }

    setStep('processing');
    onPlaceOrder({
      shippingAddress: { fullName, phone, pincode, street, city, state },
      paymentMethod: paymentMethod === 'CARD' ? 'Credit Card' : paymentMethod === 'UPI' ? `UPI Mode (${upiId})` : 'Apple Pay biometric'
    });
  };

  const triggerApplePayScan = () => {
    setBiometricsStatus('scanning');
    addToast('Requesting biometric authorization token from system framework...', 'info');
    setTimeout(() => {
      setBiometricsStatus('success');
      addToast('Biometrics successfully signed & authenticated via key hash!', 'success');
    }, 1800);
  };

  // Safe credit card formatter
  const formatCardNumber = (val: string) => {
    const v = val.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length > 0) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const formatExpiry = (val: string) => {
    const v = val.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return `${v.substring(0, 2)}/${v.substring(2, 4)}`;
    }
    return v;
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden font-sans flex items-center justify-center p-4">
      {/* Immersive blur backdrop scrim overlay */}
      <div 
        className="absolute inset-0 bg-[#070A13]/85 backdrop-blur-md transition-opacity duration-300" 
        onClick={onClose} 
      />

      <div className="bg-[#0D1221] text-slate-100 rounded-3xl border border-white/10 shadow-2xl relative max-w-4xl w-full p-6 md:p-8 overflow-y-auto max-h-[92vh] flex flex-col md:flex-row gap-8 transform transition-all z-10 animate-luxury-fade">
        {/* Close Button top-right */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-white/50 hover:text-white bg-white/5 hover:bg-white/10 border border-white/5 transition-all cursor-pointer z-50"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Left Column: Cart Overview & Summary of Curated Collections */}
        <div className="w-full md:w-2/5 border-b md:border-b-0 md:border-r border-white/5 pb-6 md:pb-0 md:pr-8 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2.5 mb-6">
              <span className="font-display font-black text-lg tracking-normal text-white">
                O<span className="text-luxury-gold text-gold-gradient">N</span>YX
              </span>
              <span className="text-[9px] uppercase tracking-widest bg-white/5 text-white/50 border border-white/10 px-2 py-0.5 rounded font-mono">
                Settle
              </span>
            </div>

            <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-[#22D3EE] mb-4">Secured Bill Manifest</h3>

            <div className="space-y-3.5 max-h-[220px] overflow-y-auto pr-2 divide-y divide-white/5">
              {cartItems.map((item) => (
                <div key={item.id} className="pt-2 flex items-center justify-between text-xs gap-3">
                  <div className="min-w-0 flex-1">
                    <p className="text-white font-medium truncate font-sans">
                      {item.product.title.replace(new RegExp(`^${item.product.brand}\\s*`, 'i'), '')}
                    </p>
                    <p className="text-[9px] text-white/45 font-mono">Qty: {item.quantity} &bull; {item.product.brand}</p>
                  </div>
                  <span className="font-mono text-white shrink-0">₹{(item.product.price * item.quantity).toLocaleString("en-IN")}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-6 mt-6 border-t border-white/5 space-y-4">
            <div className="space-y-2.5 text-xs text-white/60">
              <div className="flex justify-between">
                <span>Core items subtotal</span>
                <span className="font-mono text-white">₹{totalAmount.toLocaleString("en-IN")}</span>
              </div>
              <div className="flex justify-between">
                <span>Insured VIP Transit</span>
                <span className="text-emerald-400 font-bold uppercase text-[10px] tracking-widest font-mono">Complimentary</span>
              </div>
              <div className="pt-3 border-t border-white/5 flex justify-between font-bold text-sm text-slate-100">
                <span className="font-display">Settlement Total</span>
                <span className="font-mono text-sm text-luxury-gold text-gold-gradient">₹{totalAmount.toLocaleString("en-IN")}</span>
              </div>
            </div>

            <div className="bg-slate-950/60 rounded-xl p-3 text-[9px] font-mono text-white/40 leading-relaxed border border-white/5 flex gap-2">
              <Lock className="h-4 w-4 text-luxury-gold shrink-0 mt-0.5" />
              <span>
                Your session is fully secured with AES-256 JVM parameters. Simulated order queries will be committed with MySQL transactional locks.
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Checkout Interactive Wizard Step Panels */}
        <div className="flex-1 flex flex-col justify-between min-w-0">
          
          {/* Header Indicators */}
          <div className="flex items-center gap-3 pb-4 border-b border-white/5 mb-6 select-none shrink-0">
            <div className="flex items-center gap-1.5">
              <div className={`h-5 w-5 rounded-full flex items-center justify-center text-[10px] font-mono font-bold ${step === 'shipping' ? 'bg-luxury-gold text-luxury-obsidian' : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/25'}`}>
                {step !== 'shipping' ? <Check className="h-3 w-3" /> : '1'}
              </div>
              <span className={`text-[10px] font-mono uppercase tracking-widest ${step === 'shipping' ? 'text-white font-black' : 'text-white/45'}`}>Shipping</span>
            </div>
            
            <ChevronRight className="h-3.5 w-3.5 text-white/20" />

            <div className="flex items-center gap-1.5">
              <div className={`h-5 w-5 rounded-full flex items-center justify-center text-[10px] font-mono font-bold ${step === 'payment' ? 'bg-luxury-gold text-luxury-obsidian' : 'bg-white/5 text-white/30 border border-white/5'}`}>
                2
              </div>
              <span className={`text-[10px] font-mono uppercase tracking-widest ${step === 'payment' ? 'text-white font-black' : 'text-white/45'}`}>Settlement</span>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {/* STEP 1: Shipping Addresses Form */}
            {step === 'shipping' && (
              <motion.form
                key="shipping-form"
                onSubmit={handleProceedToPayment}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
                className="space-y-4 flex-1 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div>
                    <h3 className="font-display font-extrabold text-sm text-white mb-1">Shipping Logistics Profile</h3>
                    <p className="text-[11px] text-white/40 leading-relaxed font-light">Input terminal dispatch parameters for your order package.</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[9px] uppercase font-bold text-white/40 tracking-widest font-mono">Recipient Full Name</label>
                      <div className="relative">
                        <User className="absolute left-3.5 top-3.5 h-3.5 w-3.5 text-white/20" />
                        <input
                          type="text"
                          required
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          placeholder="e.g. Nikhil Kudale"
                          className="w-full text-xs bg-white/5 border border-white/5 focus:border-luxury-gold/50 rounded-xl pl-10 pr-3 py-3 outline-none focus:bg-white/10 transition-all text-white placeholder:text-white/20"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[9px] uppercase font-bold text-white/40 tracking-widest font-mono">Contact Phone Connector</label>
                      <div className="relative">
                        <Phone className="absolute left-3.5 top-3.5 h-3.5 w-3.5 text-white/20" />
                        <input
                          type="tel"
                          required
                          maxLength={10}
                          value={phone}
                          onChange={(e) => setPhone(e.target.value.replace(/[^0-9]/g, ''))}
                          placeholder="Mobile line (10-digits)"
                          className="w-full text-xs font-mono bg-white/5 border border-white/5 focus:border-luxury-gold/50 rounded-xl pl-10 pr-3 py-3 outline-none focus:bg-white/10 transition-all text-white placeholder:text-white/20"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[9px] uppercase font-bold text-white/40 tracking-widest font-mono flex justify-between">
                        <span>Pincode Identifier</span>
                        {isPincodeLoading && <RefreshCw className="h-3 w-3 text-luxury-gold animate-spin" />}
                      </label>
                      <div className="relative">
                        <MapPin className="absolute left-3.5 top-3.5 h-3.5 w-3.5 text-white/20" />
                        <input
                          type="text"
                          required
                          maxLength={6}
                          value={pincode}
                          onChange={(e) => setPincode(e.target.value.replace(/[^0-9]/g, ''))}
                          placeholder="6-digit (e.g. 411001)"
                          className="w-full text-xs bg-white/5 border border-white/5 focus:border-luxury-gold/50 rounded-xl pl-10 pr-3 py-3 outline-none focus:bg-white/10 transition-all text-white font-mono placeholder:text-white/20"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[9px] uppercase font-bold text-white/40 tracking-widest font-mono">Settlement City</label>
                      <input
                        type="text"
                        required
                        readOnly={isPincodeLoading || pincode.length === 6}
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder="Auto-resolved city"
                        className={`w-full text-xs bg-white/5 border border-white/5 rounded-xl px-3 py-3 outline-none text-white transition-all ${pincode.length === 6 ? 'bg-white/[0.02] border-emerald-500/10 text-slate-300 font-semibold' : 'placeholder:text-white/20'}`}
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[9px] uppercase font-bold text-white/40 tracking-widest font-mono">Settlement State</label>
                      <input
                        type="text"
                        required
                        readOnly={isPincodeLoading || pincode.length === 6}
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        placeholder="Auto-resolved state"
                        className={`w-full text-xs bg-white/5 border border-white/5 rounded-xl px-3 py-3 outline-none text-white transition-all ${pincode.length === 6 ? 'bg-white/[0.02] border-emerald-500/10 text-slate-300 font-semibold' : 'placeholder:text-white/20'}`}
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[9px] uppercase font-bold text-white/40 tracking-widest font-mono">Street Address &amp; Villa/Gate details</label>
                    <input
                      type="text"
                      required
                      value={street}
                      onChange={(e) => setStreet(e.target.value)}
                      placeholder="e.g. Block B, Premium Heights, Lane 3"
                      className="w-full text-xs bg-white/5 border border-white/5 focus:border-luxury-gold/50 rounded-xl px-4 py-3 outline-none focus:bg-white/10 transition-all text-white placeholder:text-white/20"
                    />
                  </div>

                  <div className="flex items-center gap-2 pt-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      id="saveToProfile"
                      checked={saveToProfile}
                      onChange={() => setSaveToProfile(!saveToProfile)}
                      className="rounded text-luxury-gold border-white/10 bg-white/5 focus:ring-0 cursor-pointer h-4 w-4"
                    />
                    <label htmlFor="saveToProfile" className="text-[10px] font-mono text-white/50 hover:text-white/80 cursor-pointer leading-none">
                      Save shipping logistics address parameters to browser profile local index
                    </label>
                  </div>
                </div>

                <div className="pt-6 border-t border-white/5 flex justify-end">
                  <button
                    type="submit"
                    className="px-6 py-3 bg-gold-gradient text-luxury-obsidian text-xs font-display font-extrabold uppercase tracking-wider rounded-xl cursor-pointer hover:opacity-95 transition-all flex items-center gap-1.5 shadow-lg shadow-luxury-gold/5"
                  >
                    <span>Proceed to settlement payment</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </motion.form>
            )}

            {/* STEP 2: Simulated Premium Checkout Payment Panel */}
            {step === 'payment' && (
              <motion.div
                key="payment-form"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
                className="space-y-6 flex-1 flex flex-col justify-between"
              >
                <div className="space-y-5">
                  <div>
                    <h3 className="font-display font-extrabold text-sm text-white mb-1">Curated Settlement Portals</h3>
                    <p className="text-[11px] text-white/40 leading-relaxed font-light">Secure, encrypted sandbox endpoints mapping real-time bank ledger validations.</p>
                  </div>

                  {/* Payment Channel Triggers */}
                  <div className="grid grid-cols-3 gap-3">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('CARD')}
                      className={`py-3.5 rounded-xl border flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer ${
                        paymentMethod === 'CARD'
                          ? 'border-luxury-gold bg-luxury-gold/5 text-luxury-gold'
                          : 'border-white/5 hover:border-white/20 bg-transparent text-white/50 hover:text-white'
                      }`}
                    >
                      <CreditCard className="h-4.5 w-4.5" />
                      <span className="text-[9px] font-mono uppercase tracking-widest font-black">Credit Card</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod('UPI')}
                      className={`py-3.5 rounded-xl border flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer ${
                        paymentMethod === 'UPI'
                          ? 'border-luxury-gold bg-luxury-gold/5 text-luxury-gold'
                          : 'border-white/5 hover:border-white/20 bg-transparent text-white/50 hover:text-white'
                      }`}
                    >
                      <Smartphone className="h-4.5 w-4.5" />
                      <span className="text-[9px] font-mono uppercase tracking-widest font-black">UPI Gateway</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod('APPLE_PAY')}
                      className={`py-3.5 rounded-xl border flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer ${
                        paymentMethod === 'APPLE_PAY'
                          ? 'border-luxury-gold bg-luxury-gold/5 text-luxury-gold'
                          : 'border-white/5 hover:border-white/20 bg-transparent text-white/50 hover:text-white'
                      }`}
                    >
                      <Fingerprint className="h-4.5 w-4.5" />
                      <span className="text-[9px] font-mono uppercase tracking-widest font-black">Apple Pay</span>
                    </button>
                  </div>

                  {/* Payment option details */}
                  <div className="bg-white/[0.01] border border-white/5 rounded-2xl p-5 min-h-[170px] flex flex-col justify-center">
                    
                    {/* OPTION A: Credit Card with Dynamic Elegant Mockup */}
                    {paymentMethod === 'CARD' && (
                      <div className="space-y-4">
                        {/* Interactive Gold/Obsidian luxury Credit Card visual mock */}
                        <div className="bg-gradient-to-tr from-[#141C31] to-[#0A0D15] border border-white/10 rounded-xl p-4.5 relative text-white space-y-5 shadow-xl font-mono overflow-hidden">
                          <div className="absolute right-3.5 top-3.5 h-6 w-9 bg-white/5 border border-white/10 rounded overflow-hidden flex items-center justify-center">
                            <span className="text-[7px] text-white/30 font-bold uppercase tracking-widest leading-none">TITAN</span>
                          </div>
                          
                          <div className="flex justify-between items-center select-none">
                            <div className="h-6.5 w-8 bg-amber-500/10 border border-amber-500/25 rounded-md relative flex items-center justify-center text-luxury-gold text-xs">
                              <Cpu className="h-4.5 w-4.5 text-luxury-gold/80" />
                            </div>
                            <span className="text-[10px] font-display font-extrabold text-[#7C8BA1]">Onyx Luxe Signature</span>
                          </div>

                          <div className="space-y-1 mt-2">
                            <div className="text-sm font-semibold tracking-[0.2em] text-white font-mono">
                              {cardNumber || '•••• •••• •••• ••••'}
                            </div>
                            <div className="flex justify-between text-[8px] text-[#58647A] pt-1">
                              <div>
                                <p className="uppercase tracking-widest font-black scale-90 origin-left">Holder Profile</p>
                                <p className="text-white text-[9px] font-medium tracking-normal uppercase truncate max-w-[150px]">{cardHolder || 'PRINCIPAL HOLDER'}</p>
                              </div>
                              <div className="text-right">
                                <p className="uppercase tracking-widest font-black scale-90 origin-right">Maturity</p>
                                <p className="text-white text-[9px] font-medium tracking-normal">{cardExpiry || 'MM/YY'}</p>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Real input lines */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                          <div className="space-y-1 col-span-1 sm:col-span-2">
                            <label className="text-[8px] font-mono font-bold uppercase tracking-widest text-[#58647A]">Credit Card Sequence</label>
                            <input
                              type="text"
                              maxLength={19}
                              value={cardNumber}
                              onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                              placeholder="4111 2222 3333 4444"
                              className="w-full text-xs font-mono bg-slate-950/80 border border-white/5 focus:border-luxury-gold/40 rounded-lg px-2.5 py-2 outline-none text-white"
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-2">
                            <div className="space-y-1">
                              <label className="text-[8px] font-mono font-bold uppercase tracking-widest text-[#58647A]">Expiry</label>
                              <input
                                type="text"
                                maxLength={5}
                                value={cardExpiry}
                                onChange={(e) => setCardExpiry(formatExpiry(e.target.value))}
                                placeholder="MM/YY"
                                className="w-full text-center text-xs font-mono bg-slate-950/80 border border-white/5 focus:border-luxury-gold/40 rounded-lg px-1.5 py-2 outline-none text-white"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="text-[8px] font-mono font-bold uppercase tracking-widest text-[#58647A]">Cvv Security</label>
                              <input
                                type="password"
                                maxLength={3}
                                value={cardCvv}
                                onChange={(e) => setCardCvv(e.target.value.replace(/[^0-9]/g, ''))}
                                placeholder="CVV"
                                className="w-full text-center text-xs font-mono bg-slate-950/80 border border-white/5 focus:border-luxury-gold/40 rounded-lg px-1.5 py-2 outline-none text-white"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* OPTION B: Unified Payments Interface (UPI) */}
                    {paymentMethod === 'UPI' && (
                      <div className="space-y-4">
                        <div className="flex items-center gap-3 bg-slate-950/80 border border-white/5 p-4 rounded-xl text-xs font-mono">
                          <Smartphone className="h-5 w-5 text-luxury-gold animate-bounce" />
                          <div>
                            <p className="font-semibold text-slate-100 font-display">Simulated UPI settlement endpoint</p>
                            <p className="text-white/40 text-[9px] leading-normal font-sans">Verify your virtual payment address sequence (e.g. nikhil@ybl) to authorize payment allocation.</p>
                          </div>
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-[9px] uppercase font-bold text-white/40 tracking-widest font-mono">Virtual Payment Address ID</label>
                          <input
                            type="text"
                            value={upiId}
                            onChange={(e) => setUpiId(e.target.value.trim().toLowerCase())}
                            placeholder="e.g. nikhil@ybl"
                            className="w-full text-xs font-mono bg-[#070A12] border border-white/5 focus:border-luxury-gold/50 rounded-xl px-4 py-3 outline-none text-white placeholder:text-white/20"
                          />
                        </div>
                      </div>
                    )}

                    {/* OPTION C: Apple Pay Simulated Biometric Verification */}
                    {paymentMethod === 'APPLE_PAY' && (
                      <div className="flex flex-col items-center text-center p-3 text-slate-300 space-y-4">
                        <div className="flex items-center justify-center h-14 w-14 bg-white/5 rounded-full border border-white/10 hover:border-luxury-gold/50 cursor-pointer group transition-all" onClick={triggerApplePayScan}>
                          <Fingerprint className={`h-8 w-8 text-luxury-gold group-hover:scale-105 duration-300 ${biometricsStatus === 'scanning' ? 'animate-pulse text-cyan-400' : ''}`} />
                        </div>
                        
                        <div>
                          <p className="text-xs font-semibold font-display">Biometric Authorization Fingerprint Scan</p>
                          <p className="text-[9px] text-[#A1A1AA] font-light max-w-xs leading-normal mt-0.5">Click the scanner to simulate macOS Keychain / iOS Secure Enclave biometrics execution.</p>
                        </div>

                        <div className="pt-1.5">
                          {biometricsStatus === 'success' ? (
                            <span className="text-[9px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-3 py-1 rounded-full uppercase tracking-widest font-bold inline-flex items-center gap-1">
                              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" /> Signed JWT Claims Approved
                            </span>
                          ) : biometricsStatus === 'scanning' ? (
                            <span className="text-[9px] font-mono text-cyan-400 animate-pulse bg-cyan-950/30 px-3 py-1 rounded-full uppercase tracking-widest">
                              Scanning biometric parameters...
                            </span>
                          ) : (
                            <span className="text-[9px] font-mono text-white/30 bg-white/5 px-2.5 py-0.5 rounded-full uppercase tracking-widest">
                              Session State: Standby
                            </span>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Settlement actions */}
                <div className="pt-6 border-t border-white/5 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setStep('shipping')}
                    className="px-4 py-2 border border-white/5 hover:border-white/20 text-white/50 hover:text-white rounded-xl text-xs font-mono tracking-widest uppercase transition-colors cursor-pointer"
                  >
                    Back to shipping
                  </button>

                  <button
                    type="button"
                    onClick={handlePlaceOrderSubmit}
                    className="px-6 py-3 bg-gold-gradient text-luxury-obsidian text-[11px] font-display font-extrabold uppercase tracking-wider rounded-xl cursor-pointer hover:opacity-95 transition-all flex items-center gap-1.5 shadow-lg shadow-luxury-gold/5"
                  >
                    <Lock className="h-3.5 w-3.5 text-luxury-obsidian" />
                    <span>Confirm &amp; Place Order</span>
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 3: Full Screen processing state */}
            {step === 'processing' && (
              <motion.div
                key="processing-state"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="h-full flex flex-col items-center justify-center text-center p-8 space-y-6"
              >
                <div className="relative">
                  <div className="absolute inset-0 rounded-full bg-luxury-gold/5 blur-xl animate-pulse" />
                  <div className="h-16 w-16 border-4 border-white/5 border-t-luxury-gold rounded-full animate-spin flex items-center justify-center relative">
                    <Cpu className="h-6 w-6 text-luxury-gold/45" />
                  </div>
                </div>

                <div className="space-y-2 select-none">
                  <h3 className="font-display font-extrabold text-sm tracking-wide text-white animate-pulse">Processing Secure Payment...</h3>
                  <p className="text-[10px] text-white/45 max-w-xs mx-auto leading-relaxed font-sans font-light">
                    Initiating ACID database @Transactional lock wrapper with InnoDB dialect isolation level...
                  </p>
                </div>

                <div className="bg-slate-950 font-mono text-[9px] text-emerald-400 p-3 rounded-xl border border-white/5 text-left max-w-sm w-full divide-y divide-white/5 space-y-1.5 leading-normal">
                  <div className="text-luxury-gold font-bold uppercase pb-1 tracking-widest text-[8px]">Hibernate SQL Monitor Trace</div>
                  <p className="pt-1 text-white/50">JPA Status &bull; <span className="text-[#34D399]">Acquiring row lock</span></p>
                  <p className="pt-1 text-white/50">Ledger API &bull; <span className="text-cyan-400">Verifying credit limits</span></p>
                  <p className="pt-1 text-white/50">InnoDB Code &bull; <span className="text-amber-400 font-semibold text-[8.5px]">Commit SQL: UPDATE products SET stock = stock - Qty WHERE ID...</span></p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </div>
    </div>
  );
}
