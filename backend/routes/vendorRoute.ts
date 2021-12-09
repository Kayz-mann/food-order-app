import express, { Request, Response, NextFunction } from 'express';
import { createVendor } from '../controllers/adminController';

const router = express.Router();

router.post('/vendor', createVendor);

router.get('/', (req: Request, res: Response, next: NextFunction ) => {
    res.json({ message: "Hello vendor"});
})

export { router as vendorRoute };