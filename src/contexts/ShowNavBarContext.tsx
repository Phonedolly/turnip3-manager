import { createContext } from "react";

const ShowNavBarContext = createContext<{
  showNavBar: boolean;
  setIsShowNavBar: React.Dispatch<React.SetStateAction<boolean>>;
}>({
  showNavBar: false,
  setIsShowNavBar: () => {},
});

export default ShowNavBarContext;
