import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { loginAccount, registerAccount, storeSession } from '../utils';

const initialLogin = { email: '', password: '' };
const initialSignup = { username: '', email: '', password: '', school: '', region: '', area: '', campus: '', bio: '' };

function Auth({ onLogin }) {
  const history = useHistory();
  const [loginForm, setLoginForm] = useState(initialLogin);
  const [signupForm, setSignupForm] = useState(initialSignup);
  const [loginError, setLoginError] = useState('');
  const [signupError, setSignupError] = useState('');
  const [signupStatus, setSignupStatus] = useState('');

  async function handleLogin(event) {
    event.preventDefault();
    setLoginError('');
    try {
      const user = await loginAccount(loginForm);
      storeSession(user);
      onLogin(user);
      history.push('/listings');
    } catch (error) {
      setLoginError(error.response?.data?.message || 'Unable to log in. Check your email and password.');
    }
  }

  async function handleSignup(event) {
    event.preventDefault();
    setSignupError('');
    setSignupStatus('');
    try {
      const user = await registerAccount(signupForm);
      storeSession(user);
      onLogin(user);
      setSignupForm(initialSignup);
      setSignupStatus('Account created! You are now signed in.');
      history.push('/profile');
    } catch (error) {
      setSignupError(error.response?.data?.message || 'Unable to create account.');
    }
  }

  return (
    <main className="page">
      <div className="auth-grid">

        {/* Login */}
        <div className="panel section">
          <span className="eyebrow">Welcome back</span>
          <h2 className="section-title">Sign in</h2>
          <p className="lede" style={{ marginBottom: 24 }}>
            Access your CampusCycle account to manage listings and connect with buyers.
          </p>
          <form className="form-grid" onSubmit={handleLogin}>
            <div className="field">
              <label htmlFor="login-email">Email</label>
              <input
                id="login-email"
                type="email"
                value={loginForm.email}
                onChange={(e) => setLoginForm((c) => ({ ...c, email: e.target.value }))}
                placeholder="you@university.edu"
                required
              />
            </div>
            <div className="field">
              <label htmlFor="login-password">Password</label>
              <input
                id="login-password"
                type="password"
                value={loginForm.password}
                onChange={(e) => setLoginForm((c) => ({ ...c, password: e.target.value }))}
                placeholder="Your password"
                required
              />
            </div>
            {loginError ? <div className="status error">{loginError}</div> : null}
            <div className="button-row">
              <button className="button" type="submit">Sign in</button>
            </div>
          </form>
        </div>

        {/* Signup */}
        <div className="panel section">
          <span className="eyebrow">New here?</span>
          <h2 className="section-title">Join your campus market</h2>
          <p className="lede" style={{ marginBottom: 24 }}>
            Free to join — buy or sell items from graduating students near you.
          </p>
          <form className="form-grid" onSubmit={handleSignup}>
            <div className="field">
              <label htmlFor="signup-username">Username</label>
              <input
                id="signup-username"
                value={signupForm.username}
                onChange={(e) => setSignupForm((c) => ({ ...c, username: e.target.value }))}
                placeholder="your_username"
                required
              />
            </div>
            <div className="field">
              <label htmlFor="signup-email">Email</label>
              <input
                id="signup-email"
                type="email"
                value={signupForm.email}
                onChange={(e) => setSignupForm((c) => ({ ...c, email: e.target.value }))}
                placeholder="you@university.edu"
                required
              />
            </div>
            <div className="field">
              <label htmlFor="signup-password">Password</label>
              <input
                id="signup-password"
                type="password"
                value={signupForm.password}
                onChange={(e) => setSignupForm((c) => ({ ...c, password: e.target.value }))}
                placeholder="Create a password"
                required
              />
            </div>
            <div className="toolbar" style={{ gridTemplateColumns: '1fr 1fr' }}>
              <div className="field">
                <label htmlFor="signup-school">School</label>
                <input
                  id="signup-school"
                  value={signupForm.school}
                  onChange={(e) => setSignupForm((c) => ({ ...c, school: e.target.value }))}
                  placeholder="Harvard University"
                />
              </div>
              <div className="field">
                <label htmlFor="signup-region">Region</label>
                <input
                  id="signup-region"
                  value={signupForm.region}
                  onChange={(e) => setSignupForm((c) => ({ ...c, region: e.target.value }))}
                  placeholder="Greater Boston"
                />
              </div>
              <div className="field">
                <label htmlFor="signup-area">Area</label>
                <input
                  id="signup-area"
                  value={signupForm.area}
                  onChange={(e) => setSignupForm((c) => ({ ...c, area: e.target.value }))}
                  placeholder="Harvard Square"
                />
              </div>
              <div className="field">
                <label htmlFor="signup-campus">Campus</label>
                <input
                  id="signup-campus"
                  value={signupForm.campus}
                  onChange={(e) => setSignupForm((c) => ({ ...c, campus: e.target.value }))}
                  placeholder="Harvard Yard"
                />
              </div>
            </div>
            <div className="field">
              <label htmlFor="signup-bio">Bio</label>
              <textarea
                id="signup-bio"
                value={signupForm.bio}
                onChange={(e) => setSignupForm((c) => ({ ...c, bio: e.target.value }))}
                placeholder="What are you selling or looking for?"
              />
            </div>
            {signupError ? <div className="status error">{signupError}</div> : null}
            {signupStatus ? <div className="status success">{signupStatus}</div> : null}
            <div className="button-row">
              <button className="button" type="submit">Create free account</button>
            </div>
          </form>
        </div>

      </div>
    </main>
  );
}

export default Auth;
