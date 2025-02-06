import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  Image,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import { fetchFlightInfo } from "../js/dataViewModel";

function HomeInfoScreen() {
  const [flightData, setFlightData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchFlightInfo();
        setFlightData(data);

        const currentFlight = data.currentFlight;
        const airplane = data.airplane;
        const callsign = data.callsign;
        const route = data.route;

        const obt = data.obt;
        const std = data.std;
        const sta = data.sta;
        const ibt = data.ibt;

        const pax = data.pax;
        const cargo = data.cargo;
        const payload = data.payload;
        const zfw = data.zfw;
        const fuel = data.fuel;
        const tow = data.tow;
        const law = data.law;

        setIsLoading(false);
      } catch (error) {
        Alert.alert("Error", "Data couldn't Load.");
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  if (isLoading) {
    return (
      <View style={loadingStyles.loadingContainer}>
        <ActivityIndicator size="large" color="#387AFF" />
      </View>
    );
  }

  return (
    <View style={styles.background}>
      <View style={styles.ScrollViewContainer}>
        <ScrollView
          style={styles.ScrollView}
          overScrollMode="always"
          bounces={true}
        >
          <View style={styles.containerGrid}>
            <TouchableOpacity
              style={styles.container}
              activeOpacity={0.7}
            >
              <View style={styles.titleContainer}>
                <View style={styles.iconContainer}>
                  <Image
                    source={require("../assets/flight_icon.png")}
                    style={styles.icon}
                  />
                </View>
                <Text style={styles.title}>Current Flight</Text>
              </View>
              <Text style={styles.containerSecondText}>
                View all details of your current flight from departure to
                arrival with aircraft model and route.
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.container}
              activeOpacity={0.7}
            >
              <View style={styles.titleContainer}>
                <View style={styles.iconContainer}>
                  <Image
                    source={require("../assets/calendar.png")}
                    style={styles.icon}
                  />
                </View>
                <Text style={styles.title}>Schedule</Text>
              </View>
              <Text style={styles.containerSecondText}>
                View all essential flight schedule details and key operational
                times for your flight.
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.container}
              activeOpacity={0.7}
            >
              <View style={styles.titleContainer}>
                <View style={styles.iconContainer}>
                  <Image
                    source={require("../assets/weight.png")}
                    style={styles.icon}
                  />
                </View>
                <Text style={styles.title}>Loadsheet</Text>
              </View>
              <Text style={styles.containerSecondText}>
                Manage complete aircraft weight data and detailed load
                distribution details efficiently.
              </Text>
            </TouchableOpacity>
            {/* <View style={[styles.container, { marginBottom: 15 }]}>
              <Text style={styles.title}>Current Flight</Text>
              <Text style={styles.containerText}>
                {flightData ? flightData.currentFlight : "Loading..."}
              </Text>
              <Text style={styles.title}>Airplane</Text>
              <Text style={styles.containerText}>
                {flightData ? flightData.airplane : "Loading..."}
              </Text>
              <Text style={styles.title}>Callsign</Text>
              <Text style={styles.containerText}>
                {flightData ? flightData.callsign : "Loading..."}
              </Text>
              <Text style={styles.title}>Route</Text>
              <Text style={styles.containerText}>
                {flightData ? flightData.route : "Loading..."}
              </Text>
            </View>
            <Text style={styles.containerTitle}>Flight Schedule</Text>
            <View style={[styles.container, { marginBottom: 15 }]}>
              <Text style={styles.title}>OBT</Text>
              <Text style={styles.containerText}>
                {flightData ? flightData.obt : "Loading..."}
              </Text>
              <Text style={styles.title}>STD</Text>
              <Text style={styles.containerText}>
                {flightData ? flightData.std : "Loading..."}
              </Text>
              <Text style={styles.title}>STA</Text>
              <Text style={styles.containerText}>
                {flightData ? flightData.sta : "Loading..."}
              </Text>
              <Text style={styles.title}>IBT</Text>
              <Text style={styles.containerText}>
                {flightData ? flightData.ibt : "Loading..."}
              </Text>
            </View>
            <Text style={styles.containerTitle}>Loadsheet</Text>
            <View style={styles.container}>
              <Text style={styles.title}>PAX</Text>
              <Text style={styles.containerText}>
                {flightData ? flightData.pax : "Loading..."}
              </Text>
              <Text style={styles.title}>Cargo</Text>
              <Text style={styles.containerText}>
                {flightData ? flightData.cargo : "Loading..."} kg
              </Text>
              <Text style={styles.title}>Payload</Text>
              <Text style={styles.containerText}>
                {flightData ? flightData.payload : "Loading..."} kg
              </Text>
              <Text style={styles.title}>ZFW</Text>
              <Text style={styles.containerText}>
                {flightData ? flightData.zfw : "Loading..."} kg
              </Text>
              <Text style={styles.title}>Fuel</Text>
              <Text style={styles.containerText}>
                {flightData ? flightData.fuel : "Loading..."} kg
              </Text>
              <Text style={styles.title}>TOW</Text>
              <Text style={styles.containerText}>
                {flightData ? flightData.tow : "Loading..."} kg
              </Text>
              <Text style={styles.title}>LAW</Text>
              <Text style={styles.containerText}>
                {flightData ? flightData.law : "Loading..."} kg
              </Text>
            </View> */}
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

const loadingStyles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#000000",
    padding: 10,
  },
});

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "#000000",
    padding: 10,
  },

  ScrollViewContainer: {
    flex: 1,
    borderRadius: 28,
    overflow: "hidden",
  },

  ScrollView: {
    flex: 1,
    backgroundColor: "#000000",
    borderRadius: 28,
  },

  containerGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 15,
  },

  containerTitle: {
    fontSize: 14,
    fontFamily: "SamsungOne-700",
    color: "#ABABAB",
    paddingHorizontal: 20,
    marginBottom: 5,
  },

  container: {
    height: "auto",
    backgroundColor: "#17171A",
    borderRadius: 28,
    gap: 15,
    padding: 20,
    width: '100%',
    maxWidth: 370,
  },

  titleContainer: {
    height: "auto",
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "start",
  },

  iconContainer: {
    height: 30,
    width: 30,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#A3A2A7",
    borderRadius: 30,
    marginRight: 10,
  },

  icon: {
    height: 22,
    width: 22,
  },

  title: {
    fontSize: 18,
    fontFamily: "SamsungOne-700",
    color: "#FFFFFF",
  },

  containerText: {
    fontSize: 14,
    fontFamily: "VariableOneUISans",
    color: "#FFFFFF",
  },

  containerSecondText: {
    fontSize: 12,
    fontFamily: "VariableOneUISans",
    color: "#9A999E",
    lineHeight: 15,
  },
});

export default HomeInfoScreen;
