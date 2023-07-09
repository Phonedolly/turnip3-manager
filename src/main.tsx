import React from "react";
import ReactDOM from "react-dom/client";
import "./styles.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { Root, blogsLoader } from "./Root";
import { Home } from "./pages/Home";
import { Blog } from "./pages/Blog";

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <Root />,
//     loader: blogsLoader,
//     children: [
//       {
//         path: "/",
//         element: <Home />,
//         loader: blogsLoader,
//       },
//     ],
//   },
//   {
//     path: "/blog/:id",
//     element: <Root />,
//     loader: blogsLoader,
//     children: [
//       {
//         path: "/blog/:id",
//         element: <Blog />,
//       },
//     ],
//   },
// ]);

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />} loader={blogsLoader}>
      <Route index element={<Home />} loader={blogsLoader} />
      <Route path="blog/:blogId" element={<Blog />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
