/* https://www.svgrepo.com/svg/503004/close */

import { motion } from "framer-motion";
import rightButtonsVariants from "../Header/Variants/RightButtonsVariants";

const CloseIcon = (props: {
  setWritingPost?: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <motion.svg
      className={`h-9 w-9 cursor-pointer p-1`}
      onClick={() => {
        props?.setWritingPost && props.setWritingPost(false);
      }}
      variants={rightButtonsVariants}
      initial="initial"
      animate="animate"
      whileHover="whileHoverScaleOnly"
      exit="exit"
      xmlns="http://www.w3.org/2000/svg"
      width="800"
      height="800"
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        fill="#000"
        fillRule="evenodd"
        d="M19.207 6.207a1 1 0 00-1.414-1.414L12 10.586 6.207 4.793a1 1 0 00-1.414 1.414L10.586 12l-5.793 5.793a1 1 0 101.414 1.414L12 13.414l5.793 5.793a1 1 0 001.414-1.414L13.414 12l5.793-5.793z"
        clipRule="evenodd"
      ></path>
    </motion.svg>
  );
};

export default CloseIcon;
