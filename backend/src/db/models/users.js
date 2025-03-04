import { Schema, model } from 'mongoose';

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
    },
    surname: {
      type: String,
      required: [true, 'Surname is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      enum: ['male', 'female'],
      required: [true, 'Gender is required'],
    },
    role: {
      type: String,
      enum: ['user', 'teacher'],
      required: [true, 'Role is required'],
    },
    avatar_url: {
      type: String,
      default: '',
    },

    languages: {
      type: [String],
      default: [],
    },
    levels: {
      type: [String],
      default: [],
    },
    rating: {
      type: Number,
      default: 0,
    },
    reviews: [
      {
        studentName: String,
        comment: String,
        rating: Number,
      },
    ],
    price_per_hour: {
      type: Number,
      default: 0,
    },
    lessons: {
      planned: [{ type: Schema.Types.ObjectId, ref: 'Lesson' }],
      completed: [{ type: Schema.Types.ObjectId, ref: 'Lesson' }],
    },
    lessons_done: {
      type: Number,
      default: 0,
    },
    teaching_approach: {
      type: String,
      default: '',
    },
    requirements: {
      type: [String],
      default: [],
    },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

export const User = model('User', userSchema);
export default User;
