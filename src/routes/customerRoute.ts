import express from 'express';
import { addToCart, customerLogin, customerSignUp, customerVerify, deleteCart, editCustomerProfile, getCart, getCustomerProfile, requestOtp } from '../controllers';
import { authenticate } from '../middlewares/commonAuth';

const router = express.Router();


// Signup/Create customer
router.post('/signup', customerSignUp);

// Login
router.post('/login', customerLogin);

// authentication
router.use(authenticate);

// Verify Customer Account
router.patch('/verify', customerVerify);

// OTP / Requesting OTP
router.get('/otp', requestOtp);

// Profile
router.get('/profile', getCustomerProfile);

router.patch('/profile', editCustomerProfile);


// Cart
router.post('/cart', addToCart);
router.get('/cart', getCart);
router.delete('/cart', deleteCart);

// Order

// Payment

export { router as customerRoute };