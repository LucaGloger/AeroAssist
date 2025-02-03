import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
} from "react-native";

import { SigninViewModel } from "../js/authManager";

const LoginScreen = ({ navigation }) => {
  const { email, setEmail, password, setPassword, handleSignin } =
    SigninViewModel(navigation);

  return (
    <View style={styles.background}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Simpli Account</Text>
        <Text style={styles.headerText}>
          Your gateway to Simpli apps and services
        </Text>
      </View>
      <View style={styles.mainContainer}>
        <View style={styles.inputContainer}>
          <Image
            source={require("../assets/email.png")}
            style={styles.inputIcon}
          />
          <TextInput
            style={styles.input}
            onChangeText={setEmail}
            value={email}
            placeholder="Email"
            placeholderTextColor="#FFFFFF"
            keyboardType="email"
            selectionColor="#FFFFFF"
            cursorColor="#387AFF"
            caretHidden={false}
          />
        </View>
        <View style={styles.inputContainer}>
          <Image
            source={require("../assets/password.png")}
            style={styles.inputIcon}
          />
          <TextInput
            style={styles.input}
            onChangeText={setPassword}
            value={password}
            placeholder="Password"
            placeholderTextColor="#FFFFFF"
            keyboardType="password"
            selectionColor="#FFFFFF"
            cursorColor="#387AFF"
            caretHidden={false}
            secureTextEntry
          />
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.continueButton}
            onPress={() => handleSignin()}
          >
            <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.helpContainer}>
          <TouchableOpacity
            style={styles.helpButton}
            onPress={() => navigation.navigate("Signup")}
          >
            <Text style={styles.helpText}>Create account</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.helpButton}
            onPress={() => navigation.navigate("Login")}
          >
            <Text style={styles.helpText}>Forgot Password?</Text>
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

  headerContainer: {
    height: 240,
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },

  headerTitle: {
    fontSize: 36,
    fontWeight: "600",
    color: "#FFFFFF",
  },

  headerText: {
    fontSize: 14,
    fontWeight: "400",
    color: "#FFFFFF",
    textAlign: "center",
  },

  mainContainer: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 10,
  },

  inputContainer: {
    height: 58,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#17171A",
    borderRadius: 30,
    paddingLeft: 20,
    paddingRight: 20,
    gap: 10,
  },

  inputIcon: {
    height: 24,
    width: 24,
  },

  input: {
    flex: 1,
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
  },

  buttonContainer: {
    height: "auto",
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },

  continueButton: {
    height: 48,
    width: 186,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#387AFF",
    borderRadius: 30,
  },

  buttonText: {
    fontSize: 20,
    fontWeight: "700",
    color: "#FFFFFF",
  },

  helpContainer: {
    height: "auto",
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },

  helpText: {
    fontSize: 14,
    fontWeight: "400",
    color: "#FFFFFF",
    textDecorationLine: "underline",
  },
});

export default LoginScreen;
