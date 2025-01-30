import { firebase } from "./firebaseConfig";

export const handleLogin = async (email, password) => {
  try {
    await firebase.auth().signInWithEmailAndPassword(email, password);
    return null;
  } catch (error) {
    return error.message;
  }
};
