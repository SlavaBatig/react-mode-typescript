import * as mongoose from 'mongoose';
import { User } from '../models/user';
import { Request, Response } from 'express';

export class CrudService {
    public async getUser(req: Request, res: Response) {
        try {
            const user = await User.findById(req.params.id).lean().exec();
            res.json({
                user: user? user : null,
                result: 'OK'
            });
        } catch (err) {
            console.log(err);
            res.json({
                message: 'Error while searching for user',
                result: 'FAIL'
            });
        }
    }

    public async updateUser(req: Request, res: Response) {
        try {
            const { body } = req;
            const user = await User.findByIdAndUpdate(req.params.id, body, {new: true}).lean().exec();
            res.json({
                result: 'OK',
                message: 'User has been updated',
                user: user? user : null
            });
        } catch (err) {
            console.log(err);
            res.json({
                message: 'Error while updating user',
                result: 'FAIL'
            });
        }
    }

    public async deleteUser(req: Request, res: Response) {
        try {
            const user = await User.findByIdAndDelete(req.params.id).lean().exec();
            res.json({
                message: `${user.name} has been successfully deleted`,
                result: 'OK'
            });
        } catch (err) {
            console.log(err);
            res.json({
                message: 'Error while deleting user',
                result: 'FAIL'
            });
        }
    }

    public async getUsers(req: Request, res: Response) {
        console.log(new Date(), 'in /users');
        try {
            const users = await User.find({}).lean().exec();
            res.json({
                users: users.length > 0 ? users : [],
                result: 'OK'
            });
        } catch (err) {
            console.log(err);
            res.json({
                message: 'Erorr while searching for users',
                result: 'FAIL'
            });
        }
    }
}