import { useEffect, useRef, useState } from "react";
import { v4 as uuid } from "uuid";
import Editor, { DiffEditor, useMonaco, loader } from "@monaco-editor/react";
import { motion, AnimatePresence, useAnimate } from "framer-motion";

export default function Header(props: {
  blogs: Blog[];
  setShowNavBar: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { blogs, setShowNavBar } = props;
  const [writingPost, setWritingPost] = useState<boolean>(false);
  const [settingBtnScope, animateSettingBtn] = useAnimate();
  const [closeBtnScope, animateCloseBtn] = useAnimate();
  const [userBtnScope, animateUserBtn] = useAnimate();

  const monaco = useMonaco();

  useEffect(() => {
    if (!monaco) {
      return;
    }

    monaco.editor.defineTheme("turnip3", {
      base: "vs",
      inherit: true,
      rules: [
        {
          background: "ffffff",
          token: "",
        },
        {
          foreground: "6a737d",
          token: "comment",
        },
        {
          foreground: "6a737d",
          token: "punctuation.definition.comment",
        },
        {
          foreground: "6a737d",
          token: "string.comment",
        },
        {
          foreground: "005cc5",
          token: "constant",
        },
        {
          foreground: "005cc5",
          token: "entity.name.constant",
        },
        {
          foreground: "005cc5",
          token: "variable.other.constant",
        },
        {
          foreground: "005cc5",
          token: "variable.language",
        },
        {
          foreground: "6f42c1",
          token: "entity",
        },
        {
          foreground: "6f42c1",
          token: "entity.name",
        },
        {
          foreground: "24292e",
          token: "variable.parameter.function",
        },
        {
          foreground: "22863a",
          token: "entity.name.tag",
        },
        {
          foreground: "d73a49",
          token: "keyword",
        },
        {
          foreground: "d73a49",
          token: "storage",
        },
        {
          foreground: "d73a49",
          token: "storage.type",
        },
        {
          foreground: "24292e",
          token: "storage.modifier.package",
        },
        {
          foreground: "24292e",
          token: "storage.modifier.import",
        },
        {
          foreground: "24292e",
          token: "storage.type.java",
        },
        {
          foreground: "032f62",
          token: "string",
        },
        {
          foreground: "032f62",
          token: "punctuation.definition.string",
        },
        {
          foreground: "032f62",
          token: "string punctuation.section.embedded source",
        },
        {
          foreground: "005cc5",
          token: "support",
        },
        {
          foreground: "005cc5",
          token: "meta.property-name",
        },
        {
          foreground: "e36209",
          token: "variable",
        },
        {
          foreground: "24292e",
          token: "variable.other",
        },
        {
          foreground: "b31d28",
          fontStyle: "bold italic underline",
          token: "invalid.broken",
        },
        {
          foreground: "b31d28",
          fontStyle: "bold italic underline",
          token: "invalid.deprecated",
        },
        {
          foreground: "fafbfc",
          background: "b31d28",
          fontStyle: "italic underline",
          token: "invalid.illegal",
        },
        {
          foreground: "fafbfc",
          background: "d73a49",
          fontStyle: "italic underline",
          token: "carriage-return",
        },
        {
          foreground: "b31d28",
          fontStyle: "bold italic underline",
          token: "invalid.unimplemented",
        },
        {
          foreground: "b31d28",
          token: "message.error",
        },
        {
          foreground: "24292e",
          token: "string source",
        },
        {
          foreground: "005cc5",
          token: "string variable",
        },
        {
          foreground: "032f62",
          token: "source.regexp",
        },
        {
          foreground: "032f62",
          token: "string.regexp",
        },
        {
          foreground: "032f62",
          token: "string.regexp.character-class",
        },
        {
          foreground: "032f62",
          token: "string.regexp constant.character.escape",
        },
        {
          foreground: "032f62",
          token: "string.regexp source.ruby.embedded",
        },
        {
          foreground: "032f62",
          token: "string.regexp string.regexp.arbitrary-repitition",
        },
        {
          foreground: "22863a",
          fontStyle: "bold",
          token: "string.regexp constant.character.escape",
        },
        {
          foreground: "005cc5",
          token: "support.constant",
        },
        {
          foreground: "005cc5",
          token: "support.variable",
        },
        {
          foreground: "005cc5",
          token: "meta.module-reference",
        },
        {
          foreground: "735c0f",
          token: "markup.list",
        },
        {
          foreground: "005cc5",
          fontStyle: "bold",
          token: "markup.heading",
        },
        {
          foreground: "005cc5",
          fontStyle: "bold",
          token: "markup.heading entity.name",
        },
        {
          foreground: "22863a",
          token: "markup.quote",
        },
        {
          foreground: "24292e",
          fontStyle: "italic",
          token: "markup.italic",
        },
        {
          foreground: "24292e",
          fontStyle: "bold",
          token: "markup.bold",
        },
        {
          foreground: "005cc5",
          token: "markup.raw",
        },
        {
          foreground: "b31d28",
          background: "ffeef0",
          token: "markup.deleted",
        },
        {
          foreground: "b31d28",
          background: "ffeef0",
          token: "meta.diff.header.from-file",
        },
        {
          foreground: "b31d28",
          background: "ffeef0",
          token: "punctuation.definition.deleted",
        },
        {
          foreground: "22863a",
          background: "f0fff4",
          token: "markup.inserted",
        },
        {
          foreground: "22863a",
          background: "f0fff4",
          token: "meta.diff.header.to-file",
        },
        {
          foreground: "22863a",
          background: "f0fff4",
          token: "punctuation.definition.inserted",
        },
        {
          foreground: "e36209",
          background: "ffebda",
          token: "markup.changed",
        },
        {
          foreground: "e36209",
          background: "ffebda",
          token: "punctuation.definition.changed",
        },
        {
          foreground: "f6f8fa",
          background: "005cc5",
          token: "markup.ignored",
        },
        {
          foreground: "f6f8fa",
          background: "005cc5",
          token: "markup.untracked",
        },
        {
          foreground: "6f42c1",
          fontStyle: "bold",
          token: "meta.diff.range",
        },
        {
          foreground: "005cc5",
          token: "meta.diff.header",
        },
        {
          foreground: "005cc5",
          fontStyle: "bold",
          token: "meta.separator",
        },
        {
          foreground: "005cc5",
          token: "meta.output",
        },
        {
          foreground: "586069",
          token: "brackethighlighter.tag",
        },
        {
          foreground: "586069",
          token: "brackethighlighter.curly",
        },
        {
          foreground: "586069",
          token: "brackethighlighter.round",
        },
        {
          foreground: "586069",
          token: "brackethighlighter.square",
        },
        {
          foreground: "586069",
          token: "brackethighlighter.angle",
        },
        {
          foreground: "586069",
          token: "brackethighlighter.quote",
        },
        {
          foreground: "b31d28",
          token: "brackethighlighter.unmatched",
        },
        {
          foreground: "b31d28",
          token: "sublimelinter.mark.error",
        },
        {
          foreground: "e36209",
          token: "sublimelinter.mark.warning",
        },
        {
          foreground: "959da5",
          token: "sublimelinter.gutter-mark",
        },
        {
          foreground: "032f62",
          fontStyle: "underline",
          token: "constant.other.reference.link",
        },
        {
          foreground: "032f62",
          fontStyle: "underline",
          token: "string.other.link",
        },
      ],
      colors: {
        "editor.foreground": "#24292e",
        "editor.background": "#ffffff00",
        "editor.selectionBackground": "#c8c8fa80",
        "editor.inactiveSelectionBackground": "#fafbfc80",
        // "editor.lineHighlightBackground": "#fafbfc",
        "editor.lineHighlightBackground": "#d4d4d480",
        "editorCursor.foreground": "#24292e",
        "editorWhitespace.foreground": "#959da580",
        "editorIndentGuide.background": "#959da580",
        "editorIndentGuide.activeBackground": "#24292e80",
        "editor.selectionHighlightBorder": "#fafbfc80",
      },
    });
    monaco.editor.setTheme("turnip3");
  }, [monaco]);
  return (
    <div
      className={`fixed left-0 right-0 top-8 z-10 mx-auto max-w-6xl transition-all ${
        writingPost === true ? `bottom-0 top-6 max-w-full` : `h-auto`
      }`}
    >
      {/* Header */}
      <div
        className={`absolute left-0 right-0 top-0 mx-8 my-6 flex flex-row justify-between rounded-2xl  bg-white/50 pt-1.5 shadow-[0_0px_16px_2px_rgba(0,0,0,0.20)] backdrop-blur-xl transition-all duration-300 ease-in-out hover:scale-[1.004] hover:shadow-[0_0px_24px_4px_rgba(0,0,0,0.25)] ${
          writingPost === true
            ? `ml-0 mr-0 mt-3 h-[100vh] rounded-none shadow-[0_0px_24px_4px_rgba(0,0,0,0.25)] hover:scale-[1]`
            : `h-12`
        }`}
      >
        <div
          className={`flex w-full flex-col items-center transition-all ${
            writingPost === true ? `h-full` : ``
          }`}
        >
          {/* Menu Icon and Helper Text */}
          <div className="flex w-full flex-row items-center justify-between">
            {/* https://www.svgrepo.com/svg/510067/menu */}
            <div className="flex w-full flex-row items-center justify-start">
              {writingPost === true ? (
                <svg
                  className="ml-3 h-9 w-9 animate-pulse p-1.5"
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
                </svg>
              ) : (
                <svg
                  onClick={() => setShowNavBar(true)}
                  className="ml-3 h-9 w-9 cursor-pointer p-1 transition-all duration-300"
                  xmlns="http://www.w3.org/2000/svg"
                  width="800"
                  height="800"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  {/* https://www.svgrepo.com/svg/510151/quill */}
                  <path
                    fill="#000"
                    fillRule="evenodd"
                    d="M4 5a1 1 0 000 2h16a1 1 0 100-2H4zm-1 7a1 1 0 011-1h16a1 1 0 110 2H4a1 1 0 01-1-1zm0 6a1 1 0 011-1h16a1 1 0 110 2H4a1 1 0 01-1-1z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              )}
              {writingPost === true ? (
                <motion.input
                  className="ml-2 flex h-7 w-full max-w-sm border-collapse cursor-text select-none flex-row items-center border-b-2 border-b-neutral-300 pl-0.5 text-[0.9rem] outline-none  transition-all hover:border-b-neutral-400 focus:border-b-neutral-400 focus:outline-none"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, transition: { delay: 0.2 } }}
                  defaultValue="Unsaved Post"
                />
              ) : (
                <h1
                  className="text-md ml-0.5 flex w-full cursor-text select-none flex-row items-center pl-0.5 italic text-neutral-600 transition duration-700 hover:text-black
                  "
                  onClick={() => setWritingPost(true)}
                >
                  Tap to Write Post
                </h1>
              )}
            </div>
            <AnimatePresence>
              {writingPost === true ? (
                <div className="flex flex-row items-end justify-end">
                  <motion.svg
                    className="z-50 h-9 w-9 cursor-pointer p-1 transition-all duration-300"
                    initial={{ x: "5rem", rotate: 120, opacity: 0 }}
                    animate={{
                      x: 0,
                      rotate: 0,
                      opacity: 1,
                    }}
                    exit={{ x: "5rem", rotate: 120, opacity: 0 }}
                    xmlns="http://www.w3.org/2000/svg"
                    width="160"
                    height="160"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    {/* https://www.svgrepo.com/svg/497505/setting-2 */}
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
                    className={`mr-3 h-9 w-9 cursor-pointer p-1 transition-all duration-300 hover:rotate-45`}
                    onClick={() => {
                      setWritingPost(false);
                    }}
                    initial={{ x: "5rem", rotate: 120, opacity: 0 }}
                    animate={{
                      x: 0,
                      rotate: 0,
                      opacity: 1,
                    }}
                    exit={{ x: "5rem", rotate: 120, opacity: 0 }}
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
              ) : (
                <svg
                  className={`mr-2 h-9 w-9 cursor-pointer p-1 transition-all duration-300 ease-in-out`}
                  xmlns="http://www.w3.org/2000/svg"
                  width="800"
                  height="800"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  {/* https://www.svgrepo.com/svg/510320/user */}
                  <path
                    fill="#000"
                    fillRule="evenodd"
                    d="M8 9a4 4 0 118 0 4 4 0 01-8 0zm7.824 4.623a6 6 0 10-7.649 0C4.986 14.746 3 17.247 3 20a1 1 0 102 0c0-2.27 2.355-5 7-5s7 2.73 7 5a1 1 0 102 0c0-2.753-1.984-5.254-5.176-6.377z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              )}
            </AnimatePresence>
          </div>
          {writingPost === true ? (
            <div className=" grid h-[calc(100%-5rem)] w-full grid-cols-2 px-2 py-6 pt-2">
              <Editor
                className="relative -left-4 animate-enterance-from-top"
                language="markdown"
                defaultValue={`# 새로운 포스트를 작성합니다!

**turnip3-manager**는 MDX 형식으로 포스트를 작성합니다. MDX는 마크다운(Markdown) 포맷에 JSX 지원을 추가한 형식으로, 마크다운 문서 안에서 자유롭게 React Component를 사용하실 수 있습니다.

## \`h2\` 태그와 동일합니다.
### \`h3\` 태그와 동일합니다.
`}
                loading={null}
                width={"100%"}
                theme="turnip3"
                options={{
                  fontSize: 15,
                  fontFamily: "Cascadia Mono, Spoqa Han Sans Neo",
                  minimap: { enabled: false },
                  wordWrap: "on",
                }}
              />
              <div>1111</div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
