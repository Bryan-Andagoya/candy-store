import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import { CustomButton, CustomTextInput } from "../components";
import { useUserStore } from "../hooks";

export const RegisterScreen = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { registerUser } = useUserStore();
  const [loading, setLoading] = useState<boolean>(false);

  const register = async () => {
    setLoading(true);
    await registerUser(email, password);
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Register</Text>
      </View>
      <View style={styles.form}>
        <View style={styles.inputContainer}>
          <CustomTextInput
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
          />
        </View>
        <View style={styles.inputContainer}>
          <CustomTextInput
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            autoCapitalize="none"
            secureTextEntry
          />
        </View>
        <View style={styles.buttonContainer}>
          <CustomButton text="Login" onPress={register} loading={loading} />
        </View>
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
    paddingVertical: 20,
  },
});
