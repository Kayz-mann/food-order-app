import express from 'express';
import { deliveryUserLogin, deliveryUserSignUp, editDeliveryUserProfile, getDeliveryUserProfile, updateDeliveryUserStatus } from '../controllers/deliveryController';
import { authenticate } from '../middlewares/commonAuth';

const router = express.Router();


// Signup/Create customer
router.post('/signup', deliveryUserSignUp);

// Login
router.post('/login', deliveryUserLogin);

// authentication
router.use(authenticate);

// Change Service Status
router.put('/change-status', updateDeliveryUserStatus);

// Profile
router.get('/profile', getDeliveryUserProfile);

router.patch('/profile', editDeliveryUserProfile);


export { router as deliveryRoute };