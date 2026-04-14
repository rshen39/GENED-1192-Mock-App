import React, { useMemo, useState } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { formatPrice } from '../utils';

function Checkout({ currentUser }) {
  const history = useHistory();
  const location = useLocation();
  const [saleComplete, setSaleComplete] = useState(false);

  const listing = useMemo(() => location.state?.listing || null, [location.state]);

  function handleSale() {
    setSaleComplete(true);
  }

  if (!listing) {
    return (
      <main className="page">
        <section className="panel section">
          <span className="eyebrow">Checkout</span>
          <h2 className="section-title">No item selected</h2>
          <p className="muted">Choose a listing first to enter the mock checkout flow.</p>
          <div className="button-row">
            <Link className="button" to="/listings">
              Back to listings
            </Link>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="page">
      <section className="checkout-grid">
        <div className="panel section">
          <span className="eyebrow">Checkout</span>
          <h2 className="section-title">Review your order</h2>
          {listing.imageData ? (
            <img className="checkout-image" src={listing.imageData} alt={listing.title} />
          ) : (
            <div className="listing-image listing-image-placeholder checkout-image">No photo uploaded</div>
          )}
          <div className="checkout-summary">
            <div>
              <h3>{listing.title}</h3>
              <p className="muted">{listing.description}</p>
            </div>
            <div className="checkout-line">
              <span>Item price</span>
              <strong>{formatPrice(listing.price)}</strong>
            </div>
            <div className="checkout-line">
              <span>Pickup area</span>
              <strong>{[listing.school, listing.region, listing.area].filter(Boolean).join(' • ') || listing.location}</strong>
            </div>
            <div className="checkout-line">
              <span>Seller</span>
              <strong>{listing.seller?.username || 'Unknown seller'}</strong>
            </div>
            <div className="checkout-line total">
              <span>Total</span>
              <strong>{formatPrice(listing.price)}</strong>
            </div>
          </div>
        </div>

        <div className="panel section">
          <span className="eyebrow">Mock payment</span>
          <h2 className="section-title">Complete a sample sale</h2>
          {saleComplete ? (
            <>
              <div className="status success">
                Mock sale completed for {currentUser ? currentUser.username : 'guest buyer'}.
              </div>
              <p className="muted">
                This is a demo checkout only. No real payment was processed and the listing was not removed.
              </p>
              <div className="button-row">
                <button className="button" type="button" onClick={() => history.push('/listings')}>
                  Return to listings
                </button>
                <button className="button-secondary" type="button" onClick={() => history.push('/profile')}>
                  View profile
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="form-grid">
                <div className="field">
                  <label>Buyer</label>
                  <input value={currentUser ? currentUser.username : 'Guest checkout'} readOnly />
                </div>
                <div className="field">
                  <label>Delivery method</label>
                  <input value="Campus meetup" readOnly />
                </div>
                <div className="field">
                  <label>Payment</label>
                  <input value="Mock card ending in 4242" readOnly />
                </div>
              </div>
              <p className="muted">
                Use the sale button below to simulate a checkout confirmation screen.
              </p>
              <div className="button-row">
                <button className="button" type="button" onClick={handleSale}>
                  Confirm sale
                </button>
                <Link className="button-secondary" to="/listings">
                  Cancel
                </Link>
              </div>
            </>
          )}
        </div>
      </section>
    </main>
  );
}

export default Checkout;
