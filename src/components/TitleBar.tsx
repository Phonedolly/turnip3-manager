import { appWindow } from "@tauri-apps/api/window";

export default function TitleBar() {
  return (
    <div
      className="fixed left-0 right-0 top-0 flex h-11 w-full flex-row items-center justify-between"
      data-tauri-drag-region
    >
      <h1
        className="text-md flex h-full select-none flex-row items-center px-3.5"
        data-tauri-drag-region
      >
        Turnip3 Manager
      </h1>
      {/* Icons */}
      <div className="flex h-full flex-row items-center ">
        {/* https://www.svgrepo.com/svg/511036/line-m */}
        <svg
          className="relative top-0.5 h-11 w-11 rotate-90 p-3 transition hover:bg-neutral-300/80"
          onClick={() => appWindow.minimize()}
          xmlns="http://www.w3.org/2000/svg"
          width="800"
          height="800"
          fill="none"
          viewBox="0 0 24 24"
        >
          <g>
            <path
              stroke="#000"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 17V7"
            ></path>
          </g>
        </svg>
        {/* https://www.svgrepo.com/svg/510963/dummy-square */}
        <svg
          className="h-11 w-11 p-3 transition hover:bg-neutral-300/80"
          onClick={() => appWindow.toggleMaximize()}
          xmlns="http://www.w3.org/2000/svg"
          width="800"
          height="800"
          fill="none"
          viewBox="0 0 24 24"
        >
          <g>
            <path
              stroke="#000"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 9.2v5.6c0 1.12 0 1.68.218 2.108a2 2 0 00.874.874c.427.218.987.218 2.105.218h5.606c1.118 0 1.677 0 2.104-.218.377-.192.683-.498.875-.874.218-.428.218-.987.218-2.104V9.197c0-1.118 0-1.678-.218-2.105a2.001 2.001 0 00-.875-.874C16.48 6 15.92 6 14.8 6H9.2c-1.12 0-1.68 0-2.108.218a1.999 1.999 0 00-.874.874C6 7.52 6 8.08 6 9.2z"
            ></path>
          </g>
        </svg>
        {/* https://www.svgrepo.com/svg/510924/close-md */}
        <svg
          className="h-11 w-11 p-3 transition hover:bg-red-500/95"
          onClick={() => appWindow.close()}
          xmlns="http://www.w3.org/2000/svg"
          width="800"
          height="800"
          fill="none"
          viewBox="0 0 24 24"
        >
          <g>
            <path
              stroke="#000"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M18 18l-6-6m0 0L6 6m6 6l6-6m-6 6l-6 6"
            ></path>
          </g>
        </svg>
      </div>
    </div>
  );
}
