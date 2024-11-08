import mongoose from "mongoose";
import { MongoPlain } from "@/lib/types";
export interface BlogDocument extends mongoose.Document {
  name: string;
  content: string;
  createdAt: number;
  updatedAt: number;
  publishedAt: number;
  slug: "";
  views: 0;
  published: true;
  author: string;
  image: string;
}

export type Blog = MongoPlain<BlogDocument>;

const BlogSchema = new mongoose.Schema<Blog>({
  name: {
    type: String,
    required: true,
  },
  views: {
    type: Number,
    required: false,
  },
  image: {
    type: String,
    required: false,
  },
  content: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Number,
    default: () => Date.now(),
  },
  updatedAt: {
    type: Number,
    default: () => Date.now(),
  },
  publishedAt: {
    type: Number,
    default: () => Date.now(),
  },
  published: { type: Boolean, default: true },
});

export const BlogModel =
  mongoose.models.Blog || mongoose.model<Blog>("Blog", BlogSchema, "blogs");
