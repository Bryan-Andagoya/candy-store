import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import * as ImagePicker from "expo-image-picker";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import React, { useState } from "react";
import { Alert, StyleSheet, Text, View, Image } from "react-native";

import { CustomButton, CustomTextInput } from "../components";
import { storage } from "../config";
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
  const [image, setImage] = useState<string>(candyData?.image || "");

  const add = async () => {
    try {
      setLoading(true);
      const priceValue = parseFloat(price);
      await addCandy({ name, description, price: priceValue, image });
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
        image,
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

  const uploadImage = async () => {
    setLoading(true);

    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [1, 1],
        base64: true,
        quality: 1,
      });

      if (!result.canceled) {
        const blob = await new Promise<Blob>((resolve, reject) => {
          const xhr = new XMLHttpRequest();
          xhr.onload = () => {
            resolve(xhr.response);
          };
          xhr.onerror = function (e) {
            console.log(e);
            reject(new Error());
          };
          xhr.responseType = "blob";
          xhr.open("GET", result.assets[0].uri, true);
          xhr.send(null);
        });

        const storageRef = ref(
          storage,
          `images/candies/${name}${Date.now()}.jpg`
        );

        const { ref: imageRef } = await uploadBytes(storageRef, blob);

        const photoUri = await getDownloadURL(imageRef);

        setImage(photoUri);
      }
    } catch (error) {
      Alert.alert(
        "¡Algo salió mal!",
        "Error al cargar la imagen, intentelo más tarde"
      );
      console.log(error);
    }

    setLoading(false);
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
        {image ? (
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: image }}
              style={styles.image}
              resizeMode="contain"
            />
          </View>
        ) : null}
      </View>
      <View style={styles.buttonContainer}>
        <CustomButton
          text="Pick Image"
          onPress={uploadImage}
          loading={loading}
        />
        <View style={{ height: 16 }} />
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
  imageContainer: {
    paddingTop: 16,
  },
  image: {
    height: 100,
  },
});
