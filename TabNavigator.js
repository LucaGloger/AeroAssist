import React, { useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet, TouchableOpacity, Image } from "react-native";
import { StatusBar } from "expo-status-bar";
import WeatherScreen from "./screens/WeatherScreen";
import FlightInfoScreen from "./screens/FlightInfoScreen";
import HomeScreen from "./screens/HomeScreen";
import { SignOut } from "./js/authManager";

const Tab = createBottomTabNavigator();

const icons = {
  "Aero AI": {
    active: require("./assets/search.png"),
    inactive: require("./assets/search_inactive.png"),
  },
  Weather: {
    active: require("./assets/weather.png"),
    inactive: require("./assets/weather_inactive.png"),
  },
  FlightInfo: {
    active: require("./assets/flight.png"),
    inactive: require("./assets/flight_inactive.png"),
  },
  Edit: {
    active: require("./assets/edit.png"),
    inactive: require("./assets/edit_inactive.png"),
  },
  Checklist: {
    active: require("./assets/list.png"),
    inactive: require("./assets/list_inactive.png"),
  },
};

export default function TabNavigator() {
  const [activeTab, setActiveTab] = useState("FlightInfo");

  const screenOptions = {
    tabBarActiveTintColor: "#FFFFFF",
    tabBarInactiveTintColor: "#848487",
    tabBarStyle: {
      backgroundColor: "#000000",
      height: 62,
      borderTopWidth: 0,
    },
    tabBarLabelStyle: { fontSize: 11 },
    headerStyle: {
      height: 46,
      backgroundColor: "#000000",
    },
    headerTintColor: "#FFFFFF",
    headerTitleStyle: {
      fontSize: 20,
      fontWeight: "bold",
    },
    headerTitleAlign: "center",
  };

  const renderHeaderRight = () => (
    <TouchableOpacity
      style={{ paddingRight: 10 }}
    >
      <Image source={require("./assets/more.png")} style={styles.icon} />
    </TouchableOpacity>
  );

  const renderHeaderLeft = () => (
    <TouchableOpacity
      style={{ paddingLeft: 10 }}
      onPress={() => alert("Action Button Pressed!")}
    >
      <Image source={require("./assets/menu.png")} style={styles.icon} />
    </TouchableOpacity>
  );

  const renderTabIcon = (routeName, isActive) => {
    const icon = icons[routeName];
    return (
      <Image
        source={isActive ? icon.active : icon.inactive}
        style={styles.icon}
      />
    );
  };

  const getTabOptions = (routeName) => ({
    tabBarIcon: () => renderTabIcon(routeName, activeTab === routeName),
    tabBarLabelStyle: {
      fontSize: 11,
      fontWeight: activeTab === routeName ? "bold" : "normal",
    },
    headerTitleAlign: "start",
    borderBottomWidth: 0,
    headerLeft: renderHeaderLeft,
    headerRight: renderHeaderRight,
  });

  return (
    <>
      <StatusBar style="light" translucent={false} />
      <Tab.Navigator
        initialRouteName="FlightInfo"
        screenOptions={screenOptions}
        screenListeners={{
          state: (e) => {
            const currentRoute = e.data.state.routes[e.data.state.index].name;
            setActiveTab(currentRoute);
          },
        }}
      >
        <Tab.Screen
          name="Aero AI"
          component={HomeScreen}
          options={getTabOptions("Aero AI")}
        />
        <Tab.Screen
          name="Weather"
          component={WeatherScreen}
          options={getTabOptions("Weather")}
        />
        <Tab.Screen
          name="FlightInfo"
          component={FlightInfoScreen}
          options={getTabOptions("FlightInfo")}
        />
        {["Edit", "Checklist"].map((screenName) => (
          <Tab.Screen
            key={screenName}
            name={screenName}
            component={WeatherScreen}
            options={getTabOptions(screenName)}
          />
        ))}
      </Tab.Navigator>
    </>
  );
}

const styles = StyleSheet.create({
  icon: {
    width: 24,
    height: 24,
  },
});
