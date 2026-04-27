import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import ListingCard from '../components/ListingCard';
import { createListing, fetchListings } from '../utils';

const initialForm = {
  title: '', description: '', price: '', category: 'General',
  location: '', school: '', region: '', area: '', imageData: '',
};

const CAT_PILLS = [
  { label: 'All',         icon: '✦', value: '' },
  { label: 'Appliances',  icon: '🔌', value: 'Appliances' },
  { label: 'Furniture',   icon: '🛋️', value: 'Furniture' },
  { label: 'Clothing',    icon: '👕', value: 'Clothing' },
  { label: 'Books',       icon: '📚', value: 'Books' },
  { label: 'Electronics', icon: '🖥️', value: 'Electronics' },
  { label: 'Dorm Goods',  icon: '🏠', value: 'Dorm Goods' },
  { label: 'Bikes',       icon: '🚲', value: 'Bikes' },
  { label: 'Kitchen',     icon: '🍳', value: 'Kitchen' },
  { label: 'General',     icon: '📦', value: 'General' },
];

function Listings({ currentUser }) {
  const [listings,     setListings]     = useState([]);
  const [filters,      setFilters]      = useState({ q: '', location: '', category: '', school: '', region: '', area: '' });
  const [form,         setForm]         = useState(initialForm);
  const [loading,      setLoading]      = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error,        setError]        = useState('');
  const [formError,    setFormError]    = useState('');
  const [formSuccess,  setFormSuccess]  = useState('');
  const [showFilters,  setShowFilters]  = useState(false);

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
      setFormSuccess('Listing published — it\'s live now.');
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

  const clearFilters = () => setFilters({ q: '', location: '', category: '', school: '', region: '', area: '' });
  const hasActiveFilters = filters.q || filters.category || filters.school || filters.region || filters.area;

  return (
    <main className="listings-page">

      {/* ── Page header ── */}
      <div className="listings-hero">
        <div className="listings-hero-inner">
          <div className="listings-hero-text">
            <span className="listings-hero-eyebrow">
              <span className="hero-dot" style={{ display: 'inline-block', width: 7, height: 7, borderRadius: '50%', background: 'var(--green)', marginRight: 8, verticalAlign: 'middle', boxShadow: '0 0 6px rgba(82,183,136,0.5)', animation: 'pulse 2.8s ease infinite' }} />
              Harvard Pilot · .edu verified
            </span>
            <h1 className="listings-hero-h1">Browse listings</h1>
            <p className="listings-hero-sub">Student goods. Verified sellers. Same campus.</p>
          </div>
          <div className="listings-hero-stats">
            <div className="listings-hero-stat">
              <strong>0%</strong><span>Commission</span>
            </div>
            <div className="listings-hero-stat">
              <strong>.edu</strong><span>Verified only</span>
            </div>
            <div className="listings-hero-stat">
              <strong>Free</strong><span>Always</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Search + filter bar ── */}
      <div className="listings-filter-bar">
        <div className="listings-filter-inner">
          {/* Search */}
          <div className="listings-search-wrap">
            <span className="listings-search-icon">⌕</span>
            <input
              className="listings-search-input"
              value={filters.q}
              onChange={(e) => setFilters((c) => ({ ...c, q: e.target.value }))}
              placeholder="Search — fridge, lamp, CS50 textbook…"
            />
            {filters.q && (
              <button className="listings-search-clear" onClick={() => setFilters((c) => ({ ...c, q: '' }))}>×</button>
            )}
          </div>

          {/* Filter toggle */}
          <button
            className={`listings-filter-toggle${showFilters ? ' active' : ''}`}
            onClick={() => setShowFilters((v) => !v)}
            type="button"
          >
            <span>⊟</span> Filters {hasActiveFilters ? <span className="filter-dot" /> : null}
          </button>
        </div>

        {/* Expandable secondary filters */}
        {showFilters && (
          <div className="listings-secondary-filters">
            <div className="listings-filter-inner">
              <input
                className="filter-input"
                value={filters.school}
                onChange={(e) => setFilters((c) => ({ ...c, school: e.target.value }))}
                placeholder="School (e.g. Harvard University)"
              />
              <input
                className="filter-input"
                value={filters.region}
                onChange={(e) => setFilters((c) => ({ ...c, region: e.target.value }))}
                placeholder="Region (e.g. Greater Boston)"
              />
              <input
                className="filter-input"
                value={filters.area}
                onChange={(e) => setFilters((c) => ({ ...c, area: e.target.value }))}
                placeholder="Area (e.g. Harvard Square)"
              />
              {hasActiveFilters && (
                <button className="btn btn-sm btn-ghost" type="button" onClick={clearFilters}>
                  Clear all
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* ── Category pills ── */}
      <div className="listings-cats-wrap">
        <div className="listings-cats-inner">
          <div className="listings-cat-pills">
            {CAT_PILLS.map(({ label, icon, value }) => (
              <button
                key={value}
                type="button"
                className={`cat-pill${filters.category === value ? ' cat-pill-active' : ''}`}
                onClick={() => setFilters((c) => ({ ...c, category: value }))}
              >
                <span className="cat-pill-icon">{icon}</span>
                {label}
              </button>
            ))}
          </div>
          <span className="listings-count">{countLabel}</span>
        </div>
      </div>

      {/* ── Listings grid ── */}
      <div className="listings-content">
        <div className="section-wrap">
          {error ? <p className="status status-error" style={{ marginBottom: 24 }}>{error}</p> : null}

          {loading ? (
            <div className="listings-loading">
              {[1,2,3,4,5,6].map(i => <div key={i} className="listing-skeleton" />)}
            </div>
          ) : listings.length === 0 ? (
            <div className="listings-empty">
              <div className="listings-empty-icon">🌿</div>
              <h3>Nothing here yet</h3>
              <p>No listings match these filters. Try a different category or clear your search.</p>
              <button className="btn" type="button" onClick={clearFilters}>Clear filters</button>
            </div>
          ) : (
            <div className="cards-grid">
              {listings.map((l) => <ListingCard key={l.id} listing={l} />)}
            </div>
          )}
        </div>
      </div>

      {/* ── Post listing ── */}
      <div className="post-listing-section">
        <div className="section-wrap">
          <div className="post-listing-card">

            {/* Left — invite */}
            <div className="post-listing-invite">
              <span className="post-listing-leaf" aria-hidden="true">♻️</span>
              <span className="eyebrow" style={{ color: 'rgba(255,255,255,0.55)' }}>List for free</span>
              <h2 className="post-listing-headline">Pass it on.</h2>
              <p className="post-listing-sub">
                List in under a minute. Verified students only. Every dollar goes directly to you — we take nothing.
              </p>
              <ul className="post-listing-perks">
                {[
                  '0% commission, forever',
                  'Verified .edu buyers only',
                  'Campus pickup — no shipping',
                  'Live in seconds',
                ].map(perk => (
                  <li key={perk}>
                    <span className="post-perk-check">✓</span>{perk}
                  </li>
                ))}
              </ul>
            </div>

            {/* Right — form */}
            <div className="post-listing-form-wrap">
              {!currentUser ? (
                <div className="post-listing-signin">
                  <div className="post-signin-icon">🔒</div>
                  <h3>Sign in to post</h3>
                  <p>You need a verified .edu email to list items on Campus Cycle.</p>
                  <Link className="btn btn-lg" to="/auth">Sign in with .edu →</Link>
                </div>
              ) : (
                <>
                  <div className="post-form-header">
                    <span className="post-form-greeting">Posting as <strong>{currentUser.username}</strong></span>
                    <span className="verified-badge">✓ Verified</span>
                  </div>

                  <form className="post-form" onSubmit={handleSubmit}>
                    <div className="field">
                      <label htmlFor="f-title">Item title</label>
                      <input id="f-title" value={form.title}
                        onChange={(e) => setForm((c) => ({ ...c, title: e.target.value }))}
                        placeholder="e.g. Mini fridge, barely used" required />
                    </div>

                    <div className="field">
                      <label htmlFor="f-desc">Description</label>
                      <textarea id="f-desc" value={form.description}
                        onChange={(e) => setForm((c) => ({ ...c, description: e.target.value }))}
                        placeholder="Condition, dimensions, anything a buyer should know…" required />
                    </div>

                    <div className="post-form-row">
                      <div className="field">
                        <label htmlFor="f-price">Price ($)</label>
                        <input id="f-price" type="number" min="0" step="0.01" value={form.price}
                          onChange={(e) => setForm((c) => ({ ...c, price: e.target.value }))}
                          placeholder="0.00" required />
                      </div>
                      <div className="field">
                        <label htmlFor="f-cat2">Category</label>
                        <select id="f-cat2" value={form.category}
                          onChange={(e) => setForm((c) => ({ ...c, category: e.target.value }))}>
                          {['General','Appliances','Furniture','Clothing','Books','Electronics','Dorm Goods','Bikes','Kitchen'].map(c => (
                            <option key={c}>{c}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="post-form-row">
                      <div className="field">
                        <label htmlFor="f-loc">Pickup location</label>
                        <input id="f-loc" value={form.location}
                          onChange={(e) => setForm((c) => ({ ...c, location: e.target.value }))}
                          placeholder="Building or area" required />
                      </div>
                      <div className="field">
                        <label htmlFor="f-school2">School</label>
                        <input id="f-school2" value={form.school}
                          onChange={(e) => setForm((c) => ({ ...c, school: e.target.value }))}
                          placeholder="Harvard University" />
                      </div>
                    </div>

                    <div className="field">
                      <label htmlFor="f-photo">Photo (optional)</label>
                      <input id="f-photo" type="file" accept="image/*" onChange={handleImage} className="file-input" />
                    </div>

                    {form.imageData ? (
                      <img className="listing-preview-img" src={form.imageData} alt="Preview" />
                    ) : null}

                    {formError   ? <p className="status status-error">{formError}</p>   : null}
                    {formSuccess ? <p className="status status-success">{formSuccess}</p> : null}

                    <button className="btn btn-green" type="submit" disabled={isSubmitting}
                      style={{ width: '100%', height: 52, fontSize: '1rem', letterSpacing: '-0.015em' }}>
                      {isSubmitting ? 'Publishing…' : 'Publish listing →'}
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

    </main>
  );
}

export default Listings;
