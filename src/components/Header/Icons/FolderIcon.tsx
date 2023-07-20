/* https://www.svgrepo.com/svg/458709/folder-dublicate */

import { motion } from "framer-motion";
import rightButtonsVariants from "../Variants/RightButtonsVariants";

const FolderIcon = () => {
  return (
    <motion.svg
      className="z-30 h-9 w-9 cursor-pointer p-1"
      variants={rightButtonsVariants}
      initial="initial"
      animate="animate"
      whileHover="whileHoverScaleOnly"
      xmlns="http://www.w3.org/2000/svg"
      width="256"
      height="256"
      fill="none"
      viewBox="0 0 24 24"
    >
      <g stroke="#000" strokeLinejoin="round" strokeWidth="2">
        <path d="M8 7c0-.943 0-1.414.293-1.707C8.586 5 9.057 5 10 5h1.764c.601 0 .902 0 1.144.15.241.149.376.418.645.956L14.5 8H18c.943 0 1.414 0 1.707.293C20 8.586 20 9.057 20 10v3c0 .943 0 1.414-.293 1.707C19.414 15 18.943 15 18 15h-8c-.943 0-1.414 0-1.707-.293C8 14.414 8 13.943 8 13V7z"></path>
        <path d="M17 15v2.4c0 .56 0 .84-.109 1.054a1 1 0 01-.437.437C16.24 19 15.96 19 15.4 19H5.6c-.56 0-.84 0-1.054-.109a1 1 0 01-.437-.437C4 18.24 4 17.96 4 17.4V9.6c0-.56 0-.84.109-1.054a1 1 0 01.437-.437C4.76 8 5.04 8 5.6 8H8"></path>
      </g>
    </motion.svg>
  );
};

export default FolderIcon;
