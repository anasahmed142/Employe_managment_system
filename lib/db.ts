import mongoose from 'mongoose';

import "@/models/User_model";
import "@/models/Location_model";

const MongooseURI = process.env.MONGOOSE_URI!;

if (!MongooseURI) {
  throw new Error('Please define the MONGOOSE_URI environment variable inside .env.local');
}


let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function connectionToDatabase() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MongooseURI, opts).then((mongoose) => {
      return mongoose.connection;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}
