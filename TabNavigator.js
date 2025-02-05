import React, { useState, useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
} from "@react-navigation/drawer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import WeatherScreen from "./screens/WeatherScreen";
import FlightInfoScreen from "./screens/FlightInfoScreen";
import HomeScreen from "./screens/HomeScreen";
import SettingsScreen from "./screens/SettingsScreen";
import ChangeEmailScreen from "./screens/ChangeEmailScreen";
import { SignOutViewModel } from "./js/authManager";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

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

function MainStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="MainTabs"
        component={TabNavigator}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

function TabNavigator({ navigation }) {
  const [activeTab, setActiveTab] = useState("FlightInfo");

  const { handleSignOut } = SignOutViewModel(navigation);

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
    headerTitleAlign: "start",
  };

  const renderHeaderRight = () => (
    <TouchableOpacity
      style={{ paddingRight: 10 }}
      onPress={() => handleSignOut()}
    >
      <Image source={require("./assets/more.png")} style={styles.icon} />
    </TouchableOpacity>
  );

  const renderHeaderLeft = () => (
    <TouchableOpacity
      style={{ paddingLeft: 10 }}
      onPress={() => navigation.openDrawer()}
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
            component={HomeScreen}
            options={getTabOptions(screenName)}
          />
        ))}
      </Tab.Navigator>
    </>
  );
}

function CustomDrawerContent(props) {
  const { navigation } = props;
  const [email, setEmail] = useState("Loading...");

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setEmail(user ? user.email : "Guest");
    });

    return () => unsubscribe();
  }, []);

  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={styles.drawerContainer}
    >
      <View style={styles.drawerContent}>
        {/* <DrawerItem
          label={email}
          onPress={handleSignOut}
          labelStyle={styles.drawerLabel}
          icon={() => (
            <Image
              source={require("./assets/user.png")}
              style={styles.drawerIcon}
            />
          )}
          style={styles.drawerItem}
        /> */}
      </View>
      <View style={styles.accountContainer}>
        <TouchableOpacity
          style={styles.accountButton}
          activeOpacity={0.7}
          onPress={() => navigation.navigate("Settings")}
        >
          <Image
            source={require("./assets/user.png")}
            style={styles.accountIcon}
          />
          <Text style={styles.accountLabel}>{email}</Text>
        </TouchableOpacity>
      </View>
    </DrawerContentScrollView>
  );
}

export default function AppNavigator() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerStyle: styles.drawer,
        drawerType: "slide",
        swipeEdgeWidth: Dimensions.get("window").width,
        swipeEnabled: true,
        gestureHandlerOptions: {
          activeOffsetX: [-20, 20],
        },
      }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen
        name="Main"
        component={MainStack}
        options={{
          headerShown: false,
          gestureHandlerOptions: {
            swipeEnabled: true,
          },
        }}
      />
      <Drawer.Screen
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
          swipeEnabled: false,
          gestureEnabled: false,
        })}
      />
      <Drawer.Screen
        name="ChangeEmail"
        component={ChangeEmailScreen}
        options={({ navigation }) => ({
          headerShown: false,
          swipeEnabled: false,
          gestureEnabled: false,
        })}
      />
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  icon: {
    width: 24,
    height: 24,
  },

  drawer: {
    backgroundColor: "#17171A",
    width: 290,
  },

  drawerContainer: {
    flex: 1,
  },

  drawerContent: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "#17171A",
  },

  drawerItem: {
    backgroundColor: "#17171A",
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
    backgroundColor: "#17171A",
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
