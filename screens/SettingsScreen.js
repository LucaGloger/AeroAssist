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

const SettingsScreen = ({ navigation }) => {
  const [email, setEmail] = useState("Loading...");

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setEmail(user ? user.email : "Guest");
    });

    return () => unsubscribe();
  }, []);

  return (
    <View style={styles.background}>
      <ScrollView
        style={styles.ScrollView}
        overScrollMode="always"
        bounces={true}
      >
        <Text style={[styles.containerTitle, { marginTop: 10 }]}>Konto-ID</Text>
        <TouchableOpacity
          style={styles.container}
          activeOpacity={0.7}
          onPress={() => navigation.navigate("ChangeEmail")}
        >
          <Text style={styles.title}>E-Mail</Text>
          <Text style={styles.containerTextBlue}>{email}</Text>
        </TouchableOpacity>
      </ScrollView>
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

  ScrollView: {
    flex: 1,
    backgroundColor: "#000000",
    borderRadius: 28,
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

  containerTextBlue: {
    fontSize: 14,
    fontWeight: "400",
    color: "#387AFF",
  },
});

export default SettingsScreen;
