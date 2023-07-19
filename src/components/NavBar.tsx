import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { v4 as uuid } from "uuid";

export default function NavBar(props: {
  blogs: Blog[];
  showNavBar: boolean;
  setShowNavBar: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { showNavBar, setShowNavBar, blogs } = props;
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
    <nav
      className={`fixed left-8 top-14 z-20 flex h-[80%] w-64 flex-col items-center justify-start rounded-2xl bg-white/50 shadow-[0_0px_38px_0px_rgba(0,0,0,0.3)] backdrop-blur-xl duration-300 ease-in-out ${
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
        className="flex w-10/12 cursor-pointer flex-row items-center justify-start gap-3 rounded-md py-3 pl-5 duration-150 hover:bg-neutral-300/30"
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
  );
}
