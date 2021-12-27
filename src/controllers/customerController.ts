import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import express, { Request, Response, NextFunction } from 'express';
import { CartItem, CreateCustomerInputs, EditCustomerProfileInputs, OrderInputs, UserLoginInputs } from '../dto/customer.dto';
import { Customer } from '../models/customer';
import { Food } from '../../src/models/food';
import { GenerateOtp, GeneratePassword, GenerateSalt, GenerateSignature, onRequestOtp, ValidatePassword } from '../utility';
import { Order } from '../models/order';
import { Offer } from '../models/offer';
import { Transaction } from '../models/transaction';
import { DeliveryUser, Vendor } from '../models';


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
        lng: 0,
        orders: []
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
    const customer = req.user;

    if (customer) {
        const profile = await Customer.findById(customer._id).populate('cart.food');
        let cartItems = Array();

        const { _id, unit } = <CartItem>req.body;
        
        const food = await Food.findById(_id);

        if (food) {
            if (profile != null) {
                //   check for cart Items
                cartItems = profile.cart;

                if (cartItems.length > 0) {
                    // check and update unit
                    let existingFoodItems = cartItems.filter((item) => item.food._id.toString() === _id);

                    if (existingFoodItems.length > 0) {
                        const index = cartItems.indexOf(existingFoodItems[0]);
                        if (unit > 0) {
                            cartItems[index] = { food, unit };

                        } else {
                            cartItems.splice(index, 1);
                        }
                    } else {
                        cartItems.push({ food, unit });
                    }
                }
            } else {
                // add new item to cart
                cartItems.push({ food, unit });
            }

            if (cartItems) {
                profile.cart = cartItems as any;
                const cartResult = await profile.save();
                return res.status(200).json(cartResult.cart);
            }
        }
    }
};

export const getCart = async (req: Request, res: Response, next: NextFunction) => {
    const customer = req.user;
    if (customer) {
        const profile = await (await Customer.findById(customer._id)).populate('cart.food');
        if (profile) {
            return res.status(200).json(profile.cart);
        }
    }

    return res.status(400).json({ message: 'cart is empty' });
}

export const deleteCart = async (req: Request, res: Response, next: NextFunction) => {
    const customer = req.user;
    if (customer) {
        const profile = await (await Customer.findById(customer._id)).populate('cart.food');
        if (profile != null) {
            profile.cart = [] as any;
            const cartResult = await profile.save();
            return res.status(200).json(cartResult);
        }
    }

    return res.status(400).json({ message: 'cart is already empty' });
}

// Delivery Notification

const assignOrderForDelivery = async (orderId: string, vendorId: string) => {
    // find the vendor
    const vendor = await Vendor.findById(vendorId);

    if (vendor) {
        const areaCode = vendor.pinCode;
        const vendorLat = vendor.lat;
        const vendorLng = vendor.lng;
   

    // find the available delivery person
    const deliveryPerson = await DeliveryUser.find({ pinCode:areaCode , verified: true, isAvailable: true})

    // check the nearest delivery person and assign the order
        if (deliveryPerson) {
            const currentOrder = await Order.findById(orderId);

            if (currentOrder) {
                // update deliveryID
                currentOrder.deliveryId = deliveryPerson[0]._id;
                await currentOrder.save();

                // Notify to vendor for received new order using firebase push notification
                
            }
        }
}

}

// order section

const validateTransaction = async (txnId: string) => {
    const currentTransaction = await Transaction.findById(txnId);
    if (currentTransaction) {
        if (currentTransaction.status.toLowerCase() !== "failed") {
            return { status: true, currentTransaction }
        }
    }
    return { status: false, currentTransaction }
};

export const createOrder = async (req: Request, res: Response, next: NextFunction) => {
    // grab current login customer
    const customer = req.user;

    const { txnId, amount, items } = <OrderInputs>req.body;

   

    if (customer) {
        const { status, currentTransaction } = await validateTransaction(txnId);

        if (!status) {
            return res.status(400).json({ message: 'Error with create order' });
        }
        // create an order ID
        const orderId = `${Math.floor(Math.random() * 89999) + 1000}`;
        const profile = await Customer.findById(customer._id);

        // Grab order items from request
        const cart = <[CartItem]>req.body;
        let cartItems = Array();
        let netAmount = 0.0;
        let vendorId;

        // Calculate order amount
        const foods = await Food.find().where('_id').in(items.map(item => item._id)).exec();

        foods.map(food => {
            items.map(({ _id, unit }) => {
                if (food._id == _id) {
                    vendorId = food.vendorId;
                    netAmount += food.price * unit;
                    cartItems.push({ food, unit: unit });
                } else {
                    console.log(`${food._id} / ${_id}`)
                }
            })
        })

        // Create order with description
        if (cartItems) {
            // create order
            const currentOrder = await Order.create({
                orderID: orderId,
                vendorId: vendorId,
                items: cartItems,
                totalAmount: netAmount,
                paidAmount: amount,
                orderDate: new Date(),
                // paidThrough: 'COD',
                // paymentResponse: '',
                orderStatus: 'Waiting',
                remarks: '',
                deliveryId: '',
                // appliedOffers: false,
                // offerId: null,
                readyTime: 45,

            })
            profile.cart = [] as any;
            profile.orders.push(currentOrder);

            currentTransaction.vendorId = vendorId,
            currentTransaction.orderId = orderId,
            currentTransaction.status = 'CONFIRMED';
            
            assignOrderForDelivery(currentOrder._id, vendorId);
            
            await currentTransaction.save();

            const profileSaveResponse = await profile.save();
            res.status(200).json(profileSaveResponse);

            // if (currentOrder) {
            //     profile.orders.push(currentOrder);
            //     await profile.save();

            //     return res.status(200).json(currentOrder);
            // }
        }else {
            return res.status(400).json({ message: 'Error with Create Order' });
        }
    } 
   
};

export const getOrder = async (req: Request, res: Response, next: NextFunction) => {

    const customer = req.user;

    if (customer) {
        const profile = await (await Customer.findById(customer._id)).populate('orders');

        if (profile) {
            return res.status(200).json(profile.orders);
        }
    }
};


export const getOrderById = async (req: Request, res: Response, next: NextFunction) => {
    const orderId = req.params.id;

    if (orderId) {
        const order = await Customer.findById(orderId).populate('items.food');

        return res.status(200).json(order);
    }
};

export const verifyOffer = async (req: Request, res: Response, next: NextFunction) => {
    const offerId = req.params.id;
    const customer = req.user;

    if (customer) {
        const appliedOffer = await Offer.findById(offerId);

        if (appliedOffer) {

            if (appliedOffer.promoType === "USER") {
                
            } else {
                if (appliedOffer.isActive) {
                    return res.status(200).json({ message: "Offer is valid", offer: appliedOffer });
                }
            }
           
        }
    }

    return res.status(400).json({ message: "Offer is not valid" });
};

export const createPayment = async (req: Request, res: Response, next: NextFunction) => {
    const customer = req.user;
    const { amount, paymentMode, offerId } = req.body;

    let payableAmount = Number(amount);

    // 500 - 200 = 300
    if (offerId) {
        const appliedOffer = await Offer.findById(offerId);

        if (appliedOffer) {
            if (appliedOffer.isActive) {
                payableAmount = (payableAmount - appliedOffer.offerAmount);
            }
        }
    }

    // Perform payment gateway charge API call

    // Create record on transaction
    const transaction = await Transaction.create({
        customer: customer._id,
        vendorId: '',
        orderId: '',
        orderValue: payableAmount,
        offerUsed: offerId || 'NA',
        status: 'OPEN',
        paymentMode: paymentMode,
        paymentResponse: 'Payment is cash on delivery'
    })

    // return transaction ID
    return res.status(200).json(transaction);
}

