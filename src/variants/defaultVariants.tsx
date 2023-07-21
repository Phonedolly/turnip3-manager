import { Variants } from "framer-motion";

const defaultVariants: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  whileHover: { scale: 1.05 },
  exit: { opacity: 0 },
};

export default defaultVariants;
