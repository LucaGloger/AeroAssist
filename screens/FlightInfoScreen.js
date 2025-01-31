import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  TextInput,
  Image,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import MaskedView from "@react-native-masked-view/masked-view";
import { fetchFlightInfo } from "../js/dataViewModel";

function FlightInfoScreen() {
  const [inputText, setInputText] = useState("");
  const [flightData, setFlightData] = useState(null);
  const maxLength = 20;

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
      } catch (error) {
        Alert.alert("Error", "Data couldn't Load.");
      }
    };

    loadData();
  }, []);

  return (
    <View style={styles.background}>
      <ScrollView style={styles.ScrollView}>
        <View style={[styles.container, { marginBottom: 10 }]}>
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
        <View style={styles.container}>
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
      </ScrollView>
      <View style={styles.searchBarCon}>
        <MaskedView
          style={styles.maskedView}
          maskElement={
            <Text style={styles.inputText}>
              {inputText || "What Information you looking for?"}
            </Text>
          }
        >
          <LinearGradient
            colors={["#66A1F3", "#22C9A6"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <Text style={styles.gradientText}>
              {inputText || "What Information you looking for?"}
            </Text>
          </LinearGradient>
        </MaskedView>
        <TextInput
          style={styles.searchBarInp}
          onChangeText={setInputText}
          value={inputText}
          placeholder="What Information you looking for?"
          placeholderTextColor="transparent"
          keyboardType="text"
          maxLength={maxLength}
          selectionColor="#FFFFFF"
          cursorColor="#66A1F3"
          caretHidden={false}
        />
        <Image
          source={require("../assets/search_gradient.png")}
          style={styles.searchBarIcon}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "#000000",
    padding: 10,
  },

  ScrollView: {
    flex: 1,
    borderRadius: 28,
  },

  container: {
    height: "auto",
    width: "100%",
    backgroundColor: "#17171A",
    borderRadius: 28,
    gap: 10,
    padding: 20,
  },

  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#FFFFFF",
  },

  containerText: {
    fontSize: 14,
    fontWeight: "400",
    color: "#FFFFFF",
  },

  searchBarCon: {
    height: 58,
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    backgroundColor: "#17171A",
    borderRadius: 30,
    gap: 10,
    marginTop: 10,
  },

  gradientText: {
    fontSize: 16,
    fontWeight: "600",
    textAlign: "left",
    marginLeft: 20,
    color: "transparent",
  },

  inputText: {
    flex: 1,
    fontSize: 16,
    fontWeight: "600",
    textAlign: "left",
    marginLeft: 20,
  },

  searchBarInp: {
    position: "absolute",
    height: "100%",
    width: "100%",
    fontSize: 16,
    fontWeight: "600",
    color: "transparent",
    backgroundColor: "transparent",
    marginLeft: 17,
  },

  searchBarIcon: {
    position: "absolute",
    right: 20,
    height: 24,
    width: 24,
    backgroundColor: "#17171A",
  },
});

export default FlightInfoScreen;
