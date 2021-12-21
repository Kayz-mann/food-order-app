import express, { Request, Response, NextFunction } from 'express';
import { Vendor } from '../../src/models';
import { FoodDoc } from '../../src/models/food';

export const getFoodAvailability = async (req: Request, res: Response, next: NextFunction) => {
    const pinCode = req.params.pinCode;
    const result = await Vendor.find({ pincode: pinCode, serviceAvailable: false })
        .sort([['rating', 'descending']])
        .populate("foods");
   
    if (result.length > 0) {
        return res.status(200).json(result)
    }
    return res.status(400).json({ message: "Data not found!" });
};

export const getTopRestaurants = async (req: Request, res: Response, next: NextFunction) => {
    const pinCode = req.params.pinCode;
    const result = await Vendor.find({ pincode: pinCode, serviceAvailable: false })
        .sort([['rating', 'descending']])
        .limit(10)
   
    if (result.length > 0) {
        return res.status(200).json(result)
    }
    return res.status(400).json({ message: "Data not found!" });
};

export const getFoodIn30Min = async (req: Request, res: Response, next: NextFunction) => {
    const pinCode = req.params.pinCode;
    const result = await Vendor.find({ pincode: pinCode, serviceAvailable: false })
        .populate("foods");
   
    if (result.length > 0) {
        let foodResult: any = [];

        result.map(vendor => {
            const foods = vendor.foods as [FoodDoc]
            foodResult.push(...foods.filter(food => food.readyTime <= 30));
        })
        return res.status(200).json(foodResult);
    }
    return res.status(400).json({ message: "Data not found!" });
};

export const searchFoods = async (req: Request, res: Response, next: NextFunction) => {
    const pinCode = req.params.pinCode;
    const result = await Vendor.find({ pincode: pinCode, serviceAvailable: false })
        .populate("foods");
   
    if (result.length > 0) {
        let foodResult: any = [];
        result.map(item => foodResult.push(...item.foods));

        return res.status(200).json(result)
    }
    return res.status(400).json({ message: "Data not found!" });
};

export const getRestaurantById = async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const result = await Vendor.findById(id).populate("foods");
   
    if (result) {
      return res.status(200).json(result)
    }
    return res.status(400).json({ message: "Data not found!" });
};