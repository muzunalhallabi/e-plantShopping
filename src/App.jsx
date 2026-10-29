import { useEffect, useState } from 'react';
import { Link, NavLink, Route, Routes, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import AboutUs from './components/AboutUs.jsx';
import CartItem from './components/CartItem.jsx';
import ProductList from './components/ProductList.jsx';
import './App.css';

function BrandMark() {
  return <svg className="brand-leaf" viewBox="0 0 36 36" fill="none" aria-hidden="true"><path d="M29.5 6.5C16 6.5 8 11 8 20.3c0 5 3.6 8.7 8.4 8.7 9.4 0 13.1-10.4 13.1-22.5Z" fill="currentColor"/><path d="M6.5 30c3.8-7.1 9-12.3 16-16.4" stroke="#f6f5ef" strokeWidth="1.6" strokeLinecap="round"/></svg>;
}

function Navbar() {
  const count = useSelector((state) => state.cart.items.reduce((sum, item) => sum + item.quantity, 0));
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  useEffect(() => setMenuOpen(false), [location.pathname]);

  return (
    <header className="site-header">
      <div className="nav-inner">
        <Link to="/" className="brand" aria-label="Paradise Nursery home"><BrandMark /><span>paradise<span className="brand-light"> nursery</span></span><i>.</i></Link>
        <button className="mobile-menu-toggle" type="button" aria-expanded={menuOpen} aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'} onClick={() => setMenuOpen((open) => !open)}>{menuOpen ? '×' : '☰'}</button>
        <nav className={`main-nav${menuOpen ? ' is-open' : ''}`} aria-label="Main navigation">
          <NavLink to="/" end>Home</NavLink>
          <NavLink to="/plants">Plants</NavLink>
          <NavLink className="nav-cart" to="/cart" aria-label={`Cart, ${count} ${count === 1 ? 'item' : 'items'}`}><svg className="cart-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M3.5 5h2l2.1 10.2a2 2 0 0 0 2 1.6h8.3a2 2 0 0 0 1.9-1.4L21 9H7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><circle cx="10" cy="20" r="1" fill="currentColor"/><circle cx="18" cy="20" r="1" fill="currentColor"/></svg><span>Cart</span><span className="cart-count" aria-hidden="true">{count}</span></NavLink>
        </nav>
      </div>
    </header>
  );
}

function Home() {
  return (
    <main>
      <section className="hero page-shell">
        <div className="hero-copy">
          <p className="eyebrow"><span className="eyebrow-spark" aria-hidden="true">✳</span> A MORE NATURAL WAY TO FEEL AT HOME</p>
          <h1>Make room<br />for <em>something</em><br /><em>growing.</em></h1>
          <p className="hero-description">At Paradise Nursery, we bring you thoughtfully chosen houseplants to add a little calm, color, and fresh air to your everyday.</p>
          <Link className="button button-dark" to="/plants">Get Started <span aria-hidden="true">↗</span></Link>
          <div className="hero-foot"><span>PLANTS WITH A LITTLE MORE HEART</span><span>01 — 03</span></div>
        </div>
        <div className="hero-visual" aria-label="Green leaves in warm afternoon light" role="img">
          <div className="hero-note"><span>GROWN WITH CARE</span><strong>Find your<br />kind of green.</strong><Link to="/plants" aria-label="Explore the plant collection">↗</Link></div>
          <span className="hero-image-caption">A slower kind of living · Paradise Nursery</span>
        </div>
      </section>
      <section className="home-marquee" aria-label="Our promise"><span>MORE GREEN</span><i>✳</i><span>MORE GOOD DAYS</span><i>✳</i><span>MORE GREEN</span><i>✳</i><span>MORE GOOD DAYS</span></section>
      <AboutUs />
      <section className="home-collections page-shell">
        <div><p className="eyebrow">A GOOD PLACE TO BEGIN</p><h2>Find the one<br />that feels <em>like you.</em></h2></div>
        <p>From easygoing first plants to little flowering treasures, there's a green friend for every kind of home.</p>
        <Link className="button button-outline" to="/plants">Explore all plants <span aria-hidden="true">↗</span></Link>
      </section>
      <footer className="site-footer"><Link to="/" className="brand"><BrandMark /><span>paradise<span className="brand-light"> nursery</span></span><i>.</i></Link><span>Made for slower, greener days.</span><a href="#top">Back to top ↑</a></footer>
    </main>
  );
}

export default function App() {
  const [toast, setToast] = useState('');
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  useEffect(() => {
    if (!toast) return undefined;
    const timer = window.setTimeout(() => setToast(''), 2800);
    return () => window.clearTimeout(timer);
  }, [toast]);

  return (
    <div className="app-shell" id="top">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/plants" element={<ProductList />} />
        <Route path="/cart" element={<CartItem onCheckout={() => setToast('Coming soon — we’re getting your checkout ready.')} />} />
        <Route path="*" element={<Home />} />
      </Routes>
      {toast && <div className="toast-message" role="status"><span aria-hidden="true">✳</span>{toast}</div>}
    </div>
  );
}
