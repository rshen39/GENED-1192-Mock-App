import React, { useMemo, useState } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { formatPrice } from '../utils';

function Checkout({ currentUser }) {
  const history = useHistory();
  const location = useLocation();
  const [saleComplete, setSaleComplete] = useState(false);

  const listing = useMemo(() => location.state?.listing || null, [location.state]);

  if (!listing) {
    return (
      <main className="page">
        <section className="panel section">
          <span className="eyebrow">Checkout</span>
          <h2 className="section-title">No item selected</h2>
          <p className="muted" style={{ marginBottom: 24 }}>
            Choose a listing first to enter the mock checkout flow.
          </p>
          <div className="button-row">
            <Link className="button" to="/listings">Back to listings</Link>
          </div>
        </section>
      </main>
    );
  }

  const pickupLabel = [listing.school, listing.region, listing.area].filter(Boolean).join(' · ') || listing.location;

  return (
    <main className="page">
      <div className="checkout-grid">

        {/* Order review */}
        <div className="panel section">
          <span className="eyebrow">Order review</span>
          <h2 className="section-title" style={{ marginBottom: 20 }}>Your item</h2>

          {listing.imageData ? (
            <img className="checkout-image" src={listing.imageData} alt={listing.title} />
          ) : (
            <div
              className="checkout-image"
              style={{
                background: 'var(--off-white)',
                display: 'grid',
                placeItems: 'center',
                color: 'var(--text-secondary)',
                fontSize: '0.9rem',
                borderRadius: 'var(--radius-lg)',
                marginBottom: 20,
                height: 200,
              }}
            >
              No photo uploaded
            </div>
          )}

          <div className="checkout-summary">
            <div style={{ paddingBottom: 14 }}>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 700, letterSpacing: '-0.03em', marginBottom: 6 }}>
                {listing.title}
              </h3>
              <p className="muted" style={{ fontSize: '0.95rem', lineHeight: 1.6 }}>{listing.description}</p>
            </div>
            <div className="checkout-line">
              <span>Item price</span>
              <strong>{formatPrice(listing.price)}</strong>
            </div>
            <div className="checkout-line">
              <span>Pickup area</span>
              <strong>{pickupLabel}</strong>
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

        {/* Payment */}
        <div className="panel section">
          <span className="eyebrow">Mock payment</span>
          <h2 className="section-title" style={{ marginBottom: 20 }}>Complete sale</h2>

          {saleComplete ? (
            <>
              <div className="status success" style={{ marginBottom: 16 }}>
                ✓ Mock sale completed for <strong>{currentUser ? currentUser.username : 'guest buyer'}</strong>.
              </div>
              <p className="muted" style={{ fontSize: '0.92rem', lineHeight: 1.65, marginBottom: 24 }}>
                This is a demo checkout only. No real payment was processed and the listing was not removed.
                In production, this would connect to a secure payment processor.
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
              <div className="form-grid" style={{ marginBottom: 20 }}>
                <div className="field">
                  <label>Buyer</label>
                  <input value={currentUser ? currentUser.username : 'Guest checkout'} readOnly />
                </div>
                <div className="field">
                  <label>Delivery method</label>
                  <input value="Campus meetup" readOnly />
                </div>
                <div className="field">
                  <label>Payment (demo only)</label>
                  <input value="Mock card ending in 4242" readOnly />
                </div>
              </div>
              <div
                className="status notice"
                style={{ marginBottom: 20, fontSize: '0.88rem' }}
              >
                This is a demo checkout — no real payment will be charged.
              </div>
              <div className="button-row">
                <button className="button" type="button" onClick={() => setSaleComplete(true)}>
                  Confirm sale
                </button>
                <Link className="button-secondary" to="/listings">Cancel</Link>
              </div>
            </>
          )}
        </div>

      </div>
    </main>
  );
}

export default Checkout;
