import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, fetchCategories, setPage, setCategory } from './productSlice';
import ProductCard from './ProductCard';
import { ChevronLeft, ChevronRight, Filter, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const HomePage = () => {
  const dispatch = useDispatch();
  const { 
    items, 
    status, 
    categories, 
    total, 
    limit, 
    skip, 
    currentCategory,
    searchQuery
  } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchProducts({ 
      limit, 
      skip, 
      category: currentCategory,
      search: searchQuery
    }));
  }, [dispatch, limit, skip, currentCategory, searchQuery]);

  const totalPages = Math.ceil(total / limit);
  const currentPage = Math.floor(skip / limit);

  const handlePageChange = (newPage) => {
    if (newPage >= 0 && newPage < totalPages) {
      dispatch(setPage(newPage));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleCategoryChange = (cat) => {
    dispatch(setCategory(cat));
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Hero Section / Category Bar */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', paddingBottom: '1rem', overflowX: 'auto' }}>
        <button 
          onClick={() => handleCategoryChange('all')}
          style={{ 
            padding: '0.6rem 1.25rem', 
            borderRadius: '10px', 
            background: currentCategory === 'all' ? 'var(--primary)' : 'var(--glass-bg)',
            border: '1px solid var(--border)',
            color: 'white',
            whiteSpace: 'nowrap',
            fontSize: '0.9rem',
            fontWeight: '500'
          }}
        >
          All Products
        </button>
        {categories.map((cat) => (
          <button 
            key={cat}
            onClick={() => handleCategoryChange(cat)}
            style={{ 
              padding: '0.6rem 1.25rem', 
              borderRadius: '10px', 
              background: currentCategory === cat ? 'var(--primary)' : 'var(--glass-bg)',
              border: '1px solid var(--border)',
              color: 'white',
              whiteSpace: 'nowrap',
              textTransform: 'capitalize',
              fontSize: '0.9rem',
              fontWeight: '500'
            }}
          >
            {cat.replace('-', ' ')}
          </button>
        ))}
      </div>

      {/* Main Content */}
      {status === 'loading' ? (
        <div style={{ display: 'grid', placeItems: 'center', minHeight: '400px' }}>
          <Loader2 size={48} className="animate-spin" style={{ color: 'var(--primary)' }} />
        </div>
      ) : (
        <>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', 
            gap: '2rem' 
          }}>
            <AnimatePresence mode='popLayout'>
              {items.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </AnimatePresence>
          </div>

          {items.length === 0 && (
            <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-muted)' }}>
              <h3>No products found</h3>
              <p>Try adjusting your search or category filters</p>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div style={{ 
              display: 'flex', 
              justifyContent: 'center', 
              alignItems: 'center', 
              gap: '1rem',
              marginTop: '3rem'
            }}>
              <button 
                disabled={currentPage === 0}
                onClick={() => handlePageChange(currentPage - 1)}
                className="glass"
                style={{ 
                  padding: '0.5rem', 
                  color: currentPage === 0 ? 'var(--text-muted)' : 'white',
                  opacity: currentPage === 0 ? 0.5 : 1
                }}
              >
                <ChevronLeft size={24} />
              </button>
              
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                {[...Array(totalPages)].map((_, i) => {
                  // Only show current, first, last and 2 neighbors
                  if (i === 0 || i === totalPages - 1 || (i >= currentPage - 1 && i <= currentPage + 1)) {
                    return (
                      <button 
                        key={i}
                        onClick={() => handlePageChange(i)}
                        style={{ 
                          width: '40px', 
                          height: '40px', 
                          borderRadius: '10px',
                          background: currentPage === i ? 'var(--primary)' : 'var(--glass-bg)',
                          border: '1px solid var(--border)',
                          color: 'white',
                          fontWeight: '600'
                        }}
                      >
                        {i + 1}
                      </button>
                    );
                  } else if (i === currentPage - 2 || i === currentPage + 2) {
                    return <span key={i} style={{ color: 'var(--text-muted)' }}>...</span>;
                  }
                  return null;
                })}
              </div>

              <button 
                disabled={currentPage === totalPages - 1}
                onClick={() => handlePageChange(currentPage + 1)}
                className="glass"
                style={{ 
                  padding: '0.5rem', 
                  color: currentPage === totalPages - 1 ? 'var(--text-muted)' : 'white',
                  opacity: currentPage === totalPages - 1 ? 0.5 : 1
                }}
              >
                <ChevronRight size={24} />
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default HomePage;
