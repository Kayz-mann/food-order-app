import express from 'express';
import App from './services/expressApp';
import dbConnection from './services/database';
import { PORT } from './config';



const StartServer = async () => {
    const app = express();
    await dbConnection();
    await App(app);

    app.listen(PORT, () => {
        console.log(`Listening to port ${PORT}`);
    });
}

StartServer();