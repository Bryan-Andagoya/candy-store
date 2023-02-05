import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";

import { CandyProvider, UserProvider } from "./src/context";
import { StackNavigator } from "./src/navigation";

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <UserProvider>
        <CandyProvider>
          <StackNavigator />
        </CandyProvider>
      </UserProvider>
    </NavigationContainer>
  );
}
