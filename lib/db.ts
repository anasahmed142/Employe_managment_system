import mongoose from "mongoose";
const MongooseURI = process.env.MONGOOSE_URI!;
if (!MongooseURI) {
  throw new Error("MONGOOSE_URI is not defined in the environment variables.");
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
      bufferCommands: true, 
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000, // 5 seconds
      socketTimeoutMS: 30000,
    };

  mongoose.connect(MongooseURI, opts).then(() => mongoose.connection);

    try {
      cached.conn = await cached.promise;
    } catch (error) {
        cached.promise = null; // Reset promise on error
      console.error("Database connection error:", error);
      throw new Error("Failed to connect to the database.");
    }
  }
  return cached.conn;
}




// 1st Call → No Promise → Create New Connection
// 2nd Call → Promise Exists → Wait for 1st Call's Connection
// 3rd Call → Promise Exists → Wait for Same Connection