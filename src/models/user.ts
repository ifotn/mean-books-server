import mongoose, { Schema, Model } from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose';

interface User {
    username: string;
    password: string;
    // methods used for controller
    setPassword(password: string): any;
    authenticate(password: string): any;
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

// model "plugs in" or extends passport-local-mongoose so it inherits all its methods
userSchema.plugin(passportLocalMongoose as any);

const User = mongoose.model<User, UserModel>('User', userSchema);
export default User;