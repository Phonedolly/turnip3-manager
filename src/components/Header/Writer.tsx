import { Editor } from "@monaco-editor/react";
import { motion } from "framer-motion";
import { editor } from "monaco-editor";
import { v4 as uuid } from "uuid";

export default function Writer(props: {
  initialMdx: string;
  monacoConfig: editor.IStandaloneEditorConstructionOptions;
  makeMdx: (newMdx: string) => {
    content: JSX.Element;
    frontmatter: unknown;
  };
  setContent: React.Dispatch<React.SetStateAction<JSX.Element>>;
  setMdxHasProblem: React.Dispatch<React.SetStateAction<boolean>>;
  mdxHasProblem: boolean;
  Content: JSX.Element;
}) {
  const {
    initialMdx,
    monacoConfig,
    makeMdx,
    setContent,
    setMdxHasProblem,
    mdxHasProblem,
    Content,
  } = props;

  return (
    <motion.div
      className="grid w-full grid-cols-2 px-2 py-6 pt-1.5"
      key={uuid()}
      initial={{ y: "-1.5rem", opacity: 0 }}
      animate={{ y: "0rem", opacity: 1 }}
      exit={{ y: "-1.5rem", opacity: 0 }}
    >
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
        <div className="flex flex-col [&>:not(first)]:pt-3">{Content}</div>
      </div>
    </motion.div>
  );
}
