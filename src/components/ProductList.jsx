import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { addItem } from '../CartSlice.jsx';
import { categories } from '../data/plants.js';

const currency = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });

export default function ProductList() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
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
        {categories.map((category, index) => (
          <a href={`#${category.id}`} key={category.id}><span>0{index + 1}</span>{category.name}<b aria-hidden="true">↘</b></a>
        ))}
        <Link className="category-cart-link" to="/cart">Your cart <span>{cartCount}</span></Link>
      </nav>

      {categories.map((category, categoryIndex) => (
        <section className="plant-category" id={category.id} key={category.id} aria-labelledby={`${category.id}-title`}>
          <div className="category-heading">
            <div><p className="eyebrow">COLLECTION 0{categoryIndex + 1}</p><h2 id={`${category.id}-title`}>{category.name}<span className="category-period">.</span></h2></div>
            <p>{category.description}</p>
          </div>
          <div className="product-grid">
            {category.products.map((plant, index) => {
              const isAdded = cartItems.some((item) => item.id === plant.id);
              return (
                <article className="product-card" key={plant.id}>
                  <div className="product-image-wrap">
                    <img src={plant.image} alt={`${plant.name} houseplant`} loading="lazy" onError={(event) => { event.currentTarget.src = 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=960&q=85'; }} />
                    <span className="product-badge">{plant.badge}</span>
                    <span className="product-index">0{index + 1}</span>
                  </div>
                  <div className="product-info">
                    <p className="plant-botanical">{plant.botanical}</p>
                    <div className="product-title-row"><h3>{plant.name}</h3><strong>{currency.format(plant.price)}</strong></div>
                    <p className="product-description">{plant.description}</p>
                    <button className={`add-button${isAdded ? ' is-added' : ''}`} type="button" disabled={isAdded} onClick={() => dispatch(addItem(plant))}>
                      {isAdded ? <><span aria-hidden="true">✓</span> Added to your cart</> : <>Add to Cart <span aria-hidden="true">↗</span></>}
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
  );
}
