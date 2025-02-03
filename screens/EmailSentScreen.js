import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
} from "react-native";

const EmailSentScreen = ({ navigation }) => {
  return (
    <View style={styles.background}>
      <View style={styles.headerContainer}>
        <Image
          source={require("../assets/favicon.png")}
          style={styles.headerIcon}
        />
        <Text style={styles.headerTitle}>Email sent</Text>
        <Text style={styles.headerText}>
          A password reset email has been sent to your email.
        </Text>
      </View>
      <View style={styles.mainContainer}>
        <View style={styles.container}>
          <Text style={styles.title}>You're almost there!</Text>
          <Text style={styles.containerText}>
            You should already have an email from us in your inbox.
          </Text>
          <Text style={styles.containerText}>
            If you have not received an email, please send us an email to
            luca.kloger@gmail.com
          </Text>
          <Text style={styles.containerText}>
            Your Simpli Team
          </Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.continueButton}
            onPress={() => navigation.navigate("Login")}
          >
            <Text style={styles.buttonText}>Signin</Text>
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

  headerIcon: {
    height: 70,
    width: 70,
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

export default EmailSentScreen;
