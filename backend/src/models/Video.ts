import mongoose, { Document, Schema } from 'mongoose';

export interface IVideo extends Document {
  courseId: mongoose.Types.ObjectId;
  title: string;
  description: string;
  videoUrl: string;
  thumbnail?: string;
  duration: number; // in seconds
  order: number; // lesson order
  isPublished: boolean;
  views: number;
  createdAt: Date;
  updatedAt: Date;
}

const VideoSchema: Schema = new Schema({
  courseId: {
    type: Schema.Types.ObjectId,
    ref: 'Course',
    required: true,
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
  },
  videoUrl: {
    type: String,
    required: true,
    trim: true,
  },
  thumbnail: {
    type: String,
    trim: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  order: {
    type: Number,
    required: true,
  },
  isPublished: {
    type: Boolean,
    default: false,
  },
  views: {
    type: Number,
    default: 0,
  },
}, {
  timestamps: true,
});

export default mongoose.model<IVideo>('Video', VideoSchema);
