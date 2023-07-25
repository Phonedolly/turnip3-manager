import { useState } from "react";
import { v4 as uuid } from "uuid";

import BlogsContext, { blogsLoader } from "./contexts/BlogsContext";

import TitleBar from "./components/TitleBar";
import Header from "./components/Header/Header";
import NavBar from "./components/NavBar";
import { Home } from "./pages/Home";
import GlobalStateContext from "./contexts/GlobalStateContext";
import ShowNavBarContext from "./contexts/ShowNavBarContext";

export default function App() {
  const [showNavBar, setIsShowNavBar] = useState<boolean>(false);
  const [curPost, setCurPost] = useState<IPost>({
    curBlog: blogsLoader()[0],
    curCategory: "앙녕",
    curDate: "2023-02-23",
    curTitle: "안녕하세요!",
  });
  return (
    <div className="h-screen w-screen">
      <TitleBar />
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center">
        <GlobalStateContext.Provider
          value={{
            blogs: blogsLoader(),
            curPost,
            setCurPost,
          }}
        >
          <ShowNavBarContext.Provider value={{ showNavBar, setIsShowNavBar }}>
            <NavBar />
            <Header />
          </ShowNavBarContext.Provider>
          <div className="h-[calc(100vh-2.75rem)] overflow-y-auto pt-16">
            <Home />
          </div>
        </GlobalStateContext.Provider>
      </div>
    </div>
  );
}
