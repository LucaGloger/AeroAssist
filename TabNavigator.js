import React, { useState, useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet, View, Text, TouchableOpacity, Image } from "react-native";
import { StatusBar } from "expo-status-bar";
import WeatherScreen from "./screens/WeatherScreen";
import FlightInfoScreen from "./screens/FlightInfoScreen";
import HomeScreen from "./screens/HomeScreen";
import SettingsScreen from "./screens/SettingsScreen";
import ChangeEmailScreen from "./screens/ChangeEmailScreen";
import { SignOutViewModel } from "./js/authManager";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const icons = {
  "Aero AI": {
    active: require("./assets/star_inactive.png"),
    inactive: require("./assets/star.png"),
  },
  Weather: {
    active: require("./assets/weather.png"),
    inactive: require("./assets/weather_inactive.png"),
  },
  FlightInfo: {
    active: require("./assets/home.png"),
    inactive: require("./assets/home_inactive.png"),
  },
  Checklist: {
    active: require("./assets/list.png"),
    inactive: require("./assets/list_inactive.png"),
  },
};

function MainStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="MainTabs"
        component={TabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
        options={({ navigation }) => ({
          headerShown: true,
          headerStyle: {
            height: 46,
            backgroundColor: "#000000",
          },
          headerTintColor: "#FFFFFF",
          headerTitleStyle: {
            fontSize: 20,
            fontWeight: "bold",
          },
          headerLeft: () => (
            <TouchableOpacity
              style={{ paddingLeft: 10, marginRight: 10 }}
              onPress={() => navigation.goBack()}
            >
              <Image
                source={require("./assets/arrow.png")}
                style={styles.icon}
              />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name="ChangeEmail"
        component={ChangeEmailScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

function TabNavigator({ navigation }) {
  const [activeTab, setActiveTab] = useState("FlightInfo");

  const { handleSignOut } = SignOutViewModel(navigation);

  const screenOptions = {
    tabBarActiveTintColor: "#848487",
    tabBarInactiveTintColor: "#848487",
    tabBarStyle: {
      backgroundColor: "#000000",
      height: 62,
      borderTopWidth: 0,
    },
    tabBarLabelStyle: {
      fontSize: 11,
      fontFamily: "VariableOneUISans",
    },
    headerStyle: {
      height: 46,
      backgroundColor: "#000000",
    },
    headerTitleContainerStyle: {
      paddingHorizontal: 10,
    },
    headerTintColor: "#FFFFFF",
    headerTitleStyle: {
      fontSize: 20,
      fontFamily: "SamsungSharpSans-Bold",
    },
    headerTitleAlign: "start",
  };

  const renderHeaderRight = () => (
    <TouchableOpacity
      style={{ paddingRight: 25 }}
      onPress={() => handleSignOut()}
    >
      <Image source={require("./assets/more.png")} style={styles.icon} />
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
      fontWeight: 400,
      // fontWeight: activeTab === routeName ? "bold" : "normal",
    },
    headerTitleAlign: "start",
    borderBottomWidth: 0,
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
          name="FlightInfo"
          component={FlightInfoScreen}
          options={getTabOptions("FlightInfo")}
        />
        <Tab.Screen
          name="Weather"
          component={WeatherScreen}
          options={getTabOptions("Weather")}
        />
        <Tab.Screen
          name="Aero AI"
          component={HomeScreen}
          options={getTabOptions("Aero AI")}
        />
        {["Checklist"].map((screenName) => (
          <Tab.Screen
            key={screenName}
            name={screenName}
            component={HomeScreen}
            options={getTabOptions(screenName)}
          />
        ))}
      </Tab.Navigator>
    </>
  );
}

export default function AppNavigator() {
  return <MainStack />;
}

const styles = StyleSheet.create({
  icon: {
    width: 24,
    height: 24,
  },

  drawer: {
    backgroundColor: "#171717",
    width: 305,
    marginTop: 15,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    overflow: "hidden",
  },

  drawerContainer: {
    flex: 1,
  },

  drawerContent: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: "#171717",
  },

  drawerItem: {
    backgroundColor: "#171717",
    borderRadius: 0,
  },

  drawerIcon: {
    width: 30,
    height: 30,
  },

  drawerLabel: {
    color: "#FFFFFF",
    fontSize: 16,
  },

  accountContainer: {
    height: 55,
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#42424a",
  },

  accountButton: {
    height: "100%",
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    flexDirection: "row",
    backgroundColor: "#171717",
    gap: 10,
  },

  accountIcon: {
    width: 40,
    height: 40,
  },

  accountLabel: {
    color: "#FFFFFF",
    fontWeight: "400",
    fontSize: 16,
  },
});
