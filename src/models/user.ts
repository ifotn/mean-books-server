import mongoose, { Schema, Model } from 'mongoose';

interface User {
    username: string;
    password: string;
}

// we need to inherit methods of Mongoose model
interface UserModel extends Model<User> {
    createStrategy(): any;
    serializeUser(): any;
    deserializeUser(): any;
}

const userSchema = new Schema<User>({
    username: {
        type: String,
        required: [true, 'Username is Required'],
        trim: true,
        minLength: 6
    },
    password: {
        type: String,
        trim: true,
        minLength: 8
    }
});

const User = mongoose.model<User, UserModel>('User', userSchema);
export default User;