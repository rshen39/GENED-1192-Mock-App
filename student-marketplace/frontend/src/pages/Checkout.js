import React, { useMemo, useState } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { formatPrice } from '../utils';

function Checkout({ currentUser }) {
  const history  = useHistory();
  const location = useLocation();
  const [done, setDone] = useState(false);
  const listing = useMemo(() => location.state?.listing || null, [location.state]);

  if (!listing) {
    return (
      <main className="page-wrap">
        <div className="panel panel-body" style={{ textAlign: 'center', padding: '80px 40px' }}>
          <p className="muted" style={{ marginBottom: 24 }}>Select a listing first to enter checkout.</p>
          <Link className="btn btn-ghost" to="/listings">Back to listings</Link>
        </div>
      </main>
    );
  }

  const pickupLabel = [listing.school, listing.region, listing.area].filter(Boolean).join(' · ') || listing.location;

  return (
    <main className="page-wrap">
      <div className="checkout-grid">
        <div className="panel panel-body">
          <span className="eyebrow">Review order</span>
          <h2 className="h2" style={{ marginBottom: 24 }}>Your item</h2>

          {listing.imageData
            ? <img className="checkout-img" src={listing.imageData} alt={listing.title} />
            : <div style={{ height: 200, background: 'var(--bg-alt)', borderRadius: 'var(--radius-lg)', marginBottom: 24, display: 'grid', placeItems: 'center', color: 'var(--text-3)', fontSize: '0.88rem' }}>No photo</div>
          }

          <h3 style={{ fontSize: '1.3rem', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: 6 }}>{listing.title}</h3>
          <p className="muted" style={{ fontSize: '0.9rem', lineHeight: 1.6, marginBottom: 20 }}>{listing.description}</p>

          <div className="checkout-lines">
            <div className="checkout-line"><span>Price</span><strong>{formatPrice(listing.price)}</strong></div>
            <div className="checkout-line"><span>Pickup</span><strong>{pickupLabel}</strong></div>
            <div className="checkout-line"><span>Seller</span><strong>{listing.seller?.username || 'Unknown'}</strong></div>
            <div className="checkout-line total"><span>Total</span><strong>{formatPrice(listing.price)}</strong></div>
          </div>
        </div>

        <div className="panel panel-body">
          <span className="eyebrow">Demo checkout</span>
          <h2 className="h2" style={{ marginBottom: 20 }}>Complete sale</h2>

          {done ? (
            <>
              <div className="status status-success" style={{ marginBottom: 16 }}>
                ✓ Mock sale confirmed for <strong>{currentUser?.username || 'guest'}</strong>.
              </div>
              <p className="muted" style={{ fontSize: '0.9rem', lineHeight: 1.65, marginBottom: 28 }}>
                This is a demonstration only. No real payment was charged and the listing was not removed.
              </p>
              <div className="btn-row">
                <button className="btn" onClick={() => history.push('/listings')}>Back to listings</button>
                <button className="btn btn-ghost" onClick={() => history.push('/profile')}>View profile</button>
              </div>
            </>
          ) : (
            <>
              <div className="form-grid" style={{ marginBottom: 20 }}>
                <div className="field"><label>Buyer</label><input value={currentUser?.username || 'Guest'} readOnly /></div>
                <div className="field"><label>Delivery</label><input value="Campus meetup" readOnly /></div>
                <div className="field"><label>Payment (demo)</label><input value="Card ending in 4242" readOnly /></div>
              </div>
              <div className="status status-notice" style={{ marginBottom: 20, fontSize: '0.86rem' }}>
                Demo only — no real payment will be processed.
              </div>
              <div className="btn-row">
                <button className="btn btn-green" onClick={() => setDone(true)}>Confirm sale</button>
                <Link className="btn btn-ghost" to="/listings">Cancel</Link>
              </div>
            </>
          )}
        </div>
      </div>
    </main>
  );
}

export default Checkout;
