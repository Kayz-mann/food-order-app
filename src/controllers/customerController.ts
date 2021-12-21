import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import express, { Request, Response, NextFunction } from 'express';
import { CreateCustomerInputs, EditCustomerProfileInputs, UserLoginInputs } from '../../src/dto/customer.dto';
import { Customer } from '../../src/models/customer';
import { Food } from '../../src/models/food';
import { GenerateOtp, GeneratePassword, GenerateSalt, GenerateSignature, onRequestOtp, ValidatePassword } from '../utility';


export const customerSignUp = async (req: Request, res: Response, next: NextFunction) => {
    const customerInputs = plainToClass(CreateCustomerInputs, req.body);
    const inputErrors = await validate(customerInputs, { validationError: { target: true } });
    if (inputErrors.length > 0) {
        return res.status(400).json(inputErrors);
    }

    const { email, phone, password } = customerInputs;
    const salt = await GenerateSalt();
    const userPassword = await GeneratePassword(password, salt);
    // const otp = 5698596;
    // const otp_expiry = new Date();
    const { otp, expiry } = GenerateOtp();
    console.log(otp, expiry);
    
    const existCustomer = await Customer.findOne({ email: email });
    if (existCustomer !== null) {
        return res.status(400).json({ message: 'A user exists with this email'})
    }

    const result = await Customer.create({
        email: email,
        password: userPassword,
        salt: salt,
        phone: phone,
        otp: otp,
        otp_expiry: expiry,
        firstName: '',
        lastName: '',
        address: '',
        verified: false,
        lat: 0,
        lng: 0
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

export const customerLogin = async (req: Request, res: Response, next: NextFunction) => {
    const loginInputs = plainToClass(UserLoginInputs, req.body);
    const loginErrors = await validate(loginInputs, { validationError: { target: true } });
    
    if (loginErrors.length > 0) {
        return res.status(400).json(loginErrors);
    };

    const { email, password } = loginInputs;
    const customer = await Customer.findOne({ email: email })

    if (customer) {
        const validation = await ValidatePassword(password, customer.password, customer.salt);
        if (validation) {
            // generate the signatutre
            const signature = GenerateSignature({
                _id: customer._id,
                email: customer.email,
                verified: customer.verified
            })
    
            // send the result to client
            return res.status(201).json({ signature: signature, verified: customer.verified, email: customer.email })
        };
        
 
    };
    return res.status(400).json({ message: 'Login Error' });
};

export const customerVerify = async (req: Request, res: Response, next: NextFunction) => {
    const { otp } = req.body;
    const customer = req.user;

    if (customer) {
        const profile = await Customer.findById(customer._id);
       
        if (profile) {
            if (profile.otp === parseInt(otp) && profile.otp_expiry >= new Date()) {
                profile.verified = true;
                const updatedCustomerResponse = await profile.save();

                // generate the signature
                const signature = GenerateSignature({
                    _id: updatedCustomerResponse._id,
                    email: updatedCustomerResponse.email,
                    verified: updatedCustomerResponse.verified
                });

                return res.status(201).json({
                    signature: signature,
                    verified: updatedCustomerResponse.verified,
                    email: updatedCustomerResponse.email
                });
            }
        }
    }
    return res.status(400).json({ message: 'Error with OTP Validation'})
};

export const requestOtp = async (req: Request, res: Response, next: NextFunction) => {
    const customer = req.user;

    if (customer) {
        const profile = await Customer.findById(customer._id);

        if (profile) {
            const { otp, expiry } = GenerateOtp();
            profile.otp = otp;
            profile.otp_expiry = expiry;

            await profile.save();
            await onRequestOtp(otp, profile.phone);

            res.status(200).json({ message: 'OTP sent to your registered phone number'})
        }
    }
    res.status(400).json({ message: 'Error with OTP request'})
};

export const getCustomerProfile = async (req: Request, res: Response, next: NextFunction) => {
    
    const customer = req.user;

    if (customer) {
        const profile = await Customer.findById(customer._id);

        if (profile) {
           return res.status(200).json(profile);
        }
    }
    return res.status(400).json({ message: 'Error fetching profile'});
};

export const editCustomerProfile = async (req: Request, res: Response, next: NextFunction) => {
    const customer = req.user;

    const profileInputs = plainToClass(EditCustomerProfileInputs, req.body);
    const profileErrors = await validate(profileInputs, { validationError: { target: true } });

    if (profileErrors.length > 0) {
        return res.status(400).json(profileErrors);
    }

    const { firstName, lastName, address } = profileInputs;

    if (customer) {
        const profile = await Customer.findById(customer._id);

        if (profile) {
            profile.firstName = firstName;
            profile.lastName = lastName;
            profile.address = address;

            const result = await profile.save();
            res.status(200).json(result);
        }
    }
};

// cart section

export const addToCart = async (req: Request, res: Response, next: NextFunction) => {

}

export const getCart = async (req: Request, res: Response, next: NextFunction) => {
    
}

export const deleteCart = async (req: Request, res: Response, next: NextFunction) => {
    
}

// order section

// export const createOrder = async (req: Request, res: Response, next: NextFunction) => {
//     const customer = req.user;

//     if (customer) {
//         const profile = await Customer.findById(customer._id);
//         const orderId = `${Math.floor(Math.random() * 89999 + 1000)}`;
//         // const cart = <{ OrderInputs }>req.body;

//         let cartItems = Array();
//         let netAmount = 0.0;

//         const foods = await (await Food.find().where('_id')).includes(cart.map(item => item._id)).exec();

//         foods.map(food => {
//             cart.map(({ _id, unit }) => {
//                 if (food._id == _id) {
//                     netAmount += food.price * unit;
//                     cartItems.push({ food, unit: unit })
//                 } else {
//                     console.log(`${food._id} / ${_id}`)
//                 }
//             })
//         })

//         if (cartItems) {
//             const currentOrder = await Order.create({
//                 orderID: orderId,
//                 items: cartItems,
//                 totalAmount: netAmount,
//                 orderDate: new Date(),
//                 paidThrough: 'COD',
//                 paymentResponse: 'Some json response stringify',
//                 orderStatus: 'waiting',
//             })
//         }
//     }
// }
