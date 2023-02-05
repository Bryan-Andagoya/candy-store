import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
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
      await deleteDoc(doc(db, "candies", id));
      setCandies(null);
      getCandies();
    } catch (error) {
      Alert.alert("Error", (error as any).message);
    }
  };

  const store: CandyStore = {
    candies,
    getCandies,
    deleteCandy,
  };

  return (
    <CandyContext.Provider value={store}>{children}</CandyContext.Provider>
  );
};
