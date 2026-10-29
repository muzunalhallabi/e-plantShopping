import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router';
import { decrementItem, incrementItem, removeItem } from '../CartSlice.jsx';

const currency = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });

export default function CartItem({ onCheckout }) {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <main className="cart-page page-shell">
      <div className="cart-heading">
        <div><p className="eyebrow">YOUR LITTLE GREEN CORNER</p><h1>Shopping <em>cart.</em></h1></div>
        <span className="cart-item-count">{totalCount} {totalCount === 1 ? 'plant' : 'plants'}</span>
      </div>

      {items.length === 0 ? (
        <section className="empty-cart">
          <span className="empty-cart-icon" aria-hidden="true">✳</span>
          <h2>A little room to grow.</h2>
          <p>Your cart is waiting for something green.</p>
          <Link className="button button-dark" to="/plants">Find your first plant <span aria-hidden="true">↗</span></Link>
        </section>
      ) : (
        <div className="cart-layout">
          <section className="cart-lines" aria-label="Items in your cart">
            <div className="cart-table-head"><span>PLANT</span><span>QUANTITY</span><span>SUBTOTAL</span></div>
            {items.map((item) => (
              <article className="cart-line" key={item.id}>
                <div className="cart-product">
                  <img src={item.image} alt={`${item.name} houseplant`} onError={(event) => { event.currentTarget.src = 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=500&q=80'; }} />
                  <div><p className="plant-botanical">{item.category}</p><h2>{item.name}</h2><p className="cart-unit-price">{currency.format(item.price)} <span>/ each</span></p></div>
                </div>
                <div className="cart-quantity" aria-label={`Quantity of ${item.name}`}>
                  <button type="button" onClick={() => dispatch(decrementItem(item.id))} aria-label={`Decrease ${item.name} quantity`}>−</button>
                  <span aria-live="polite">{item.quantity}</span>
                  <button type="button" onClick={() => dispatch(incrementItem(item.id))} aria-label={`Increase ${item.name} quantity`}>+</button>
                </div>
                <div className="cart-subtotal"><strong>{currency.format(item.price * item.quantity)}</strong><button type="button" onClick={() => dispatch(removeItem(item.id))} aria-label={`Delete ${item.name} from cart`}>Delete <span aria-hidden="true">×</span></button></div>
              </article>
            ))}
            <Link className="continue-link" to="/plants"><span aria-hidden="true">←</span> Continue Shopping</Link>
          </section>

          <aside className="order-summary" aria-label="Order summary">
            <p className="eyebrow">A FRESH START</p><h2>Order summary</h2>
            <div className="summary-row"><span>Plants ({totalCount})</span><strong>{currency.format(total)}</strong></div>
            <div className="summary-row delivery"><span>Delivery</span><strong>Calculated at checkout</strong></div>
            <div className="summary-total"><span>Subtotal</span><strong>{currency.format(total)}</strong></div>
            <p className="summary-note">A little note: delivery is on us for orders over $75.</p>
            <button className="checkout-button" type="button" onClick={onCheckout}>Continue to checkout <span aria-hidden="true">↗</span></button>
            <div className="secure-note"><span aria-hidden="true">✳</span> Carefully packed, happily delivered.</div>
          </aside>
        </div>
      )}
      <div className="cart-bottom-note"><span>GOOD THINGS GROW</span><span>With care, Paradise Nursery</span></div>
    </main>
  );
}
