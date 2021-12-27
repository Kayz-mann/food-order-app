import express, { Request, Response, NextFunction } from 'express';
import { createVendor, getVendors, getVendorById, getTransactions, getTransactionById, verifyDeliveryUser, getDeliveryUsers } from '../controllers';

const router = express.Router();

router.post('/vendor', createVendor);
router.get('/vendor', getVendors);
router.post('/vendor/:id', getVendorById);

router.get('/transactions', getTransactions);
router.get('/transaction/:id', getTransactionById);

router.put('/delivery/verify', verifyDeliveryUser);
router.get('/delivery/users', getDeliveryUsers);

router.get('/', (req: Request, res: Response, next: NextFunction) => {
    res.json({ message: "Hello admin" });
});


export { router as adminRoute };