import React from 'react';
import { Link } from 'react-router-dom';
import { formatPrice } from '../utils';

function ListingCard({ listing }) {
  const regionParts = [listing.school, listing.region, listing.area].filter(Boolean);

  return (
    <article className="listing-card">
      <div className="card-img-wrap">
        {listing.imageData ? (
          <img className="card-img" src={listing.imageData} alt={listing.title} />
        ) : (
          <div className="card-img-placeholder">No photo</div>
        )}
        <span className="tag card-cat-tag">{listing.category}</span>
      </div>

      <div className="card-body">
        <div className="card-top">
          <h3 className="card-title">{listing.title}</h3>
          <span className="price-badge">{formatPrice(listing.price)}</span>
        </div>

        <p className="card-desc">{listing.description}</p>

        <div className="card-meta">
          <span>📍 {listing.location}</span>
          <span>{listing.seller?.username || 'Anonymous'}</span>
        </div>

        {regionParts.length > 0 && (
          <div className="card-tags">
            {regionParts.map((p) => <span key={p} className="tag">{p}</span>)}
          </div>
        )}

        <div className="card-action">
          <Link
            className="btn btn-sm btn-ghost"
            style={{ width: '100%', justifyContent: 'center' }}
            to={{ pathname: '/checkout', state: { listing } }}
          >
            View item →
          </Link>
        </div>
      </div>
    </article>
  );
}

export default ListingCard;
