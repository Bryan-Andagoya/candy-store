import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { useUserStore } from "../hooks";
import { CandyModel } from "../models";
import {
  CandyFormScreen,
  HomeScreen,
  LoginScreen,
  RegisterScreen,
} from "../screens";

export type StackNavigatorParamList = {
  Home: undefined;
  CandyForm: undefined | CandyModel;
  Login: undefined;
  Register: undefined;
};

const Stack = createNativeStackNavigator<StackNavigatorParamList>();

export const StackNavigator = () => {
  const { isAuthenticated } = useUserStore();

  return (
    <Stack.Navigator screenOptions={{ title: "" }}>
      {isAuthenticated ? (
        <>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="CandyForm" component={CandyFormScreen} />
        </>
      ) : (
        <>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
        </>
      )}
    </Stack.Navigator>
  );
};
