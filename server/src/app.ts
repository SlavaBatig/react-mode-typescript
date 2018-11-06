import express, { json } from 'express';
import mongoose from 'mongoose';
import * as bodyParser from 'body-parser';
import { Routes } from '../routes/routes';

class App {
    public app: express.Application;
    public routes: Routes = new Routes();
    
    constructor() {
        this.app = express();
        this.config();
        this.routes.routes(this.app);
        mongoose.connect('mongodb://localhost/react', {
            useNewUrlParser: true
        });
        mongoose.set('useCreateIndex', true);
    }

    private config(): void {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({extended: true}));
    }
}

new App().app.listen(3000, () => {
    console.log('server is on 3000 port');
});