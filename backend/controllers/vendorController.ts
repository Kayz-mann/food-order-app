import { Request, Response, NextFunction } from 'express';
import { FindVendor } from './adminController';
import { VendorLoginInputs, EditVendorInputs } from '../dto/vendor.dto';
import { GenerateSignature, ValidatePassword } from '../utility';
import { CreateFoodInputs } from '../dto/food.dto';
import { Food } from '../models/food';

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
export const updateVendorService = async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;
    if (user) {
        const existingVendor = await FindVendor(user._id);
        if (existingVendor !== null) {
            existingVendor.serviceAvailable = !existingVendor.serviceAvailable;
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
            const createdFood = await Food.create({
                vendorId: vendor._id,
                name: name,
                description: description,
                category: category,
                foodType: foodType,
                images: ['mock.png'],
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
       
    }
    return res.json({"message": "Foods information not found"})
    
}