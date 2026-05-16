import { ShoppingCart, Star, Plus } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../cart/cartSlice';
import { motion } from 'framer-motion';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  const handleAddToCart = (e) => {
    e.preventDefault();
    dispatch(addToCart(product));
  };

  return (
    <motion.div 
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="glass"
      style={{ 
        overflow: 'hidden', 
        display: 'flex', 
        flexDirection: 'column',
        transition: 'var(--transition)',
        position: 'relative'
      }}
      whileHover={{ y: -5, boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.2)' }}
    >
      <div style={{ position: 'relative', paddingTop: '75%', background: 'rgba(255,255,255,0.02)' }}>
        <img 
          src={product.thumbnail} 
          alt={product.title} 
          style={{ 
            position: 'absolute', 
            top: 0, 
            left: 0, 
            width: '100%', 
            height: '100%', 
            objectFit: 'contain',
            padding: '1rem'
          }} 
        />
        <div style={{ 
          position: 'absolute', 
          top: '10px', 
          right: '10px', 
          background: 'rgba(0,0,0,0.6)', 
          backdropFilter: 'blur(4px)',
          padding: '2px 8px', 
          borderRadius: '6px',
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          fontSize: '0.8rem',
          color: '#fbbf24'
        }}>
          <Star size={12} fill="#fbbf24" />
          <span>{product.rating}</span>
        </div>
      </div>

      <div style={{ padding: '1.25rem', flex: 1, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        <div>
          <span style={{ fontSize: '0.7rem', textTransform: 'uppercase', color: 'var(--primary)', fontWeight: 'bold', letterSpacing: '1px' }}>
            {product.category}
          </span>
          <h3 style={{ fontSize: '1.1rem', margin: '0.25rem 0', lineHeight: '1.2', height: '2.4rem', overflow: 'hidden' }}>
            {product.title}
          </h3>
        </div>

        <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <span style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>${product.price}</span>
            {product.discountPercentage > 0 && (
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textDecoration: 'line-through', marginLeft: '0.5rem' }}>
                ${Math.round(product.price * (1 + product.discountPercentage / 100))}
              </span>
            )}
          </div>
          
          <motion.button 
            onClick={handleAddToCart}
            style={{ 
              background: 'var(--primary)', 
              color: 'white', 
              width: '36px', 
              height: '36px', 
              borderRadius: '10px',
              display: 'grid',
              placeItems: 'center',
              boxShadow: '0 4px 12px rgba(99, 102, 241, 0.3)'
            }}
            whileTap={{ scale: 0.9 }}
          >
            <Plus size={20} />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
