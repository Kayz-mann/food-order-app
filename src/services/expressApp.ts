import express, { Application } from 'express';
import path from 'path';

import { adminRoute, vendorRoute } from '../routes';
import { shoppingRoute } from '../routes/shoppingRoute';
import { customerRoute } from '../routes/customerRoute';



export default async (app: Application) => {
    

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/images', express.static(path.join(__dirname, 'images')))

    app.use(shoppingRoute); 
    app.use('/admin', adminRoute);
    app.use('/vendor', vendorRoute);
    app.use('/user', customerRoute); 
     

    return app;
}



