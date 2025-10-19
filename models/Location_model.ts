
import mongoose, { Schema, Document, Model } from "mongoose";

export interface ILocation extends Document {
  employee: mongoose.Schema.Types.ObjectId;
  latitude: number;
  longitude: number;
  timestamp: Date;
}

const LocationSchema: Schema = new mongoose.Schema({
  employee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  latitude: {
    type: Number,
    required: true,
  },
  longitude: {
    type: Number,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const Location: Model<ILocation> =
  mongoose.models.Location || mongoose.model<ILocation>("Location", LocationSchema);

export default Location;
