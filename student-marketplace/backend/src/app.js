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
    {
      id: 'user-2',
      username: 'maya.patel',
      email: 'maya@example.edu',
      password: 'demo-password',
      school: 'Harvard University',
      region: 'Greater Boston',
      area: 'Allston',
      campus: 'Harvard Yard',
      bio: 'Junior. Downsizing before junior year.',
      createdAt: '2026-03-21T09:00:00.000Z',
    },
    {
      id: 'user-3',
      username: 'jake.morrison',
      email: 'jake@example.edu',
      password: 'demo-password',
      school: 'Harvard University',
      region: 'Greater Boston',
      area: 'Cambridge',
      campus: 'Harvard Yard',
      bio: 'Graduating senior. Everything must go!',
      createdAt: '2026-03-22T11:00:00.000Z',
    },
    {
      id: 'user-4',
      username: 'priya.singh',
      email: 'priya@example.edu',
      password: 'demo-password',
      school: 'Harvard University',
      region: 'Greater Boston',
      area: 'Harvard Square',
      campus: 'Harvard Yard',
      bio: 'Grad student clearing out the apartment.',
      createdAt: '2026-03-23T15:00:00.000Z',
    },
  ],
  listings: [
    {
      id: 'listing-1',
      title: 'Mini Fridge — Like New',
      description: 'Danby 1.7 cu ft compact fridge. Barely used, no dents, works perfectly. Great for a first-year dorm. Runs quietly. Selling because I\'m moving off-campus.',
      price: 55,
      category: 'Appliances',
      location: 'Harvard Yard',
      school: 'Harvard University',
      region: 'Greater Boston',
      area: 'Harvard Square',
      sellerId: 'user-1',
      imageData: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=400&q=80&auto=format&fit=crop',
      createdAt: '2026-04-10T09:00:00.000Z',
    },
    {
      id: 'listing-2',
      title: 'Keurig K-Mini Coffee Maker',
      description: 'Works great. Comes with 12 assorted K-Cups to get you started. Used for one semester. Clean, no mineral buildup. Perfect for early morning 9ams.',
      price: 38,
      category: 'Appliances',
      location: 'Canaday Hall',
      school: 'Harvard University',
      region: 'Greater Boston',
      area: 'Harvard Square',
      sellerId: 'user-2',
      imageData: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&q=80&auto=format&fit=crop',
      createdAt: '2026-04-10T10:00:00.000Z',
    },
    {
      id: 'listing-3',
      title: 'Box Fan (Lasko 20")',
      description: 'Essential for Cambridge summers. Two-speed setting, runs quietly on low. Slight scuff on the back panel but works 100%. Pickup near Allston.',
      price: 18,
      category: 'Appliances',
      location: 'Allston',
      school: 'Harvard University',
      region: 'Greater Boston',
      area: 'Allston',
      sellerId: 'user-3',
      imageData: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80&auto=format&fit=crop',
      createdAt: '2026-04-11T08:30:00.000Z',
    },
    {
      id: 'listing-4',
      title: 'Rice Cooker + Steamer (Zojirushi)',
      description: '3-cup Zojirushi. One of the best dorm appliances you can have. Makes perfect rice every time. Comes with measuring cup and paddle. Used 2 years.',
      price: 42,
      category: 'Appliances',
      location: 'Leverett House',
      school: 'Harvard University',
      region: 'Greater Boston',
      area: 'Harvard Square',
      sellerId: 'user-4',
      imageData: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=400&q=80&auto=format&fit=crop',
      createdAt: '2026-04-11T11:00:00.000Z',
    },
    {
      id: 'listing-5',
      title: 'IKEA MICKE Desk + Hutch',
      description: 'White, 28" wide. Fits comfortably in any dorm room. Hutch has shelves for books and a cable cutout. Some scuffs on the bottom edges. Must pick up.',
      price: 85,
      category: 'Furniture',
      location: 'Cambridge',
      school: 'Harvard University',
      region: 'Greater Boston',
      area: 'Cambridge',
      sellerId: 'user-3',
      imageData: 'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=400&q=80&auto=format&fit=crop',
      createdAt: '2026-04-11T14:00:00.000Z',
    },
    {
      id: 'listing-6',
      title: 'Adjustable Floor Lamp',
      description: 'Tall LED arc lamp with dimmer switch. Three color temperatures (warm, neutral, cool). Great for studying. Bulb included. Works perfectly.',
      price: 22,
      category: 'Furniture',
      location: 'Winthrop House',
      school: 'Harvard University',
      region: 'Greater Boston',
      area: 'Harvard Square',
      sellerId: 'user-1',
      imageData: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80&auto=format&fit=crop',
      createdAt: '2026-04-12T09:00:00.000Z',
    },
    {
      id: 'listing-7',
      title: 'IKEA KALLAX Shelf (4-cube)',
      description: 'White, 2x2 cube organizer. Great for books, bins, or a record collection. A few small chips on the top edge. Easy to disassemble for transport.',
      price: 40,
      category: 'Furniture',
      location: 'Quincy House',
      school: 'Harvard University',
      region: 'Greater Boston',
      area: 'Harvard Square',
      sellerId: 'user-2',
      imageData: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=400&q=80&auto=format&fit=crop',
      createdAt: '2026-04-12T12:00:00.000Z',
    },
    {
      id: 'listing-8',
      title: 'Ergonomic Office Chair',
      description: 'Mesh back, adjustable height and armrests. Good lumbar support — helped a lot during finals. Slight wear on the seat pad but structurally solid.',
      price: 65,
      category: 'Furniture',
      location: 'Eliot House',
      school: 'Harvard University',
      region: 'Greater Boston',
      area: 'Harvard Square',
      sellerId: 'user-4',
      imageData: 'https://images.unsplash.com/photo-1541558703-05c6bc7e6bc0?w=400&q=80&auto=format&fit=crop',
      createdAt: '2026-04-12T15:00:00.000Z',
    },
    {
      id: 'listing-9',
      title: '24" 1080p Monitor (Acer)',
      description: '60Hz, IPS panel. HDMI + VGA input. Very clean display, no dead pixels. Great for dual-monitor setups or just upgrading your dorm workstation. Stand included.',
      price: 120,
      category: 'Electronics',
      location: 'Adams House',
      school: 'Harvard University',
      region: 'Greater Boston',
      area: 'Harvard Square',
      sellerId: 'user-3',
      imageData: 'https://images.unsplash.com/photo-1527443224154-522f2f49e321?w=400&q=80&auto=format&fit=crop',
      createdAt: '2026-04-13T09:00:00.000Z',
    },
    {
      id: 'listing-10',
      title: 'Mechanical Keyboard (TKL, Cherry MX Brown)',
      description: 'Tenkeyless layout, white backlight. Perfect for coding and typing. Tactile switches, not clicky — dorm-friendly. Comes with USB-C cable.',
      price: 55,
      category: 'Electronics',
      location: 'Dunster House',
      school: 'Harvard University',
      region: 'Greater Boston',
      area: 'Harvard Square',
      sellerId: 'user-1',
      imageData: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&q=80&auto=format&fit=crop',
      createdAt: '2026-04-13T11:00:00.000Z',
    },
    {
      id: 'listing-11',
      title: 'CS50 + Python Crash Course (bundle)',
      description: 'David Malan\'s CS50 companion book + Python Crash Course 3rd ed. Both lightly annotated (pencil only). Ideal if you\'re taking intro CS this fall.',
      price: 28,
      category: 'Books',
      location: 'Lowell House',
      school: 'Harvard University',
      region: 'Greater Boston',
      area: 'Harvard Square',
      sellerId: 'user-2',
      imageData: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&q=80&auto=format&fit=crop',
      createdAt: '2026-04-13T14:00:00.000Z',
    },
    {
      id: 'listing-12',
      title: 'Principles of Economics (Mankiw, 9th ed.)',
      description: 'Standard Ec10 text. Highlighted in yellow only. All pages intact. Retails for $280 new — this\'ll save you a lot. Pickup anywhere in the Yard.',
      price: 30,
      category: 'Books',
      location: 'Harvard Yard',
      school: 'Harvard University',
      region: 'Greater Boston',
      area: 'Harvard Square',
      sellerId: 'user-4',
      imageData: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=400&q=80&auto=format&fit=crop',
      createdAt: '2026-04-14T09:00:00.000Z',
    },
    {
      id: 'listing-13',
      title: 'Organic Chemistry (Clayden, 2nd ed.)',
      description: 'Used for LS1b. Heavy annotations in the first half, clean in the second. This book is a brick — worth every penny of the $20 over renting.',
      price: 20,
      category: 'Books',
      location: 'Cabot Library',
      school: 'Harvard University',
      region: 'Greater Boston',
      area: 'Harvard Square',
      sellerId: 'user-3',
      imageData: 'https://images.unsplash.com/photo-1532153975070-2e9ab71f1b14?w=400&q=80&auto=format&fit=crop',
      createdAt: '2026-04-14T11:00:00.000Z',
    },
    {
      id: 'listing-14',
      title: "North Face Puffer Jacket — Men's M",
      description: 'Dark navy, 550-fill. Worn two winters. No tears, zipper works perfectly. Slightly faded near the cuffs. Great for Boston winters — you\'ll need it.',
      price: 70,
      category: 'Clothing',
      location: 'Mather House',
      school: 'Harvard University',
      region: 'Greater Boston',
      area: 'Harvard Square',
      sellerId: 'user-1',
      imageData: 'https://images.unsplash.com/photo-1520975954732-35dd22299614?w=400&q=80&auto=format&fit=crop',
      createdAt: '2026-04-14T14:00:00.000Z',
    },
    {
      id: 'listing-15',
      title: 'Loft Bed Frame (Twin XL)',
      description: 'Metal loft frame, adjustable height up to 60". Creates tons of under-bed storage. Sturdy — held up 3 years. Hardware included. Needs 2 people to carry.',
      price: 75,
      category: 'Furniture',
      location: 'Pforzheimer House',
      school: 'Harvard University',
      region: 'Greater Boston',
      area: 'Cambridge',
      sellerId: 'user-2',
      imageData: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&q=80&auto=format&fit=crop',
      createdAt: '2026-04-15T09:00:00.000Z',
    },
    {
      id: 'listing-16',
      title: 'Twin XL Bedding Set (sheets + duvet)',
      description: 'Light grey. 100% cotton sheets + white duvet insert + cover. Washed and clean. Everything you need for a dorm bed. Don\'t overpay at Target.',
      price: 35,
      category: 'Dorm Goods',
      location: 'Greenough Hall',
      school: 'Harvard University',
      region: 'Greater Boston',
      area: 'Harvard Square',
      sellerId: 'user-4',
      imageData: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?w=400&q=80&auto=format&fit=crop',
      createdAt: '2026-04-15T11:00:00.000Z',
    },
    {
      id: 'listing-17',
      title: 'Shower Caddy + Toiletry Organizers',
      description: 'Rustproof metal caddy with 3 shelves + a hanging organizer for the back of your door. Used one year, very clean. Everything a freshman needs for shared bathrooms.',
      price: 14,
      category: 'Dorm Goods',
      location: 'Straus Hall',
      school: 'Harvard University',
      region: 'Greater Boston',
      area: 'Harvard Square',
      sellerId: 'user-3',
      imageData: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&q=80&auto=format&fit=crop',
      createdAt: '2026-04-15T14:00:00.000Z',
    },
    {
      id: 'listing-18',
      title: 'Trek FX2 Hybrid Bike + U-Lock',
      description: '52cm frame, 21-speed. Replaced brake pads last fall. Some scratches on the frame, mechanically solid. U-lock + cable lock included. Great for commuting to class.',
      price: 220,
      category: 'Bikes',
      location: 'Radcliffe Yard',
      school: 'Harvard University',
      region: 'Greater Boston',
      area: 'Harvard Square',
      sellerId: 'user-1',
      imageData: 'https://images.unsplash.com/photo-1558615419-1d94b9b4d5e7?w=400&q=80&auto=format&fit=crop',
      createdAt: '2026-04-16T09:00:00.000Z',
    },
    {
      id: 'listing-19',
      title: 'Instant Pot Duo 3-Quart',
      description: '7-in-1 multi-cooker. Perfect size for a dorm or studio. Used about 30 times. All accessories included (trivet, sealing ring, manual). Clean and working perfectly.',
      price: 35,
      category: 'Kitchen',
      location: 'Kirkland House',
      school: 'Harvard University',
      region: 'Greater Boston',
      area: 'Harvard Square',
      sellerId: 'user-2',
      imageData: 'https://images.unsplash.com/photo-1556909045-b2d8c04e5e25?w=400&q=80&auto=format&fit=crop',
      createdAt: '2026-04-16T11:00:00.000Z',
    },
    {
      id: 'listing-20',
      title: '5-Piece Non-Stick Cookware Set',
      description: '8" and 10" skillets, 2qt saucepan, 3qt saucepan, 5qt stockpot. All non-stick coating in good shape — no peeling. Moving into a place with cookware included.',
      price: 45,
      category: 'Kitchen',
      location: 'Cabot House',
      school: 'Harvard University',
      region: 'Greater Boston',
      area: 'Cambridge',
      sellerId: 'user-4',
      imageData: 'https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?w=400&q=80&auto=format&fit=crop',
      createdAt: '2026-04-16T14:00:00.000Z',
    },
    {
      id: 'listing-21',
      title: 'Compact Microwave (700W)',
      description: '0.7 cu ft, works well, clean inside. Easy to pick up near campus. Selling because I\'m cooking more off-campus next year.',
      price: 35,
      category: 'Appliances',
      location: 'Cambridge',
      school: 'Harvard University',
      region: 'Greater Boston',
      area: 'Harvard Square',
      sellerId: 'user-1',
      imageData: 'https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?w=400&q=80&auto=format&fit=crop',
      createdAt: '2026-04-17T09:00:00.000Z',
    },
  ],
};

function ensureDataFile() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }

  if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, JSON.stringify(seedData, null, 2));
    return;
  }

  // Merge seed listings into existing store so deploys always have demo data
  try {
    const existing = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
    const existingIds = new Set((existing.listings || []).map((l) => l.id));
    const newListings = seedData.listings.filter((l) => !existingIds.has(l.id));
    const existingUserIds = new Set((existing.users || []).map((u) => u.id));
    const newUsers = seedData.users.filter((u) => !existingUserIds.has(u.id));
    if (newListings.length > 0 || newUsers.length > 0) {
      existing.listings = [...(existing.listings || []), ...newListings];
      existing.users = [...(existing.users || []), ...newUsers];
      fs.writeFileSync(DATA_FILE, JSON.stringify(existing, null, 2));
    }
  } catch (_) {
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
