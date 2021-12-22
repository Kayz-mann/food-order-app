import express from 'express';
import { addToCart, createOrder, customerLogin, customerSignUp, customerVerify, deleteCart, editCustomerProfile, getCart, getCustomerProfile, getOrder, getOrderById, requestOtp } from '../controllers';
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
router.post('/create-order', createOrder);
router.get('/orders', getOrder);
router.get('/order/:id', getOrderById);

// Payment

export { router as customerRoute };