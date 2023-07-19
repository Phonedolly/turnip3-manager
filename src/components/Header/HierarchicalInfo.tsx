import { AnimatePresence, Variants, motion } from "framer-motion";
import { memo, useCallback, useMemo, useState } from "react";
import { v4 as uuid } from "uuid";
import RightArrow from "./RightArrow";

interface IHierarchicalInfo {
  curTitle: string;
  curCategory: string;
  curBlogName: string;
}

export default function HierarchicalInfo(props: IHierarchicalInfo) {
  const { curTitle, curBlogName, curCategory } = props;

  const defaultVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { delayChildren: 1, staggerChildren: 0.5 },
    },
    exit: { opacity: 0 },
  };
  const HiearchicalBox = (props: { boxName: string; boxValue: string }) => {
    const [isHover, setIsHover] = useState<boolean>(false);
    // console.log(curPost.initiate);
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
            className="overflow-hidden text-ellipsis whitespace-nowrap text-xs sm:max-w-[5rem] md:max-w-[9rem] lg:max-w-[12rem] xl:max-w-[15rem] 2xl:max-w-[18rem]"
            key={uuid()}
          >
            {props.boxValue}
          </h1>
        </motion.div>

        {isHover === true ? (
          <motion.span
            className="absolute top-8 flex w-full flex-row items-center justify-center"
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
            <div className="absolute top-0.5 break-all rounded-lg bg-neutral-100 px-2.5  py-1 text-xs text-neutral-700 shadow-[0px_1.8px_10px_2.5px_rgba(0,0,0,0.2)]">
              <h1 className="font-bold">{props.boxValue}</h1>
            </div>
          </motion.span>
        ) : null}
      </div>
    );
  };
  const mustEqual = () => true;

  return (
    <motion.div
      className="z-10 flex h-12 flex-row items-center px-1"
      // variants={defaultVariants}
      // initial="hidden"
      // animate="visible"
      exit="exit"

    >
      <HiearchicalBox boxName="CATEGORY" boxValue={curBlogName} />
      <RightArrow />
      <HiearchicalBox boxName="CATERGORY" boxValue={curCategory} />
      <RightArrow       key={uuid()}/>
      <HiearchicalBox
        boxName="TITLE"
        boxValue={curTitle}
        // key={uuid()}
      />
    </motion.div>
  );
}
