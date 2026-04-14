import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ListingCard from '../components/ListingCard';
import { deleteListing, fetchUserProfile } from '../utils';

function UserProfile({ currentUser }) {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState('');
  const [status, setStatus] = useState('');

  async function loadProfileForUser(userId, active = true) {
    try {
      const data = await fetchUserProfile(userId);
      if (active) {
        setProfile(data);
      }
    } catch (err) {
      if (active) {
        setError('Unable to load your profile. Start the backend on port 5001.');
      }
    }
  }

  useEffect(() => {
    if (!currentUser) {
      setProfile(null);
      setError('');
      return undefined;
    }

    let active = true;

    loadProfileForUser(currentUser.id, active);
    return () => {
      active = false;
    };
  }, [currentUser]);

  async function handleDelete(listingId) {
    if (!currentUser) {
      return;
    }

    setError('');
    setStatus('');

    try {
      await deleteListing(listingId, currentUser.id);
      setStatus('Listing deleted.');
      await loadProfileForUser(currentUser.id, true);
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to delete listing.');
    }
  }

  return (
    <main className="page">
      <section className="panel section">
        <span className="eyebrow">Seller profile</span>
        <h2 className="section-title">Profile</h2>
        {!currentUser ? (
          <div className="status error">
            Sign in first to see your profile. <Link to="/auth">Go to login.</Link>
          </div>
        ) : null}
        {error ? <div className="status error">{error}</div> : null}
        {status ? <div className="status success">{status}</div> : null}
        {currentUser && !profile ? (
          <p className="muted">Loading profile...</p>
        ) : profile ? (
          <div className="profile-grid">
            <div>
              <h3>{profile.username}</h3>
              <p className="muted">{profile.email}</p>
              <p>{profile.bio || 'No bio provided.'}</p>
              <span className="tag">{profile.campus || 'Campus not set'}</span>
              <div className="profile-details">
                <span className="tag">{profile.school || 'School not set'}</span>
                <span className="tag">{profile.region || 'Region not set'}</span>
                <span className="tag">{profile.area || 'Area not set'}</span>
              </div>
            </div>
            <div>
              <h3>Active listings</h3>
              <div className="cards">
                {profile.listings.length === 0 ? (
                  <div className="empty-state">This seller has no active listings.</div>
                ) : (
                  profile.listings.map((listing) => (
                    <div key={listing.id} className="profile-listing">
                      <ListingCard listing={listing} />
                      <div className="button-row profile-listing-actions">
                        <button className="button-secondary destructive-button" type="button" onClick={() => handleDelete(listing.id)}>
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
