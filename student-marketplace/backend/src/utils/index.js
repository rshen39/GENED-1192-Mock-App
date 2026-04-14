import { check, validationResult } from 'express-validator';

// Utility function to validate user input
export const validateUserInput = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

// Utility function to format listing data
export const formatListingData = (listing) => {
    return {
        id: listing._id,
        title: listing.title,
        description: listing.description,
        price: listing.price,
        location: listing.location,
        createdAt: listing.createdAt,
    };
};

// Utility function to handle errors
export const handleError = (res, error) => {
    console.error(error);
    res.status(500).json({ message: 'An error occurred', error: error.message });
};