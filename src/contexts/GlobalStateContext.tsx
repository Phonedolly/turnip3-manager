import { createContext } from "react";
import { blogsLoader } from "./BlogsContext";

const GlobalStateContext = createContext<IGlobalState>({
  blogs: blogsLoader(),
  curPost: {
    curBlog: blogsLoader()[0],
    curCategory: "",
    curDate: "",
    curTitle: "",
  },
  setCurPost: () => {},
});

export default GlobalStateContext;
