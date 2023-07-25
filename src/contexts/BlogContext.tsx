import { createContext } from "react";

const BlogContext = createContext<{
  blog: IBlog;
  openBlog: boolean;
  setOpenBlog: React.Dispatch<React.SetStateAction<boolean>>;
}>({} as any);

export default BlogContext;
