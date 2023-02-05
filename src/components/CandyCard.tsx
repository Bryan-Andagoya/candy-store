import { FontAwesome5 } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";

import { useCandyStore } from "../hooks";
import { CandyModel } from "../models";

interface Props {
  candy: CandyModel;
}

export const CandyCard = ({
  candy: { name, description, image, price, id },
}: Props) => {
  const { deleteCandy } = useCandyStore();

  return (
    <View style={styles.card}>
      <View>
        <Image
          source={{
            uri:
              image ||
              "https://www.amazingclubs.ca/img/candyofthemonthclub.jpg",
          }}
          style={styles.image}
          resizeMode="cover"
        />
      </View>
      <View style={styles.dataContainer}>
        <Text style={styles.name}>{name}</Text>
        <Text>{description}</Text>
        <Text style={styles.price}>$ {price.toFixed(2).toString()}</Text>
      </View>
      <View style={styles.iconsContainer}>
        <TouchableOpacity>
          <FontAwesome5 name="edit" size={24} color="deepskyblue" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => deleteCandy(id)}>
          <FontAwesome5 name="trash-alt" size={24} color="orangered" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: "lightgrey",
    padding: 16,
    flexDirection: "row",
    borderRadius: 8,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 4,
  },
  dataContainer: {
    paddingHorizontal: 8,
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
  },
  price: {
    color: "green",
    marginTop: 3,
  },
  iconsContainer: {
    justifyContent: "space-between",
  },
});
