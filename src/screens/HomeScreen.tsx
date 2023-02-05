import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect } from "react";
import {
  ActivityIndicator,
  Button,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { CandyCard, CustomButton } from "../components";
import { useCandyStore, useUserStore } from "../hooks";
import { CandyModel } from "../models";
import { StackNavigatorParamList } from "../navigation";

interface Props
  extends NativeStackScreenProps<StackNavigatorParamList, "Home"> {}

export const HomeScreen = ({ navigation }: Props) => {
  const { logOutUser } = useUserStore();
  const { candies, getCandies } = useCandyStore();

  useEffect(() => {
    getCandies();
  }, []);

  const renderItem = ({ item }: { item: CandyModel }) => (
    <CandyCard candy={item} />
  );

  const Separetor = () => {
    return <View style={styles.separetor} />;
  };

  const goToForm = () => {
    navigation.navigate("CandyForm");
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Candies</Text>
      </View>
      <View style={styles.listContainer}>
        {candies === null ? (
          <View style={{ justifyContent: "center", flex: 1 }}>
            <ActivityIndicator size="large" color="orangered" />
          </View>
        ) : (
          <FlatList
            data={candies}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            ItemSeparatorComponent={Separetor}
          />
        )}
      </View>
      <View style={{ width: "70%", alignSelf: "center" }}>
        <CustomButton text="Add Candy" onPress={goToForm} />
      </View>
      <View style={styles.buttonContainer}>
        <CustomButton text="Log Out" onPress={logOutUser} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  titleContainer: {
    alignItems: "center",
    padding: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  buttonContainer: {
    width: "70%",
    paddingVertical: 20,
    alignSelf: "center",
  },
  listContainer: {
    flex: 1,
    padding: 16,
  },
  separetor: {
    height: 8,
  },
});
