import { Request, Response, NextFunction } from 'express';
import { FindVendor } from './adminController';
import { VendorLoginInputs } from '../dto/vendor.dto';
import { GenerateSignature, ValidatePassword } from '../utility';

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
            return res.json(existingVendor);
        } else {
            return res.json({ "message": "Password is not valid" });
        }
    };
    return res.json({ "message": "Login credential not valid" });
};

export const getVendorProfile = async (req: Request, res: Response, next: NextFunction) => {

}

export const updateVendorProfile = async (req: Request, res: Response, next: NextFunction) => {
    
}
export const updateVendorService = async (req: Request, res: Response, next: NextFunction) => {
    
}