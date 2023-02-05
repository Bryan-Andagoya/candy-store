import { useContext } from "react";

import { UserContext } from "../context/user/UserContext.";

export const useUserStore = () => {
  return useContext(UserContext);
};
