import React from 'react';
import { Link } from 'react-router-dom';
import { formatPrice } from '../utils';

function ListingCard({ listing }) {
  return (
    <article className="listing-card">
      {listing.imageData ? (
        <img className="listing-image" src={listing.imageData} alt={listing.title} />
      ) : (
        <div className="listing-image listing-image-placeholder">No photo uploaded</div>
      )}
      <div className="listing-meta">
        <span className="tag">{listing.category}</span>
        <span className="price-pill">{formatPrice(listing.price)}</span>
      </div>
      <h3>{listing.title}</h3>
      <p className="muted">{listing.description}</p>
      <div className="listing-meta">
        <span>{listing.location}</span>
        <span>{listing.seller ? listing.seller.username : 'Unknown seller'}</span>
      </div>
      <p className="muted listing-region">
        {[listing.school, listing.region, listing.area].filter(Boolean).join(' • ')}
      </p>
      <div className="button-row listing-actions">
        <Link
          className="button"
          to={{
            pathname: '/checkout',
            state: { listing },
          }}
        >
          Buy now
        </Link>
      </div>
    </article>
  );
}

export default ListingCard;
