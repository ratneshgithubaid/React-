import { useSelector, useDispatch } from 'react-redux';
import { addToCart, removeFromCart, removeItem, clearCart } from './cartSlice';
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft, CreditCard } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const CheckoutPage = () => {
  const { items, totalAmount, totalQuantity } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  if (items.length === 0) {
    return (
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center', 
        minHeight: '60vh',
        gap: '1.5rem'
      }}>
        <div style={{ 
          width: '80px', 
          height: '80px', 
          background: 'var(--glass-bg)', 
          borderRadius: '50%', 
          display: 'grid', 
          placeItems: 'center',
          color: 'var(--text-muted)'
        }}>
          <ShoppingBag size={40} />
        </div>
        <h2 style={{ fontSize: '2rem' }}>Your cart is empty</h2>
        <p style={{ color: 'var(--text-muted)' }}>Looks like you haven't added anything to your cart yet.</p>
        <Link to="/" style={{ 
          background: 'var(--primary)', 
          color: 'white', 
          padding: '0.75rem 2rem', 
          borderRadius: '10px',
          fontWeight: '600'
        }}>
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '2.5rem', alignItems: 'start' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <h2 style={{ fontSize: '2rem' }}>Shopping Cart</h2>
          <span style={{ color: 'var(--text-muted)' }}>{totalQuantity} items</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <AnimatePresence>
            {items.map((item) => (
              <motion.div 
                key={item.id}
                layout
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="glass"
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '1.5rem', 
                  padding: '1rem',
                  position: 'relative'
                }}
              >
                <img 
                  src={item.thumbnail} 
                  alt={item.title} 
                  style={{ width: '80px', height: '80px', objectFit: 'contain', background: 'rgba(255,255,255,0.02)', borderRadius: '8px' }} 
                />
                
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontSize: '1.1rem', marginBottom: '0.25rem' }}>{item.title}</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{item.category}</p>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    background: 'rgba(255,255,255,0.05)', 
                    borderRadius: '8px',
                    border: '1px solid var(--border)'
                  }}>
                    <button 
                      onClick={() => dispatch(removeFromCart(item.id))}
                      style={{ padding: '0.4rem', color: 'var(--text-muted)' }}
                    >
                      <Minus size={16} />
                    </button>
                    <span style={{ width: '30px', textAlign: 'center', fontWeight: 'bold' }}>{item.quantity}</span>
                    <button 
                      onClick={() => dispatch(addToCart(item))}
                      style={{ padding: '0.4rem', color: 'var(--text-muted)' }}
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                  
                  <div style={{ width: '80px', textAlign: 'right' }}>
                    <span style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>${(item.price * item.quantity).toFixed(2)}</span>
                  </div>

                  <button 
                    onClick={() => dispatch(removeItem(item.id))}
                    style={{ color: 'var(--accent)', opacity: 0.7 }}
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', marginTop: '1rem' }}>
          <ArrowLeft size={18} />
          <span>Continue Shopping</span>
        </Link>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass" 
        style={{ padding: '2rem', position: 'sticky', top: '100px' }}
      >
        <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>Order Summary</h3>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: 'var(--text-muted)' }}>Subtotal</span>
            <span>${totalAmount.toFixed(2)}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: 'var(--text-muted)' }}>Shipping</span>
            <span style={{ color: '#10b981', fontWeight: '500' }}>Free</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: 'var(--text-muted)' }}>Tax</span>
            <span>$0.00</span>
          </div>
          <div style={{ height: '1px', background: 'var(--border)', margin: '0.5rem 0' }}></div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.25rem', fontWeight: 'bold' }}>
            <span>Total</span>
            <span style={{ color: 'var(--primary)' }}>${totalAmount.toFixed(2)}</span>
          </div>
        </div>

        <button 
          style={{ 
            width: '100%', 
            background: 'var(--primary)', 
            color: 'white', 
            padding: '1rem', 
            borderRadius: '12px', 
            fontWeight: '600',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.75rem',
            fontSize: '1.1rem',
            boxShadow: '0 10px 20px -5px rgba(99, 102, 241, 0.4)'
          }}
          onClick={() => {
            alert('Order placed successfully!');
            dispatch(clearCart());
          }}
        >
          <CreditCard size={20} />
          Checkout Now
        </button>

        <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'center', gap: '1rem' }}>
          {/* Card icons or badges can go here */}
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textAlign: 'center' }}>
            Secure payment powered by Stripe
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default CheckoutPage;
