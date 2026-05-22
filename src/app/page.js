"use client";
import { useState, useEffect } from 'react';
import { ShoppingCart, Star, Store, X, Trash2, CheckCircle } from 'lucide-react';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  // New States for Filter and Checkout
  const [activeCategory, setActiveCategory] = useState("All");
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [customerInfo, setCustomerInfo] = useState({ name: '', phone: '', address: '' });

  useEffect(() => {
    async function getItems() {
      try {
        const res = await fetch('/api/products');
        const data = await res.json();
        setProducts(Array.isArray(data) ? data : []);
      } catch (error) {
        console.log("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    }
    getItems();
  }, []);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(item => item._id === product._id);
      if (existingItem) {
        return prevCart.map(item =>
          item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCart(cart.filter(item => item._id !== id));
  };

  // Filter Logic
  const categories = ["All", "Cakes", "Pastries", "Desserts", "Bread"];
  const filteredProducts = activeCategory === "All" 
    ? products 
    : products.filter(p => p.category === activeCategory);

  const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

  const handleCheckout = async (e) => {
  e.preventDefault();
  
  const orderData = {
    customerInfo,
    items: cart,
    total: cartTotal
  };

  try {
    const res = await fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderData)
    });

    if (res.ok) {
      setOrderSuccess(true);
      setCart([]);
      setIsCheckoutOpen(false);
    } else {
      alert("Order submit nahi ho saka, dobara koshish karein.");
    }
  } catch (error) {
    console.log("Checkout error:", error);
  }
};

  if (loading) return <div style={{ textAlign: 'center', padding: '50px', fontWeight: 'bold' }}>Baking your treats...</div>;

  return (
    <div style={{ backgroundColor: '#fafaf9', minHeight: '100vh', fontFamily: 'sans-serif' }}>
      
      {/* 1. NAVBAR */}
      <nav style={{
        backgroundColor: 'white', padding: '15px 30px', display: 'flex',
        justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
        position: 'sticky', top: 0, zIndex: 100
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Store size={28} color="#ea580c" />
          <span style={{ fontSize: '1.5rem', fontWeight: '900', color: '#292524', fontStyle: 'italic' }}>Sweet Delights</span>
        </div>
        
        <div style={{ position: 'relative', cursor: 'pointer' }} onClick={() => setIsCartOpen(true)}>
          <ShoppingCart size={28} color="#1c1917" />
          {cart.length > 0 && (
            <span style={{
              position: 'absolute', top: '-8px', right: '-10px', backgroundColor: '#ea580c',
              color: 'white', fontSize: '12px', borderRadius: '50%', padding: '2px 7px'
            }}>{cart.reduce((a, b) => a + b.quantity, 0)}</span>
          )}
        </div>
      </nav>

      {/* 2. CATEGORY FILTERS */}
      <div style={{ textAlign: 'center', padding: '40px 20px 20px' }}>
        <h2 style={{ marginBottom: '20px', color: '#292524' }}>Explore Our Menu</h2>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', flexWrap: 'wrap' }}>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                padding: '10px 25px', borderRadius: '30px', border: '1px solid #ea580c',
                backgroundColor: activeCategory === cat ? '#ea580c' : 'transparent',
                color: activeCategory === cat ? 'white' : '#ea580c',
                cursor: 'pointer', fontWeight: 'bold', transition: '0.3s'
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* 3. PRODUCT GRID */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '30px' }}>
          {filteredProducts.map((item) => (
            <div key={item._id} style={{ backgroundColor: 'white', borderRadius: '20px', overflow: 'hidden', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', border: '1px solid #f5f5f4' }}>
              <div style={{ height: '220px' }}>
                <img src={item.image} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt={item.name} />
              </div>
              <div style={{ padding: '20px' }}>
                <h3 style={{ margin: '0 0 5px 0' }}>{item.name}</h3>
                <p style={{ fontSize: '12px', color: '#78716c', textTransform: 'uppercase' }}>{item.category}</p>
                <p style={{ color: '#ea580c', fontWeight: 'bold', fontSize: '1.3rem', margin: '10px 0' }}>Rs. {item.price}</p>
                <button onClick={() => addToCart(item)} style={{ width: '100%', backgroundColor: '#1c1917', color: 'white', border: 'none', padding: '12px', borderRadius: '10px', cursor: 'pointer' }}>Add to Cart</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. CART SIDEBAR */}
      {isCartOpen && (
        <div style={{ position: 'fixed', top: 0, right: 0, width: '380px', height: '100vh', backgroundColor: 'white', boxShadow: '-5px 0 15px rgba(0,0,0,0.1)', zIndex: 200, padding: '30px', display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
            <h2 style={{ margin: 0 }}>Your Order</h2>
            <X size={24} cursor="pointer" onClick={() => setIsCartOpen(false)} />
          </div>

          <div style={{ flexGrow: 1, overflowY: 'auto' }}>
            {cart.length === 0 ? <p>Your cart is empty.</p> : (
              cart.map(item => (
                <div key={item._id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', alignItems: 'center' }}>
                  <div>
                    <h4 style={{ margin: 0 }}>{item.name}</h4>
                    <p style={{ margin: 0, fontSize: '14px' }}>{item.quantity} x Rs. {item.price}</p>
                  </div>
                  <Trash2 size={18} color="red" cursor="pointer" onClick={() => removeFromCart(item._id)} />
                </div>
              ))
            )}
          </div>

          {cart.length > 0 && (
            <div style={{ borderTop: '2px solid #f5f5f4', paddingTop: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '20px' }}>
                <span>Total:</span>
                <span>Rs. {cartTotal}</span>
              </div>
              <button 
                onClick={() => { setIsCartOpen(false); setIsCheckoutOpen(true); }}
                style={{ width: '100%', backgroundColor: '#ea580c', color: 'white', border: 'none', padding: '15px', borderRadius: '10px', fontWeight: 'bold', cursor: 'pointer' }}
              >
                Proceed to Checkout
              </button>
            </div>
          )}
        </div>
      )}

      {/* 5. CHECKOUT FORM MODAL */}
      {isCheckoutOpen && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 300 }}>
          <div style={{ backgroundColor: 'white', padding: '40px', borderRadius: '20px', width: '400px', position: 'relative' }}>
            <X size={20} style={{ position: 'absolute', top: '20px', right: '20px', cursor: 'pointer' }} onClick={() => setIsCheckoutOpen(false)} />
            <h2 style={{ marginBottom: '20px' }}>Complete Your Order</h2>
            <form onSubmit={handleCheckout}>
              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px' }}>Full Name</label>
                <input required type="text" style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ddd' }} onChange={(e) => setCustomerInfo({...customerInfo, name: e.target.value})} />
              </div>
              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px' }}>Phone Number</label>
                <input required type="tel" style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ddd' }} onChange={(e) => setCustomerInfo({...customerInfo, phone: e.target.value})} />
              </div>
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '5px' }}>Delivery Address</label>
                <textarea required style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ddd' }} rows="3" onChange={(e) => setCustomerInfo({...customerInfo, address: e.target.value})}></textarea>
              </div>
              <button type="submit" style={{ width: '100%', backgroundColor: '#ea580c', color: 'white', border: 'none', padding: '15px', borderRadius: '10px', fontWeight: 'bold', cursor: 'pointer' }}>
                Confirm Order (Rs. {cartTotal})
              </button>
            </form>
          </div>
        </div>
      )}

      {/* 6. SUCCESS MESSAGE */}
      {orderSuccess && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(255,255,255,0.95)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', zIndex: 400 }}>
          <CheckCircle size={80} color="#22c55e" />
          <h1 style={{ marginTop: '20px' }}>Order Placed Successfully!</h1>
          <p style={{ color: '#78716c', marginBottom: '30px' }}>Thank you {customerInfo.name}, our bakery will contact you soon.</p>
          <button onClick={() => setOrderSuccess(false)} style={{ backgroundColor: '#1c1917', color: 'white', padding: '12px 30px', borderRadius: '10px', border: 'none', cursor: 'pointer' }}>Back to Shop</button>
        </div>
      )}
    </div>
  );
}