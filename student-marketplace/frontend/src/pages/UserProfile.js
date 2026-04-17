import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ListingCard from '../components/ListingCard';
import { deleteListing, fetchUserProfile } from '../utils';

function UserProfile({ currentUser }) {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState('');
  const [status, setStatus] = useState('');

  async function loadProfile(userId, active = true) {
    try {
      const data = await fetchUserProfile(userId);
      if (active) setProfile(data);
    } catch {
      if (active) setError('Unable to load your profile. Start the backend on port 5001.');
    }
  }

  useEffect(() => {
    if (!currentUser) { setProfile(null); setError(''); return undefined; }
    let active = true;
    loadProfile(currentUser.id, active);
    return () => { active = false; };
  }, [currentUser]);

  async function handleDelete(listingId) {
    if (!currentUser) return;
    setError('');
    setStatus('');
    try {
      await deleteListing(listingId, currentUser.id);
      setStatus('Listing deleted.');
      await loadProfile(currentUser.id, true);
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to delete listing.');
    }
  }

  const initials = profile
    ? profile.username.slice(0, 2).toUpperCase()
    : currentUser
    ? currentUser.username?.slice(0, 2).toUpperCase()
    : '?';

  return (
    <main className="page">
      <section className="panel section">
        <span className="eyebrow">Seller profile</span>
        <h2 className="section-title">My Profile</h2>

        {!currentUser ? (
          <div className="status error">
            Sign in to see your profile.{' '}
            <Link to="/auth" style={{ color: 'var(--green)', fontWeight: 600 }}>Go to login →</Link>
          </div>
        ) : null}
        {error ? <div className="status error">{error}</div> : null}
        {status ? <div className="status success">{status}</div> : null}

        {currentUser && !profile ? (
          <p className="muted">Loading profile…</p>
        ) : profile ? (
          <div className="profile-grid">

            <div className="profile-info-card">
              <div className="profile-avatar">{initials}</div>
              <p className="profile-name">{profile.username}</p>
              <p className="profile-email">{profile.email}</p>
              <p className="profile-bio">{profile.bio || 'No bio provided.'}</p>
              <div className="profile-tags">
                {profile.campus ? <span className="tag">{profile.campus}</span> : null}
                {profile.school ? <span className="tag">{profile.school}</span> : null}
                {profile.region ? <span className="tag">{profile.region}</span> : null}
                {profile.area ? <span className="tag">{profile.area}</span> : null}
              </div>
            </div>

            <div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 16 }}>
                Active listings ({profile.listings.length})
              </h3>
              <div className="cards">
                {profile.listings.length === 0 ? (
                  <div className="empty-state">
                    You have no active listings.{' '}
                    <Link to="/listings" style={{ color: 'var(--green)' }}>Post your first item →</Link>
                  </div>
                ) : (
                  profile.listings.map((listing) => (
                    <div key={listing.id} className="profile-listing">
                      <ListingCard listing={listing} />
                      <div className="button-row profile-listing-actions">
                        <button
                          className="button-secondary destructive-button"
                          type="button"
                          onClick={() => handleDelete(listing.id)}
                        >
                          Delete listing
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

          </div>
        ) : null}
      </section>
    </main>
  );
}

export default UserProfile;
