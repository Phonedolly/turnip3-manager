import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

const IconWithTooltip = (props: {
  onClick?: () => void;
  tooltipValue: string;
  children: JSX.Element;
}) => {
  const [isHover, setIsHover] = useState<boolean>(false);
  return (
    <div
      className="relative flex flex-row items-center justify-center"
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      onClick={props.onClick}
    >
      {props.children}
      <AnimatePresence>
        {isHover === true ? (
          <motion.span
            className="absolute left-0 right-0 top-10 flex w-auto flex-row items-center justify-center"
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
            <div className="rounded-lg bg-neutral-50 px-2.5 py-1  text-center text-xs text-neutral-700 shadow-[0px_1.8px_10px_2.5px_rgba(0,0,0,0.2)]">
              <h1 className="whitespace-pre font-bold">{props.tooltipValue}</h1>
            </div>
          </motion.span>
        ) : null}
      </AnimatePresence>
    </div>
  );
};

export default IconWithTooltip;
