import mongoose, { ConnectOptions } from 'mongoose';

import { MONGO_URI } from '../config';


export default async () => {
    try {
       await mongoose.connect(MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            // useCreateIndex: true,
            // maxPoolSize: parseInt(process.env.POOL_SIZE!),
        }as ConnectOptions).then(result => {
            console.log('DB connected')
        }).catch(err => console.log('error' + err))

    } catch (ex) {
        console.log(ex)
    }
}






