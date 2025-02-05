import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  Button,
} from "react-native";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const ChangeEmailScreen = ({ navigation }) => {
  const [newEmail, setNewEmail] = useState("");

  return (
    <View style={styles.background}>
      <View style={styles.mainView}>
        <Text style={styles.screenTitle}>Changing your email ID</Text>
        <Text style={[styles.containerTitle, { marginTop: 10 }]}>
          New email address
        </Text>
        <View style={styles.container}>
          <TextInput
            style={styles.input}
            onChangeText={setNewEmail}
            value={newEmail}
            placeholder="Enter email address"
            placeholderTextColor="#ABABAB"
            keyboardType="email"
            selectionColor="#FFFFFF"
            cursorColor="#387AFF"
            caretHidden={false}
          />
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            activeOpacity={0.7}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            activeOpacity={0.7}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "#000000",
    gap: 10,
    paddingLeft: 10,
    paddingRight: 10,
  },

  mainView: {
    flex: 1,
    backgroundColor: "#000000",
    borderRadius: 28,
  },

  screenTitle: {
    fontSize: 24,
    fontWeight: "600",
    color: "#FFFFFF",
    marginTop: 50,
    paddingHorizontal: 20,
    marginBottom: 20,
  },

  containerTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#ABABAB",
    paddingHorizontal: 20,
    marginBottom: 5,
  },

  container: {
    height: "auto",
    width: "100%",
    backgroundColor: "#17171A",
    borderRadius: 28,
    gap: 0,
    paddingHorizontal: 20,
  },

  input: {
    height: 58,
    fontSize: 18,
    fontWeight: "400",
    color: "#FFFFFF",
  },

  buttonContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    height: "auto",
    width: "100%",
    position: "absolute",
    left: 0,
    bottom: 0,
  },

  button: {
    flex: 1,
    height: 48,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#000000",
    borderRadius: 30,
  },

  buttonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
  },
});

export default ChangeEmailScreen;
