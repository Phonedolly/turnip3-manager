import {
  AnimatePresence,
  animateValue,
  motion,
  useMotionValue,
} from "framer-motion";
import { createContext, memo, useContext, useState } from "react";
import { v4 as uuid } from "uuid";
import defaultVariants from "../variants/defaultVariants";
import Popup from "./Popup";
import BlogContext from "../contexts/BlogContext";
import CloseIcon from "./Icons/CloseIcon";
import IconWithTooltip from "./Icons/IconWithTooltip";

const springVariant = { type: "spring", duration: 0.5 };

const BlogUrl = () => {
  const { blog, openBlog } = useContext(BlogContext);
  return (
    <motion.div className="flex flex-row items-center gap-2">
      {/* <AnimatePresence>
        {openBlog === true ? (
          <motion.h2
            className="bg-neutral-200 text-xl font-bold px-1.5"
            variants={defaultVariants}
            initial="inital"
            animate="animate"
            exit="exit"
          >
            Link
          </motion.h2>
        ) : null}
      </AnimatePresence> */}
      <motion.h2
        className="text-md cursor-pointer rounded-md px-2 py-0.5 font-mono text-neutral-500 "
        transition={springVariant}
        animate={{
          backgroundColor:
            openBlog === false ? "rgb(255,255,255)" : "rgb(229,229,229)",
        }}
        whileHover={{
          scaleX: 1.05,
          scaleY: 1.1,
        }}
        layout
      >
        {blog.blogUrl}
      </motion.h2>
    </motion.div>
  );
};

const BlogContent = () => {
  const context = useContext(BlogContext);
  const { logoUrl, name: blogName } = context.blog;
  const { setOpenBlog } = context;
  return (
    <AnimatePresence>
      <motion.div
        className="flex h-full w-full flex-col p-4"
        variants={defaultVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      ></motion.div>
    </AnimatePresence>
  );
};

export default function Blog(props: { blog: IBlog }) {
  const { blog } = props;
  const [openBlog, setOpenBlog] = useState<boolean>(false);
  // const [transitioning, setTransitioning] = useState<boolean>(false);

  return (
    <div className="h-40 w-full cursor-pointer select-none">
      <BlogContext.Provider value={{ blog, openBlog, setOpenBlog }}>
        <div
          className={`h-full ${
            openBlog === false
              ? ` w-full p-4`
              : `fixed left-0 right-0 top-[50%] z-30 mx-auto flex max-h-96 max-w-2xl -translate-y-[40%] flex-col justify-center p-0`
          }`}
        >
          {/*  ${transitioning === true ? `z-30` : `z-0`} */}
          <motion.div
            className={`flex h-full w-full select-none flex-col justify-center overflow-hidden text-ellipsis rounded-3xl px-6 py-6 ${
              openBlog === false ? `cursor-pointer` : `cursor-default`
            } `}
            animate={{
              opacity: 1,
              scale: 1,
              rowGap: "0.75rem",
              backgroundColor: openBlog === false ? `#FFFFFF` : `#F5F5F5`,
              boxShadow:
                openBlog === false
                  ? "0px 6px 20px 5px rgba(0,0,0,0.16)"
                  : "0px 6px 24px 7px rgba(0,0,0,0.32)",
              wordBreak: "break-all",
            }}
            whileHover={{
              scale: openBlog === false ? 1.015 : 1,
              boxShadow:
                openBlog === false
                  ? "0px 6px 20px 5px rgba(0,0,0,0.16)"
                  : "0px 6px 24px 7px rgba(0,0,0,0.32)",
              wordBreak: "break-word",
              overflow: "visible",
            }}
            transition={springVariant}
            onClick={() => {
              // setTransitioning(true);
              setOpenBlog(!openBlog);
            }}
            layout
          >
            <motion.div
              className={`flex h-10 flex-row items-center justify-between ${
                openBlog === false ? ` ` : ``
              }`}
              layout
              transition={springVariant}
            >
              <motion.div className="flex h-full w-auto flex-row items-center gap-3">
                <motion.img
                  className="my-0.5 h-full w-auto py-0.5"
                  src={blog.logoUrl}
                  layout
                />
                <motion.h1
                  className={`font-bold ${
                    openBlog === false ? `text-2xl` : `text-3xl`
                  }`}
                  layout
                >
                  {blog.name}
                </motion.h1>
              </motion.div>
              {openBlog === true ? (
                <motion.div className="flex h-full flex-row items-center">
                  <IconWithTooltip
                    tooltipValue="Close"
                    onClick={() => setOpenBlog(false)}
                  >
                    <CloseIcon />
                  </IconWithTooltip>
                </motion.div>
              ) : null}
            </motion.div>
            <BlogUrl />
            {openBlog === true ? <BlogContent /> : null}
          </motion.div>
        </div>
      </BlogContext.Provider>
    </div>
  );
}
