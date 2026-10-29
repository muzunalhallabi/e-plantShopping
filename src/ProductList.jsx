import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, useLocation } from 'react-router';
import { addItem } from './CartSlice.jsx';

const currency = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });
const unsplash = (id) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=960&q=85`;

// Three plant categories, with six unique houseplants in every category.
const plantsArray = [
  {
    id: 'easy-care',
    category: 'Easy-care favorites',
    description: 'The low-fuss greens that make any room feel more alive.',
    plants: [
      { id: 'snake-plant', name: 'Snake Plant', image: unsplash('photo-1501004318641-b39e6451bec6'), description: 'Sculptural, upright leaves bring an easy bit of drama to a sunny corner.', cost: '$28', price: 28, botanical: 'Dracaena trifasciata', badge: 'Hard to kill' },
      { id: 'zz-plant', name: 'ZZ Plant', image: unsplash('photo-1632207691143-643e2a9a9361'), description: 'Glossy leaves and a wonderfully forgiving nature make this a desk favorite.', cost: '$34', price: 34, botanical: 'Zamioculcas zamiifolia', badge: 'Low light' },
      { id: 'rubber-plant', name: 'Rubber Plant', image: unsplash('photo-1614594975525-e45190c55d0b'), description: 'Deep green, polished leaves add a rich, architectural feel.', cost: '$42', price: 42, botanical: 'Ficus elastica', badge: 'Statement size' },
      { id: 'golden-pothos', name: 'Golden Pothos', image: 'https://cdn.pixabay.com/photo/2018/11/15/10/32/plants-3816945_1280.jpg', description: 'A cheerful trailing vine that looks lovely on shelves and in hanging pots.', cost: '$24', price: 24, botanical: 'Epipremnum aureum', badge: 'Trailing' },
      { id: 'monstera', name: 'Monstera Deliciosa', image: unsplash('photo-1509423350716-97f9360b4e09'), description: 'Iconic split leaves make this tropical beauty an instant focal point.', cost: '$48', price: 48, botanical: 'Monstera deliciosa', badge: 'Our favorite' },
      { id: 'jade-plant', name: 'Jade Plant', image: 'https://cdn.pixabay.com/photo/2016/11/21/16/05/cacti-1846147_1280.jpg', description: 'A compact succulent with plump leaves and a calm, sculptural silhouette.', cost: '$22', price: 22, botanical: 'Crassula ovata', badge: 'Sun lover' },
    ],
  },
  {
    id: 'pet-friendly',
    category: 'Pet-friendly greens',
    description: 'Leafy companions selected with curious cats and dogs in mind.',
    plants: [
      { id: 'calathea', name: 'Calathea Orbifolia', image: unsplash('photo-1545241047-6083a3684587'), description: 'Silvery, round leaves bring a soft pattern to warm, humid spaces.', cost: '$39', price: 39, botanical: 'Goeppertia orbifolia', badge: 'Pet friendly' },
      { id: 'parlor-palm', name: 'Parlor Palm', image: unsplash('photo-1463320726281-696a485928c7'), description: 'A graceful little palm with gentle fronds and an easygoing spirit.', cost: '$31', price: 31, botanical: 'Chamaedorea elegans', badge: 'Pet friendly' },
      { id: 'boston-fern', name: 'Boston Fern', image: 'https://pixabay.com/images/download/boston-fern-5114414_640.jpg', description: 'Feathery, fresh green fronds love a bright bathroom or shaded nook.', cost: '$27', price: 27, botanical: 'Nephrolepis exaltata', badge: 'Pet friendly' },
      { id: 'spider-plant', name: 'Spider Plant', image: 'https://pixabay.com/images/download/chlorophytum-3530413_640.jpg', description: 'A lively arching plant that grows charming little plantlets.', cost: '$21', price: 21, botanical: 'Chlorophytum comosum', badge: 'Pet friendly' },
      { id: 'peperomia', name: 'Peperomia Green', image: unsplash('photo-1598880940080-ff9a29891b85'), description: 'Compact, glossy leaves make this a lovely choice for a small shelf.', cost: '$25', price: 25, botanical: 'Peperomia obtusifolia', badge: 'Pet friendly' },
      { id: 'prayer-plant', name: 'Prayer Plant', image: unsplash('photo-1497250681960-ef046c08a56e'), description: 'Painted leaves fold gently upward in the evening light.', cost: '$32', price: 32, botanical: 'Maranta leuconeura', badge: 'Pet friendly' },
    ],
  },
  {
    id: 'blooming',
    category: 'Blooming beauties',
    description: 'Color, fragrance, and delicate flowers for a brighter home.',
    plants: [
      { id: 'peace-lily', name: 'Peace Lily', image: 'https://pixabay.com/images/download/peace-lilies-4269365_640.jpg', description: 'Elegant white blooms rise above lush leaves in soft, indirect light.', cost: '$36', price: 36, botanical: 'Spathiphyllum wallisii', badge: 'Airy & elegant' },
      { id: 'orchid', name: 'Phalaenopsis Orchid', image: unsplash('photo-1589296986498-28cd9406425d'), description: 'A graceful spray of blooms that brightens your room for weeks.', cost: '$44', price: 44, botanical: 'Phalaenopsis', badge: 'Long blooming' },
      { id: 'african-violet', name: 'African Violet', image: 'https://cdn.pixabay.com/photo/2016/08/19/19/48/flowers-1606041_1280.jpg', description: 'Velvety leaves and colorful flowers in a sweet, compact package.', cost: '$19', price: 19, botanical: 'Saintpaulia ionantha', badge: 'Window sill' },
      { id: 'anthurium', name: 'Anthurium Red', image: 'https://cdn.pixabay.com/photo/2022/02/22/05/45/marigold-7028063_1280.jpg', description: 'Shiny heart-shaped blooms bring a little celebration indoors.', cost: '$38', price: 38, botanical: 'Anthurium andraeanum', badge: 'Bright bloom' },
      { id: 'jasmine', name: 'Arabian Jasmine', image: unsplash('photo-1592729645009-b96d1e63d14b'), description: 'Starry white flowers fill a sunny room with a soft, sweet fragrance.', cost: '$33', price: 33, botanical: 'Jasminum sambac', badge: 'Sweetly scented' },
      { id: 'hoya', name: 'Hoya Carnosa', image: 'https://cdn.pixabay.com/photo/2019/07/15/18/28/flowers-4340127_1280.jpg', description: 'Waxy leaves and clusters of tiny star-shaped flowers.', cost: '$29', price: 29, botanical: 'Hoya carnosa', badge: 'Trailing bloom' },
    ],
  },
];

function BrandMark() {
  return <svg className="brand-leaf" viewBox="0 0 36 36" fill="none" aria-hidden="true"><path d="M29.5 6.5C16 6.5 8 11 8 20.3c0 5 3.6 8.7 8.4 8.7 9.4 0 13.1-10.4 13.1-22.5Z" fill="currentColor"/><path d="M6.5 30c3.8-7.1 9-12.3 16-16.4" stroke="#f6f5ef" strokeWidth="1.6" strokeLinecap="round"/></svg>;
}

export function Navbar({ onHomeClick, onPlantsClick, onCartClick }) {
  const count = useSelector((state) => state.cart.items.reduce((sum, item) => sum + item.quantity, 0));
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => setMenuOpen(false), [location.pathname]);

  return (
    <header className="site-header">
      <div className="nav-inner">
        <Link to="/" className="brand" aria-label="Paradise Nursery home"><BrandMark /><span>paradise<span className="brand-light"> nursery</span></span><i>.</i></Link>
        <button className="mobile-menu-toggle" type="button" aria-expanded={menuOpen} aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'} onClick={() => setMenuOpen((open) => !open)}>{menuOpen ? '×' : '☰'}</button>
        <div className="navbar">
          <nav className={`main-nav${menuOpen ? ' is-open' : ''}`} aria-label="Main navigation">
            <NavLink to="/" end onClick={onHomeClick}>Home</NavLink>
            <NavLink to="/plants" onClick={onPlantsClick}>Plants</NavLink>
            <NavLink className="nav-cart" to="/cart" onClick={onCartClick} aria-label={`Cart, ${count} ${count === 1 ? 'item' : 'items'}`}><svg className="cart-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M3.5 5h2l2.1 10.2a2 2 0 0 0 2 1.6h8.3a2 2 0 0 0 1.9-1.4L21 9H7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><circle cx="10" cy="20" r="1" fill="currentColor"/><circle cx="18" cy="20" r="1" fill="currentColor"/></svg><span>Cart</span><span className="cart-count" aria-hidden="true">{count}</span></NavLink>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default function ProductList() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const [addedToCart, setAddedToCart] = useState({});
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  useEffect(() => {
    const itemsInCart = {};
    cartItems.forEach((item) => {
      itemsInCart[item.name] = true;
    });
    setAddedToCart(itemsInCart);
  }, [cartItems]);

  const handleAddToCart = (product) => {
    dispatch(addItem(product));
    setAddedToCart((previousItems) => ({
      ...previousItems,
      [product.name]: true,
    }));
  };

  return (
    <>
    <Navbar />
    <main className="catalog-page page-shell">
      <section className="catalog-intro">
        <div>
          <p className="eyebrow">THE PLANT SHOP · 01—18</p>
          <h1>Your little<br /><em>indoor garden.</em></h1>
        </div>
        <div className="catalog-intro-side">
          <p>Good plants, chosen with care. Find a new favorite for the windowsill, the quiet corner, or anywhere that needs a little more life.</p>
          <span className="catalog-count">18 plants <i /> 3 collections</span>
        </div>
      </section>

      <nav className="category-jump" aria-label="Plant collections">
        {plantsArray.map((category, index) => (
          <a href={`#${category.id}`} key={category.id}><span>0{index + 1}</span>{category.category}<b aria-hidden="true">↘</b></a>
        ))}
        <Link className="category-cart-link" to="/cart">Your cart <span>{cartCount}</span></Link>
      </nav>

      {plantsArray.map((category, categoryIndex) => (
        <section className="plant-category" id={category.id} key={category.id} aria-labelledby={`${category.id}-title`}>
          <div className="category-heading">
            <div><p className="eyebrow">COLLECTION 0{categoryIndex + 1}</p><h2 className="category-name" id={`${category.id}-title`}>{category.category}<span className="category-period">.</span></h2></div>
            <p>{category.description}</p>
          </div>
          <div className="product-grid product-list">
            {category.plants.map((plant, index) => {
              const plantToAdd = { ...plant, category: category.category };
              return (
                <article className="product-card" key={plant.id}>
                  <div className="product-image-wrap">
                    <img className="product-image" src={plant.image} alt={plant.name} loading="lazy" onError={(event) => { event.currentTarget.src = 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=960&q=85'; }} />
                    <span className="product-badge">{plant.badge}</span>
                    <span className="product-index">0{index + 1}</span>
                  </div>
                  <div className="product-info">
                    <p className="plant-botanical">{plant.botanical}</p>
                    <div className="product-title-row"><h3 className="product-title">{plant.name}</h3><strong className="product-cost">{plant.cost || currency.format(plant.price)}</strong></div>
                    <p className="product-description">{plant.description}</p>
                    <button className={`product-button add-button${addedToCart[plant.name] ? ' is-added' : ''}`} type="button" disabled={addedToCart[plant.name]} onClick={() => handleAddToCart(plantToAdd)}>
                      {addedToCart[plant.name] ? 'Added to Cart' : 'Add to Cart'} <span aria-hidden="true">{addedToCart[plant.name] ? '✓' : '↗'}</span>
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      ))}
      <section className="catalog-footnote"><span className="footnote-flower" aria-hidden="true">✳</span><p>Not sure where to start? <Link to="/">We can help you find your fit.</Link></p></section>
    </main>
    </>
  );
}
