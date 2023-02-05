import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";

import { CustomButton, CustomTextInput } from "../components";
import { useCandyStore } from "../hooks";
import { StackNavigatorParamList } from "../navigation";

interface Props
  extends NativeStackScreenProps<StackNavigatorParamList, "CandyForm"> {}

export const CandyFormScreen = ({
  route: { params: candyData },
  navigation,
}: Props) => {
  const [name, setName] = useState<string>(candyData?.name || "");

  const [description, setDescription] = useState<string>(
    candyData?.description || ""
  );

  const [price, setPrice] = useState<string>(candyData?.price.toString() || "");
  const [loading, setLoading] = useState<boolean>(false);
  const { addCandy, updateCandy } = useCandyStore();

  const add = async () => {
    try {
      setLoading(true);
      const priceValue = parseFloat(price);
      await addCandy({ name, description, price: priceValue });
      clearForm();
      setLoading(false);
      navigation.pop();
    } catch (error) {
      Alert.alert("Error", (error as any).message);
    }
  };

  const update = async () => {
    try {
      setLoading(true);
      const priceValue = parseFloat(price);

      await updateCandy({
        id: candyData?.id,
        name,
        description,
        price: priceValue,
      });

      clearForm();
      setLoading(false);
      navigation.pop();
    } catch (error) {
      Alert.alert("Error", (error as any).message);
    }
  };

  const clearForm = () => {
    setName("");
    setDescription("");
    setPrice("");
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Candy</Text>
      </View>
      <View style={styles.form}>
        <View style={styles.inputContainer}>
          <CustomTextInput
            placeholder="Name"
            value={name}
            onChangeText={setName}
          />
        </View>
        <View style={styles.inputContainer}>
          <CustomTextInput
            placeholder="Description"
            value={description}
            onChangeText={setDescription}
          />
        </View>
        <View style={styles.inputContainer}>
          <CustomTextInput
            placeholder="Price"
            value={price}
            onChangeText={setPrice}
            keyboardType="numeric"
          />
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <CustomButton
          text={candyData ? "Update Candy" : "Add Candy"}
          onPress={candyData ? update : add}
          loading={loading}
        />
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
  form: {
    width: "70%",
    alignSelf: "center",
    paddingVertical: 16,
  },
  inputContainer: {
    paddingVertical: 8,
  },
  buttonContainer: {
    width: "70%",
    paddingVertical: 20,
    alignSelf: "center",
  },
});
