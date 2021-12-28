import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import express, { Request, Response, NextFunction } from 'express';
import { CartItem, CreateCustomerInputs, CreateDeliveryUserInputs, EditCustomerProfileInputs, OrderInputs, UserLoginInputs } from '../dto/customer.dto';
import { Customer } from '../models/customer';
import { Food } from '../models/food';
import { GenerateOtp, GeneratePassword, GenerateSalt, GenerateSignature, onRequestOtp, ValidatePassword } from '../utility';
import { Order } from '../models/order';
import { Offer } from '../models/offer';
import { Transaction } from '../models/transaction';
import { DeliveryUser, Vendor } from '../models';


export const deliveryUserSignUp = async (req: Request, res: Response, next: NextFunction) => {
    const deliveryUserInputs = plainToClass(CreateDeliveryUserInputs, req.body);
    const inputErrors = await validate(deliveryUserInputs, { validationError: { target: true } });
    if (inputErrors.length > 0) {
        return res.status(400).json(inputErrors);
    }

    const { email, phone, password, address, firstName, lastName, pincode } = deliveryUserInputs;
    const salt = await GenerateSalt();
    const userPassword = await GeneratePassword(password, salt);
    // const otp = 5698596;
    // const otp_expiry = new Date();
    const { otp, expiry } = GenerateOtp();
    console.log(otp, expiry);
    
    const existingDeliveryUser = await DeliveryUser.findOne({ email: email });
    if (existingDeliveryUser !== null) {
        return res.status(400).json({ message: 'A delivery user exists with this email'})
    }

    const result = await DeliveryUser.create({
        email: email,
        password: userPassword,
        salt: salt,
        phone: phone,
        firstName: firstName,
        lastName: lastName,
        address: address,
        pincode: pincode,
        verified: false,
        lat: 0,
        lng: 0,
        isAvailable: false
    });

    if (result) {
        // send the OTP to customer
        await onRequestOtp(otp, phone);

        // generate the signatutre
        const signature = GenerateSignature({
            _id: result._id,
            email: result.email,
            verified: result.verified
        })

        // send the result to client
        return res.status(201).json({ signature: signature, verified: result.verified, email: result.email })
    }
    return res.status(400).json({ message: 'Error with Signup' });
};

export const deliveryUserLogin = async (req: Request, res: Response, next: NextFunction) => {
    const loginInputs = plainToClass(UserLoginInputs, req.body);
    const loginErrors = await validate(loginInputs, { validationError: { target: true } });
    
    if (loginErrors.length > 0) {
        return res.status(400).json(loginErrors);
    };

    const { email, password } = loginInputs;
    const deliveryUser = await DeliveryUser.findOne({ email: email })

    if (deliveryUser) {
        const validation = await ValidatePassword(password, deliveryUser.password, deliveryUser.salt);
        if (validation) {
            // generate the signatutre
            const signature = GenerateSignature({
                _id: deliveryUser._id,
                email: deliveryUser.email,
                verified: deliveryUser.verified
            })
    
            // send the result to client
            return res.status(201).json({ signature: signature, verified: deliveryUser.verified, email: deliveryUser.email })
        };
        
 
    };
    return res.status(400).json({ message: 'Login Error' });
};



export const getDeliveryUserProfile = async (req: Request, res: Response, next: NextFunction) => {
    
    const deliveryUser = req.user;

    if (deliveryUser) {
        const profile = await DeliveryUser.findById(deliveryUser._id);

        if (profile) {
           return res.status(200).json(profile);
        }
    }
    return res.status(400).json({ message: 'Error fetching profile'});
};

export const editDeliveryUserProfile = async (req: Request, res: Response, next: NextFunction) => {
    const deliveryUser = req.user;

    const profileInputs = plainToClass(EditCustomerProfileInputs, req.body);
    const profileErrors = await validate(profileInputs, { validationError: { target: true } });

    if (profileErrors.length > 0) {
        return res.status(400).json(profileErrors);
    }

    const { firstName, lastName, address } = profileInputs;

    if (deliveryUser) {
        const profile = await DeliveryUser.findById(deliveryUser._id);

        if (profile) {
            profile.firstName = firstName;
            profile.lastName = lastName;
            profile.address = address;

            const result = await profile.save();
            res.status(200).json(result);
        }
    }
};

export const updateDeliveryUserStatus = async (req: Request, res: Response, next: NextFunction) => {
    const deliveryUser = req.user;

    if (deliveryUser) {
        const { lat, lng } = req.body;

        const profile = await DeliveryUser.findById(deliveryUser._id);

        if (profile) {
            if (lat & lng) {
                profile.lat;
                profile.lng;
            }

            profile.isAvailable = !profile.isAvailable;
            const result = await profile.save();

            return res.status(200).json(result);
        }
    }


    return res.status(400).json({ message: 'User status not updated' });
}