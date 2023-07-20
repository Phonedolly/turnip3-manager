import { Variants } from "framer-motion";

const defaultVariants: Variants = {
  initial: { opacity: 0 },
  visible: { opacity: 1 },
  whileHover: { scale: 1.05 },
  exit: { opacity: 1 },
};

export default defaultVariants;
