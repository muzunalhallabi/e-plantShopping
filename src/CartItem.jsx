import { useDispatch, useSelector } from 'react-redux';
import { updateQuantity, removeItem } from './CartSlice.jsx';
import { Navbar } from './ProductList.jsx';

const currency = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });

export default function CartItem({ onContinueShopping }) {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.items);
  const totalCount = cart.reduce((total, item) => total + item.quantity, 0);

  const parseCost = (cost) => {
    if (typeof cost === 'number') return cost;
    return parseFloat(cost.substring(1));
  };

  const calculateTotalAmount = () => cart.reduce(
    (total, item) => total + item.quantity * parseCost(item.cost),
    0,
  );

  const calculateTotalCost = (item) => item.quantity * parseCost(item.cost);

  const handleContinueShopping = (e) => {
    e.preventDefault();
    onContinueShopping(e);
  };

  const handleCheckoutShopping = () => {
    alert('Functionality Coming Soon');
  };

  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      dispatch(removeItem(item.name));
    }
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  return (
    <>
    <Navbar />
    <main className="cart-page page-shell cart-container">
      <div className="cart-heading">
        <div><p className="eyebrow">YOUR LITTLE GREEN CORNER</p><h1>Shopping <em>cart.</em></h1></div>
        <span className="cart-item-count">{totalCount} {totalCount === 1 ? 'plant' : 'plants'}</span>
      </div>

      {cart.length === 0 ? (
        <section className="empty-cart">
          <span className="empty-cart-icon" aria-hidden="true">✳</span>
          <h2>A little room to grow.</h2>
          <p>Your cart is waiting for something green.</p>
          <button className="button button-dark get-started-button continue-shopping-button" type="button" onClick={(e) => handleContinueShopping(e)}>Continue Shopping <span aria-hidden="true">↗</span></button>
        </section>
      ) : (
        <div className="cart-layout">
          <section className="cart-lines" aria-label="Items in your cart">
            <div className="cart-table-head"><span>PLANT</span><span>QUANTITY</span><span>SUBTOTAL</span></div>
            {cart.map((item) => (
              <article className="cart-line cart-item" key={item.name}>
                <div className="cart-product cart-item-details">
                  <img className="cart-item-image" src={item.image} alt={item.name} onError={(event) => { event.currentTarget.src = 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=500&q=80'; }} />
                  <div>
                    <p className="plant-botanical">{item.category}</p>
                    <h2 className="cart-item-name">{item.name}</h2>
                    <p className="cart-unit-price cart-item-cost">{currency.format(parseCost(item.cost))} <span>/ each</span></p>
                  </div>
                </div>
                <div className="cart-quantity cart-item-quantity" aria-label={`Quantity of ${item.name}`}>
                  <button className="cart-item-button cart-item-button-dec" type="button" onClick={() => handleDecrement(item)} aria-label={`Decrease ${item.name} quantity`}>−</button>
                  <span className="cart-item-quantity-value" aria-live="polite">{item.quantity}</span>
                  <button className="cart-item-button cart-item-button-inc" type="button" onClick={() => handleIncrement(item)} aria-label={`Increase ${item.name} quantity`}>+</button>
                </div>
                <div className="cart-subtotal cart-item-total">
                  <strong>{currency.format(calculateTotalCost(item))}</strong>
                  <button className="cart-item-delete" type="button" onClick={() => handleRemove(item)} aria-label={`Delete ${item.name} from cart`}>Delete <span aria-hidden="true">×</span></button>
                </div>
              </article>
            ))}
            <button className="continue-link get-started-button continue-shopping-button" type="button" onClick={(e) => handleContinueShopping(e)}><span aria-hidden="true">←</span> Continue Shopping</button>
          </section>

          <aside className="order-summary" aria-label="Order summary">
            <p className="eyebrow">A FRESH START</p><h2>Order summary</h2>
            <div className="summary-row"><span>Plants ({totalCount})</span><strong>{currency.format(calculateTotalAmount())}</strong></div>
            <div className="summary-row delivery"><span>Delivery</span><strong>Calculated at checkout</strong></div>
            <div className="summary-total total_cart_amount"><span>Total Cart Amount</span><strong>{currency.format(calculateTotalAmount())}</strong></div>
            <p className="summary-note">A little note: delivery is on us for orders over $75.</p>
            <button className="checkout-button get-started-button1" type="button" onClick={handleCheckoutShopping}>Checkout <span aria-hidden="true">↗</span></button>
            <div className="secure-note"><span aria-hidden="true">✳</span> Carefully packed, happily delivered.</div>
          </aside>
        </div>
      )}
      <div className="cart-bottom-note"><span>GOOD THINGS GROW</span><span>With care, Paradise Nursery</span></div>
    </main>
    </>
  );
}
