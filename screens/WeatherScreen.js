import React, { useState } from "react";
import { StyleSheet, View, Text, TextInput, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import MaskedView from "@react-native-masked-view/masked-view";

function WeatherScreen() {
  const [inputText, setInputText] = useState("");
  const maxLength = 20;

  return (
    <View style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.title}>EDDM</Text>
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
          placeholder="What Airport you looking for?"
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
    gap: 10,
  },

  container: {
    flex: 1,
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

  searchBarCon: {
    position: "relative",
    height: 58,
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    backgroundColor: "#17171A",
    borderRadius: 30,
    gap: 10,
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

export default WeatherScreen;
