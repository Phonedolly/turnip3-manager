import { SyntheticEvent, useEffect, useRef, useState } from "react";
import { Outlet, Link, useLoaderData } from "react-router-dom";
export async function blogsLoader() {
  return ["A", "B", "C"];
}

export function Root() {
  const [showNavBar, setShowNavBar] = useState<boolean>(false);
  const blogNames = useLoaderData() as string[];
  const ref = useRef<HTMLDivElement>(null);

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
  return (
    <div className="h-full w-full flex-col">
      <nav
        className={`fixed z-20 h-full w-48 bg-gray-600 duration-300 ease-in-out ${
          showNavBar === true ? "translate-x-0" : "-translate-x-full"
        }`}
        ref={ref}
      >
        {blogNames.map((name) => (
          <div>{name}</div>
        ))}
      </nav>
      <div className="h-9 w-full flex flex-row justify-between bg-gray-300">
        <div
          className="h-full w-9 bg-green-400"
          onClick={() => setShowNavBar(true)}
        ></div>
        <div className="h-full w-9 bg-green-700"></div>
      </div>

      <Outlet />
    </div>
  );
}
