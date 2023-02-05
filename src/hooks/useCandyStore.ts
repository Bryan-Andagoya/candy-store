import { useContext } from "react";

import { CandyContext } from "../context";

export const useCandyStore = () => {
  return useContext(CandyContext);
};
