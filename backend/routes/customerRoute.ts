import express from 'express';
import { customerLogin, customerSignUp, customerVerify, editCustomerProfile, getCustomerProfile, requestOtp } from '../controllers';
import { authenticate } from '../middlewares';

const router = express.Router();


// Signup/Create customer
router.post('/signup', customerSignUp);

// Login
router.post('/login', customerLogin);

// authentication
router.post('/', authenticate);

// Verify Customer Account
router.patch('/verify', customerVerify);

// OTP / Requesting OTP
router.get('/otp', requestOtp);

// Profile
router.get('/profile', getCustomerProfile);

router.patch('/profile', editCustomerProfile);


// Cart

// Order

// Payment

export { router as customerRoute };