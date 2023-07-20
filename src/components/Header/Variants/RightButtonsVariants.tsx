import { Variants } from "framer-motion";

const rightButtonsVariants: Variants = {
  initial: {
    scale: 0,
    rotate: 210,
    opacity: 0,
  },
  animate: {
    scale: 1,
    rotate: 0,
    opacity: 1,
  },
  whileHover: {
    scale: 1.2,
    rotate: 45,
  },
  whileHoverForSmallAngle: {
    scale: 1.2,
    rotate: 12,
  },
  whileHoverForSubmit: {
    scale: [1.3, 1.3, 1.3, 1.3],
    rotate: [null, -45, -45, -45],
    y: [3, -3, 3, -3],
    transition: {
      repeat: Infinity,
      repeatType: "loop",
      duration: 0.8,
      
    },
  },
  whileHoverScaleOnly: {
    scale: 1.2,
  },
  exit: { scale: 0, rotate: -210, opacity: 0 },
};

export default rightButtonsVariants;
