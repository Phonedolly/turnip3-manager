import { motion } from "framer-motion";
import rightButtonsVariants from "../Header/Variants/RightButtonsVariants";
{
  /* https://www.svgrepo.com/svg/488991/help */
}
const HelpIcon = () => {
  return (
    <motion.svg
      className="z-30 h-9 w-9 cursor-pointer p-1.5"
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
        stroke="#000"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M12 17h.01M12 14c.89-1.906 3-1.766 3-4 0-1.5-1-3-3-3-1.548 0-2.497.898-2.847 2M12 21a9 9 0 100-18 9 9 0 000 18z"
      ></path>
    </motion.svg>
  );
};

export default HelpIcon;
