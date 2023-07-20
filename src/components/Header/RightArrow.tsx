import { memo } from "react";
import { motion } from "framer-motion";

function RightArrow() {
  console.log("re");
  return (
    <motion.svg
      className="h-9 w-9 p-2"
      initial={{ opacity: 0, x: "-2rem" }}
      animate={{
        opacity: 1,
        x: "0rem",
      }}
      whileHover={{ x: "0.15rem", scale: 1.3 }}
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
  );
}

export default memo(RightArrow);
