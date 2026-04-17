import React from 'react';
import { Link } from 'react-router-dom';
import { formatPrice } from '../utils';

function ListingCard({ listing }) {
  const regionParts = [listing.school, listing.region, listing.area].filter(Boolean);

  return (
    <article className="listing-card">
      <div className="listing-image-wrap">
        {listing.imageData ? (
          <img className="listing-image" src={listing.imageData} alt={listing.title} />
        ) : (
          <div className="listing-image-placeholder">No photo</div>
        )}
        <span className="tag listing-cat-badge">{listing.category}</span>
      </div>

      <div className="listing-body">
        <div className="listing-top">
          <h3>{listing.title}</h3>
          <span className="price-pill">{formatPrice(listing.price)}</span>
        </div>

        <p className="listing-desc">{listing.description}</p>

        <div className="listing-meta-row">
          <span className="listing-location">
            <span aria-hidden="true">📍</span>
            {listing.location}
          </span>
          <span>{listing.seller ? listing.seller.username : 'Anonymous'}</span>
        </div>

        {regionParts.length > 0 && (
          <div className="listing-region-tags">
            {regionParts.map((part) => (
              <span key={part} className="tag">{part}</span>
            ))}
          </div>
        )}

        <div className="listing-actions">
          <Link
            className="button"
            style={{ width: '100%' }}
            to={{ pathname: '/checkout', state: { listing } }}
          >
            Buy now
          </Link>
        </div>
      </div>
    </article>
  );
}

export default ListingCard;
