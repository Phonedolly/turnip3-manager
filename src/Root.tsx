import { useEffect, useRef, useState } from "react";
import { Outlet, Link, useLoaderData } from "react-router-dom";
import { v4 as uuid } from "uuid";
import Editor, { DiffEditor, useMonaco, loader } from "@monaco-editor/react";
import TitleBar from "./components/TitleBar";

export async function blogsLoader(): Promise<Blog[]> {
  return [
    {
      logoUrl: "https://avatars.githubusercontent.com/in/715?s=48&v=4",
      name: "blog1",
      blogUrl: "https://github.com",
      id: "df9cc582-87e2-49b4-9162-ae331c7074d4",
    },
    {
      logoUrl:
        "data:image/svg+xml,%3Csvg version='1.0' id='Layer_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 64 64' enable-background='new 0 0 64 64' xml:space='preserve' fill='%23000000'%3E%3Cg id='SVGRepo_bgCarrier' stroke-width='0'%3E%3C/g%3E%3Cg id='SVGRepo_tracerCarrier' stroke-linecap='round' stroke-linejoin='round'%3E%3C/g%3E%3Cg id='SVGRepo_iconCarrier'%3E%3Cg%3E%3Ccircle fill='%23F76D57' cx='32' cy='32' r='24'%3E%3C/circle%3E%3Cg%3E%3Cpath fill='%23394240' d='M32,0C14.328,0,0,14.328,0,32s14.328,32,32,32s32-14.328,32-32S49.672,0,32,0z M32,56 C18.746,56,8,45.254,8,32S18.746,8,32,8s24,10.746,24,24S45.254,56,32,56z'%3E%3C/path%3E%3Cpath fill='%23394240' d='M36,30.344V16c0-2.211-1.789-4-4-4s-4,1.789-4,4v16c0,0.523,0.105,1.039,0.309,1.527 c0.203,0.492,0.496,0.938,0.867,1.305l7.934,7.934c1.566,1.566,4.168,1.645,5.734,0.078c1.562-1.562,1.582-4.074,0.016-5.641 L36,30.344z'%3E%3C/path%3E%3C/g%3E%3C/g%3E%3C/g%3E%3C/svg%3E",
      name: "blog2",
      blogUrl: "https://www.svgrepo.com/svg/513493/clock",
      id: "c4aad424-f94b-4c5c-bb25-92b4def57cc2",
    },
    {
      logoUrl:
        "data:image/svg+xml,%3Csvg viewBox='0 0 1024 1024' class='icon' version='1.1' xmlns='http://www.w3.org/2000/svg' fill='%23000000'%3E%3Cg id='SVGRepo_bgCarrier' stroke-width='0'%3E%3C/g%3E%3Cg id='SVGRepo_tracerCarrier' stroke-linecap='round' stroke-linejoin='round'%3E%3C/g%3E%3Cg id='SVGRepo_iconCarrier'%3E%3Cpath d='M283.9 136.9l10.9 119.9-131.3 55 86.2 50.2 91.5-54.8 89.6-24.4 65.1 13.5 16.1-66.1s-51.8-57.5-116.7-80.3-111.4-13-111.4-13z' fill='%2395C751'%3E%3C/path%3E%3Cpath d='M341.2 307.2C273 335 145.4 459.5 204.8 637.1S376.3 888.6 412 894c35.7 5.4 87.6-31.5 116.4-31.5s53.8 34.7 89.5 32 112.8-32.5 149.7-93 117.1-213.9 92.2-328.1c-24.9-114.2-132.3-170.6-181.1-179.8s-132.3 6.3-156.2 5.6c-23.9-0.7-84.6-15.3-116.1-8.5-31.4 6.7-65.2 16.5-65.2 16.5z' fill='%23F75252'%3E%3C/path%3E%3Cpath d='M861.2 471.3c-24.9-114.2-132.3-170.6-181.1-179.8-48.8-9.2-132.3 6.3-156.2 5.6s-84.6-15.3-116.1-8.5c-31.5 6.7-65.2 16.5-65.2 16.5-68.2 27.7-195.9 152.2-136.4 329.9s171.5 251.4 207.1 256.9c35.7 5.4 87.6-31.5 116.4-31.5s53.8 34.7 89.5 32c35.8-2.7 112.8-32.5 149.7-93 37-60.5 117.2-213.9 92.3-328.1zM703 735c-31.4 51.5-96.8 76.7-127.3 79.1-30.4 2.3-51.7-27.2-76.1-27.2-24.5 0-68.7 31.4-99 26.7-30.3-4.6-125.5-67.3-176.1-218.4-50.6-151.1 57.9-257 115.9-280.6 0 0 28.7-8.3 55.5-14 26.7-5.7 78.4 6.6 98.7 7.3 20.3 0.6 91.3-12.6 132.8-4.8 41.5 7.8 132.8 55.8 154 152.9 21.2 97.1-47.1 227.5-78.4 279z' fill='%23EF3A3A'%3E%3C/path%3E%3Cpath d='M499.7 350.6s14.7-115.5 27.3-140.7 23.1-33.4 23.1-33.4l69.1 4.1 8.9 26s-70.8 85.1-81.3 105.2-13.8 44.5-13.8 44.5l-33.3-5.7z' fill='%23F2F5FB'%3E%3C/path%3E%3Cpath d='M819.9 371.3c-50.2-61.4-127.1-99.5-200.6-99.5-11.9 0-22.9 1.4-33.4 3.5 25.7-35.1 52.4-62.2 52.9-62.6 4.4-4.4 5.3-11.1 2.2-16.5 0 0-15.4-31.3-26.5-31.3l-76.2-0.5c-4.5 0-8.8 2.2-11.3 6-8.4 12.3-15.3 26-21 40.1-85.4-92.9-218.4-94.1-224.3-94.1-7.1 0-13.1 5.5-13.7 12.6-0.3 3.7-4.9 64.5 14.2 121-31.8 6.6-101.3 24.1-133.4 55.2-3 2.9-4.5 6.9-4.1 11 0.4 4.1 2.6 7.8 6 10.2 2.1 1.4 45.2 30.3 87 43.9-0.3 0.3-0.6 0.6-0.8 1-50.9 62.3-70.1 140.8-53.8 221.1 35.1 173.8 149.2 315.1 254.4 315.1 22.2 0 42.5-6.8 60.4-20.2 19.1-14.3 41.9-14.3 61 0 17.9 13.4 38.2 20.2 60.4 20.2 105.2 0 219.3-141.4 254.4-315.1 16.2-80.3-2.9-158.8-53.8-221.1zM545.6 191.8h62.6l3.8 9.1c-14.8 15.7-48.5 53.5-72.8 95.4 0 0.1-0.1 0.1-0.1 0.1-0.2 0.4-0.4 0.8-0.7 1.2-1.5 2.6-2.9 5.1-4.3 7.7-0.7 1.2-1.4 2.5-2 3.7-1.7 3.3-3.3 6.6-4.9 10-0.2 0.4-0.4 0.9-0.6 1.3-3.4 7.4-6.4 14.8-8.8 22.1-3.4-0.4-6.8-1-10.1-1.8 0.5-10.1 1.5-24.1 3.6-40.2v-0.2c4.6-33.6 14.1-75.7 34.3-108.4z m-250.8-47.3c35.8 2.9 136.5 17.6 198.9 93.7 0.6 0.8 1.5 1.2 2.2 1.8-3.8 13.4-6.7 26.8-9 39.5-9.1-3.1-18.9-5.2-29.2-6.4L380 189.7c-5.2-5.6-13.8-5.8-19.4-0.7-5.5 5.2-5.8 13.8-0.7 19.4l60 64.3c-27.3 2.2-54.7 9.4-80.8 21-41.3-40.5-44.7-118.1-44.3-149.2z m-1.7 131.3c3.3 6.4 6.8 12.7 11 18.7l-55.2 3.4c-7.6 0.5-13.3 7-12.8 14.5 0.5 7.3 6.5 12.8 13.7 12.8h0.9l37.9-2.4c-10.4 7.6-20.4 15.9-29.8 24.9-26.6-6-57.8-22.8-76.4-33.8 31-19.4 82.5-32.6 110.7-38.1zM846.9 587c-35.4 175.4-146.3 293.2-227.6 293.2-16.3 0-30.7-4.8-44-14.7-14.5-10.8-30.7-16.2-46.9-16.2s-32.4 5.4-46.9 16.2c-13.2 9.9-27.6 14.7-44 14.7-81.3 0-192.2-117.8-227.6-293.2-14.6-72.1 2.5-142.5 48.2-198.3 45.1-55.2 113.9-89.4 179.4-89.4 17.4 0 32.4 2.5 45.5 7.7 0 0.3-0.1 0.6-0.1 1-0.5 4.4-0.9 8.7-1.3 12.7 0 0.4-0.1 0.7-0.1 1.1-0.2 2.6-0.4 5.2-0.6 7.6-4.7-3.3-8.8-7-12.1-11.2-4.6-6-13.2-7.1-19.2-2.5s-7.1 13.2-2.5 19.2c9.7 12.7 24.4 22.5 41.5 28.8 0.2 0.1 0.3 0.2 0.5 0.3 0.2 0.1 0.5 0.1 0.8 0.2 5.7 2 11.6 3.6 17.7 4.7 0.4 0.1 0.7 0.1 1.1 0.2 6.1 1.1 12.4 1.7 18.8 1.9h0.4c0.8 0 1.6 0.1 2.4 0.1 33.4 0 63.9-12.7 81.5-34 4.8-5.8 4-14.5-1.8-19.3-5.8-4.8-14.5-4-19.3 1.8-9.4 11.4-25.3 19.4-43.4 22.6 0.6-1.6 1.2-3.2 1.9-4.9 1.1-2.7 2.4-5.4 3.7-8.1 0.6-1.3 1.2-2.7 1.9-4 1.5-3 3.2-6.2 5-9.3 0.5-0.8 0.9-1.6 1.4-2.5 15.7-9.4 34.7-13.9 58.1-13.9 65.5 0 134.2 34.3 179.4 89.4 45.6 55.6 62.7 126 48.2 198.1z' fill='%23004364'%3E%3C/path%3E%3Cpath d='M700.2 388.3m-15.8 0a15.8 15.8 0 1 0 31.6 0 15.8 15.8 0 1 0-31.6 0Z' fill='%23004364'%3E%3C/path%3E%3Cpath d='M757.3 431.7m-15.8 0a15.8 15.8 0 1 0 31.6 0 15.8 15.8 0 1 0-31.6 0Z' fill='%23004364'%3E%3C/path%3E%3Cpath d='M688.2 457.6m-15.8 0a15.8 15.8 0 1 0 31.6 0 15.8 15.8 0 1 0-31.6 0Z' fill='%23004364'%3E%3C/path%3E%3Cpath d='M427.8 824.4m-15.8 0a15.8 15.8 0 1 0 31.6 0 15.8 15.8 0 1 0-31.6 0Z' fill='%23004364'%3E%3C/path%3E%3Cpath d='M357 787.8m-15.8 0a15.8 15.8 0 1 0 31.6 0 15.8 15.8 0 1 0-31.6 0Z' fill='%23004364'%3E%3C/path%3E%3C/g%3E%3C/svg%3E",
      name: "blog3",
      blogUrl: "https://www.svgrepo.com/svg/530203/apple",
      id: "424c20db-14e4-481b-9f9c-719b281a98b4",
    },
  ];
}

export function Root() {
  const [showNavBar, setShowNavBar] = useState<boolean>(false);
  const [writingPost, setWritingPost] = useState<boolean>(false);
  const [editorMounted, setEditorMounted] = useState<boolean>(false);
  const blogs = useLoaderData() as Blog[];
  const blogNames = blogs.map((blog) => blog.name);
  const ref = useRef<HTMLDivElement>(null);
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

  useEffect(() => {
    function handleOutsideClose(e: MouseEvent) {
      if (
        showNavBar === true &&
        ref.current !== null &&
        !ref.current.contains(e.target as Node)
      ) {
        setShowNavBar(false);
      }
    }
    document.addEventListener("mousedown", handleOutsideClose);

    return () => document.removeEventListener("mousedown", handleOutsideClose);
  });
  // mx-auto my-0 flex h-full w-full max-w-6xl flex-col items-center justify-between py-1
  return (
    <div className="mx-auto h-full w-full max-w-6xl py-1">
      <TitleBar />
      {/* Header Wrapper */}
      <div
        className={`fixed left-0 right-0 top-8 mx-auto max-w-6xl transition-all ${
          writingPost === true ? `bottom-14 max-w-full` : `h-auto`
        }`}
      >
        {/* Header */}
        <div
          className={`absolute left-0 right-0 top-0 z-10 mx-8 my-6 flex flex-row justify-between rounded-2xl  bg-white/50 backdrop-blur-xl pt-1.5 shadow-[0_0px_16px_2px_rgba(0,0,0,0.20)] transition-all duration-300 ease-in-out hover:scale-[1.004] hover:shadow-[0_0px_24px_4px_rgba(0,0,0,0.25)] ${
            writingPost === true
              ? `h-full scale-[1.004] hover:shadow-[0_0px_24px_4px_rgba(0,0,0,0.25)]`
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
      <nav
        className={`fixed left-8 top-14 z-10 flex h-[80%] w-64 flex-col items-center justify-start rounded-2xl bg-white/50 backdrop-blur-xl shadow-[0_0px_38px_0px_rgba(0,0,0,0.3)] duration-300 ease-in-out ${
          showNavBar === true ? "translate-x-0" : "-translate-x-full opacity-0"
        }`}
        ref={ref}
      >
        <div className="flex flex-row items-center py-5">
          {/* https://www.svgrepo.com/svg/267086/radish */}
          <svg
            className="h-14 w-14 p-0.5"
            xmlns="http://www.w3.org/2000/svg"
            width="800"
            height="800"
            fill="#000"
            stroke="#000"
            strokeWidth="0.005"
            transform="rotate(45)"
            version="1.1"
            viewBox="-51.2 -51.2 614.4 614.4"
            xmlSpace="preserve"
          >
            <g>
              <path
                fill="#e879f9"
                d="M255.999 497.96s142.634-56.465 142.634-145.565c0-9.076-.835-17.878-2.451-26.351-4.949-26.163-17.209-49.206-34.608-67.424-26.082-27.331-63.721-32.679-105.573-32.679-41.853 0-79.493 5.347-105.575 32.679-17.399 18.217-29.659 41.261-34.608 67.424-1.616 8.473-2.453 17.275-2.453 26.351 0 91.743 142.634 145.565 142.634 145.565z"
              ></path>
              <path
                fill="#7BD36A"
                d="M197.334 232.022c17.892-4.746 37.752-6.081 58.665-6.081 20.557 0 40.093 1.299 57.747 5.849 27.268-12.49 68.589-35.368 65.384-59.335-4.211-31.476-32.915-19.786-37.225-32.717-4.312-12.931 22.373-37.28 9.694-55.649-14.971-21.69-37.916-9.858-49.101-18.911-8.746-7.079-17.714-51.137-46.811-51.137h-.97c-29.096 0-38.065 44.058-46.81 51.135-11.185 9.053-34.131-2.779-49.101 18.911-12.68 18.369 15.605 42.718 11.294 55.649-4.312 12.931-33.016 1.241-37.227 32.717-3.223 24.095 37.648 47.133 64.461 59.569z"
              ></path>
              <path d="M217.51 431.384a13.97 13.97 0 01-7.92-2.457c-37.763-25.858-56.912-51.607-56.912-76.532 0-6.488.591-12.877 1.758-18.986 3.402-17.99 11.847-34.474 24.421-47.639 5.356-5.611 14.245-5.813 19.852-.458 5.608 5.355 5.813 14.244.458 19.852-8.819 9.234-14.747 20.814-17.142 33.487-.841 4.403-1.264 9.02-1.264 13.746 0 14.462 16.291 33.912 44.695 53.362 6.4 4.381 8.034 13.119 3.653 19.516a14.03 14.03 0 01-11.599 6.109zM255.506 453.521c-.911 0-1.839-.098-2.736-.281a14.15 14.15 0 01-2.626-.799 13.966 13.966 0 01-2.429-1.292 13.42 13.42 0 01-2.134-1.741 13.994 13.994 0 01-1.741-2.136 13.997 13.997 0 01-1.292-2.428 14.17 14.17 0 01-.8-2.626c-.183-.899-.281-1.825-.281-2.738s.098-1.839.281-2.752c.183-.885.449-1.769.8-2.626.351-.842.786-1.657 1.292-2.415a13.435 13.435 0 011.741-2.136 14.32 14.32 0 012.134-1.755 14.174 14.174 0 015.055-2.091 13.852 13.852 0 015.488 0c.886.183 1.771.448 2.626.799.844.351 1.658.788 2.416 1.292.772.52 1.488 1.109 2.134 1.755s1.236 1.363 1.755 2.136c.491.758.927 1.573 1.278 2.415.351.856.632 1.741.8 2.626.183.913.279 1.839.279 2.752s-.097 1.841-.279 2.738a13.162 13.162 0 01-.8 2.626 14.994 14.994 0 01-1.278 2.428c-.52.758-1.109 1.49-1.755 2.136a13.42 13.42 0 01-2.134 1.741 14.33 14.33 0 01-2.416 1.292c-.855.351-1.74.616-2.626.799a14.09 14.09 0 01-2.752.281zM255.999 105.92c-.913 0-1.841-.097-2.738-.279a14.3 14.3 0 01-5.054-2.092 13.346 13.346 0 01-2.136-1.741 13.42 13.42 0 01-1.741-2.134 12.96 12.96 0 01-1.292-2.429 13.054 13.054 0 01-.799-2.626 13.724 13.724 0 01-.281-2.738c0-.911.097-1.839.281-2.752a13.67 13.67 0 01.799-2.626 13.29 13.29 0 011.292-2.415 13.42 13.42 0 011.741-2.134 13.854 13.854 0 014.564-3.047 14.17 14.17 0 012.626-.8 13.83 13.83 0 015.476 0c.899.183 1.783.449 2.624.8a13.832 13.832 0 014.563 3.047 13.311 13.311 0 011.741 2.134c.505.758.941 1.573 1.292 2.415.351.856.632 1.741.8 2.626.183.913.281 1.841.281 2.752 0 .913-.098 1.841-.281 2.738-.168.9-.449 1.785-.8 2.626a13.832 13.832 0 01-1.292 2.429 13.311 13.311 0 01-1.741 2.134 13.42 13.42 0 01-2.134 1.741 14.28 14.28 0 01-5.053 2.092 13.87 13.87 0 01-2.738.279z"></path>
              <path d="M409.978 323.434c-5.317-28.112-18.545-53.879-38.248-74.507-7.374-7.728-15.525-13.857-24.188-18.734 33.304-19.462 48.247-39.09 45.504-59.599-3.853-28.794-24.68-34.078-34.691-36.618-.612-.156-1.297-.329-1.97-.508.976-2.52 2.536-5.775 3.705-8.218 6.033-12.596 15.15-31.628 3.064-49.137-13.044-18.897-30.844-19.963-42.621-20.666-2.974-.178-7.361-.439-8.9-1.039-1.2-1.765-3.344-6.178-4.949-9.483C298.522 28.122 284.867 0 255.686 0h-.97c-29.179 0-42.836 28.123-50.994 44.925-1.598 3.291-3.729 7.68-4.934 9.459-1.613.623-5.962.885-8.916 1.061-11.779.703-29.578 1.769-42.621 20.666-12.238 17.726-2.332 36.811 4.222 49.439 1.226 2.363 2.85 5.493 3.921 7.975-.601.157-1.202.312-1.747.449-10.011 2.54-30.84 7.822-34.691 36.618-2.717 20.314 12.434 40.379 45.07 59.842-8.502 4.837-16.503 10.888-23.754 18.487-19.706 20.634-32.933 46.401-38.246 74.49-1.792 9.396-2.701 19.148-2.701 28.984 0 100.3 145.524 156.363 151.719 158.701a14.034 14.034 0 0010.124-.082c6.186-2.449 151.507-61.099 151.507-158.619-.001-9.831-.909-19.582-2.697-28.961zm-44.766-149.117c.838 6.254-9.545 22.097-52.955 42.677a176.315 176.315 0 00-9.838-1.888c-.51-.084-1.021-.164-1.53-.244a219.01 219.01 0 00-14.168-1.739l55.033-55.033c3.38 1.495 6.821 2.376 9.696 3.106 9.044 2.291 12.429 3.151 13.762 13.121zM170.361 92.063c5.036-7.295 10.73-7.962 21.188-8.587 8.131-.486 17.347-1.036 25.194-7.387 5.046-4.086 8.219-10.622 12.238-18.898 7.735-15.926 15.009-29.11 25.735-29.11h.97c10.727 0 18 13.184 25.735 29.109 4.018 8.277 7.193 14.814 12.242 18.901 7.843 6.348 17.059 6.899 25.19 7.385 10.46.625 16.154 1.292 21.19 8.587 2.628 3.808-.681 11.454-5.281 21.055-3.019 6.303-6.099 12.742-7.075 19.321l-57.649 57.649v-56.089c0-7.753-6.287-14.04-14.04-14.04-7.753 0-14.04 6.287-14.04 14.04v56.088l-57.722-57.722c-1.104-6.752-4.503-13.322-7.84-19.751-4.916-9.473-8.482-17.003-6.035-20.551zm28.457 125.132c-42.701-20.533-52.879-36.523-52.028-42.88 1.332-9.97 4.716-10.828 13.762-13.122 2.875-.73 6.315-1.609 9.695-3.103l55.03 55.03c-4.187.379-8.375.873-12.549 1.494a177.023 177.023 0 00-2.872.443c-3.824.62-7.501 1.328-11.038 2.138zm57.068 265.559c-24.429-10.334-128.48-58.585-128.48-130.359 0-8.073.741-16.055 2.209-23.742 4.306-22.769 15.013-43.634 30.969-60.342 11.065-11.596 24.819-18.532 39.941-22.637.136-.032.275-.045.41-.081 14.435-3.829 31.932-5.612 55.065-5.612 22.702 0 39.938 1.719 54.243 5.406.268.069.539.119.809.173 15.29 4.091 29.199 11.051 40.369 22.758 15.951 16.703 26.659 37.565 30.97 60.354 1.462 7.67 2.203 15.651 2.203 23.723-.001 69.638-104.286 119.615-128.708 130.359z"></path>
            </g>
          </svg>
          <h1 className="select-none font-mono text-2xl font-bold text-neutral-800">
            turnip3
          </h1>
        </div>
        <Link
          to="/"
          className="flex w-10/12 cursor-pointer flex-row items-center justify-start gap-3 rounded-md py-3 pl-5 transition-colors duration-150 hover:bg-neutral-300/30"
          onClick={() => setShowNavBar(false)}
        >
          <svg
            className="h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            width="800"
            height="800"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              fill="#000"
              fillRule="evenodd"
              d="M11.31 1.776a1 1 0 011.38 0l8 7.619 2.5 2.38a1 1 0 01-1.38 1.45l-.81-.773V20a2 2 0 01-2 2H5a2 2 0 01-2-2v-7.548l-.81.772a1 1 0 11-1.38-1.448l2.5-2.381 8-7.62zM5 10.548V20h4v-5a3 3 0 116 0v5h4v-9.452L12 3.88l-7 6.667zM13 20v-5a1 1 0 10-2 0v5h2z"
              clipRule="evenodd"
            ></path>
          </svg>
          <h2 key={uuid()} className="text-md text-center ">
            Home
          </h2>
        </Link>
        {blogs.map((blog) => (
          <Link
            to={`/blog/${blog.id}`}
            onClick={() => setShowNavBar(false)}
            className="flex w-10/12 cursor-pointer flex-row items-center justify-start gap-3 rounded-md py-2.5 pl-5 transition-colors duration-150 hover:bg-neutral-300/30"
            key={uuid()}
          >
            <img className="h-6 w-6" src={blog.logoUrl} />
            <h2 className="text-md text-center ">{blog.name}</h2>
          </Link>
        ))}
      </nav>
      <div className="mt-28">
        <Outlet />
      </div>
    </div>
  );
}
