import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import CartDrawer from './components/cart/CartDrawer';
import Home from './pages/Home';
import ProductList from './pages/ProductList';
import ProductDetail from './pages/ProductDetail';
import About from './pages/About';
import Contact from './pages/Contact';
import Admin from './pages/Admin';

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="min-h-screen bg-white text-slate-900 font-sans flex flex-col relative">

          <Routes>
            {/* Standard Layout Routes */}
            <Route path="/*" element={
              <>
                <Navbar />
                <main className="flex-grow">
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/products" element={<ProductList />} />
                    <Route path="/products/:id" element={<ProductDetail />} />
                  </Routes>
                </main>
                <Footer />
                <CartDrawer />
              </>
            } />

            {/* Admin Route (No standard Navbar/Footer) */}
            <Route path="/admin" element={<Admin />} />
          </Routes>

        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
