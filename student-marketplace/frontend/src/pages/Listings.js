import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import ListingCard from '../components/ListingCard';
import { createListing, fetchListings } from '../utils';

const initialForm = { title: '', description: '', price: '', category: 'General', location: '', school: '', region: '', area: '', imageData: '' };

function Listings({ currentUser }) {
  const [listings,     setListings]     = useState([]);
  const [filters,      setFilters]      = useState({ q: '', location: '', category: '', school: '', region: '', area: '' });
  const [form,         setForm]         = useState(initialForm);
  const [loading,      setLoading]      = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error,        setError]        = useState('');
  const [formError,    setFormError]    = useState('');
  const [formSuccess,  setFormSuccess]  = useState('');

  useEffect(() => {
    if (!currentUser) { setForm(initialForm); return; }
    setForm((c) => ({
      ...c,
      school: c.school || currentUser.school || '',
      region: c.region || currentUser.region || '',
      area:   c.area   || currentUser.area   || '',
    }));
  }, [currentUser]);

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError('');
    fetchListings(filters)
      .then((data) => { if (active) setListings(data); })
      .catch(() => { if (active) setError('Could not load listings. Make sure the backend is running on port 5001.'); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [filters]);

  const countLabel = useMemo(() =>
    loading ? 'Loading…' : `${listings.length} listing${listings.length === 1 ? '' : 's'}`,
  [listings.length, loading]);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!currentUser) return;
    setFormError('');
    setFormSuccess('');
    setIsSubmitting(true);
    try {
      await createListing({ ...form, price: Number(form.price), sellerId: currentUser.id });
      setForm({ ...initialForm, school: currentUser.school || '', region: currentUser.region || '', area: currentUser.area || '' });
      setFormSuccess('Listing published.');
      const data = await fetchListings(filters);
      setListings(data);
    } catch (err) {
      setFormError(err.response?.data?.message || 'Could not publish listing.');
    } finally {
      setIsSubmitting(false);
    }
  }

  function handleImage(e) {
    const file = e.target.files?.[0];
    if (!file) { setForm((c) => ({ ...c, imageData: '' })); return; }
    const reader = new FileReader();
    reader.onload = () => setForm((c) => ({ ...c, imageData: String(reader.result || '') }));
    reader.readAsDataURL(file);
  }

  return (
    <main className="page-wrap">

      {/* Browse */}
      <section className="panel">
        <div className="panel-body">
          <div className="listings-header">
            <span className="eyebrow">Campus Cycle</span>
            <h1 className="h1" style={{ marginBottom: 8 }}>Browse listings</h1>
            <p className="body-lg" style={{ marginBottom: 0 }}>
              Student goods, all in one place. Filter by what you need, where you are.
            </p>
          </div>

          <div className="toolbar" style={{ marginBottom: 8 }}>
            <div className="field">
              <label htmlFor="q">Search</label>
              <input id="q" value={filters.q} onChange={(e) => setFilters((c) => ({ ...c, q: e.target.value }))} placeholder="fridge, lamp, textbook…" />
            </div>
            <div className="field">
              <label htmlFor="f-cat">Category</label>
              <select id="f-cat" value={filters.category} onChange={(e) => setFilters((c) => ({ ...c, category: e.target.value }))}>
                <option value="">All categories</option>
                <option>Appliances</option>
                <option>Furniture</option>
                <option>Clothing</option>
                <option>Books</option>
                <option>Electronics</option>
                <option>Dorm Goods</option>
                <option>Bikes</option>
                <option>Kitchen</option>
                <option>General</option>
              </select>
            </div>
            <div className="field">
              <label htmlFor="f-school">School</label>
              <input id="f-school" value={filters.school} onChange={(e) => setFilters((c) => ({ ...c, school: e.target.value }))} placeholder="Harvard University" />
            </div>
            <div className="field">
              <label htmlFor="f-region">Region</label>
              <input id="f-region" value={filters.region} onChange={(e) => setFilters((c) => ({ ...c, region: e.target.value }))} placeholder="Greater Boston" />
            </div>
            <div className="field">
              <label htmlFor="f-area">Area</label>
              <input id="f-area" value={filters.area} onChange={(e) => setFilters((c) => ({ ...c, area: e.target.value }))} placeholder="Harvard Square" />
            </div>
            <div className="field" style={{ justifyContent: 'flex-end' }}>
              <label style={{ visibility: 'hidden' }}>Reset</label>
              <button className="btn btn-ghost btn-sm" type="button" onClick={() => setFilters({ q: '', location: '', category: '', school: '', region: '', area: '' })}>
                Clear filters
              </button>
            </div>
          </div>

          <p className="small" style={{ marginBottom: 20 }}>{countLabel}</p>

          {error ? <p className="status status-error" style={{ marginBottom: 16 }}>{error}</p> : null}

          <div className="cards-grid">
            {!loading && listings.length === 0 ? (
              <div className="empty-state" style={{ gridColumn: '1 / -1' }}>
                No listings match these filters.{' '}
                <button className="btn-ghost" style={{ border: 'none', background: 'none', cursor: 'pointer', color: 'var(--green-text)', fontWeight: 600 }} onClick={() => setFilters({ q: '', location: '', category: '', school: '', region: '', area: '' })}>
                  Clear and try again.
                </button>
              </div>
            ) : null}
            {listings.map((l) => <ListingCard key={l.id} listing={l} />)}
          </div>
        </div>
      </section>

      {/* Post */}
      <section className="panel">
        <div className="panel-body">
          <span className="eyebrow">Sell something</span>
          <h2 className="h2" style={{ marginBottom: 8 }}>Post a listing</h2>

          {!currentUser ? (
            <div className="status status-notice" style={{ marginBottom: 24 }}>
              <Link to="/auth" style={{ color: 'var(--green-text)', fontWeight: 600 }}>Sign in with your .edu email</Link> to publish a listing.
            </div>
          ) : (
            <div className="status status-success" style={{ marginBottom: 24 }}>
              Signed in as <strong>{currentUser.username}</strong>. Your listing will go live immediately.
            </div>
          )}

          <form className="form-grid" onSubmit={handleSubmit}>
            <div className="field">
              <label htmlFor="f-title">Title</label>
              <input id="f-title" value={form.title} onChange={(e) => setForm((c) => ({ ...c, title: e.target.value }))} placeholder="e.g. Mini fridge, barely used" required />
            </div>
            <div className="field">
              <label htmlFor="f-desc">Description</label>
              <textarea id="f-desc" value={form.description} onChange={(e) => setForm((c) => ({ ...c, description: e.target.value }))} placeholder="Condition, dimensions, anything relevant…" required />
            </div>
            <div className="toolbar">
              <div className="field">
                <label htmlFor="f-price">Price ($)</label>
                <input id="f-price" type="number" min="0" step="0.01" value={form.price} onChange={(e) => setForm((c) => ({ ...c, price: e.target.value }))} placeholder="0.00" required />
              </div>
              <div className="field">
                <label htmlFor="f-cat2">Category</label>
                <select id="f-cat2" value={form.category} onChange={(e) => setForm((c) => ({ ...c, category: e.target.value }))}>
                  <option>General</option>
                  <option>Appliances</option>
                  <option>Furniture</option>
                  <option>Clothing</option>
                  <option>Books</option>
                  <option>Electronics</option>
                  <option>Dorm Goods</option>
                  <option>Bikes</option>
                  <option>Kitchen</option>
                </select>
              </div>
              <div className="field">
                <label htmlFor="f-loc">Pickup location</label>
                <input id="f-loc" value={form.location} onChange={(e) => setForm((c) => ({ ...c, location: e.target.value }))} placeholder="Building or area" required />
              </div>
              <div className="field">
                <label htmlFor="f-school2">School</label>
                <input id="f-school2" value={form.school} onChange={(e) => setForm((c) => ({ ...c, school: e.target.value }))} placeholder="Harvard University" />
              </div>
              <div className="field">
                <label htmlFor="f-region2">Region</label>
                <input id="f-region2" value={form.region} onChange={(e) => setForm((c) => ({ ...c, region: e.target.value }))} placeholder="Greater Boston" />
              </div>
              <div className="field">
                <label htmlFor="f-area2">Area</label>
                <input id="f-area2" value={form.area} onChange={(e) => setForm((c) => ({ ...c, area: e.target.value }))} placeholder="Harvard Square" />
              </div>
              <div className="field">
                <label htmlFor="f-photo">Photo</label>
                <input id="f-photo" type="file" accept="image/*" onChange={handleImage} />
              </div>
            </div>

            {form.imageData ? <img className="listing-preview-img" src={form.imageData} alt="Preview" /> : null}

            {formError   ? <p className="status status-error">{formError}</p>     : null}
            {formSuccess ? <p className="status status-success">{formSuccess}</p> : null}

            <div className="btn-row">
              {currentUser ? (
                <button className="btn btn-green" type="submit" disabled={isSubmitting}>
                  {isSubmitting ? 'Publishing…' : 'Publish listing'}
                </button>
              ) : (
                <Link className="btn" to="/auth">Sign in to publish</Link>
              )}
            </div>
          </form>
        </div>
      </section>

    </main>
  );
}

export default Listings;
