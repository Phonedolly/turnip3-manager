import { useContext, useEffect, useState } from "react";
import { v4 as uuid } from "uuid";

import { motion, AnimatePresence, useAnimate, animate } from "framer-motion";
import HeaderContentForNotWriting from "./HeaderContentForNotWriting";
import HeaderContentForWriting from "./HeaderContentForWriting";
import { useMonaco } from "@monaco-editor/react";
import Turnip3Theme from "./Writer/MonacoEditor/Turnip3Theme";
import BlogsContext from "../../contexts/BlogsContext";

export default function Header(props: {
  setShowNavBar: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const tempBlog: Blog = {
    blogUrl: "https://github.com",
    id: "044aa503-a561-4af9-8e74-17d4cd508615",
    logoUrl:
      "data:image/svg+xml,%3Csvg version='1.0' id='Layer_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 64 64' enable-background='new 0 0 64 64' xml:space='preserve' fill='%23000000'%3E%3Cg id='SVGRepo_bgCarrier' stroke-width='0'%3E%3C/g%3E%3Cg id='SVGRepo_tracerCarrier' stroke-linecap='round' stroke-linejoin='round'%3E%3C/g%3E%3Cg id='SVGRepo_iconCarrier'%3E%3Cg%3E%3Ccircle fill='%23F76D57' cx='32' cy='32' r='24'%3E%3C/circle%3E%3Cg%3E%3Cpath fill='%23394240' d='M32,0C14.328,0,0,14.328,0,32s14.328,32,32,32s32-14.328,32-32S49.672,0,32,0z M32,56 C18.746,56,8,45.254,8,32S18.746,8,32,8s24,10.746,24,24S45.254,56,32,56z'%3E%3C/path%3E%3Cpath fill='%23394240' d='M36,30.344V16c0-2.211-1.789-4-4-4s-4,1.789-4,4v16c0,0.523,0.105,1.039,0.309,1.527 c0.203,0.492,0.496,0.938,0.867,1.305l7.934,7.934c1.566,1.566,4.168,1.645,5.734,0.078c1.562-1.562,1.582-4.074,0.016-5.641 L36,30.344z'%3E%3C/path%3E%3C/g%3E%3C/g%3E%3C/g%3E%3C/svg%3E",
    name: "temp blog",
  };

  const { setShowNavBar } = props;
  const blogs = useContext(BlogsContext);

  // const [settingBtnScope, animateSettingBtn] = useAnimate();
  // const [closeBtnScope, animateCloseBtn] = useAnimate();
  // const [userBtnScope, animateUserBtn] = useAnimate();
  const [writingPost, setWritingPost] = useState<boolean>(false);
  const [curPost, setCurPost] = useState<IPost>({
    curBlog: blogs[0],
    curCategory: "",
    curDate: "",
    curTitle: "",
  });
  const [headerScope, animateHeader] = useAnimate();

  const monaco = useMonaco();
  useEffect(() => {
    if (!monaco) {
      return;
    }
    monaco.editor.defineTheme("turnip3", Turnip3Theme);
    monaco.editor.setTheme("turnip3");
  }, [monaco]);

  return (
    <div
      className={`fixed left-0 right-0 top-8 z-10 flex h-auto flex-row justify-center`}
    >
      {/* Header */}
      <motion.div
        className={`absolute top-0 mx-auto my-6 flex h-[90vh] w-[80vw] max-w-[42rem] justify-center rounded-2xl bg-white/50 backdrop-blur-xl`}
        initial={{
          opacity: 0,
          width: "80vw",
          maxWidth: "42rem",
          boxShadow: "0px 0px 16px 2px rgba(0,0,0,0.15)",
        }}
        animate={{
          opacity: 1,
          height: writingPost === false ? "3rem" : "90vh",
          width: writingPost === false ? "80vw" : "95vw",
          maxWidth: writingPost === false ? "42rem" : "95vw",
          // display: writingPost === false ? "static" : "relative",
          top: writingPost === false ? 0 : "-0.5rem",
          transition: { duration: 0.5, type: "spring" },
        }}
        onMouseEnter={() => {
          if ((writingPost === true) === false) {
            return;
          }
          animate(headerScope.current, {
            boxShadow: "0px 0px 24px 4px rgba(0,0,0,0.3)",
            scale: 1.01,
          });
        }}
        onMouseLeave={() => {
          if (writingPost === true) {
            return;
          }
          animate(
            headerScope.current,
            {
              boxShadow: "0px 0px 16px 2px rgba(0,0,0,0.15)",
              scale: 1.0,
            },
            {}
          );
        }}
        ref={headerScope}
        layout
      >
        {writingPost === true ? (
          <HeaderContentForWriting
            setCurPost={setCurPost}
            curPost={curPost}
            setWritingPost={setWritingPost}
          />
        ) : (
          <HeaderContentForNotWriting
            setShowNavBar={setShowNavBar}
            setWritingPost={setWritingPost}
          />
        )}
      </motion.div>
    </div>
  );
}
