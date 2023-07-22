import { createContext } from "react";

const IsWritingPostContext = createContext<IIsWritingPost>({
  isWritingPost: false,
  setIsWritingPost: () => {},
});

export default IsWritingPostContext;
