import { AnimatePresence, motion } from "framer-motion";
import { useContext } from "react";
import { v4 as uuid } from "uuid";
import ShowNavBarContext from "../../contexts/ShowNavBarContext";

export default function HeaderContentForNotWriting(props: {
  setWritingPost: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { setWritingPost } = props;
  const { setIsShowNavBar } = useContext(ShowNavBarContext);
  return (
    <motion.div
      className={`flex w-full flex-col items-center justify-center`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      // exit={{ opacity: 0 }}
    >
      <motion.div
        className={`flex w-full flex-row items-center justify-between`}
        key={uuid()}
      >
        <div className={`flex w-full flex-row items-center justify-start`}>
          {/* https://www.svgrepo.com/svg/510067/menu */}
          <svg
            onClick={() => setIsShowNavBar(true)}
            className="ml-3 h-9 w-9 cursor-pointer p-1"
            xmlns="http://www.w3.org/2000/svg"
            width="800"
            height="800"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              fill="#000"
              fillRule="evenodd"
              d="M4 5a1 1 0 000 2h16a1 1 0 100-2H4zm-1 7a1 1 0 011-1h16a1 1 0 110 2H4a1 1 0 01-1-1zm0 6a1 1 0 011-1h16a1 1 0 110 2H4a1 1 0 01-1-1z"
              clipRule="evenodd"
            ></path>
          </svg>
          <motion.h1
            className="text-md ml-0.5 flex w-full cursor-text select-none flex-row items-center pl-0.5 italic text-neutral-600 hover:text-black"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setWritingPost(true)}
          >
            Tap to Write Post
          </motion.h1>
          {/* https://www.svgrepo.com/svg/510320/user */}
          <svg
            className={`mr-2 h-9 w-9 cursor-pointer p-1`}
            xmlns="http://www.w3.org/2000/svg"
            width="800"
            height="800"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              fill="#000"
              fillRule="evenodd"
              d="M8 9a4 4 0 118 0 4 4 0 01-8 0zm7.824 4.623a6 6 0 10-7.649 0C4.986 14.746 3 17.247 3 20a1 1 0 102 0c0-2.27 2.355-5 7-5s7 2.73 7 5a1 1 0 102 0c0-2.753-1.984-5.254-5.176-6.377z"
              clipRule="evenodd"
            ></path>
          </svg>
        </div>
      </motion.div>
    </motion.div>
  );
}
