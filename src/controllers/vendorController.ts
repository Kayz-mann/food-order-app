import { Request, Response, NextFunction } from 'express';
import { FindVendor } from './adminController';
import { VendorLoginInputs, EditVendorInputs, CustomerOfferInputs } from '../dto/vendor.dto';
import { GenerateSignature, ValidatePassword } from '../utility';
import { CreateFoodInputs } from '../dto/food.dto';
import { Food } from '../models';
import { Order } from '../models/order';
import { CreateCustomerInputs } from '../dto/customer.dto';
import { Offer } from '../models/offer';

export const vendorLogin = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = <VendorLoginInputs>req.body;

    const existingVendor = await FindVendor('', email);

    if (existingVendor !== null) {
        // validate and give access
        const validation = await ValidatePassword(password, existingVendor.password, existingVendor.salt);

        if (validation) {

            const signature = GenerateSignature({
                _id: existingVendor.id,
                email: existingVendor.email,
                foodTypes: existingVendor.foodType,
                name: existingVendor.name
            })
            return res.json(signature);
        } else {
            return res.json({ "message": "Password is not valid" });
        }
    };
    return res.json({ "message": "Login credential not valid" });
};

export const getVendorProfile = async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;
    if (user) {
        const existingVendor = await FindVendor(user._id);
        return res.json(existingVendor);
    }
    return res.json({"message": "Vendor information not found"})
}

export const updateVendorProfile = async (req: Request, res: Response, next: NextFunction) => {
    const { foodTypes, name, address, phone } = <EditVendorInputs>req.body;
    const user = req.user;
    if (user) {
        const existingVendor = await FindVendor(user._id);
        if (existingVendor !== null) {
            existingVendor.name = name;
            existingVendor.address = address;
            existingVendor.phone = phone;
            existingVendor.foodType = foodTypes;

            const savedResult = await existingVendor.save();
            return res.json(savedResult);
        }
        return res.json(existingVendor);
    }
    return res.json({"message": "Vendor information not found"})
    
}

export const updateVendorCoverImage = async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;
    if (user) {

        const vendor = await FindVendor(user._id);

        if (vendor !== null) {
            const files = req.files as [Express.Multer.File]
            const images = files.map((file: Express.Multer.File) => file.filename);
            vendor.coverImages.push(...images);
            const result = await vendor.save();
            return res.json(result);
        }
       
    }
    return res.json({"message": "Something went wrong with add food"})
    
}

export const updateVendorService = async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;
    const { lat, lng } = req.body;

    if (user) {
        const existingVendor = await FindVendor(user._id);
        if (existingVendor !== null) {
            existingVendor.serviceAvailable = !existingVendor.serviceAvailable;

            if (lat && lng) {
                existingVendor.lat = lat;
                existingVendor.lng = lng;
            }
           
            const savedResult = await existingVendor.save();
            return res.json(savedResult);
        }
        return res.json(existingVendor);
    }
    return res.json({"message": "Vendor information not found"})
    
}

export const addFood = async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;
    if (user) {
        const { name, description, category, foodType, readyTime, price } = <CreateFoodInputs>req.body;
        const vendor = await FindVendor(user._id);

        if (vendor !== null) {
            const files = req.files as [Express.Multer.File]
            const images = files.map((file: Express.Multer.File) => file.filename)
            const createdFood = await Food.create({
                vendorId: vendor._id,
                name: name,
                description: description,
                category: category,
                foodType: foodType,
                images: files,
                readyTime: readyTime,
                price: price,
                rating: 0
            })

            vendor.foods.push(createdFood);
            const result = await vendor.save();
            return res.json(result);
        }
       
    }
    return res.json({"message": "Something went wrong with add food"})
    
}

export const getFoods= async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;
    if (user) {
       
        const foods = await Food.find({ vendorId: user._id });
        if (foods !== null) {
            return res.json(foods);
        }
    }
    return res.json({"message": "Foods information not found"})
    
}

export const getCurrentOrders = async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;

    if (user) {
        const orders = await Order.find({ vendorId: user._id }).populate('items.food');

        if (orders != null) {
            return res.status(200).json(orders);
        }

    }
    return res.json({ "message": "order not found" });
};

export const getOrderDetails = async (req: Request, res: Response, next: NextFunction) => {
    const orderId = req.params.id;

    if (orderId) {
        const order = await Order.findById(orderId).populate('items.food');

        if (order != null) {
            return res.status(200).json(order);
        }
    }
    return res.json({ "message": "order not found" });
};

export const processOrder = async (req: Request, res: Response, next: NextFunction) => {
    const orderId = req.params.id;
    const { status, remarks, time } = req.body;

    if (orderId) {
        const order = await (await Order.findById(orderId)).populated('food');

        order.Status = status;
        order.remarks = remarks;
        if (time) {
            order.readyTime = time;
        }

        const orderResult = await order.save();
        if (orderResult !== null) {
            return res.status(200).json(orderResult);
        }
    }
    return res.json({ "message": "Unable to process order" });
};


export const getOffers = async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;

    if (user) {
        let currentOffers = Array();

        const offers = await Offer.find().populate('vendors');

        if (offers) {
            offers.map(item => {
                if (item.vendors) {
                    item.vendors.map(vendor => {
                        if (vendor._id.toString() === user._id) {
                           currentOffers.push(item)
                       }
                    })
                    
                    if (item.offerType === "GENERIC") {
                        currentOffers.push(item);
                    }
               }
           })
        }
        return res.json(currentOffers);
    }
    return res.json({ "message": "Offers not available" });
};

export const addOffer = async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;

    if (user) {
        const { title, description, offerType, offerAmount, pinCode, promoCode, promoType, startValidity, endValidity,  bank, bins, minValue, isActive } = <CustomerOfferInputs>req.body;

        const vendor = await FindVendor(user._id);

        if (vendor) {
            const offer = await Offer.create({
                title,
                description,
                offerType,
                pinCode,
                promoCode,
                promoType,
                startValidity,
                endValidity,
                offerAmount,
                bank,
                bins,
                isActive,
                minValue,
                vendors: [vendor]
            })

            console.log(offer);

            return res.status(200).json(offer);
        }
    }
    return res.json({ "message": "Unable to Add Offer" });
};

export const editOffer = async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;
    const offerId = req.params._id;

    if (user) {
        const { title, description, offerType, offerAmount, pinCode, promoCode, promoType, startValidity, endValidity, bank, bins, minValue, isActive } = <CustomerOfferInputs>req.body;
        
        const currentOffer = await Offer.findById(offerId);

        if (currentOffer) {
            const vendor = await FindVendor(user._id);

            if (vendor) {
                currentOffer.title = title,
                currentOffer.description = description,
                currentOffer.offerType = offerType,
                currentOffer.offerAmount = offerAmount,
                currentOffer.pinCode = pinCode,
                currentOffer.promoCode = promoCode,
                currentOffer.startValidity = startValidity,
                currentOffer.endValidity = endValidity,
                currentOffer.bank = bank,
                currentOffer.bins = bins,
                currentOffer.isActive = isActive,
                currentOffer.minValue = minValue
                
                const result = await currentOffer.save();
                return res.json(result);
                    
            }
        }
    }
};