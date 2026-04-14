import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import ListingCard from '../components/ListingCard';
import { createListing, fetchListings } from '../utils';

const initialForm = {
  title: '',
  description: '',
  price: '',
  category: 'General',
  location: '',
  school: '',
  region: '',
  area: '',
  imageData: '',
};

function Listings({ currentUser }) {
  const [listings, setListings] = useState([]);
  const [filters, setFilters] = useState({ q: '', location: '', category: '', school: '', region: '', area: '' });
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [status, setStatus] = useState('');

  useEffect(() => {
    if (!currentUser) {
      setForm(initialForm);
      return;
    }

    setForm((current) => ({
      ...current,
      school: current.school || currentUser.school || '',
      region: current.region || currentUser.region || '',
      area: current.area || currentUser.area || '',
    }));
  }, [currentUser]);

  useEffect(() => {
    let active = true;

    async function loadListings() {
      setLoading(true);
      setError('');
      try {
        const data = await fetchListings(filters);
        if (active) {
          setListings(data);
        }
      } catch (err) {
        if (active) {
          setError('Unable to load listings. Start the backend on port 5001.');
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    loadListings();
    return () => {
      active = false;
    };
  }, [filters]);

  const listingCountLabel = useMemo(() => {
    if (loading) {
      return 'Loading listings...';
    }
    return `${listings.length} listing${listings.length === 1 ? '' : 's'} found`;
  }, [listings.length, loading]);

  async function handleSubmit(event) {
    event.preventDefault();
    setStatus('');
    setError('');

    if (!currentUser) {
      return;
    }

    setIsSubmitting(true);
    try {
      await createListing({
        ...form,
        price: Number(form.price),
        sellerId: currentUser.id,
      });
      setForm({
        ...initialForm,
        school: currentUser.school || '',
        region: currentUser.region || '',
        area: currentUser.area || '',
      });
      setStatus('Listing created.');
      const data = await fetchListings(filters);
      setListings(data);
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to create listing. Check the form and backend status.');
    } finally {
      setIsSubmitting(false);
    }
  }

  function handleImageUpload(event) {
    const file = event.target.files?.[0];

    if (!file) {
      setForm((current) => ({ ...current, imageData: '' }));
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setForm((current) => ({ ...current, imageData: String(reader.result || '') }));
    };
    reader.readAsDataURL(file);
  }

  return (
    <main className="page">
      <section className="panel section">
        <span className="eyebrow">Marketplace feed</span>
        <h2 className="section-title">Listings</h2>
        <p className="muted">{listingCountLabel}</p>
        <div className="toolbar">
          <div className="field">
            <label htmlFor="search">Search</label>
            <input
              id="search"
              value={filters.q}
              onChange={(event) => setFilters((current) => ({ ...current, q: event.target.value }))}
              placeholder="fridge, lamp, textbook"
            />
          </div>
          <div className="field">
            <label htmlFor="location">Location</label>
            <input
              id="location"
              value={filters.location}
              onChange={(event) => setFilters((current) => ({ ...current, location: event.target.value }))}
              placeholder="Cambridge"
            />
          </div>
          <div className="field">
            <label htmlFor="category">Category</label>
            <select
              id="category"
              value={filters.category}
              onChange={(event) => setFilters((current) => ({ ...current, category: event.target.value }))}
            >
              <option value="">All categories</option>
              <option value="Appliances">Appliances</option>
              <option value="Furniture">Furniture</option>
              <option value="General">General</option>
            </select>
          </div>
          <div className="field">
            <label htmlFor="school">School</label>
            <input
              id="school"
              value={filters.school}
              onChange={(event) => setFilters((current) => ({ ...current, school: event.target.value }))}
              placeholder="Harvard University"
            />
          </div>
          <div className="field">
            <label htmlFor="region">Region</label>
            <input
              id="region"
              value={filters.region}
              onChange={(event) => setFilters((current) => ({ ...current, region: event.target.value }))}
              placeholder="Greater Boston"
            />
          </div>
          <div className="field">
            <label htmlFor="area">General area</label>
            <input
              id="area"
              value={filters.area}
              onChange={(event) => setFilters((current) => ({ ...current, area: event.target.value }))}
              placeholder="Harvard Square"
            />
          </div>
          <div className="button-row">
            <button
              className="button-secondary"
              type="button"
              onClick={() => setFilters({ q: '', location: '', category: '', school: '', region: '', area: '' })}
            >
              Reset filters
            </button>
          </div>
        </div>

        {error ? <div className="status error">{error}</div> : null}
        {status ? <div className="status success">{status}</div> : null}

        <div className="cards" style={{ marginTop: 20 }}>
          {!loading && listings.length === 0 ? (
            <div className="empty-state">No listings match the current filters.</div>
          ) : null}
          {listings.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      </section>

      <section className="panel section">
        <span className="eyebrow">Create listing</span>
        <h2 className="section-title">Post something for sale</h2>
        {!currentUser ? (
          <div className="status notice">
            You need to sign in before publishing a listing. <Link to="/auth">Create an account or log in here.</Link>
          </div>
        ) : (
          <div className="status success">
            Signed in as {currentUser.username}. Your listing will publish to your profile.
          </div>
        )}
        <form className="form-grid" onSubmit={handleSubmit}>
          <div className="field">
            <label htmlFor="title">Title</label>
            <input
              id="title"
              value={form.title}
              onChange={(event) => setForm((current) => ({ ...current, title: event.target.value }))}
              required
            />
          </div>
          <div className="field">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              value={form.description}
              onChange={(event) => setForm((current) => ({ ...current, description: event.target.value }))}
              required
            />
          </div>
          <div className="toolbar">
            <div className="field">
              <label htmlFor="price">Price</label>
              <input
                id="price"
                type="number"
                min="0"
                step="0.01"
                value={form.price}
                onChange={(event) => setForm((current) => ({ ...current, price: event.target.value }))}
                required
              />
            </div>
            <div className="field">
              <label htmlFor="form-category">Category</label>
              <select
                id="form-category"
                value={form.category}
                onChange={(event) => setForm((current) => ({ ...current, category: event.target.value }))}
              >
                <option value="General">General</option>
                <option value="Appliances">Appliances</option>
                <option value="Furniture">Furniture</option>
              </select>
            </div>
            <div className="field">
              <label htmlFor="form-location">Location</label>
              <input
                id="form-location"
                value={form.location}
                onChange={(event) => setForm((current) => ({ ...current, location: event.target.value }))}
                required
              />
            </div>
            <div className="field">
              <label htmlFor="form-school">School</label>
              <input
                id="form-school"
                value={form.school}
                onChange={(event) => setForm((current) => ({ ...current, school: event.target.value }))}
                placeholder="Your school"
              />
            </div>
            <div className="field">
              <label htmlFor="form-region">Region</label>
              <input
                id="form-region"
                value={form.region}
                onChange={(event) => setForm((current) => ({ ...current, region: event.target.value }))}
                placeholder="Your region"
              />
            </div>
            <div className="field">
              <label htmlFor="form-area">General area</label>
              <input
                id="form-area"
                value={form.area}
                onChange={(event) => setForm((current) => ({ ...current, area: event.target.value }))}
                placeholder="Neighborhood or square"
              />
            </div>
            <div className="field">
              <label htmlFor="form-image">Photo</label>
              <input id="form-image" type="file" accept="image/*" onChange={handleImageUpload} />
            </div>
          </div>
          {form.imageData ? <img className="listing-preview" src={form.imageData} alt="Listing preview" /> : null}
          <div className="button-row">
            {currentUser ? (
              <button className="button" type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Publishing...' : 'Publish listing'}
              </button>
            ) : (
              <Link className="button" to="/auth">
                Sign in to publish
              </Link>
            )}
          </div>
        </form>
      </section>
    </main>
  );
}

export default Listings;
