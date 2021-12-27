import { Request, Response, NextFunction  } from "express";
import { CreateVendorInput } from '../dto';
import { DeliveryUser, Vendor } from "../models";
import { Transaction } from "../models/transaction";
import { GeneratePassword, GenerateSalt } from "../utility";

export const FindVendor = async (id: string | undefined, email?: string) => {
    if (email) {
        return await Vendor.findOne({ email: email });
    } else {
        return await Vendor.findById(id);
    };
};

export const createVendor = async (req: Request, res: Response, next: NextFunction) => {
    const { name, address, pinCode, email, password, ownerName, phone } = <CreateVendorInput>req.body;

    const existingVendor = await FindVendor('', email);
    if (existingVendor !== null) {
        return res.json({ "message": "A vendor already exists with this email" })
    };

    // generate salt
    const salt = await GenerateSalt();
    const userPassword = await GeneratePassword(password, salt);

    const createVendor = await Vendor.create({
        name: name,
        address: address,
        pinCode: pinCode,
        email: email,
        password: userPassword,
        salt: salt,
        ownerName: ownerName,
        phone: phone,
        rating: 0,
        serviceAvailable: false,
        coverImages: [],
        foods: [],
        lat: 0,
        lng: 0
    });

    return res.json(createVendor);

};

export const getVendors = async (req: Request, res: Response, next: NextFunction) => {
    const vendors = await Vendor.find()
    if (vendors !== null) {
        return res.json(vendors)
    }
    return res.json({ "message": "vendors data not available" });
};

export const getVendorById = async (req: Request, res: Response, next: NextFunction) => {
    const vendorId = req.params.id;
    const vendor = await FindVendor(vendorId);

    if (vendor !== null) {
        return res.json(vendor);
    };
    return res.json({ "message": "vendors data not available" });
};

export const getTransactions = async (req: Request, res: Response, next: NextFunction) => {
    const transactions = await Transaction.find();
    
    if (transactions) {
        return res.status(200).json(transactions);
    }
    return res.json({ "message": "Transaction not available" });
};

export const getTransactionById = async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const transactions = await Transaction.find();
    
    if (transactions) {
        return res.status(200).json(transactions);
    }
    return res.json({ "message": "Transaction not available" });
};


export const verifyDeliveryUser = async (req: Request, res: Response, next: NextFunction) => {
    const { _id, status } = req.body;

    if (_id) {
        const profile = await DeliveryUser.findById(_id);

        if (profile) {
            profile.verified = status;

            const result = await profile.save();

            return res.status(200).json(result);
        }
    }

    return res.status(400).json({ "message": "Unable to verify delivery user" });
}

export const getDeliveryUsers = async (req: Request, res: Response, next: NextFunction) => {
    const deliveryUsers = await DeliveryUser.find();

    if (deliveryUsers) {
        return res.status(200).json(deliveryUsers);
    }

    return res.status(400).json({ "message": "Unable to fetch delivery users" });
}