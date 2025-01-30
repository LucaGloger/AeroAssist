import React, { useState } from "react";
import { StyleSheet, View, Text, TextInput, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import MaskedView from "@react-native-masked-view/masked-view";

function DetailsScreen() {
  const [inputText, setInputText] = useState("");

  return (
    <View style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.title}>EDDM</Text>
      </View>
      <View style={styles.searchBarCon}>
        <MaskedView
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
            <TextInput
              style={styles.searchBarInp}
              onChangeText={setInputText}
              value={inputText}
              placeholder="What Airport you looking for?"
              placeholderTextColor="transparent"
              keyboardType="text"
            />
          </LinearGradient>
        </MaskedView>
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
    fontWeight: "medium",
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
  },

  inputText: {
    flex: 1,
    fontSize: 16,
    fontWeight: "600",
    textAlign: "left",
    marginLeft: 20,
  },

  searchBarInp: {
    flex: 1,
    fontSize: 16,
    fontWeight: "600",
    color: "transparent",
    backgroundColor: "transparent",
    marginLeft: 20,
  },

  searchBarIcon: {
    height: 24,
    width: 24,
    marginRight: 20,
  },
});

export default DetailsScreen;
