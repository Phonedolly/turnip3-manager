/* https://www.svgrepo.com/svg/510151/quill */

import { motion } from "framer-motion";
import rightButtonsVariants from "../Variants/RightButtonsVariants";

const QuillIcon = () => {
  return (
    <motion.svg
      className="p-1.2 h-9 w-9 cursor-pointer"
      variants={rightButtonsVariants}
      initial="initial"
      animate="animate"
      whileHover="whileHoverScaleOnly"
      xmlns="http://www.w3.org/2000/svg"
      width="800"
      height="800"
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        fill="#000"
        fillRule="evenodd"
        d="M22.801 1.749a1 1 0 00-1.18-.726C8.651 3.837 2.59 13.768.053 22.728a1 1 0 001.013 1.27A2.53 2.53 0 013.54 22l.288-.271a1 1 0 00-.766-1.726l.039-.1c.032-.046.06-.095.086-.147.205-.429.434-.673.664-.828.237-.159.538-.265.944-.323.414-.058.896-.061 1.479-.041.189.006.394.015.61.025.41.019.86.039 1.3.045 1.388.017 2.994-.096 4.662-.832 1.678-.74 3.334-2.07 4.903-4.351a1 1 0 00-.122-1.279c1.045-.592 1.964-1.393 2.722-2.29a11.732 11.732 0 002.213-4.013c.434-1.392.569-2.849.24-4.12zM6.343 16.565c-.585-.02-1.192-.024-1.77.052C7.637 10.661 12.741 5.35 20.984 3.23c.004.615-.104 1.31-.333 2.045A9.733 9.733 0 0118.82 8.59c-1.69 2.003-4.087 3.176-6.754 2.362a1 1 0 00-1.138 1.489c.643 1.022 1.942 1.722 3.591 1.796-.85.843-1.684 1.383-2.48 1.734-1.292.57-2.57.678-3.83.662a35.42 35.42 0 01-1.183-.04c-.224-.01-.45-.021-.683-.03z"
        clipRule="evenodd"
      ></path>
    </motion.svg>
  );
};

export default QuillIcon;
