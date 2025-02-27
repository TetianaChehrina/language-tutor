import { Schema, model } from 'mongoose';

const teachersSchema = new Schema(
  {
    name: String,
    surname: String,
    email: String,
    languages: [String],
    rating: Number,
    price_per_hour: Number,
    lessons_done: Number,
    avatar_url: String,
    teaching_approach: String,
    requirements: [String],
    reviews: [Object],
  },
  { timestamps: true },
);

export const Teacher = model('Teacher', teachersSchema);
