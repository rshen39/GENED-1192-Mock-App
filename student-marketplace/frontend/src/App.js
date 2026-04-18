import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Home        from './pages/Home';
import Listings    from './pages/Listings';
import UserProfile from './pages/UserProfile';
import Auth        from './pages/Auth';
import Checkout    from './pages/Checkout';
import Mission     from './pages/Mission';
import Header      from './components/Header';
import Footer      from './components/Footer';
import { clearSession, getStoredSession } from './utils';
import './styles.css';

function App() {
  const [currentUser, setCurrentUser] = useState(() => getStoredSession());

  function handleLogout() {
    clearSession();
    setCurrentUser(null);
  }

  return (
    <ThemeProvider>
      <Router>
        <div className="app-shell">
          <Header currentUser={currentUser} onLogout={handleLogout} />
          <Switch>
            <Route path="/" exact><Home currentUser={currentUser} /></Route>
            <Route path="/listings"><Listings currentUser={currentUser} /></Route>
            <Route path="/profile"><UserProfile currentUser={currentUser} /></Route>
            <Route path="/auth"><Auth onLogin={setCurrentUser} /></Route>
            <Route path="/checkout"><Checkout currentUser={currentUser} /></Route>
            <Route path="/mission"><Mission /></Route>
          </Switch>
          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
