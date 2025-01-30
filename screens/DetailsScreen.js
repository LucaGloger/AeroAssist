import React from "react";
import { StyleSheet, View, Text, TextInput, Image } from "react-native";

function DetailsScreen() {
  return (
    <View style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.title}>TITLE</Text>
      </View>
      <View style={styles.searchBarCon}>
        <TextInput
          style={styles.searchBarInp}
          // onChangeText={onChangeNumber}
          // value={number}
          placeholder="What Airport you looking for?"
          placeholderTextColor="#FFFFFF"
          keyboardType="text"
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

  searchBarInp: {
    flex: 1,
    backgroundColor: "transparent",
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
    marginLeft: 20,
  },

  searchBarIcon: {
    height: 24,
    width: 24,
    marginRight: 20,
  },
});

export default DetailsScreen;
