import { useState } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth, db } from "../js/firebaseConfig";
import { doc, setDoc } from "firebase/firestore";

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

const SignupViewModel = (navigation) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const handleSignup = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        username: username,
        email: email,
      });

      navigation.navigate("Home");
    } catch (error) {
      console.log("Signup failed!", error.message);
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    username,
    setUsername,
    handleSignup,
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
};

export { SigninViewModel, SignupViewModel, SignOut };
