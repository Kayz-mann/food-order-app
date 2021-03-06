import express, { Application } from 'express';
import path from 'path';

import { adminRoute, vendorRoute } from '../routes';
import { shoppingRoute } from '../routes/shoppingRoute';
import { customerRoute } from '../routes/customerRoute';
import { deliveryRoute } from '../routes/deliveryRoute';



export default async (app: Application) => {
    

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
   
const imagePath = path.join(__dirname, '../images');
    app.use('/images', express.static(imagePath));

    app.use(shoppingRoute); 
    app.use('/admin', adminRoute);
    app.use('/vendor', vendorRoute);
    app.use('/customer', customerRoute); 
    app.use('/delivery', deliveryRoute);
     

    return app;
}



