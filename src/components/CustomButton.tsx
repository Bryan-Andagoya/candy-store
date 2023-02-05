import React from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";

interface Props {
  onPress?: TouchableOpacityProps["onPress"];
  text: string;
  loading?: boolean;
}

export const CustomButton = ({ onPress, text, loading }: Props) => {
  return (
    <TouchableOpacity
      onPress={loading ? undefined : onPress}
      style={styles.button}
      disabled={loading}
    >
      {loading ? (
        <ActivityIndicator size="small" color="white" />
      ) : (
        <Text style={styles.text}>{text}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "orangered",
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  text: {
    fontSize: 16,
    fontWeight: "500",
    textAlign: "center",
    color: "white",
  },
});
