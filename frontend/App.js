import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import AppNavigation from "./navigation/appNavigation";
import DrawerNavigation from "./navigation/DrawerNavigation";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { ViewPropTypes } from "deprecated-react-native-prop-types";
import Toast from "react-native-toast-message";
import axios from "axios";
import { GestureHandlerRootView } from "react-native-gesture-handler";
axios.defaults.baseURL = "http://10.141.3.196:3000/api";
axios.defaults.withCredentials = true;
export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StatusBar backgroundColor="transparent" translucent={true} />
      <NavigationContainer>
        <AppNavigation />
      </NavigationContainer>
      <Toast />
    </GestureHandlerRootView>
  );
}
