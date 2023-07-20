import { AnimatePresence, motion } from "framer-motion";
import { editor } from "monaco-editor";
import { memo, useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import Editor from "@monaco-editor/react";
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

import monacoConfig from "./MonacoEditor/MonacoConfig";

export default function Writer(props: {
  setCurPost: React.Dispatch<React.SetStateAction<IPost>>;
}) {
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
  const { setCurPost } = props;
  const initialCompiledMdx = makeMdx(initialMdx);
  const [mdxHasProblem, setMdxHasProblem] = useState<boolean>(false);

  const [Content, setContent] = useState<JSX.Element>(
    initialCompiledMdx.content
  );
  useEffect(() => {
    setCurPost((prev) => ({
      ...prev,
      initiate: true,
      curCategory: "testCategory",
      curTitle: initialCompiledMdx.frontmatter?.title || "",
    }));
  }, []);

  // useState(() => {
  //   setMdxTitle(initialCompiledMdx.frontmatter?.title || "");
  // }, []);

  return (
    <motion.div
      className="grid w-full grid-cols-2 px-2 pt-1.5"
      initial={{ opacity: 0 }}
      animate={{ y: "0rem", opacity: 1 }}
      exit={{ height: 0, overflow: "hidden", opacity: 0 }}
    >
      <Editor
        className="relative -left-4"
        language="markdown"
        defaultValue={initialMdx}
        loading={null}
        theme="turnip3"
        options={monacoConfig}
        onChange={(mdx) => {
          try {
            const { content: compiledMdx, frontmatter } = makeMdx(mdx || "");
            console.log("MDX Compile success!");
            setContent(compiledMdx);
            setMdxHasProblem(false);
            setCurPost((prev) => ({
              ...prev,
              curTitle: frontmatter?.title || "",
            }));
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
        <div className="flex flex-col [&>:not(first)]:pt-3">{Content}</div>
      </div>
    </motion.div>
  );
}
