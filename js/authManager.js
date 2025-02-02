import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../js/firebaseConfig";

const SigninViewModel = (navigation) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigation.navigate("Home");
    } catch (err) {
      setError(err.message);
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    error,
    handleSignin,
  };
};

export default SigninViewModel;