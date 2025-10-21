import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import OnboardingScreen from "./screens/Onboarding/OnboardingScreen";
import LoginScreen from "./screens/Auth/LoginScreen";
import SignupScreen from "./screens/Auth/SignupScreen";
import BottomNavBar from "./screens/Navigation/BottomNavBar";
import BuildingDetailScreen from "./screens/Building/BuildingScreen";

const Stack = createStackNavigator();
const initialize = true;
const authenticated = true;

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false, flex: 1 }}>
          {/* {!initialize ? (
            <> */}
          <Stack.Screen name="onboard" component={OnboardingScreen} />
          {/* </>
          ) : !authenticated ? (
            <> */}
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="SignUp" component={SignupScreen} />
          {/* </>
          ) : (
            <> */}
          <Stack.Screen
            name="Navigation"
            component={BottomNavBar}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="BuildingDetail"
            component={BuildingDetailScreen}
            options={{ headerShown: true }}
          />
          {/* </>
          )} */}
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
