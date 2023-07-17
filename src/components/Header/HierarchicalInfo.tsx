import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

export default function HierarchicalInfo(props: {
  curBlog: Blog;
  mdxTitle: string;
}) {
  const [hoverOnBlog, setHoverOnBlog] = useState<boolean>(false);
  const [hoverOnCategory, setHoverOnCategory] = useState<boolean>(false);
  const [hoverOnTitle, setHoverOnTitle] = useState<boolean>(false);
  const hovers = [
    { value: hoverOnBlog, setter: setHoverOnBlog },
    { value: hoverOnCategory, setter: setHoverOnCategory },
    { value: hoverOnTitle, setter: setHoverOnTitle },
  ];
  console.log(hovers);

  const { curBlog, mdxTitle } = props;
  const data = [
    ["BLOG", curBlog.name, 0],
    ["RIGHTARROW", "", 0],
    ["CATEGORY", "루머", 1],
    ["RIGHTARROW", "", 0],
    ["TITLE", mdxTitle, 2],
  ] as const;
  return (
    <div className="z-10 flex flex-row items-center px-1">
      {data.map((el, i) =>
        el[0] === "RIGHTARROW" ? (
          <motion.svg
            className="h-9 w-9 p-2"
            initial={{ opacity: 0, x: "-1rem" }}
            animate={{
              opacity: 1,
              x: "0rem",
              transition: { delay: 0.2 },
            }}
            whileHover={{ x: "0.3rem", scale: 1.3 }}
            xmlns="http://www.w3.org/2000/svg"
            width="800"
            height="800"
            fill="none"
            stroke="#404040"
            strokeWidth="0.72"
            viewBox="0 0 24 24"
          >
            {/* https://www.svgrepo.com/svg/510166/right-chevron */}
            <path
              fill="#404040"
              fillRule="evenodd"
              d="M8.293 4.293a1 1 0 011.414 0l7 7a1 1 0 010 1.414l-7 7a1 1 0 01-1.414-1.414L14.586 12 8.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            ></path>
          </motion.svg>
        ) : (
          <motion.div
            className="flex h-7 cursor-pointer select-none flex-row items-center gap-1.5 rounded-lg bg-neutral-200/60 px-2 py-1"
            initial={{ opacity: 0, x: "-1rem" }}
            animate={{
              opacity: 1,
              x: "0rem",
              transition: { delay: 0.2 },
            }}
            whileHover={{
              // scaleY: 1.01,
              // scaleX: 1.01,
              // backgroundColor: "rgb(240,240,240)",
              color: "rgb(150,150,150)",
              scale: 0.97,
              // boxShadow: "0px 2.5px 5px 3px rgba(0,0,0,0.15)",
              transition: { duration: 0.1 },
            }}
            onMouseEnter={() => hovers[el[2]].setter(true)}
            onMouseLeave={() => hovers[el[2]].setter(false)}
          >
            <h1 className="text-xs font-bold text-neutral-600">{el[0]}</h1>
            <h1 className="text-md text-neutral-600">|</h1>
            <h1 className="overflow-hidden text-ellipsis whitespace-nowrap text-xs sm:max-w-[5rem] md:max-w-[9rem] lg:max-w-[12rem] xl:max-w-[15rem] 2xl:max-w-[18rem]">
              {el[1]}
            </h1>
            <AnimatePresence>
              {hovers[el[2]].value === true ? (
                <motion.span
                  className="absolute left-0 right-0 top-8 flex flex-row items-center justify-center"
                  initial={{ opacity: 0, y: "-0.5rem" }}
                  animate={{
                    opacity: 1,
                    y: "0rem",
                    transition: { delay: 0.03, duration: 0.125 },
                  }}
                  exit={{ opacity: 0, y: "-0.5rem" }}
                >
                  <div className="break-all rounded-lg bg-neutral-100 px-2.5 py-1 text-xs text-neutral-700 shadow-[0px_1.8px_10px_2.5px_rgba(0,0,0,0.2)]">
                    <h1 className="font-bold">{el[1]}</h1>
                  </div>
                </motion.span>
              ) : null}
            </AnimatePresence>
          </motion.div>
        )
      )}
    </div>
  );
}
