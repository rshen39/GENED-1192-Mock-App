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
    if (!currentUser) { setForm(initialForm); return; }
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
        if (active) setListings(data);
      } catch {
        if (active) setError('Unable to load listings. Start the backend on port 5001.');
      } finally {
        if (active) setLoading(false);
      }
    }
    loadListings();
    return () => { active = false; };
  }, [filters]);

  const listingCountLabel = useMemo(() => {
    if (loading) return 'Loading...';
    return `${listings.length} listing${listings.length === 1 ? '' : 's'} found`;
  }, [listings.length, loading]);

  async function handleSubmit(event) {
    event.preventDefault();
    setStatus('');
    setError('');
    if (!currentUser) return;
    setIsSubmitting(true);
    try {
      await createListing({ ...form, price: Number(form.price), sellerId: currentUser.id });
      setForm({ ...initialForm, school: currentUser.school || '', region: currentUser.region || '', area: currentUser.area || '' });
      setStatus('Listing published successfully.');
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
    if (!file) { setForm((c) => ({ ...c, imageData: '' })); return; }
    const reader = new FileReader();
    reader.onload = () => setForm((c) => ({ ...c, imageData: String(reader.result || '') }));
    reader.readAsDataURL(file);
  }

  return (
    <main className="page">

      {/* Browse section */}
      <section className="panel section">
        <div className="listings-hero">
          <span className="eyebrow">Marketplace</span>
          <h2 className="section-title">Senior Sales & Campus Goods</h2>
          <p className="lede" style={{ marginBottom: 0 }}>
            Browse items from graduating students near you — appliances, furniture, food, and more.
          </p>
        </div>

        <div className="toolbar" style={{ marginBottom: 8 }}>
          <div className="field">
            <label htmlFor="search">Search</label>
            <input
              id="search"
              value={filters.q}
              onChange={(e) => setFilters((c) => ({ ...c, q: e.target.value }))}
              placeholder="fridge, lamp, textbook…"
            />
          </div>
          <div className="field">
            <label htmlFor="location">Location</label>
            <input
              id="location"
              value={filters.location}
              onChange={(e) => setFilters((c) => ({ ...c, location: e.target.value }))}
              placeholder="Cambridge"
            />
          </div>
          <div className="field">
            <label htmlFor="category">Category</label>
            <select
              id="category"
              value={filters.category}
              onChange={(e) => setFilters((c) => ({ ...c, category: e.target.value }))}
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
              onChange={(e) => setFilters((c) => ({ ...c, school: e.target.value }))}
              placeholder="Harvard University"
            />
          </div>
          <div className="field">
            <label htmlFor="region">Region</label>
            <input
              id="region"
              value={filters.region}
              onChange={(e) => setFilters((c) => ({ ...c, region: e.target.value }))}
              placeholder="Greater Boston"
            />
          </div>
          <div className="field">
            <label htmlFor="area">Area</label>
            <input
              id="area"
              value={filters.area}
              onChange={(e) => setFilters((c) => ({ ...c, area: e.target.value }))}
              placeholder="Harvard Square"
            />
          </div>
          <div className="button-row" style={{ paddingTop: 8 }}>
            <button
              className="button-secondary"
              type="button"
              onClick={() => setFilters({ q: '', location: '', category: '', school: '', region: '', area: '' })}
            >
              Reset filters
            </button>
          </div>
        </div>

        <p className="muted" style={{ fontSize: '0.88rem', marginBottom: 16 }}>{listingCountLabel}</p>

        {error ? <div className="status error">{error}</div> : null}
        {status ? <div className="status success">{status}</div> : null}

        <div className="cards">
          {!loading && listings.length === 0 ? (
            <div className="empty-state">No listings match the current filters. Try broadening your search.</div>
          ) : null}
          {listings.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      </section>

      {/* Post a listing section */}
      <section className="panel section">
        <span className="eyebrow">Sell something</span>
        <h2 className="section-title">Post a listing</h2>

        {!currentUser ? (
          <div className="status notice" style={{ marginBottom: 20 }}>
            You need to sign in before publishing a listing.{' '}
            <Link to="/auth" style={{ color: 'var(--green)', fontWeight: 600 }}>Create an account or log in →</Link>
          </div>
        ) : (
          <div className="status success" style={{ marginBottom: 20 }}>
            Signed in as <strong>{currentUser.username}</strong>. Your listing will appear in the marketplace.
          </div>
        )}

        <form className="form-grid" onSubmit={handleSubmit}>
          <div className="field">
            <label htmlFor="title">Title</label>
            <input
              id="title"
              value={form.title}
              onChange={(e) => setForm((c) => ({ ...c, title: e.target.value }))}
              placeholder="e.g. Mini fridge, barely used"
              required
            />
          </div>
          <div className="field">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              value={form.description}
              onChange={(e) => setForm((c) => ({ ...c, description: e.target.value }))}
              placeholder="Describe condition, size, any relevant details…"
              required
            />
          </div>
          <div className="toolbar">
            <div className="field">
              <label htmlFor="price">Price ($)</label>
              <input
                id="price"
                type="number"
                min="0"
                step="0.01"
                value={form.price}
                onChange={(e) => setForm((c) => ({ ...c, price: e.target.value }))}
                placeholder="0.00"
                required
              />
            </div>
            <div className="field">
              <label htmlFor="form-category">Category</label>
              <select
                id="form-category"
                value={form.category}
                onChange={(e) => setForm((c) => ({ ...c, category: e.target.value }))}
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
                onChange={(e) => setForm((c) => ({ ...c, location: e.target.value }))}
                placeholder="Pickup location"
                required
              />
            </div>
            <div className="field">
              <label htmlFor="form-school">School</label>
              <input
                id="form-school"
                value={form.school}
                onChange={(e) => setForm((c) => ({ ...c, school: e.target.value }))}
                placeholder="Your school"
              />
            </div>
            <div className="field">
              <label htmlFor="form-region">Region</label>
              <input
                id="form-region"
                value={form.region}
                onChange={(e) => setForm((c) => ({ ...c, region: e.target.value }))}
                placeholder="e.g. Greater Boston"
              />
            </div>
            <div className="field">
              <label htmlFor="form-area">Area</label>
              <input
                id="form-area"
                value={form.area}
                onChange={(e) => setForm((c) => ({ ...c, area: e.target.value }))}
                placeholder="Neighborhood or square"
              />
            </div>
            <div className="field">
              <label htmlFor="form-image">Photo</label>
              <input id="form-image" type="file" accept="image/*" onChange={handleImageUpload} />
            </div>
          </div>

          {form.imageData ? (
            <img className="listing-preview" src={form.imageData} alt="Listing preview" />
          ) : null}

          <div className="button-row">
            {currentUser ? (
              <button className="button" type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Publishing…' : 'Publish listing'}
              </button>
            ) : (
              <Link className="button" to="/auth">Sign in to publish</Link>
            )}
          </div>
        </form>
      </section>

    </main>
  );
}

export default Listings;
