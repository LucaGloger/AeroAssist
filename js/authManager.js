import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const authInstance = getAuth();

export async function signIn(email, password) {
  try {
    await signInWithEmailAndPassword(authInstance, email, password);
  } catch (error) {
    console.error("Failed to SignIn: ", error);
  }
}
