import mongoose, { Schema, Document } from "mongoose";

export interface Message extends Document {
  content: string;
  createdAt: Date;
}

const MessageSchema: Schema<Message> = new Schema({
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now(),
  },
});

export interface user {
  userName: String;
  email: string;
  password: string;
  verifyCode: string;
  verifycodeExpiry: string | any;
  isVerified: boolean;
  isAcceptedmessage: boolean;
  messages: Message[];
}

const userSchema: Schema<user> = new Schema({
  userName: {
    type: String,
    required: [true, "Username Required"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Email Required"],
    unique: true,
    match: [/.+|@..+/, "please use a valid email address"],
  },
  password: {
    type: String,
    required: [true, "Email password"],
  },
  verifyCode: {
    type: String,
    required: [true, "code is require "],
  },
  verifycodeExpiry: {
    type: String ,
    required: [true, "code expiry  "],
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  isAcceptedmessage: {
    type: Boolean,
    default: true,
  },
  messages:[MessageSchema]
});


const UserModel=(mongoose.models.User as mongoose.Model<user>) || (mongoose.model<user>("User",userSchema));

export default UserModel;