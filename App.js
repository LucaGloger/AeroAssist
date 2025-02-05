import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import AppNavigator from "./AppNavigator";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [loaded, error] = useFonts({
    VariableOneUISans: require("./assets/fonts/VariableOneUISans.ttf"),
    "SamsungSharpSans-Bold": require("./assets/fonts/SamsungSharpSans-Bold.ttf"),
    "SamsungOne-700": require("./assets/fonts/SamsungOne-700.ttf"),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <View style={styles.container}>
      <AppNavigator />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
