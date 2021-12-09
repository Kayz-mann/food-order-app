import { Request, Response, NextFunction  } from "express";
import { CreateVendorInput } from '../dto/vendor.dto';
import { Vendor } from "../models";

export const createVendor = async (req: Request, res: Response, next: NextFunction) => {
    const { name, address, pinCode, email, password, ownerName, phone } = <CreateVendorInput>req.body;

    const existingVendor = await Vendor.findOne({ email: email })
    if (existingVendor !== null) {
        return res.json({ "message": "A vendor already exists with this email"})
    }

    const createVendor = await Vendor.create({
        name: name,
        address: address,
        pinCode: pinCode,
        email: email,
        password: password,
        salt: '',
        ownerName: ownerName,
        phone: phone,
        rating: 0,
        serviceAvailable: false,
        coverImages: [],
    })

    return res.json({createVendor})

}

export const getVendor = async (req: Request, res: Response, next: NextFunction) => {
    
}

export const getVendorById = async(req: Request, res: Response, next: NextFunction) => {
    
}