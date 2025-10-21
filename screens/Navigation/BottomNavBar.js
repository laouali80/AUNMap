import { StyleSheet, Text, View } from "react-native";
import React from "react";
import ProfileScreen from "../Profile/ProfileScreen";
import HomeScreen from "../Home/HomeScreen";
import MapScreen from "../Map/MapScreen";
import SavedScreen from "../Saved/SavedScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { BookMarked, Home, Map, UserRound } from "lucide-react-native";

const Tab = createBottomTabNavigator();

const BottomNavBar = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarItemStyle: styles.tabBarItem,
        tabBarLabelStyle: styles.tabBarLabel,
        // tabBarActiveTintColor: "#007AFF", // iOS blue, change to your theme color
        tabBarInactiveTintColor: "#8E8E93", // iOS gray
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Home
              size={focused ? 28 : 24}
              color={color}
              // fill={focused ? color : "transparent"}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Map"
        component={MapScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Map
              size={focused ? 28 : 24}
              color={color}
              // fill={focused ? color : "transparent"}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Saved"
        component={SavedScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <BookMarked
              size={focused ? 28 : 24}
              color={color}
              // fill={focused ? color : "transparent"}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <UserRound
              size={focused ? 28 : 24}
              color={color}
              // fill={focused ? color : "transparent"}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomNavBar;

const styles = StyleSheet.create({
  tabBar: {
    height: 95,
    paddingTop: 8,
    // paddingBottom: 20,
    backgroundColor: "#ffffff",
    borderTopWidth: 1,
    borderTopColor: "#E5E5E5",
    // iOS shadows
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8, // Android shadow
  },
  tabBarItem: {
    paddingVertical: 4,
  },
  tabBarLabel: {
    fontSize: 12,
    fontWeight: "500",
    marginTop: 4,
  },
});
