import { createContext } from "react";

import { CandyModel } from "../../models";

export interface CandyStore {
  candies: CandyModel[] | null;
  getCandies: () => Promise<void>;
  deleteCandy: (id: string) => Promise<void>;
  addCandy: (candy: CandyModel) => Promise<void>;
  updateCandy: (candy: CandyModel) => Promise<void>;
}

export const CandyContext = createContext({} as CandyStore);
