import express from 'express';
import { createUser, getUser, createListing, getListings, filterListings } from '../controllers/index.js';

const router = express.Router();

// User routes
router.post('/users', createUser);
router.get('/users/:id', getUser);

// Listing routes
router.post('/listings', createListing);
router.get('/listings', getListings);
router.get('/listings/filter', filterListings);

export default router;