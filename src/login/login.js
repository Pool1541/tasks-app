import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from '../firebase/firebase';

export default async function loginUser() {
  const provider = new GoogleAuthProvider();
  auth.languageCode = 'es';
  await signInWithGoogle(provider);

  async function signInWithGoogle(provider) {
    try {
      await signInWithPopup(auth, provider);
      
    } catch (error) {
      console.error(error);
    }
  }
}