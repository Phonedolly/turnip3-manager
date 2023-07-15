import React from "react";
import { MDXProvider } from "@mdx-js/react";

export default function Layout(props: {
  children:
    | string
    | number
    | boolean
    | React.ReactElement<any, string | React.JSXElementConstructor<any>>
    | Iterable<React.ReactNode>
    | React.ReactPortal
    | null
    | undefined;
}) {
  return (
    <MDXProvider
      components={{
        h1: (props) => <h1 {...props} style={{ fontSize: 200 }} />,
        h2: (props) => <h2 style={{ color: "red" }} />,
      }}
    >
      {props.children}
    </MDXProvider>
  );
}
