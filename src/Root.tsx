import { useEffect, useRef, useState } from "react";
import { Outlet, Link, useLoaderData } from "react-router-dom";
import { v4 as uuid } from "uuid";
import TitleBar from "./components/TitleBar";
import Header from "./components/Header/Header";
import NavBar from "./components/NavBar";

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
  const blogs = useLoaderData() as Blog[];
  const [showNavBar, setShowNavBar] = useState<boolean>(false);

  return (
    <div className="h-screen w-screen">
      <TitleBar />
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center">
        <NavBar
          blogs={blogs}
          showNavBar={showNavBar}
          setShowNavBar={setShowNavBar}
        />
        <Header blogs={blogs} setShowNavBar={setShowNavBar} />
        <div className="h-[calc(100vh-2.75rem)] overflow-y-auto pt-16">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
