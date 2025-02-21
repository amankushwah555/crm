import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
export type UserType  = {
    _id: string;
    name: string;
    email: string;
    phone: string;
    company_name: string;
    designation: string;
}

const userSchema  = new mongoose.Schema({
    email: {type: String,  unique: true},
    name: {type:String },
    phone:{type : String },
    company_name: {type: String },
    designation: {type : String}
});


const User = mongoose.model<UserType>("User", userSchema)

export default User;

