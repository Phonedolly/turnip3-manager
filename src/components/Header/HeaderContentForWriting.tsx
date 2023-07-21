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

import { memo, useCallback, useMemo, useState } from "react";
import HierarchicalInfo from "./HierarchicalInfo";
import FolderIcon from "./Icons/FolderIcon";
import HelpIcon from "./Icons/HelpIcon";
import SettingsIcon from "./Icons/SettingsIcon";
import CloseIcon from "./Icons/CloseIcon";
import defaultVariants from "../../variants/defaultVariants";
import SubmitIcon from "./Icons/SubmitIcon";

const IconWithTooltip = (props: {
  tooltipValue: string;
  children: JSX.Element;
}) => {
  const [isHover, setIsHover] = useState<boolean>(false);
  return (
    <div
      className="relative flex flex-row items-center justify-center"
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      {props.children}
      <AnimatePresence>
        {isHover === true ? (
          <motion.span
            className="absolute left-0 right-0 top-10 flex w-auto flex-row items-center justify-center"
            initial={{ opacity: 0, y: "-0.5rem" }}
            animate={{
              opacity: 1,
              y: "0rem",
              transition: { delay: 0.03, duration: 0.125 },
            }}
            exit={{
              opacity: 0,
              y: "-0.5rem",
            }}
          >
            <div className="absolute top-0.5 rounded-lg bg-neutral-100 px-2.5 py-1  text-center text-xs text-neutral-700 shadow-[0px_1.8px_10px_2.5px_rgba(0,0,0,0.2)]">
              <h1 className="font-bold">{props.tooltipValue}</h1>
            </div>
          </motion.span>
        ) : null}
      </AnimatePresence>
    </div>
  );
};

const FolderIconWithTooltip = () => {
  return (
    <IconWithTooltip tooltipValue="Show Workspace">
      <FolderIcon />
    </IconWithTooltip>
  );
};

const HelpIconWithTooltip = () => {
  return (
    <IconWithTooltip tooltipValue="How to Use Writer?">
      <HelpIcon />
    </IconWithTooltip>
  );
};

const SettingsIconWithTooltip = () => {
  return (
    <IconWithTooltip tooltipValue="Post Settings">
      <SettingsIcon />
    </IconWithTooltip>
  );
};

const SubmitIconWithTooltip = () => {
  const [isAnimationStart, setIsAnimationStart] = useState<boolean>(false);
  const [animation1, setAnimation1] = useState<
    AnimationPlaybackControls | undefined
  >();
  const [animation2, setAnimation2] = useState<
    AnimationPlaybackControls | undefined
  >();
  const [iconScope, animateIcon] = useAnimate();
  return (
    <IconWithTooltip tooltipValue="Upload Post!">
      <motion.div
        onHoverStart={async () => {
          setIsAnimationStart(true);

          setAnimation1(
            animate(iconScope.current, {
              rotate: -45,
              y: 3,
              scale: 1.3,
              filter: "drop-shadow(0px 0px 2px rgba(255,255,0,0.7))",
            })
          );
          animation1?.pause();
          setAnimation2(
            animate(
              iconScope.current,
              {
                y: [3, -3, 3],
              },
              { duration: 0.65, repeat: Infinity, repeatType: "loop" }
            )
          );
          animation2?.pause();
          animation1?.play();
          animation1?.then(() => {
            animation2?.play();
          });
        }}
        onHoverEnd={() => {
          setIsAnimationStart(false);
          animation1?.stop();
          animation2?.stop();
          animate(iconScope.current, {
            y: 0,
            rotate: 0,
            filter: "drop-shadow(0px 0px 0px transparent)",
            scale: 1,
          }).play();
        }}
        ref={iconScope}
      >
        <SubmitIcon />
      </motion.div>
    </IconWithTooltip>
  );
};

const CloseIconWithTooltip = (props: {
  setWritingPost: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <IconWithTooltip tooltipValue="Close Writer">
      <CloseIcon setWritingPost={props.setWritingPost} />
    </IconWithTooltip>
  );
};

const BlogIcon = (props: { curBlogLogoUrl: string }) => {
  return (
    <AnimatePresence>
      <motion.span
        className="h-9 w-9 p-1.5"
        variants={defaultVariants}
        initial="initial"
        animate="visible"
        whileHover="whileHover"
        exit="exit"
      >
        <img src={props.curBlogLogoUrl} className="rounded-md" />
      </motion.span>
    </AnimatePresence>
  );
};

const RightButtons = memo(
  (props: {
    setWritingPost: React.Dispatch<React.SetStateAction<boolean>>;
  }) => (
    <motion.div className="z-30 flex flex-row items-center">
      <SubmitIconWithTooltip key={uuid()} />
      <FolderIconWithTooltip key={uuid()} />
      <HelpIconWithTooltip key={uuid()} />
      <SettingsIconWithTooltip key={uuid()} />
      <CloseIconWithTooltip
        setWritingPost={props.setWritingPost}
        key={uuid()}
      />
    </motion.div>
  )
);

const Header = memo(
  (props: {
    curBlogLogoUrl: string;
    curBlogName: string;
    curCategory: string;
    curTitle: string;
    setWritingPost: React.Dispatch<React.SetStateAction<boolean>>;
  }) => {
    // const s = useMemo(() => props.setWritingPost, []);
    return (
      <AnimatePresence>
        <motion.div
          className={`flex w-full flex-row items-center justify-between`}
          variants={defaultVariants}
          initial="initial"
          animate={{
            opacity: 1,
            transition: { delay: 0.3, staggerChildren: 1 },
          }}
          exit="exit"
        >
          <div key={uuid()} className="ml-2 flex flex-row items-center">
            <BlogIcon curBlogLogoUrl={props.curBlogLogoUrl} />
            <HierarchicalInfo
              curBlogName={props.curBlogName}
              curCategory={props.curCategory}
              curTitle={props.curTitle}
            />
          </div>
          <RightButtons setWritingPost={props.setWritingPost} key={uuid()} />
        </motion.div>
      </AnimatePresence>
    );
  }
);

const HeaderContentForWriting = memo(
  (props: {
    curPost: IPost;
    setCurPost: React.Dispatch<React.SetStateAction<IPost>>;
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
          curBlogLogoUrl={props.curPost.curBlog.logoUrl}
          curBlogName={props.curPost.curBlog.name}
          curCategory={props.curPost.curCategory}
          curTitle={props.curPost.curTitle}
          setWritingPost={props.setWritingPost}
        />
        <Writer setCurPost={props.setCurPost} />
      </motion.div>
    );
  }
);

export default HeaderContentForWriting;
