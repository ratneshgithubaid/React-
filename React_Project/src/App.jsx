import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Navbar from './components/Navbar';
import HomePage from './features/products/HomePage';
import LoginPage from './features/auth/LoginPage';
import CheckoutPage from './features/cart/CheckoutPage';

function App() {
  const { token } = useSelector((state) => state.auth);

  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <main className="container animate-fade-in" style={{ padding: '2rem 1.5rem', minHeight: '80vh' }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route 
              path="/login" 
              element={token ? <Navigate to="/" /> : <LoginPage />} 
            />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
        <footer style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)', borderTop: '1px solid var(--border)' }}>
          <p>&copy; 2026 ZenStore. All rights reserved.</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
