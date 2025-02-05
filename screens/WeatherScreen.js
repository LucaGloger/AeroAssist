import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  TextInput,
  Image,
  Alert,
  ActivityIndicator,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import MaskedView from "@react-native-masked-view/masked-view";
import { fetchFlightInfo, fetchWeatherData } from "../js/dataViewModel";

function WeatherScreen() {
  const [inputText, setInputText] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const maxLength = 4;

  useEffect(() => {
    const loadData = async () => {
      try {
        const flightInfo = await fetchFlightInfo();

        const weather = await fetchWeatherData(flightInfo.origin);
        setWeatherData(weather);

        setIsLoading(false);
      } catch (error) {
        Alert.alert("Error", "Data couldn't Load.");
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  const fetchData = async () => {
    if (inputText.length === maxLength) {
      setIsLoading(true);
      try {
        const data = await fetchWeatherData(inputText);
        setWeatherData(data);
        setInputText("");
      } catch (error) {
        Alert.alert("Error", "Data couldn't Load.", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

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
          <View style={styles.container}>
            <Text style={styles.title}>Current Airport</Text>
            <Text style={styles.containerText}>
              {weatherData ? weatherData.icaoId : "Loading..."}
            </Text>
            <Text style={styles.title}>METAR</Text>
            <Text style={styles.containerText}>
              {weatherData ? weatherData.rawOb : "Loading..."}
            </Text>
            <Text style={styles.title}>Temperature</Text>
            <Text style={styles.containerText}>
              {weatherData ? weatherData.temp : "Loading..."} °C
            </Text>
            <Text style={styles.title}>Dew Point</Text>
            <Text style={styles.containerText}>
              {weatherData ? weatherData.dewp : "Loading..."} °C
            </Text>
            <Text style={styles.title}>Wind Direction</Text>
            <Text style={styles.containerText}>
              {weatherData ? weatherData.wdir : "Loading..."}°
            </Text>
            <Text style={styles.title}>Wind Speed</Text>
            <Text style={styles.containerText}>
              {weatherData ? weatherData.wspd : "Loading..."} kt
            </Text>
            <Text style={styles.title}>Visibility</Text>
            <Text style={styles.containerText}>
              {weatherData ? weatherData.visib : "Loading..."} SM
            </Text>
            <Text style={styles.title}>Altimeter Setting</Text>
            <Text style={styles.containerText}>
              {weatherData ? weatherData.altim : "Loading..."} hPa
            </Text>
          </View>
        </ScrollView>
      </View>
      <View style={styles.searchBarCon}>
        <MaskedView
          style={styles.maskedView}
          maskElement={
            <Text style={styles.inputText}>
              {inputText || "What Airport you looking for?"}
            </Text>
          }
        >
          <LinearGradient
            colors={["#66A1F3", "#22C9A6"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <Text style={styles.gradientText}>
              {inputText || "What Airport you looking for?"}
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
          onBlur={fetchData}
          onSubmitEditing={fetchData}
        />
        <Image
          source={require("../assets/search_gradient.png")}
          style={styles.searchBarIcon}
        />
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
    fontFamily: "SamsungOne-700",
    color: "#FFFFFF",
  },

  containerText: {
    fontSize: 14,
    fontFamily: "VariableOneUISans",
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
    fontFamily: "SamsungOne-700",
    textAlign: "left",
    marginLeft: 20,
    color: "transparent",
  },

  inputText: {
    flex: 1,
    fontSize: 16,
    fontFamily: "SamsungOne-700",
    textAlign: "left",
    marginLeft: 20,
  },

  searchBarInp: {
    position: "absolute",
    left: 0,
    bottom: 0,
    height: "100%",
    width: "100%",
    fontSize: 16,
    fontFamily: "SamsungOne-700",
    color: "transparent",
    backgroundColor: "transparent",
    marginLeft: 20,
  },

  searchBarIcon: {
    position: "absolute",
    right: 20,
    height: 24,
    width: 24,
    backgroundColor: "#17171A",
  },
});

export default WeatherScreen;
