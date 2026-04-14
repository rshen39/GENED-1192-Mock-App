import { createUser, getUser, createListing, getListings, filterListings } from '../models';

export const registerUser = async (req, res) => {
    try {
        const user = await createUser(req.body);
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const fetchUser = async (req, res) => {
    try {
        const user = await getUser(req.params.id);
        res.status(200).json(user);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const addListing = async (req, res) => {
    try {
        const listing = await createListing(req.body);
        res.status(201).json(listing);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const listAll = async (req, res) => {
    try {
        const listings = await getListings();
        res.status(200).json(listings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const filterListingsByLocation = async (req, res) => {
    try {
        const listings = await filterListings(req.query.location);
        res.status(200).json(listings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};