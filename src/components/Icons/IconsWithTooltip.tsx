import { AnimatePresence, motion } from "framer-motion";
import FoldersIcon from "./FoldersIcon";
import HelpIcon from "./HelpIcon";
import IconWithTooltip from "./IconWithTooltip";
import SettingsIcon from "./SettingsIcon";
import ContentsBrowser from "../Header/ContentsBrowser/ContentsBrowser";
import { useState } from "react";
import defaultVariants from "../../variants/defaultVariants";
import SubmitIcon from "./SubmitIcon";
import CloseIcon from "./CloseIcon";

export const SettingsIconWithTooltip = (props: TooltipProps) => {
  return (
    <IconWithTooltip tooltipValue={props.tooltipValue}>
      <SettingsIcon />
    </IconWithTooltip>
  );
};

export const HelpIconWithTooltip = (props: TooltipProps) => {
  return (
    <IconWithTooltip tooltipValue={props.tooltipValue}>
      <HelpIcon />
    </IconWithTooltip>
  );
};

export const FoldersIconWithTooltip = (props: TooltipProps) => {
  const [viewContentsBrowser, setViewContentsBrowser] = useState<boolean>(false);
  return (
    <>
      <IconWithTooltip
        tooltipValue={props.tooltipValue}
        onClick={() => setViewContentsBrowser(true)}
      >
        <FoldersIcon />
      </IconWithTooltip>
      <AnimatePresence>
        {viewContentsBrowser === true ? (
          <ContentsBrowser setViewContentsBrowser={setViewContentsBrowser} />
        ) : null}
      </AnimatePresence>
    </>
  );
};

export const SubmitIconWithTooltip = (props: TooltipProps) => {
  return (
    <IconWithTooltip tooltipValue={props.tooltipValue}>
      <motion.div
        variants={defaultVariants}
        initial="initial"
        animate={{
          opacity: 1,
          y: 0,
          rotate: 0,
          filter:
            "invert(0%) sepia(100%) saturate(7438%) hue-rotate(327deg) brightness(114%) contrast(89%) drop-shadow(0px 0px 0px transparent)",
          scale: 1,
        }}
        whileHover={{
          x: [0, 2],
          y: [0, -4],
          scale: [1, 1.15],
          filter: [
            "invert(0%) sepia(100%) saturate(7438%) hue-rotate(327deg) brightness(114%) contrast(89%) drop-shadow(0px 0px 3px rgba(0,0,0,0.2))",
            "invert(86%) sepia(75%) saturate(647%) hue-rotate(359deg) brightness(105%) contrast(106%) drop-shadow(0px 0px 6px rgba(0,0,0,0.9))",
          ],
          transition: {
            duration: 1.0,
            repeat: Infinity,
            repeatType: "reverse",
          },
        }}
        exit="exit"
      >
        <SubmitIcon />
      </motion.div>
    </IconWithTooltip>
  );
};

export const CloseIconWithTooltip = (
  props:
    | TooltipProps & {
        clickHandler:
          | React.Dispatch<React.SetStateAction<boolean>>
          | (() => void);
      }
) => {
  return (
    <IconWithTooltip tooltipValue={props.tooltipValue}>
      <CloseIcon setWritingPost={props.clickHandler} />
    </IconWithTooltip>
  );
};
