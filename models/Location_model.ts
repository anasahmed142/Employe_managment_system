
import mongoose, { Schema, Model, Document } from 'mongoose';

interface ILocation extends Document {
  user: mongoose.Schema.Types.ObjectId;
  photo: string;
  location: {
    latitude: number;
    longitude: number;
    accuracy: number;
  };
}

const LocationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  photo: {
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
  },
}, {
  timestamps: true,
});

const Location: Model<ILocation> = mongoose.models.Location || mongoose.model<ILocation>('Location', LocationSchema);

export default Location;
