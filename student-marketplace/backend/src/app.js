require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = Number(process.env.PORT) || 5001;
const DATA_DIR = path.join(__dirname, '..', 'data');
const DATA_FILE = path.join(DATA_DIR, 'store.json');

const seedData = {
  users: [
    {
      id: 'user-1',
      username: 'alex.chen',
      email: 'alex@example.edu',
      password: 'demo-password',
      school: 'Harvard University',
      region: 'Greater Boston',
      area: 'Harvard Square',
      campus: 'Harvard Yard',
      bio: 'Selling dorm essentials before summer move-out.',
      createdAt: '2026-03-20T14:00:00.000Z',
    },
  ],
  listings: [
    {
      id: 'listing-1',
      title: 'Mini Fridge',
      description: 'Compact fridge in good condition. Works well and fits under most dorm desks.',
      price: 85,
      category: 'Appliances',
      location: 'Cambridge',
      school: 'Harvard University',
      region: 'Greater Boston',
      area: 'Harvard Square',
      sellerId: 'user-1',
      imageData: '',
      createdAt: '2026-03-22T10:30:00.000Z',
    },
    {
      id: 'listing-2',
      title: 'Desk Lamp',
      description: 'Adjustable LED lamp with two brightness modes.',
      price: 18,
      category: 'Furniture',
      location: 'Allston',
      school: 'Harvard University',
      region: 'Greater Boston',
      area: 'Allston',
      sellerId: 'user-1',
      imageData: '',
      createdAt: '2026-03-24T18:15:00.000Z',
    },
  ],
};

function ensureDataFile() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }

  if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, JSON.stringify(seedData, null, 2));
  }
}

function normalizeStore(store) {
  const users = (store.users || []).map((user) => {
    const seedUser = seedData.users.find((entry) => entry.id === user.id) || {};

    return {
      ...seedUser,
      ...user,
      campus: user.campus || seedUser.campus || '',
      school: user.school || seedUser.school || '',
      region: user.region || seedUser.region || '',
      area: user.area || seedUser.area || '',
      bio: user.bio || seedUser.bio || '',
    };
  });

  const listings = (store.listings || []).map((listing) => {
    const seller = users.find((user) => user.id === listing.sellerId);
    const seedListing = seedData.listings.find((entry) => entry.id === listing.id) || {};

    return {
      imageData: '',
      ...seedListing,
      ...listing,
      category: listing.category || seedListing.category || 'General',
      school: listing.school || seedListing.school || seller?.school || '',
      region: listing.region || seedListing.region || seller?.region || '',
      area: listing.area || seedListing.area || seller?.area || '',
    };
  });

  return { users, listings };
}

function readStore() {
  ensureDataFile();
  const store = normalizeStore(JSON.parse(fs.readFileSync(DATA_FILE, 'utf8')));
  writeStore(store);
  return store;
}

function writeStore(store) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(store, null, 2));
}

function makeId(prefix) {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function toPublicUser(user) {
  const { password, ...publicUser } = user;
  return publicUser;
}

function enrichListing(listing, users) {
  const seller = users.find((user) => user.id === listing.sellerId);
  return {
    ...listing,
    seller: seller ? toPublicUser(seller) : null,
  };
}

function listListings(store, filters = {}) {
  const { location = '', category = '', q = '', school = '', region = '', area = '' } = filters;

  return store.listings
    .filter((listing) => {
      const matchesLocation = !location || listing.location.toLowerCase().includes(String(location).toLowerCase());
      const matchesCategory = !category || listing.category.toLowerCase() === String(category).toLowerCase();
      const matchesSchool = !school || (listing.school || '').toLowerCase().includes(String(school).toLowerCase());
      const matchesRegion = !region || (listing.region || '').toLowerCase().includes(String(region).toLowerCase());
      const matchesArea = !area || (listing.area || '').toLowerCase().includes(String(area).toLowerCase());
      const matchesQuery =
        !q ||
        listing.title.toLowerCase().includes(String(q).toLowerCase()) ||
        listing.description.toLowerCase().includes(String(q).toLowerCase());

      return matchesLocation && matchesCategory && matchesSchool && matchesRegion && matchesArea && matchesQuery;
    })
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .map((listing) => enrichListing(listing, store.users));
}

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    storage: 'file',
    timestamp: new Date().toISOString(),
  });
});

app.get('/api/users', (req, res) => {
  const store = readStore();
  const users = store.users.map((user) => toPublicUser(user));
  res.json(users);
});

app.post('/api/users', (req, res) => {
  const { username, email, password, campus = '', school = '', region = '', area = '', bio = '' } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: 'username, email, and password are required' });
  }

  const store = readStore();
  const emailTaken = store.users.some((user) => user.email.toLowerCase() === String(email).toLowerCase());
  const usernameTaken = store.users.some(
    (user) => user.username.toLowerCase() === String(username).toLowerCase()
  );

  if (emailTaken || usernameTaken) {
    return res.status(409).json({ message: 'A user with that email or username already exists' });
  }

  const user = {
    id: makeId('user'),
    username: String(username).trim(),
    email: String(email).trim(),
    password: String(password),
    campus: String(campus).trim(),
    school: String(school).trim(),
    region: String(region).trim(),
    area: String(area).trim(),
    bio: String(bio).trim(),
    createdAt: new Date().toISOString(),
  };

  store.users.push(user);
  writeStore(store);

  res.status(201).json(toPublicUser(user));
});

app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'email and password are required' });
  }

  const store = readStore();
  const user = store.users.find((entry) => entry.email.toLowerCase() === String(email).toLowerCase().trim());

  if (!user || user.password !== String(password)) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  res.json(toPublicUser(user));
});

app.get('/api/users/:id', (req, res) => {
  const store = readStore();
  const user = store.users.find((entry) => entry.id === req.params.id);

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  const listings = store.listings
    .filter((listing) => listing.sellerId === user.id)
    .map((listing) => enrichListing(listing, store.users));

  res.json({ ...toPublicUser(user), listings });
});

app.get('/api/listings', (req, res) => {
  const store = readStore();
  res.json(listListings(store, req.query));
});

app.post('/api/listings', (req, res) => {
  const {
    title,
    description,
    price,
    category = 'General',
    location,
    school = '',
    region = '',
    area = '',
    imageData = '',
    sellerId,
  } = req.body;

  if (!title || !description || price === undefined || !location || !sellerId) {
    return res.status(400).json({
      message: 'title, description, price, location, and sellerId are required',
    });
  }

  const store = readStore();
  const seller = store.users.find((user) => user.id === sellerId);

  if (!seller) {
    return res.status(404).json({ message: 'Seller not found' });
  }

  const numericPrice = Number(price);
  if (Number.isNaN(numericPrice) || numericPrice < 0) {
    return res.status(400).json({ message: 'price must be a valid non-negative number' });
  }

  const listing = {
    id: makeId('listing'),
    title: String(title).trim(),
    description: String(description).trim(),
    price: numericPrice,
    category: String(category).trim() || 'General',
    location: String(location).trim(),
    school: String(school).trim() || seller.school || '',
    region: String(region).trim() || seller.region || '',
    area: String(area).trim() || seller.area || '',
    sellerId: seller.id,
    imageData: String(imageData),
    createdAt: new Date().toISOString(),
  };

  store.listings.push(listing);
  writeStore(store);

  res.status(201).json(enrichListing(listing, store.users));
});

app.delete('/api/listings/:id', (req, res) => {
  const sellerId = String(req.query.sellerId || '').trim();

  if (!sellerId) {
    return res.status(400).json({ message: 'sellerId is required' });
  }

  const store = readStore();
  const listingIndex = store.listings.findIndex((listing) => listing.id === req.params.id);

  if (listingIndex === -1) {
    return res.status(404).json({ message: 'Listing not found' });
  }

  if (store.listings[listingIndex].sellerId !== sellerId) {
    return res.status(403).json({ message: 'You can only delete your own listings' });
  }

  const [deletedListing] = store.listings.splice(listingIndex, 1);
  writeStore(store);

  res.json(enrichListing(deletedListing, store.users));
});

app.get('/api/listings/filter', (req, res) => {
  const store = readStore();
  res.json(listListings(store, req.query));
});

app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

if (require.main === module) {
  ensureDataFile();
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}

module.exports = app;
module.exports.internals = {
  seedData,
  ensureDataFile,
  readStore,
  writeStore,
  makeId,
  enrichListing,
  listListings,
};
