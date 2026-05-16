import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { ShoppingCart, User, LogOut, Search, Menu } from 'lucide-react';
import { logout } from '../features/auth/authSlice';
import { setSearchQuery } from '../features/products/productSlice';
import { useState } from 'react';

const Navbar = () => {
  const { user } = useSelector((state) => state.auth);
  const { totalQuantity } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState('');

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(setSearchQuery(searchValue));
  };

  return (
    <nav className="glass" style={{ 
      position: 'sticky', 
      top: 0, 
      zIndex: 100, 
      margin: '1rem', 
      padding: '0.75rem 2rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: '1rem'
    }}>
      <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <div style={{ 
          width: '40px', 
          height: '40px', 
          background: 'linear-gradient(135deg, var(--primary), var(--accent))',
          borderRadius: '12px',
          display: 'grid',
          placeItems: 'center',
          color: 'white',
          fontWeight: 'bold',
          fontSize: '1.2rem'
        }}>Z</div>
        <h1 style={{ fontSize: '1.5rem', letterSpacing: '-1px' }}>ZenStore</h1>
      </Link>

      <form onSubmit={handleSearch} style={{ 
        flex: 1, 
        maxWidth: '400px', 
        position: 'relative',
        display: 'flex',
        alignItems: 'center'
      }}>
        <Search size={18} style={{ position: 'absolute', left: '12px', color: 'var(--text-muted)' }} />
        <input 
          type="text" 
          placeholder="Search products..." 
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          style={{ 
            width: '100%',
            padding: '0.6rem 1rem 0.6rem 2.5rem',
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid var(--border)',
            borderRadius: '10px',
            color: 'white',
            outline: 'none',
            transition: 'var(--transition)'
          }}
          onFocus={(e) => e.target.style.borderColor = 'var(--primary)'}
          onBlur={(e) => e.target.style.borderColor = 'var(--border)'}
        />
      </form>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
        <Link to="/checkout" style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
          <ShoppingCart size={24} />
          {totalQuantity > 0 && (
            <span style={{ 
              position: 'absolute', 
              top: '-8px', 
              right: '-10px', 
              background: 'var(--accent)', 
              color: 'white', 
              fontSize: '0.7rem', 
              padding: '2px 6px', 
              borderRadius: '10px',
              fontWeight: 'bold',
              boxShadow: '0 0 10px rgba(244, 63, 94, 0.5)'
            }}>
              {totalQuantity}
            </span>
          )}
        </Link>

        {user ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <img 
                src={user.image} 
                alt={user.username} 
                style={{ width: '32px', height: '32px', borderRadius: '50%', border: '2px solid var(--primary)' }} 
              />
              <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)', display: 'none', md: 'block' }}>{user.firstName}</span>
            </div>
            <button onClick={handleLogout} style={{ display: 'flex', alignItems: 'center', color: 'var(--text-muted)' }}>
              <LogOut size={20} />
            </button>
          </div>
        ) : (
          <Link to="/login" style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '0.5rem',
            background: 'var(--primary)',
            padding: '0.5rem 1.2rem',
            borderRadius: '8px',
            color: 'white',
            fontWeight: '500'
          }}>
            <User size={18} />
            <span>Login</span>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
