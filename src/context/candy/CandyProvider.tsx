import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  setDoc,
} from "firebase/firestore";
import { useState } from "react";
import { Alert } from "react-native";

import { CandyContext, CandyStore } from "./CandyContext";
import { db } from "../../config";
import { CandyModel } from "../../models";

interface Props {
  children: JSX.Element;
}

export const CandyProvider = ({ children }: Props) => {
  const [candies, setCandies] = useState<CandyModel[] | null>(null);

  const getCandies: CandyStore["getCandies"] = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "candies"));
      const data: CandyModel[] = [];

      querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, ...(doc.data() as any) });
      });

      setCandies(data);
    } catch (error) {
      Alert.alert("Error", (error as any).message);
    }
  };

  const deleteCandy: CandyStore["deleteCandy"] = async (id) => {
    try {
      const newData = candies?.filter((candy) => candy.id !== id) || null;
      setCandies(newData);
      await deleteDoc(doc(db, "candies", id));
    } catch (error) {
      Alert.alert("Error", (error as any).message);
    }
  };

  const addCandy: CandyStore["addCandy"] = async (candy) => {
    try {
      await addDoc(collection(db, "candies"), candy);
      await getCandies();
    } catch (error) {
      Alert.alert("Error", (error as any).message);
    }
  };

  const updateCandy: CandyStore["updateCandy"] = async ({ id, ...candy }) => {
    try {
      await setDoc(doc(db, "candies", id!), candy);
      await getCandies();
    } catch (error) {
      Alert.alert("Error", (error as any).message);
    }
  };

  const store: CandyStore = {
    candies,
    getCandies,
    deleteCandy,
    addCandy,
    updateCandy,
  };

  return (
    <CandyContext.Provider value={store}>{children}</CandyContext.Provider>
  );
};
