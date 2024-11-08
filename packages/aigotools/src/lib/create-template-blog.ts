import { Blog } from "@/models/blog";

export const createTemplateBlog = (blog: Partial<Blog> = {}) => {
  const newBlog: Omit<Blog, "_id"> = {
    name: "",
    image: "",
    author: "",
    content: "",
    slug: "",
    views: 0,
    published: true,
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
