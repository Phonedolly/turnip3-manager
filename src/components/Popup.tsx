import { motion } from "framer-motion";
import { v4 as uuid } from "uuid";
import defaultVariants from "../variants/defaultVariants";
import { CloseIconWithTooltip } from "./Icons/IconsWithTooltip";

const popupVariant = {
  initial: { opacity: 0, scale: 0.5 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring", duration: 0.5 },
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    transition: { type: "spring", duration: 0.5 },
  },
};

const HeaderRightButtonsWithClose = (props: {
  setViewContentBrowser: React.Dispatch<React.SetStateAction<boolean>>;
  buttons?: JSX.Element[];
}) => {
  return (
    <div className="flex flex-col items-center">
      {props.buttons?.map((button) => button)}
      <CloseIconWithTooltip
        clickHandler={props.setViewContentBrowser}
        tooltipValue="Close"
      />
    </div>
  );
};

export default function Popup(props: {
  headerIcon: JSX.Element;
  title: string;
  headerRightIcons: JSX.Element[];
  children: JSX.Element;
  setIsShowPopup: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <motion.div
      className="fixed bottom-0 left-0 right-0 top-0 z-50 flex flex-row items-center justify-center rounded-2xl bg-neutral-400/20"
      variants={defaultVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      key={uuid()}
    >
      <motion.div
        className="flex h-3/4 w-2/3 items-center justify-center overflow-y-auto rounded-2xl bg-neutral-50 shadow-[0px_4px_20px_10px_rgba(0,0,0,0.2)]"
        variants={popupVariant}
        key={uuid()}
      >
        <div className="flex h-full w-full flex-col px-2 py-1.5">
          <div className="flex flex-row items-center justify-between">
            <div className="flex flex-row items-center">
              {props.headerIcon}
              <h1 className="text-md select-none font-bold">{props.title}</h1>
            </div>
            <HeaderRightButtonsWithClose
              setViewContentBrowser={props.setIsShowPopup}
              buttons={props.headerRightIcons}
            />
          </div>
          {props.children}
        </div>
      </motion.div>
    </motion.div>
  );
}
