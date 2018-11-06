import mongoose from 'mongoose';
const Schema = mongoose.Schema;

interface User {
    email: string,
    name?: string,
    passwordHash?: string
}

interface UserModel extends User, mongoose.Document {}

const userSchema = new Schema({
    email: { type: String, index: true, sparse: true },
    name: String,
    passwordHash: String
}, {
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt'}
});

userSchema.post('findOne', (error, doc, next) => {
    if(error.name === 'CastError') {
        next(new Error('Wrong id'));
    } else {
        next();
    }
});

userSchema.post('findOneAndUpdate', (error, doc, next) => {
    if(error.name === 'MongoError' && error.code === 11000) {
        next(new Error('There was a duplicate key error'));
    } else {
        next();
    }
});

userSchema.post('save', (error, doc, next) => {
    if(error.name === 'MongoError' && error.code === 11000) {
        next(new Error('There was a duplicate key error'));
    } else {
        next();
    }
});

export const User = mongoose.model<UserModel>('User', userSchema);