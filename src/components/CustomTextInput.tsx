import React, { useState } from "react";
import { StyleSheet, TextInput, TextInputProps } from "react-native";

interface Props {
  placeholder: TextInputProps["placeholder"];
  value: TextInputProps["value"];
  onChangeText: TextInputProps["onChangeText"];
  autoCapitalize?: TextInputProps["autoCapitalize"];
  keyboardType?: TextInputProps["keyboardType"];
  secureTextEntry?: TextInputProps["secureTextEntry"];
}

export const CustomTextInput = ({
  placeholder,
  value,
  onChangeText,
  autoCapitalize,
  keyboardType,
  secureTextEntry,
}: Props) => {
  const [isFocus, setIsFocus] = useState<boolean>(false);

  return (
    <TextInput
      style={[styles.input, isFocus && { borderColor: "orangered" }]}
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      autoCapitalize={autoCapitalize}
      keyboardType={keyboardType}
      secureTextEntry={secureTextEntry}
      onFocus={() => setIsFocus(true)}
      onBlur={() => setIsFocus(false)}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderRadius: 100,
    borderColor: "lightgrey",
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
});
