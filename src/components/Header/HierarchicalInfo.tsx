import { AnimatePresence, Variants, motion } from "framer-motion";
import { memo, useCallback, useContext, useMemo, useState } from "react";
import { v4 as uuid } from "uuid";
import RightArrow from "./RightArrow";
import GlobalStateContext from "../../contexts/GlobalStateContext";

interface IHierarchicalInfo {
  curTitle: string;
  curCategory: string;
  curBlogName: string;
}

const defaultVariants: Variants = {
  hidden: { opacity: 0, x: "-1.5rem" },
  animate: {
    x: "0rem",
    opacity: 1,
    transition: { delayChildren: 1, staggerChildren: 0.5, delay: 0.3 },
  },
  exit: { opacity: 0 },
};

const HiearchicalBox = memo((props: { boxName: string; boxValue: string }) => {
  const [isHover, setIsHover] = useState<boolean>(false);
  return (
    <div className="relative">
      <motion.div
        className="flex h-7 cursor-pointer select-none flex-row items-center gap-1.5 rounded-lg bg-neutral-200/60 px-2 py-1"
        initial={{ opacity: 0, x: "2rem" }}
        animate={{ opacity: 1, x: "0rem" }}
        whileHover={{
          backgroundColor: "rgb(240,240,240)",
          color: "rgb(163,163,163)",
          scale: 0.985,
          boxShadow: "0px 2.5px 4px 2px rgba(0,0,0,0.12)",
          transition: { duration: 0.1 },
        }}
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
      >
        <h1
          className={`text-xs font-bold ${
            isHover ? `text-neutral-500` : `text-neutral-600`
          }`}
          key={uuid()}
        >
          {props.boxName.toUpperCase()}
        </h1>
        <h1 className="text-md text-neutral-600" key={uuid()}>
          |
        </h1>
        <h1
          className="overflow-hidden text-ellipsis whitespace-nowrap text-xs sm:max-w-[4rem] md:max-w-[6rem] lg:max-w-[9rem] xl:max-w-[12rem] 2xl:max-w-[15rem]"
          key={uuid()}
        >
          {props.boxValue}
        </h1>
      </motion.div>
      <AnimatePresence>
        {isHover === true ? (
          <motion.span
            className="absolute left-0 right-0 top-8 flex w-auto flex-row items-center justify-center"
            initial={{ opacity: 0, y: "-0.5rem" }}
            animate={{
              opacity: 1,
              y: "0rem",
              transition: { delay: 0.03, duration: 0.125 },
            }}
            exit={{
              opacity: 0,
              y: "-0.5rem",
            }}
          >
            <div className="absolute top-0.5  rounded-lg bg-neutral-50 px-2.5 py-1  text-center text-xs text-neutral-700 shadow-[0px_1.8px_10px_2.5px_rgba(0,0,0,0.2)]">
              <h1 className="font-bold">{props.boxValue}</h1>
            </div>
          </motion.span>
        ) : null}
      </AnimatePresence>
    </div>
  );
});

function HierarchicalInfo() {
  const globalState = useContext(GlobalStateContext);
  const { name: curBlogName } = globalState.curPost.curBlog;
  const { curCategory, curTitle } = globalState.curPost;

  return (
    <AnimatePresence>
      <motion.div
        className=" z-10 mx-0.5 flex h-12 flex-row items-center px-1"
        variants={defaultVariants}
        initial="hidden"
        animate="animate"
        exit="exit"
      >
        <HiearchicalBox boxName="BLOG" boxValue={curBlogName} />
        <RightArrow />
        <HiearchicalBox boxName="CATERGORY" boxValue={curCategory} />
        <RightArrow />
        <HiearchicalBox
          boxName="TITLE"
          boxValue={curTitle}
          // key={uuid()}
        />
      </motion.div>
    </AnimatePresence>
  );
}

export default memo(HierarchicalInfo);
