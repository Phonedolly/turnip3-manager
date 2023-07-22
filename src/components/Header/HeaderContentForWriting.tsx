import {
  AnimatePresence,
  AnimationPlaybackControls,
  Variants,
  animate,
  motion,
  useAnimate,
} from "framer-motion";
import { editor } from "monaco-editor";
import { v4 as uuid } from "uuid";
import Writer from "./Writer/Writer";

import { memo, useCallback, useContext, useMemo, useState } from "react";
import HierarchicalInfo from "./HierarchicalInfo";
import defaultVariants from "../../variants/defaultVariants";
import {
  CloseIconWithTooltip,
  FoldersIconWithTooltip,
  HelpIconWithTooltip,
  SettingsIconWithTooltip,
  SubmitIconWithTooltip,
} from "../Icons/IconsWithTooltip";
import GlobalStateContext from "../../contexts/GlobalStateContext";

const BlogIcon = () => {
  const { logoUrl: curBlogLogoUrl } =
    useContext(GlobalStateContext).curPost.curBlog;
  return (
    <AnimatePresence>
      <motion.span
        className="h-9 w-9 p-1.5"
        variants={defaultVariants}
        initial="initial"
        animate="animate"
        whileHover="whileHover"
        exit="exit"
      >
        <img src={curBlogLogoUrl} className="rounded-md" />
      </motion.span>
    </AnimatePresence>
  );
};

const RightButtons = memo(
  (props: {
    setWritingPost: React.Dispatch<React.SetStateAction<boolean>>;
  }) => (
    <motion.div
      className="z-30 flex flex-row items-center"
      // variants={defaultVariants}
      // initial={{ x: "1.5rem", opacity: 0 }}
      // animate={{ x: "0rem", opacity: 1, transition: { delay: 0.3 } }}
      // exit="exit"
    >
      <SubmitIconWithTooltip tooltipValue="Upload Post!" key={uuid()} />
      <FoldersIconWithTooltip tooltipValue="Show Workspace" key={uuid()} />
      <HelpIconWithTooltip tooltipValue="How to Use Writer?" key={uuid()} />
      <SettingsIconWithTooltip tooltipValue="Post Settings" key={uuid()} />
      <CloseIconWithTooltip
        tooltipValue="Close Writer"
        clickHandler={props.setWritingPost}
        key={uuid()}
      />
    </motion.div>
  )
);

const Header = memo(
  (props: {
    setWritingPost: React.Dispatch<React.SetStateAction<boolean>>;
  }) => {
    return (
      <AnimatePresence>
        <motion.div
          className="flex w-full flex-row items-center justify-between px-1.5"
          variants={defaultVariants}
          initial="initial"
          animate={{
            opacity: 1,
            transition: { delay: 0.3, staggerChildren: 1 },
          }}
          exit="exit"
        >
          <div key={uuid()} className=" flex flex-row items-center">
            <BlogIcon />
            <HierarchicalInfo />
          </div>
          <RightButtons setWritingPost={props.setWritingPost} key={uuid()} />
        </motion.div>
      </AnimatePresence>
    );
  }
);

const HeaderContentForWriting = memo(
  (props: {
    setWritingPost: React.Dispatch<React.SetStateAction<boolean>>;
  }) => {
    return (
      <motion.div
        className={`flex h-full w-full flex-col items-center`}
        initial={{ opacity: 0, y: "-2rem" }}
        animate={{
          opacity: 1,
          y: "0rem",
          transition: { duration: 0.5 },
        }}
        exit={{ opacity: 0, y: "-2rem", transition: { duration: 0.5 } }}
      >
        <Header
          setWritingPost={props.setWritingPost}
        />
        <Writer />
      </motion.div>
    );
  }
);

export default HeaderContentForWriting;
