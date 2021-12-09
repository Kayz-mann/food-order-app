import express, { Request, Response, NextFunction } from 'express';
import { createVendor, getVendor, getVendorById } from '../controllers/adminController';

const router = express.Router();

router.post('/admin', createVendor);
router.get('/vendor', getVendor);
router.post('/vendor/:id', getVendorById);

router.get('/', (req: Request, res: Response, next: NextFunction ) => {
    res.json({ message: "Hello admin"});
})


export { router as adminRoute };