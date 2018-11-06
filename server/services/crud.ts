import * as mongoose from 'mongoose';
import { User } from '../models/user';
import { Request, Response } from 'express';

export class CrudService {
    public async getUser(req: Request, res: Response) {
        try {
            const user = await User.findById(req.params.id).lean().exec();
            res.json({
                user: user? user : null
            });
        } catch (err) {
            console.log(err);
            res.json({user: null});
        }
    }

    public async updateUser(req: Request, res: Response) {
        try {
            const { body } = req;
            const user = await User.findByIdAndUpdate(req.params.id, body, {new: true}).lean().exec();
            res.json({
                user: user? user : null
            });
        } catch (err) {
            console.log(err);
            res.json({message: 'error'});
        }
    }

    public async getUsers(req: Request, res: Response) {
        console.log(new Date(), 'in /users');
        const users = await User.find({}).lean().exec();
        res.json({
            users: users.length > 0 ? users : []
        });
    }
}