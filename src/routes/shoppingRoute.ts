import express from 'express';
import { getAvailableOffers, getFoodAvailability, getFoodIn30Min, getRestaurantById, getTopRestaurants, searchFoods } from '../controllers';

const router = express.Router();


// Food Availability
router.get('/:pincode', getFoodAvailability);

// Top Restaurants
router.get('top-restaurants/:pincode', getTopRestaurants);

// Food Available in 30 Minutes
router.get('/foods-in-30-min/:pincode', getFoodIn30Min);

// Search Foods
router.get('/search/:pincode', searchFoods);

// Find Offers
router.get('/offers/:pincode', getAvailableOffers);

// Find Restaurant By ID
router.get('restaurant/:id', getRestaurantById);

export { router as shoppingRoute };
