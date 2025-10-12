import mongoose, { Schema, Model } from "mongoose";
import bcrypt from "bcryptjs";
import jwt, { Secret, SignOptions } from "jsonwebtoken";




export interface IUser {
  name: string;
  email: string;
  password: string;
  refreshToken?: string;
  status: 'online' | 'offline';
  role: 'employee' | 'admin';
  deletedAt?: Date | null;
  generateAccessToken: () => string;
  generateRefreshToken: () => string;
   comparePassword(candidatePassword: string): Promise<boolean>;
}
const accessTokenSecret: string = process.env.ACCESS_TOKEN_SECRET! ;

const accessTokenExpiry: string | number = process.env.ACCESS_TOKEN_EXPIRY || "1h";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters'],
  },
  status: {
    type: String,
    enum: ['online', 'offline'],
    default: 'offline',
  },
  role: {
    type: String,
    enum: ['employee', 'admin'],
    default: 'employee',
  },
}, {
  timestamps: true,
});

// Pre-save hook to hash password
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err as Error);
  }
});

// Schema method to compare password
UserSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  if (!this.password) {
    throw new Error("Password not selected in query. Use +password in query.");
  }
  return bcrypt.compare(candidatePassword, this.password);
};
UserSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      name: this.name,
      email: this.email,
       role : this.role
    },
    accessTokenSecret as Secret,
    {
      expiresIn: accessTokenExpiry,
    } as SignOptions
  );
};
UserSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET || "",
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY || "7d",
    } as SignOptions
  );
};

const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

export default User;
