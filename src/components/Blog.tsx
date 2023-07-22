import {
  AnimatePresence,
  animateValue,
  motion,
  useMotionValue,
} from "framer-motion";
import { useContext, useState } from "react";
import { v4 as uuid } from "uuid";
import defaultVariants from "../variants/defaultVariants";

export default function Blog(props: { blog: IBlog }) {
  const { blog } = props;
  const [openBlog, setOpenBlog] = useState<boolean>(false);
  const [transitioning, setTransitioning] = useState<boolean>(false);

  return (
    <div className="relative flex h-40 w-[20rem] cursor-pointer select-none flex-col items-center justify-center ">
      <div
        className={`${
          openBlog === false
            ? ` w-full ${transitioning === true ? `absolute z-30` : ``}`
            : `fixed bottom-0 left-0 right-0 top-28 z-30 mx-auto max-w-2xl p-4`
        }`}
      >
        <motion.div
          className={`flex h-full w-full cursor-pointer select-none flex-col justify-center overflow-hidden text-ellipsis rounded-3xl px-6 py-6`}
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
          whileHover={
            openBlog === true
              ? {
                  scale: 1.015,
                  boxShadow: "0px 6px 28px 7px rgba(0,0,0,0.24)",
                  wordBreak: "break-word",
                  overflow: "visible",
                }
              : {}
          }
          transition={{ duration: 0.6, type: "spring" }}
          onTransitionEnd={() => {
            if (openBlog === false) {
              setTransitioning(false);
            }
          }}
          onClick={() => {
            setTransitioning(true);
            setOpenBlog(!openBlog);
          }}
          layout
        >
          <AnimatePresence>
            {openBlog === false ? (
              <motion.div
                variants={defaultVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                key={uuid()}
                layout
              >
                <motion.div
                  className="flex flex-row items-center gap-2"
                  layout
                  key={uuid()}
                >
                  <motion.img
                    className="my-0.5 h-10 w-10 py-0.5"
                    src={blog.logoUrl}
                    key={uuid()}
                    layout
                  />
                  <motion.h1 className="text-2xl font-bold" layout key={uuid()}>
                    {blog.name}
                  </motion.h1>
                </motion.div>
                <motion.h2
                  className="text-md font-mono text-neutral-500"
                  layout
                  key={uuid()}
                >
                  {blog.blogUrl}
                </motion.h2>
              </motion.div>
            ) : (
              <motion.div
                initial="initial"
                animate="animate"
                exit="exit"
                key={uuid()}
                layout
              >
                1212
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
