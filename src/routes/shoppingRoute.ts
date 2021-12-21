import express from 'express';

const router = express.Router();


// Food Availability
router.get('/:pincode');

// Top Restaurants
router.get('top-restaurants/:pincode');

// Food Available in 30 Minutes
router.get('/foods-in-30-min/:pincode');

// Search Foods
router.get('/search/:pincode');

// Find Restaurant By ID
router.get('restaurant/:id');

export { router as shoppingRoute };
