import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import { CustomTextInput } from "../components";
import { StackNavigatorParamList } from "../navigation";

interface Props
  extends NativeStackScreenProps<StackNavigatorParamList, "CandyForm"> {}

export const CandyFormScreen = ({ route: { params } }: Props) => {
  // const [name, setName] = useState<string>("");
  // const [description, setDescription] = useState<string>("");
  // const [price, setPrice] = useState<string>("");

  return (
    <View style={styles.container}>
      <View>
        <Text>Candy</Text>
      </View>
      {/* <View style={styles.form}>
        <View style={styles.inputContainer}>
          <CustomTextInput
            placeholder="Name"
            value={name}
            onChangeText={setName}
          />
        </View>
      </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  form: {
    width: "70%",
    alignSelf: "center",
    paddingVertical: "16",
  },
  inputContainer: {
    paddingVertical: 8,
  },
});
