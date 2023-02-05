import { User } from "firebase/auth";
import { createContext } from "react";

export interface UserStore {
  user: User;
  isAuthenticated: boolean;
  registerUser: (email: string, password: string) => Promise<void>;
  logInUser: (email: string, password: string) => Promise<void>;
  logOutUser: () => Promise<void>;
}

export const UserContext = createContext<UserStore>({} as UserStore);
