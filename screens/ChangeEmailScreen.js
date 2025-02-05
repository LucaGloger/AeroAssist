import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
} from "react-native";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const ChangeEmailScreen = ({ navigation }) => {
  const [email, setEmail] = useState("Loading...");
  const [newEmail, setNewEmail] = useState("");

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setEmail(user ? user.email : "Guest");
    });

    return () => unsubscribe();
  }, []);

  return (
    <View style={styles.background}>
      <View style={styles.mainView}>
        <Text style={styles.screenTitle}>Change your E-Mail ID?</Text>
        <Text style={[styles.containerTitle, { marginTop: 10 }]}>
          Current E-Mail-ID
        </Text>
        <View style={styles.container} activeOpacity={0.7}>
          <TextInput
            style={styles.input}
            onChangeText={setNewEmail}
            value={newEmail}
            placeholder={email}
            placeholderTextColor="#FFFFFF"
            keyboardType="password"
            selectionColor="#FFFFFF"
            cursorColor="#387AFF"
            caretHidden={false}
          />
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
    height: 85,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#17171A",
    borderRadius: 28,
    gap: 0,
    padding: 20,
  },

  input: {
    height: "100%",
    width: "100%",
    fontSize: 18,
    fontWeight: "400",
    color: "#FFFFFF",
  },

  title: {
    fontSize: 18,
    fontWeight: "400",
    color: "#FFFFFF",
  },

  containerText: {
    fontSize: 14,
    fontWeight: "400",
    color: "#FFFFFF",
  },

  containerTextBlue: {
    fontSize: 14,
    fontWeight: "400",
    color: "#387AFF",
  },
});

export default ChangeEmailScreen;
