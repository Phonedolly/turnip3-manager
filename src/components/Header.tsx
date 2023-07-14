import { useEffect, useRef, useState } from "react";
import { v4 as uuid } from "uuid";
import Editor, { DiffEditor, useMonaco, loader } from "@monaco-editor/react";

export default function Header(props: {
  blogs: Blog[];
  setShowNavBar: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { blogs, setShowNavBar } = props;
  const [writingPost, setWritingPost] = useState<boolean>(false);

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
      className={`fixed left-0 right-0 top-8 mx-auto max-w-6xl transition-all ${
        writingPost === true ? `bottom-14 max-w-full` : `h-auto`
      }`}
    >
      {/* Header */}
      <div
        className={`absolute left-0 right-0 top-0 z-10 mx-8 my-6 flex flex-row justify-between rounded-2xl  bg-white/50 pt-1.5 shadow-[0_0px_16px_2px_rgba(0,0,0,0.20)] backdrop-blur-xl transition-all duration-300 ease-in-out hover:scale-[1.004] hover:shadow-[0_0px_24px_4px_rgba(0,0,0,0.25)] ${
          writingPost === true
            ? `h-[95vh] scale-[1.004] hover:shadow-[0_0px_24px_4px_rgba(0,0,0,0.25)]`
            : `h-12`
        }`}
      >
        <div
          className={`flex w-full flex-col items-center transition-all ${
            writingPost === true ? `h-full` : ``
          }`}
        >
          {/* Menu Icon and Helper Text */}
          <div className="flex w-full flex-row">
            {/* https://www.svgrepo.com/svg/510067/menu */}
            <svg
              onClick={() => setShowNavBar(true)}
              className="ml-3 h-9 w-9 cursor-pointer p-1 transition-all duration-300 hover:scale-110 hover:transition"
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
            <h1
              className={`text-md ml-0.5 flex w-full cursor-text select-none flex-row items-center pl-0.5 italic text-neutral-600 transition duration-700 hover:text-black ${
                writingPost === true ? `cursor-default not-italic` : ``
              }`}
              onClick={() => setWritingPost(true)}
            >
              {writingPost === true ? `Unsaved Post` : `Tap to Write Post`}
            </h1>
            {/* https://www.svgrepo.com/svg/510320/user */}
            <svg
              className={`z-10 mr-2 h-9 w-9 cursor-pointer p-1 transition-all duration-300 ease-in-out hover:scale-110 ${
                writingPost === true ? `translate-x-0` : `translate-x-9`
              }`}
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
            {/* https://www.svgrepo.com/svg/503004/close */}
            <svg
              className={`-ml-1 mr-3 h-9 w-9 cursor-pointer p-1 transition-all duration-300 hover:scale-110 ${
                writingPost === true ? `z-0` : `opacity-0`
              }`}
              onClick={() => setWritingPost(false)}
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
            </svg>
          </div>
          {writingPost === true ? (
            <div className="relative -left-4 flex h-full w-full flex-row justify-center pb-4 pt-2">
              <Editor
                className="animate-enterance-from-top"
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
                  fontSize: 16,
                  fontFamily: "Cascadia Mono, Spoqa Han Sans Neo",
                  minimap: { enabled: false },
                  wordWrap: "on",
                }}
              />
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
