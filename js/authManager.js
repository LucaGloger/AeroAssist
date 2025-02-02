import { useState } from "react";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../js/firebaseConfig";

const SigninViewModel = (navigation) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigation.navigate("Home");
    } catch (error) {
      console.log("Login failed!", error.message);
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    handleSignin,
  };
};

const SignOut = (navigation) => {
  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigation.navigate("Login");
    } catch (error) {
      console.error(error);
    }
  };

  return {
    handleSignOut,
  };
}

export {SigninViewModel, SignOut};