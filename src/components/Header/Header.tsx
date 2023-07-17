import { cloneElement, useEffect, useRef, useState } from "react";
import { v4 as uuid } from "uuid";
import Editor, { useMonaco } from "@monaco-editor/react";
import { motion, AnimatePresence } from "framer-motion";
import * as runtime from "react/jsx-runtime";
import { evaluateSync } from "@mdx-js/mdx";
import components from "./MDXComponents/MDXComponents";
import "highlight.js/styles/github.css";
import remarkFrontmatter from "remark-frontmatter";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";
import rehypeMdxCodeProps from "rehype-mdx-code-props";
import remarkGfm from "remark-gfm";
import HierarchicalInfo from "./HierarchicalInfo";
import Turnip3Theme from "./MonacoEditor/Turnip3Theme";
import monacoConfig from "./MonacoEditor/MonacoConfig";

export default function Header(props: {
  blogs: Blog[];
  setShowNavBar: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  //   const initialMdx = `# 새로운 포스트를 작성합니다!

  // **turnip3-manager**는 MDX 형식으로 포스트를 작성합니다. MDX는 마크다운(Markdown) 포맷에 JSX 지원을 추가한 형식으로, 마크다운 문서 안에서 자유롭게 React Component를 사용하실 수 있습니다.

  // ## \`h2\` 태그와 동일합니다.
  // ### \`h3\` 태그와 동일합니다.

  // \`\`\`c
  // int main(int argc, char* argv[]) {
  //     printf("Hello World %d~!", argc);
  //     return 0;
  // }
  // \`\`\`
  // `;
  const initialMdx = `---
title: Trying out new custom code blocks
date: "2021-11-02"
description: "A great way to display your code snippets on your MDX+Gatsby blog."
---

Here's an example of my new custom code blocks:

\`\`\`jsx
// here's a button in React!
<button
  onClick={() => {
    alert("Hello MDX!");
  }}
>
  test
</button>
\`\`\`

Wow! Such code snippets!
Let's see another, with line highlighting:

\`\`\`js
// fizzbuzz in JS
for (let i = 1; i <= 100; i++) {
  let out = "";
  if (i % 3 === 0) out += "Fizz";
  if (i % 5 === 0) out += "Buzz";
  console.log(out || i);
}
\`\`\`
`;
  const tempBlog: Blog = {
    blogUrl: "https://github.com",
    id: "044aa503-a561-4af9-8e74-17d4cd508615",
    logoUrl:
      "data:image/svg+xml,%3Csvg version='1.0' id='Layer_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 64 64' enable-background='new 0 0 64 64' xml:space='preserve' fill='%23000000'%3E%3Cg id='SVGRepo_bgCarrier' stroke-width='0'%3E%3C/g%3E%3Cg id='SVGRepo_tracerCarrier' stroke-linecap='round' stroke-linejoin='round'%3E%3C/g%3E%3Cg id='SVGRepo_iconCarrier'%3E%3Cg%3E%3Ccircle fill='%23F76D57' cx='32' cy='32' r='24'%3E%3C/circle%3E%3Cg%3E%3Cpath fill='%23394240' d='M32,0C14.328,0,0,14.328,0,32s14.328,32,32,32s32-14.328,32-32S49.672,0,32,0z M32,56 C18.746,56,8,45.254,8,32S18.746,8,32,8s24,10.746,24,24S45.254,56,32,56z'%3E%3C/path%3E%3Cpath fill='%23394240' d='M36,30.344V16c0-2.211-1.789-4-4-4s-4,1.789-4,4v16c0,0.523,0.105,1.039,0.309,1.527 c0.203,0.492,0.496,0.938,0.867,1.305l7.934,7.934c1.566,1.566,4.168,1.645,5.734,0.078c1.562-1.562,1.582-4.074,0.016-5.641 L36,30.344z'%3E%3C/path%3E%3C/g%3E%3C/g%3E%3C/g%3E%3C/svg%3E",
    name: "temp blog",
  };
  const initialCompiledMdx = makeMdx(initialMdx);
  const { blogs, setShowNavBar } = props;
  const [writingPost, setWritingPost] = useState<boolean>(false);
  const [mdxTitle, setMdxTitle] = useState<string>(
    initialCompiledMdx.frontmatter?.title || ""
  );
  const [mdxDate, setMdxDate] = useState<string>(
    initialCompiledMdx.frontmatter?.date || ""
  );
  // const [settingBtnScope, animateSettingBtn] = useAnimate();
  // const [closeBtnScope, animateCloseBtn] = useAnimate();
  // const [userBtnScope, animateUserBtn] = useAnimate();
  const monaco = useMonaco();
  const [Content, setContent] = useState<JSX.Element>(
    initialCompiledMdx.content
  );
  const [curBlog, setCurBlog] = useState<Blog>(tempBlog);
  const [mdxHasProblem, setMdxHasProblem] = useState<boolean>(false);

  useEffect(() => {
    if (!monaco) {
      return;
    }

    monaco.editor.defineTheme("turnip3", Turnip3Theme);
    monaco.editor.setTheme("turnip3");
  }, [monaco]);

  function makeMdx(newMdx: string) {
    const { default: compiledMdx, frontmatter } = evaluateSync(newMdx, {
      ...(runtime as any),
      development: false,
      rehypePlugins: [rehypeMdxCodeProps, rehypeKatex],
      remarkPlugins: [
        remarkGfm,
        remarkMath,
        remarkFrontmatter,
        remarkMdxFrontmatter,
      ],
    });
    console.log(frontmatter);
    const content = compiledMdx({
      components,
    });
    return {
      content,
      frontmatter,
    };
  }

  return (
    <div
      className={`fixed left-0 right-0 top-8 z-10 mx-auto max-w-6xl transition-all ${
        writingPost === true ? `bottom-0 top-6 max-w-full` : `h-auto`
      }`}
    >
      {/* Header */}
      <div
        className={`absolute left-0 right-0 top-0 mx-8 my-6 flex flex-row justify-between rounded-2xl  bg-white pt-1.5 shadow-[0_0px_16px_2px_rgba(0,0,0,0.20)] transition-all duration-300 ease-in-out hover:scale-[1.004] hover:shadow-[0_0px_24px_4px_rgba(0,0,0,0.25)] ${
          writingPost === true
            ? `ml-3 mr-3 mt-3 h-[calc(100vh-5rem)] rounded-2xl shadow-[0_0px_24px_4px_rgba(0,0,0,0.25)] hover:scale-[1]`
            : `h-12`
        }`}
      >
        <div
          className={`flex w-full flex-col items-center transition-all ${
            writingPost === true ? `h-full` : ``
          }`}
        >
          {/* Menu Icon and Helper Text */}
          <div
            className={`flex w-full flex-row  justify-between ${
              writingPost === true ? ` items-start` : `items-center`
            }`}
          >
            {/* https://www.svgrepo.com/svg/510067/menu */}
            <div
              className={`flex w-full flex-row items-center justify-start ${
                writingPost === true ? `pr-4` : ``
              }`}
            >
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
                <HierarchicalInfo curBlog={curBlog} mdxTitle={mdxTitle} />
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
                    className={`mr-1.5 h-9 w-9 cursor-pointer p-1`}
                    onClick={() => {
                      setWritingPost(false);
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
            <div className="grid w-full animate-enterance-from-top grid-cols-2 px-2 py-6 pt-1.5">
              <Editor
                className="relative -left-4 h-[calc(100vh-8.5rem)]"
                language="markdown"
                defaultValue={initialMdx}
                loading={null}
                theme="turnip3"
                options={monacoConfig}
                onChange={(mdx) => {
                  try {
                    const { content: compiledMdx } = makeMdx(mdx || "");
                    console.log("MDX Compile success!");
                    setContent(compiledMdx);
                    setMdxHasProblem(false);
                    console.log("Apply Success");
                  } catch (e) {
                    setMdxHasProblem(true);
                    console.error(e);
                    console.log("MDX compile error!");
                  }
                }}
              />
              <div className="h1 max-h-[calc(100vh-8.5rem)] overflow-y-auto px-7 py-1">
                {mdxHasProblem === true ? (
                  <h1 className="text-md flex animate-pulse flex-row items-center justify-center rounded-md bg-red-200/60 px-0.5 py-1 font-mono font-bold text-red-500">
                    Now MDX File Has a Problem!
                  </h1>
                ) : null}
                <div className="flex flex-col [&>:not(first)]:pt-3">
                  {Content}
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
