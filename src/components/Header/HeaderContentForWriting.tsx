import { AnimatePresence, motion } from "framer-motion";
import { editor } from "monaco-editor";
import { v4 as uuid } from "uuid";
import Writer from "./Writer";

import { memo, useCallback, useMemo } from "react";
import HierarchicalInfo from "./HierarchicalInfo";

export default function HeaderContentForWriting(props: {
  curPost: IPost;
  monacoConfig: editor.IStandaloneEditorConstructionOptions;
  setCurPost: React.Dispatch<React.SetStateAction<IPost>>;
  setWritingPost: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { curPost, setCurPost, monacoConfig, setWritingPost } = props;
  const mustEqual = () => true;
  const RightButtons = memo(
    (props: {
      setWritingPost: React.Dispatch<React.SetStateAction<boolean>>;
    }) => {
      return (
        <div className="flex flex-row items-center">
          {/* https://www.svgrepo.com/svg/497505/setting-2 */}
          <motion.svg
            className="z-30 h-9 w-9 cursor-pointer p-1.5"
            initial={{ scale: 0, rotate: 210, opacity: 0 }}
            animate={{
              scale: 1,
              rotate: 0,
              opacity: 1,
            }}
            whileHover={{ scale: 1.2, rotate: 45 }}
            exit={{ scale: 0, rotate: 210, opacity: 0 }}
            xmlns="http://www.w3.org/2000/svg"
            width="160"
            height="160"
            fill="none"
            viewBox="0 0 24 24"
          >
            <g
              stroke="#000"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeMiterlimit="10"
              strokeWidth="1.9"
            >
              <path d="M12 15a3 3 0 100-6 3 3 0 000 6z"></path>
              <path d="M2 12.88v-1.76c0-1.04.85-1.9 1.9-1.9 1.81 0 2.55-1.28 1.64-2.85-.52-.9-.21-2.07.7-2.59l1.73-.99c.79-.47 1.81-.19 2.28.6l.11.19c.9 1.57 2.38 1.57 3.29 0l.11-.19c.47-.79 1.49-1.07 2.28-.6l1.73.99c.91.52 1.22 1.69.7 2.59-.91 1.57-.17 2.85 1.64 2.85 1.04 0 1.9.85 1.9 1.9v1.76c0 1.04-.85 1.9-1.9 1.9-1.81 0-2.55 1.28-1.64 2.85.52.91.21 2.07-.7 2.59l-1.73.99c-.79.47-1.81.19-2.28-.6l-.11-.19c-.9-1.57-2.38-1.57-3.29 0l-.11.19c-.47.79-1.49 1.07-2.28.6l-1.73-.99a1.899 1.899 0 01-.7-2.59c.91-1.57.17-2.85-1.64-2.85-1.05 0-1.9-.86-1.9-1.9z"></path>
            </g>
          </motion.svg>
          {/* https://www.svgrepo.com/svg/503004/close */}
          <motion.svg
            className={`mr-1.5 h-9 w-9 cursor-pointer p-1`}
            onClick={() => {
              props.setWritingPost(false);
            }}
            initial={{ scale: 0, rotate: 210, opacity: 0 }}
            animate={{
              scale: 1,
              rotate: 0,
              opacity: 1,
            }}
            whileHover={{ scale: 1.2 }}
            exit={{ scale: 0, rotate: 210, opacity: 0 }}
            xmlns="http://www.w3.org/2000/svg"
            width="800"
            height="800"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              fill="#000"
              fillRule="evenodd"
              d="M19.207 6.207a1 1 0 00-1.414-1.414L12 10.586 6.207 4.793a1 1 0 00-1.414 1.414L10.586 12l-5.793 5.793a1 1 0 101.414 1.414L12 13.414l5.793 5.793a1 1 0 001.414-1.414L13.414 12l5.793-5.793z"
              clipRule="evenodd"
            ></path>
          </motion.svg>
        </div>
      );
    },
    mustEqual
  );

  const Header = memo(
    (props: { curBlogName: string; curCategory: string; curTitle: string }) => {
      const s = useCallback(setWritingPost, []);
      return (
        <div
          className={`flex w-full flex-row items-center justify-between`}
          // key={uuid()}
        >
          <div className="flex flex-row items-center">
            {/* https://www.svgrepo.com/svg/510151/quill */}
            <motion.svg
              className="ml-3 h-9 w-9 animate-pulse p-1.5"
              whileHover={{ scale: 1.2, rotate: "-3deg" }}
              xmlns="http://www.w3.org/2000/svg"
              width="800"
              height="800"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                fill="#000"
                fillRule="evenodd"
                d="M22.801 1.749a1 1 0 00-1.18-.726C8.651 3.837 2.59 13.768.053 22.728a1 1 0 001.013 1.27A2.53 2.53 0 013.54 22l.288-.271a1 1 0 00-.766-1.726l.039-.1c.032-.046.06-.095.086-.147.205-.429.434-.673.664-.828.237-.159.538-.265.944-.323.414-.058.896-.061 1.479-.041.189.006.394.015.61.025.41.019.86.039 1.3.045 1.388.017 2.994-.096 4.662-.832 1.678-.74 3.334-2.07 4.903-4.351a1 1 0 00-.122-1.279c1.045-.592 1.964-1.393 2.722-2.29a11.732 11.732 0 002.213-4.013c.434-1.392.569-2.849.24-4.12zM6.343 16.565c-.585-.02-1.192-.024-1.77.052C7.637 10.661 12.741 5.35 20.984 3.23c.004.615-.104 1.31-.333 2.045A9.733 9.733 0 0118.82 8.59c-1.69 2.003-4.087 3.176-6.754 2.362a1 1 0 00-1.138 1.489c.643 1.022 1.942 1.722 3.591 1.796-.85.843-1.684 1.383-2.48 1.734-1.292.57-2.57.678-3.83.662a35.42 35.42 0 01-1.183-.04c-.224-.01-.45-.021-.683-.03z"
                clipRule="evenodd"
              ></path>
            </motion.svg>

            <HierarchicalInfo
              curBlogName={props.curBlogName}
              curCategory={props.curCategory}
              curTitle={props.curTitle}
            />
            <RightButtons setWritingPost={s} />
          </div>
        </div>
      );
    },
    mustEqual
  );
  const H = memo(
    (props: { curBlogName: string; curCategory: string; curTitle: string }) => (
      <Header
        curBlogName={props.curBlogName}
        curCategory={props.curCategory}
        curTitle={props.curTitle}
      />
    )
  );
  return (
    <motion.div
      className={`flex h-full w-full flex-col items-center`}
      initial={{ opacity: 0, y: "-2rem" }}
      animate={{
        opacity: 1,
        y: "0rem",
        transition: { duration: 0.5, delayChildren: 0.5 },
      }}
      exit={{ opacity: 0, y: "-2rem", transition: { duration: 0.5 } }}
    >
      <H
        curBlogName={curPost.curBlog.name}
        curCategory={curPost.curCategory}
        curTitle={curPost.curTitle}
      />
      <Writer monacoConfig={monacoConfig} setCurPost={setCurPost} />
    </motion.div>
  );
}
