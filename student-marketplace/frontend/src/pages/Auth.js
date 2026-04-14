import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { loginAccount, registerAccount, storeSession } from '../utils';

const initialLogin = {
  email: '',
  password: '',
};

const initialSignup = {
  username: '',
  email: '',
  password: '',
  school: '',
  region: '',
  area: '',
  campus: '',
  bio: '',
};

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
      setLoginError(error.response?.data?.message || 'Unable to log in.');
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
      setSignupStatus('Account created. You are now signed in.');
      history.push('/profile');
    } catch (error) {
      setSignupError(error.response?.data?.message || 'Unable to create account.');
    }
  }

  return (
    <main className="page">
      <section className="auth-grid">
        <div className="panel section">
          <span className="eyebrow">Login</span>
          <h2 className="section-title">Sign in</h2>
          <form className="form-grid" onSubmit={handleLogin}>
            <div className="field">
              <label htmlFor="login-email">Email</label>
              <input
                id="login-email"
                type="email"
                value={loginForm.email}
                onChange={(event) => setLoginForm((current) => ({ ...current, email: event.target.value }))}
                required
              />
            </div>
            <div className="field">
              <label htmlFor="login-password">Password</label>
              <input
                id="login-password"
                type="password"
                value={loginForm.password}
                onChange={(event) => setLoginForm((current) => ({ ...current, password: event.target.value }))}
                required
              />
            </div>
            {loginError ? <div className="status error">{loginError}</div> : null}
            <div className="button-row">
              <button className="button" type="submit">
                Sign in
              </button>
            </div>
          </form>
        </div>

        <div className="panel section">
          <span className="eyebrow">Create account</span>
          <h2 className="section-title">Join your local campus market</h2>
          <form className="form-grid" onSubmit={handleSignup}>
            <div className="field">
              <label htmlFor="signup-username">Username</label>
              <input
                id="signup-username"
                value={signupForm.username}
                onChange={(event) => setSignupForm((current) => ({ ...current, username: event.target.value }))}
                required
              />
            </div>
            <div className="field">
              <label htmlFor="signup-email">Email</label>
              <input
                id="signup-email"
                type="email"
                value={signupForm.email}
                onChange={(event) => setSignupForm((current) => ({ ...current, email: event.target.value }))}
                required
              />
            </div>
            <div className="field">
              <label htmlFor="signup-password">Password</label>
              <input
                id="signup-password"
                type="password"
                value={signupForm.password}
                onChange={(event) => setSignupForm((current) => ({ ...current, password: event.target.value }))}
                required
              />
            </div>
            <div className="toolbar compact-toolbar">
              <div className="field">
                <label htmlFor="signup-school">School</label>
                <input
                  id="signup-school"
                  value={signupForm.school}
                  onChange={(event) => setSignupForm((current) => ({ ...current, school: event.target.value }))}
                  placeholder="Harvard University"
                />
              </div>
              <div className="field">
                <label htmlFor="signup-region">Region</label>
                <input
                  id="signup-region"
                  value={signupForm.region}
                  onChange={(event) => setSignupForm((current) => ({ ...current, region: event.target.value }))}
                  placeholder="Greater Boston"
                />
              </div>
              <div className="field">
                <label htmlFor="signup-area">General area</label>
                <input
                  id="signup-area"
                  value={signupForm.area}
                  onChange={(event) => setSignupForm((current) => ({ ...current, area: event.target.value }))}
                  placeholder="Harvard Square"
                />
              </div>
              <div className="field">
                <label htmlFor="signup-campus">Campus</label>
                <input
                  id="signup-campus"
                  value={signupForm.campus}
                  onChange={(event) => setSignupForm((current) => ({ ...current, campus: event.target.value }))}
                  placeholder="Harvard Yard"
                />
              </div>
            </div>
            <div className="field">
              <label htmlFor="signup-bio">Bio</label>
              <textarea
                id="signup-bio"
                value={signupForm.bio}
                onChange={(event) => setSignupForm((current) => ({ ...current, bio: event.target.value }))}
                placeholder="What are you selling or looking for?"
              />
            </div>
            {signupError ? <div className="status error">{signupError}</div> : null}
            {signupStatus ? <div className="status success">{signupStatus}</div> : null}
            <div className="button-row">
              <button className="button" type="submit">
                Create account
              </button>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}

export default Auth;
