import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { LogoMark } from '../components/Logo';
import { loginAccount, registerAccount, storeSession } from '../utils';

const initialLogin  = { email: '', password: '' };
const initialSignup = { username: '', email: '', password: '', school: '', region: '', area: '', campus: '', bio: '' };

function Auth({ onLogin }) {
  const history = useHistory();
  const [tab, setTab] = useState('signin');
  const [loginForm,  setLoginForm]  = useState(initialLogin);
  const [signupForm, setSignupForm] = useState(initialSignup);
  const [loginError,  setLoginError]  = useState('');
  const [signupError, setSignupError] = useState('');

  async function handleLogin(e) {
    e.preventDefault();
    setLoginError('');
    try {
      const user = await loginAccount(loginForm);
      storeSession(user);
      onLogin(user);
      history.push('/listings');
    } catch (err) {
      setLoginError(err.response?.data?.message || 'Invalid email or password.');
    }
  }

  async function handleSignup(e) {
    e.preventDefault();
    setSignupError('');
    try {
      const user = await registerAccount(signupForm);
      storeSession(user);
      onLogin(user);
      history.push('/profile');
    } catch (err) {
      setSignupError(err.response?.data?.message || 'Unable to create account. Try again.');
    }
  }

  return (
    <div className="auth-wrap">
      <div className="auth-container">

        <div className="auth-logo-row">
          <LogoMark size={32} color="var(--text-1)" />
        </div>

        <div className="auth-card">
          <div className="auth-tabs">
            <button
              className={`auth-tab${tab === 'signin' ? ' active' : ''}`}
              onClick={() => { setTab('signin'); setLoginError(''); }}
            >
              Sign in
            </button>
            <button
              className={`auth-tab${tab === 'signup' ? ' active' : ''}`}
              onClick={() => { setTab('signup'); setSignupError(''); }}
            >
              Create account
            </button>
          </div>

          {/* .edu notice */}
          <div className="edu-notice">
            <span className="edu-icon">🎓</span>
            <span>
              Campus Cycle is <strong>student-only</strong>. You'll need a <strong>.edu email address</strong> to create or access an account.
            </span>
          </div>

          {tab === 'signin' ? (
            <form className="form-grid" onSubmit={handleLogin}>
              <div className="field">
                <label htmlFor="login-email">University email</label>
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
                <label htmlFor="login-pw">Password</label>
                <input
                  id="login-pw"
                  type="password"
                  value={loginForm.password}
                  onChange={(e) => setLoginForm((c) => ({ ...c, password: e.target.value }))}
                  placeholder="Your password"
                  required
                />
              </div>
              {loginError ? <p className="status status-error">{loginError}</p> : null}
              <button className="btn btn-green" type="submit" style={{ marginTop: 4 }}>Sign in</button>
            </form>
          ) : (
            <form className="form-grid" onSubmit={handleSignup}>
              <div className="field">
                <label htmlFor="su-username">Username</label>
                <input
                  id="su-username"
                  value={signupForm.username}
                  onChange={(e) => setSignupForm((c) => ({ ...c, username: e.target.value }))}
                  placeholder="your_handle"
                  required
                />
              </div>
              <div className="field">
                <label htmlFor="su-email">University email (.edu)</label>
                <input
                  id="su-email"
                  type="email"
                  value={signupForm.email}
                  onChange={(e) => setSignupForm((c) => ({ ...c, email: e.target.value }))}
                  placeholder="you@university.edu"
                  required
                />
              </div>
              <div className="field">
                <label htmlFor="su-pw">Password</label>
                <input
                  id="su-pw"
                  type="password"
                  value={signupForm.password}
                  onChange={(e) => setSignupForm((c) => ({ ...c, password: e.target.value }))}
                  placeholder="Create a password"
                  required
                />
              </div>
              <div className="toolbar" style={{ gridTemplateColumns: '1fr 1fr' }}>
                <div className="field">
                  <label htmlFor="su-school">School</label>
                  <input id="su-school" value={signupForm.school} onChange={(e) => setSignupForm((c) => ({ ...c, school: e.target.value }))} placeholder="Harvard University" />
                </div>
                <div className="field">
                  <label htmlFor="su-campus">Campus</label>
                  <input id="su-campus" value={signupForm.campus} onChange={(e) => setSignupForm((c) => ({ ...c, campus: e.target.value }))} placeholder="Harvard Yard" />
                </div>
                <div className="field">
                  <label htmlFor="su-region">Region</label>
                  <input id="su-region" value={signupForm.region} onChange={(e) => setSignupForm((c) => ({ ...c, region: e.target.value }))} placeholder="Greater Boston" />
                </div>
                <div className="field">
                  <label htmlFor="su-area">Area</label>
                  <input id="su-area" value={signupForm.area} onChange={(e) => setSignupForm((c) => ({ ...c, area: e.target.value }))} placeholder="Harvard Square" />
                </div>
              </div>
              <div className="field">
                <label htmlFor="su-bio">Bio <span style={{ fontWeight: 400, color: 'var(--text-3)' }}>(optional)</span></label>
                <textarea id="su-bio" value={signupForm.bio} onChange={(e) => setSignupForm((c) => ({ ...c, bio: e.target.value }))} placeholder="What are you selling or looking for?" />
              </div>
              {signupError ? <p className="status status-error">{signupError}</p> : null}
              <button className="btn btn-green" type="submit" style={{ marginTop: 4 }}>Create account</button>
            </form>
          )}
        </div>

        <p style={{ textAlign: 'center', marginTop: 20, fontSize: '0.8rem', color: 'var(--text-3)' }}>
          By continuing, you agree to our Terms of Use and Privacy Policy.
        </p>
      </div>
    </div>
  );
}

export default Auth;
