import express from 'express';
import { addOffer, addToCart, createOrder, createPayment, customerLogin, customerSignUp, customerVerify, deleteCart, editCustomerProfile, editOffer, getCart, getCustomerProfile, getOffers, getOrder, getOrderById, makePayment, requestOtp, verifyOffer } from '../controllers';
import { authenticate } from '../middlewares/commonAuth';

const router = express.Router();


// Signup/Create customer
router.post('/signup', customerSignUp);

// Login
router.post('/login', customerLogin);

// authentication
// router.use(authenticate);

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

// Apply Offers
router.get('/offer/verify/:id', verifyOffer);

// Order
router.post('/create-order', createOrder);
router.get('/orders', getOrder);
router.get('/order/:id', getOrderById);

// Offers
router.get('/offers', getOffers);
router.post('/offer', addOffer);
router.put('/offer/:id', editOffer);

// Payment
router.post('/create-payment', createPayment);
router.post('/create-payment-intent', makePayment);

export { router as customerRoute };