import { useState } from "react";
import { v4 as uuid } from "uuid";

import BlogsContext, { blogsLoader } from "./contexts/BlogsContext";

import TitleBar from "./components/TitleBar";
import Header from "./components/Header/Header";
import NavBar from "./components/NavBar";
import { Home } from "./pages/Home";

export default function App() {
  const [showNavBar, setShowNavBar] = useState<boolean>(false);

  return (
    <div className="h-screen w-screen">
      <TitleBar />
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center">
        <BlogsContext.Provider value={blogsLoader()}>
          <NavBar showNavBar={showNavBar} setShowNavBar={setShowNavBar} />
          <Header setShowNavBar={setShowNavBar} />
          <div className="h-[calc(100vh-2.75rem)] overflow-y-auto pt-16">
            <Home />
          </div>
        </BlogsContext.Provider>
      </div>
    </div>
  );
}
