import React, { useState, useEffect } from "react";
import { 
  StyleSheet, 
  View, 
  TouchableOpacity, 
  Image, 
  useWindowDimensions 
} from "react-native";
import { 
  createBottomTabNavigator 
} from "@react-navigation/bottom-tabs";
import { 
  createNativeStackNavigator 
} from "@react-navigation/native-stack";
import { 
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList
} from "@react-navigation/drawer";
import { StatusBar } from "expo-status-bar";
import WeatherScreen from "./screens/WeatherScreen";
import HomeInfoScreen from "./screens/HomeInfoScreen";
import AeroBrief from "./screens/AeroBrief";
import SettingsScreen from "./screens/SettingsScreen";
import ChangeEmailScreen from "./screens/ChangeEmailScreen";
import { SignOutViewModel } from "./js/authManager";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const icons = {
  Home: {
    active: require("./assets/home.png"),
    inactive: require("./assets/home_inactive.png"),
  },
  Weather: {
    active: require("./assets/weather.png"),
    inactive: require("./assets/weather_inactive.png"),
  },
  "Aero Brief": {
    active: require("./assets/news.png"),
    inactive: require("./assets/news_inactive.png"),
  },
  Checklist: {
    active: require("./assets/list.png"),
    inactive: require("./assets/list_inactive.png"),
  },
};

function ResponsiveNavigator() {
  const { width } = useWindowDimensions();
  const isLargeScreen = width >= 768;

  return isLargeScreen ? <DrawerNavigator /> : <TabNavigator />;
}

function DrawerNavigator({ navigation }) {
  const { handleSignOut } = SignOutViewModel(navigation);

  const drawerScreenOptions = ({ route }) => ({
    headerStyle: {
      height: 46,
      backgroundColor: "#000000",
    },
    headerTintColor: "#FFFFFF",
    headerTitleStyle: {
      fontSize: 20,
      fontFamily: "SamsungSharpSans-Bold",
    },
    drawerIcon: ({ focused }) => {
      const icon = icons[route.name];
      return (
        <Image
          source={focused ? icon.active : icon.inactive}
          style={styles.icon}
        />
      );
    },
    drawerActiveTintColor: "#FFFFFF",
    drawerInactiveTintColor: "#848487",
    drawerLabelStyle: styles.drawerLabel,
    headerRight: () => (
      <TouchableOpacity
        style={{ paddingRight: 25 }}
        onPress={() => handleSignOut()}
      >
        <Image source={require("./assets/more.png")} style={styles.icon} />
      </TouchableOpacity>
    ),
  });

  return (
    <Drawer.Navigator
      screenOptions={drawerScreenOptions}
      drawerContent={(props) => (
        <View style={styles.drawerContent}>
          <DrawerContentScrollView {...props}>
            <DrawerItemList 
              {...props}
              itemStyle={styles.drawerItem}
              labelStyle={styles.drawerLabel}
            />
          </DrawerContentScrollView>
        </View>
      )}
      drawerStyle={styles.drawer}
    >
      <Drawer.Screen name="Home" component={HomeInfoScreen} />
      <Drawer.Screen name="Weather" component={WeatherScreen} />
      <Drawer.Screen name="Aero Brief" component={AeroBrief} />
      <Drawer.Screen name="Checklist" component={AeroBrief} />
    </Drawer.Navigator>
  );
}

function MainStack() {
  return (
    <>
      <StatusBar style="light" translucent={false} />
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name="Main"
          component={ResponsiveNavigator}
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
    </>
  );
}

function TabNavigator({ navigation }) {
  const [activeTab, setActiveTab] = useState("Home");
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
      fontSize: 12,
      fontFamily: "VariableOneUISans",
    },
    headerTitleAlign: "start",
    borderBottomWidth: 0,
    headerRight: renderHeaderRight,
  });

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={screenOptions}
      screenListeners={{
        state: (e) => {
          const currentRoute = e.data.state.routes[e.data.state.index].name;
          setActiveTab(currentRoute);
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeInfoScreen}
        options={getTabOptions("Home")}
      />
      <Tab.Screen
        name="Weather"
        component={WeatherScreen}
        options={getTabOptions("Weather")}
      />
      <Tab.Screen
        name="Aero Brief"
        component={AeroBrief}
        options={getTabOptions("Aero Brief")}
      />
      {["Checklist"].map((screenName) => (
        <Tab.Screen
          key={screenName}
          name={screenName}
          component={AeroBrief}
          options={getTabOptions(screenName)}
        />
      ))}
    </Tab.Navigator>
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
    backgroundColor: "#17171A",
    width: 305,
    marginTop: 15,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    overflow: "hidden",
  },
  drawerContent: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: "#17171A",
  },
  drawerItem: {
    backgroundColor: "#171717",
    borderRadius: 0,
  },
  drawerLabel: {
    color: "#FFFFFF",
    fontSize: 16,
  },
});