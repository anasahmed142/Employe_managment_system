
import mongoose, { Schema, Model, Document } from 'mongoose';

interface ILocation extends Document {
  user: mongoose.Schema.Types.ObjectId;
  location: {
    latitude: number;
    longitude: number;
    accuracy: number;
  };
  photo: string | null;
}

const LocationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  LocationTypes: {
    type: String,
    required: true,
  },
  location: {
    latitude: {
      type: Number,
      required: true,
    },
    longitude: {
      type: Number,
      required: true,
    },
    accuracy: {
      type: Number,
      required: true,
    },
    photo: {
      type: String,
      required: false,
    },
  },
}, {
  timestamps: true,
});

const Location: Model<ILocation> = mongoose.models.Location || mongoose.model<ILocation>('location', LocationSchema);

export default Location;
