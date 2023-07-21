import { motion } from "framer-motion";
import { v4 as uuid } from "uuid";
import defaultVariants from "../../../variants/defaultVariants";
import { CloseIconWithTooltip } from "../../Icons/IconsWithTooltip";

const RightButtons = (props: {
  setViewContentBrowser: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <div className="flex flex-col items-center">
      <CloseIconWithTooltip
        clickHandler={props.setViewContentBrowser}
        tooltipValue="Close"
      />
    </div>
  );
};

const testData = [
  {
    itemName: "AAA",
    itemType: "folder",
    lastModified: new Date(2000, 1, 2).toDateString(),
  },
  {
    itemName: "BBB",
    itemType: "folder",
    lastModified: new Date(2000, 1, 2).toDateString(),
  },
  {
    itemName: "CCC",
    itemType: "folder",
    lastModified: new Date(2000, 5, 2).toDateString(),
  },
  {
    itemName: "hello.svg",
    itemType: "file",
    lastModified: new Date(2023, 1, 2).toDateString(),
  },
  {
    itemName: "last.png",
    itemType: "file",
    lastModified: new Date(2000, 1, 2).toDateString(),
  },
  {
    itemName: ".gitignore",
    itemType: "file",
    lastModified: new Date(2024, 10, 2).toDateString(),
  },
];
const FolderIcon = () => (
  <svg
    className="z-30 h-9 w-9 p-1"
    xmlns="http://www.w3.org/2000/svg"
    width="256"
    height="256"
    fill="none"
    viewBox="0 0 24 24"
  >
    <g stroke="#000" strokeLinejoin="round" strokeWidth="2">
      <path d="M8 7c0-.943 0-1.414.293-1.707C8.586 5 9.057 5 10 5h1.764c.601 0 .902 0 1.144.15.241.149.376.418.645.956L14.5 8H18c.943 0 1.414 0 1.707.293C20 8.586 20 9.057 20 10v3c0 .943 0 1.414-.293 1.707C19.414 15 18.943 15 18 15h-8c-.943 0-1.414 0-1.707-.293C8 14.414 8 13.943 8 13V7z"></path>
      <path d="M17 15v2.4c0 .56 0 .84-.109 1.054a1 1 0 01-.437.437C16.24 19 15.96 19 15.4 19H5.6c-.56 0-.84 0-1.054-.109a1 1 0 01-.437-.437C4 18.24 4 17.96 4 17.4V9.6c0-.56 0-.84.109-1.054a1 1 0 01.437-.437C4.76 8 5.04 8 5.6 8H8"></path>
    </g>
  </svg>
);
const UpperDir = () => (
  <div className="flex w-full cursor-pointer flex-row items-center justify-between rounded-lg  px-1.5 py-0.5 hover:bg-white">
    <div className="flex flex-row items-center gap-0.5">
      <svg
        className="z-30 h-6 w-6 p-1"
        xmlns="http://www.w3.org/2000/svg"
        width="800"
        height="800"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          fill="#000"
          fillRule="evenodd"
          d="M1 5a3 3 0 013-3h4.558a3 3 0 012.847 2.051L11.72 5H20a2 2 0 012 2v2.01a2 2 0 011.77 2.348l-1.637 9A2 2 0 0120.165 22H3a2 2 0 01-2-2V5zm19 4V7h-8.28a2 2 0 01-1.897-1.368l-.316-.948A1 1 0 008.558 4H4a1 1 0 00-1 1v7.27l.354-1.682A2 2 0 015.311 9H20zM3.366 20a.998.998 0 00.113-.294L5.31 11h16.491l-1.637 9H3.366z"
          clipRule="evenodd"
        ></path>
      </svg>
      <h1 className="text-sm font-bold">..</h1>
    </div>
  </div>
);

const ContentBrowser = (props: {
  setViewContentBrowser: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const contentBrowserVariant = {
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
  return (
    <motion.div
      className="fixed bottom-0 left-0 right-0 top-0 z-50 flex flex-row items-center justify-center rounded-2xl bg-neutral-400/30"
      variants={defaultVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      key={uuid()}
    >
      <motion.div
        className="flex h-3/4 w-2/3 items-center justify-center overflow-y-auto rounded-2xl bg-neutral-50 shadow-[0px_4px_20px_10px_rgba(0,0,0,0.2)]"
        variants={contentBrowserVariant}
        key={uuid()}
      >
        <div className="flex h-full w-full flex-col px-2 py-1.5">
          <div className="flex flex-row items-center justify-between">
            <div className="flex flex-row items-center">
              <FolderIcon />
              <h1 className="text-md select-none font-bold">Content Browser</h1>
            </div>
            <RightButtons setViewContentBrowser={props.setViewContentBrowser} />
          </div>
          <div className="m-1.5 h-full rounded-lg bg-neutral-200/70 p-1.5">
            <UpperDir />
            {testData.map((item) => {
              if (item.itemType === "folder") {
                return (
                  <div className="flex w-full cursor-pointer flex-row items-center justify-between rounded-lg px-1.5 py-0.5 hover:bg-white">
                    <div className="flex flex-row items-center gap-0.5">
                      <svg
                        className="z-30 h-6 w-6 p-1"
                        xmlns="http://www.w3.org/2000/svg"
                        width="800"
                        height="800"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="#000"
                          fillRule="evenodd"
                          d="M1 5a3 3 0 013-3h4.558a3 3 0 012.847 2.051L11.72 5H20a2 2 0 012 2v2.01a2 2 0 011.77 2.348l-1.637 9A2 2 0 0120.165 22H3a2 2 0 01-2-2V5zm19 4V7h-8.28a2 2 0 01-1.897-1.368l-.316-.948A1 1 0 008.558 4H4a1 1 0 00-1 1v7.27l.354-1.682A2 2 0 015.311 9H20zM3.366 20a.998.998 0 00.113-.294L5.31 11h16.491l-1.637 9H3.366z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                      <h1 className="font-mono text-sm font-bold">
                        {item.itemName}
                      </h1>
                    </div>
                    <h1 className="text-xs">{item.lastModified}</h1>
                  </div>
                );
              } else {
                return (
                  <div className="flex w-full cursor-pointer flex-row items-center justify-between rounded-lg px-1.5 py-0.5 hover:bg-white">
                    <div className="flex flex-row items-center gap-0.5">
                      {/* https://www.svgrepo.com/svg/509928/file */}
                      <svg
                        className="z-30 h-6 w-6 p-1"
                        xmlns="http://www.w3.org/2000/svg"
                        width="800"
                        height="800"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="#000"
                          fillRule="evenodd"
                          d="M9.293 1.293A1 1 0 0110 1h8a3 3 0 013 3v16a3 3 0 01-3 3H6a3 3 0 01-3-3V8a1 1 0 01.293-.707l6-6zM18 3h-7v5a1 1 0 01-1 1H5v11a1 1 0 001 1h12a1 1 0 001-1V4a1 1 0 00-1-1zM6.414 7H9V4.414L6.414 7z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                      <h1 className="font-mono text-sm font-bold">
                        {item.itemName}
                      </h1>
                    </div>
                    <h1 className="text-xs">{item.lastModified}</h1>
                  </div>
                );
              }
            })}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ContentBrowser;
