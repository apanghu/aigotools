import { Blog } from "@/models/blog";

export const createTemplateBlog = (blog: Partial<Blog> = {}) => {
  const newBlog: Omit<Blog, "_id"> = {
    title: "",
    author: "",
    content: "",
    category: "",
    views: 0,
    featured: false,
    createdAt: Date.now(),
    updatedAt: Date.now(),
    publishedAt: Date.now(),
  };

  return {
    ...newBlog,
    ...blog,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  } as Blog;
};
