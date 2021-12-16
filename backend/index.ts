import express from 'express';
import bodyParser from 'body-parser';
import mongoose, { ConnectOptions } from 'mongoose';

import { adminRoute, vendorRoute } from './routes';
import { MONGO_URI } from './config';


const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use('/admin', adminRoute);
app.use('/vendor', vendorRoute);

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true,
    // maxPoolSize: parseInt(process.env.POOL_SIZE!),

}as ConnectOptions).then(result => {
    console.log('DB connected')
}).catch(err => console.log('error' + err))


app.listen(8000, () => {
    console.log('App is listening on port 8000');
})