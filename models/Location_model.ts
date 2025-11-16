import mongoose, { Schema, Model, Document, Types } from 'mongoose';

// Interface matching the schema, including nested properties and timestamps
export interface ILocation extends Document {
  user: Types.ObjectId;
  LocationTypes: string;
  location: {
    latitude: number;
    longitude: number;
    accuracy: number;
    photo?: string;
  };
  createdAt: Date;
  updatedAt: Date;
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
  timestamps: true, // Ensures createdAt and updatedAt are available
});

// Singleton pattern to prevent model re-compilation
const Location: Model<ILocation> = mongoose.models.Location || mongoose.model<ILocation>('Location', LocationSchema);

export default Location;
