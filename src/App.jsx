import { useEffect, useState } from 'react';
import { Link, Route, Routes, useLocation, useNavigate } from 'react-router';
import AboutUs from './AboutUs.jsx';
import CartItem from './CartItem.jsx';
import ProductList from './ProductList.jsx';
import './App.css';

function BrandMark() {
  return <svg className="brand-leaf" viewBox="0 0 36 36" fill="none" aria-hidden="true"><path d="M29.5 6.5C16 6.5 8 11 8 20.3c0 5 3.6 8.7 8.4 8.7 9.4 0 13.1-10.4 13.1-22.5Z" fill="currentColor"/><path d="M6.5 30c3.8-7.1 9-12.3 16-16.4" stroke="#f6f5ef" strokeWidth="1.6" strokeLinecap="round"/></svg>;
}

function Home({ onGetStartedClick }) {
  return (
    <main className="landing-page">
      <section className="hero page-shell">
        <div className="hero-copy content landing_content">
          <p className="eyebrow"><span className="eyebrow-spark" aria-hidden="true">✳</span> A MORE NATURAL WAY TO FEEL AT HOME</p>
          <h1>Welcome to Paradise Nursery</h1>
          <p className="landing-tagline">Where Green Meets Serenity</p>
          <p className="hero-description">At Paradise Nursery, we bring you thoughtfully chosen houseplants to add a little calm, color, and fresh air to your everyday.</p>
          <button className="button button-dark get-started-button" type="button" onClick={onGetStartedClick}>Get Started <span aria-hidden="true">↗</span></button>
          <div className="hero-foot"><span>PLANTS WITH A LITTLE MORE HEART</span><span>01 — 03</span></div>
        </div>
        <div className="hero-visual background-image" aria-label="Green leaves in warm afternoon light" role="img">
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
  const [showProductList, setShowProductList] = useState(false);
  const [view, setView] = useState('landing');
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const isShoppingPage = location.pathname === '/plants' || location.pathname === '/cart';
    setShowProductList(isShoppingPage);
    setView(location.pathname === '/cart' ? 'cart' : isShoppingPage ? 'product' : 'landing');
  }, [location.pathname]);

  const handleGetStartedClick = () => {
    setShowProductList(true);
    setView('product');
    navigate('/plants');
  };

  const handleContinueShopping = () => {
    setShowProductList(true);
    setView('product');
    navigate('/plants');
  };

  return (
    <div className={`app-container app-shell${showProductList ? ' has-started' : ''}`} id="top" data-view={view}>
      <Routes>
        <Route path="/" element={<Home onGetStartedClick={handleGetStartedClick} />} />
        <Route path="/plants" element={<ProductList />} />
        <Route path="/cart" element={<CartItem onContinueShopping={handleContinueShopping} />} />
        <Route path="*" element={<Home onGetStartedClick={handleGetStartedClick} />} />
      </Routes>
    </div>
  );
}
