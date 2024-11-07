import mongoose from "mongoose";
import { MongoPlain } from "@/lib/types";
export interface BlogDocument extends mongoose.Document {
  name: string;
  content: string;
  createdAt: number;
  updatedAt: number;
  publishedAt: number;
  category: "";
  views: 0;
  featured: false;
  author: string;
  icon: string;
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
  icon: {
    type: String,
    required: false,
  },
  content: {
    type: String,
    required: true,
  },
  category: {
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
  featured: { type: Boolean, default: false },
});

export const BlogModel =
  mongoose.models.Blog || mongoose.model<Blog>("blogs", BlogSchema, "blogs");
