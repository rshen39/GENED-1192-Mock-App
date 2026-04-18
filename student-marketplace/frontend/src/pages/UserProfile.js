import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ListingCard from '../components/ListingCard';
import { deleteListing, fetchUserProfile } from '../utils';

function UserProfile({ currentUser }) {
  const [profile, setProfile] = useState(null);
  const [error,   setError]   = useState('');
  const [status,  setStatus]  = useState('');

  async function load(id, active = true) {
    try {
      const data = await fetchUserProfile(id);
      if (active) setProfile(data);
    } catch {
      if (active) setError('Could not load profile. Make sure the backend is running.');
    }
  }

  useEffect(() => {
    if (!currentUser) { setProfile(null); setError(''); return undefined; }
    let active = true;
    load(currentUser.id, active);
    return () => { active = false; };
  }, [currentUser]);

  async function handleDelete(id) {
    if (!currentUser) return;
    setError(''); setStatus('');
    try {
      await deleteListing(id, currentUser.id);
      setStatus('Listing removed.');
      load(currentUser.id);
    } catch (err) {
      setError(err.response?.data?.message || 'Could not delete listing.');
    }
  }

  const initials = profile
    ? profile.username.slice(0, 2).toUpperCase()
    : currentUser ? currentUser.username?.slice(0, 2).toUpperCase() : '?';

  if (!currentUser) {
    return (
      <main className="page-wrap">
        <div className="panel panel-body" style={{ textAlign: 'center', padding: '80px 40px' }}>
          <p style={{ fontSize: '1.1rem', color: 'var(--text-2)', marginBottom: 24 }}>
            Sign in to see your profile and listings.
          </p>
          <Link className="btn btn-green" to="/auth">Sign in</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="page-wrap">
      {error  ? <p className="status status-error">{error}</p>   : null}
      {status ? <p className="status status-success">{status}</p> : null}

      {profile ? (
        <div className="profile-grid">
          <aside className="profile-sidebar">
            <div className="profile-avatar">{initials}</div>
            <p className="profile-name">{profile.username}</p>
            <p className="profile-email">{profile.email}</p>

            {profile.email?.endsWith('.edu') && (
              <div style={{ marginBottom: 14 }}>
                <span className="verified-badge">✓ .edu verified</span>
              </div>
            )}

            <p className="profile-bio">{profile.bio || 'No bio yet.'}</p>

            <div className="profile-tag-row">
              {profile.campus && <span className="tag">{profile.campus}</span>}
              {profile.school && <span className="tag">{profile.school}</span>}
              {profile.region && <span className="tag">{profile.region}</span>}
              {profile.area   && <span className="tag">{profile.area}</span>}
            </div>

            <div style={{ marginTop: 24, paddingTop: 20, borderTop: '1px solid var(--border)' }}>
              <Link className="btn btn-ghost btn-sm" style={{ width: '100%', justifyContent: 'center' }} to="/listings">
                + Post a listing
              </Link>
            </div>
          </aside>

          <div className="profile-main-section">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 28 }}>
              <h2 className="h3">Active listings</h2>
              <span className="small">{profile.listings.length} item{profile.listings.length === 1 ? '' : 's'}</span>
            </div>

            {profile.listings.length === 0 ? (
              <div className="empty-state">
                Nothing listed yet.{' '}
                <Link to="/listings" style={{ color: 'var(--green-text)', fontWeight: 600 }}>Post your first item →</Link>
              </div>
            ) : (
              <div className="cards-grid">
                {profile.listings.map((listing) => (
                  <div key={listing.id} className="profile-listing-row">
                    <ListingCard listing={listing} />
                    <div className="btn-row profile-listing-actions">
                      <button className="btn btn-sm btn-destructive" type="button" onClick={() => handleDelete(listing.id)}>
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      ) : (
        <p className="muted">Loading profile…</p>
      )}
    </main>
  );
}

export default UserProfile;
