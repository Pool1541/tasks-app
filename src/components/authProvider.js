import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { auth } from "../firebase/firebase";
import { getUserData, userExist, registerNewUser } from "../firebase/firebase";

export default function AuthProvider({ children, onUserLoggedIn, onUserNotLoggedIn, onUserNotRegistered }) {
  
  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if(user){
        const exist = await userExist(user.uid);
        if(exist){
          const userData = await getUserData(user.uid);
          const hasUsername = userData.processCompleted;
          if(hasUsername){
            onUserLoggedIn(userData);
          } else {
            onUserNotRegistered(userData);
          }
        }else {
          const newUser = {
            displayName: user.displayName,
            uid: user.uid,
            processCompleted: false,
            profilePicture: user.photoURL,
            username: ''
          }
          await registerNewUser(newUser);
        }
      } else {
        onUserNotLoggedIn();
      }
    });
  }, []);

  return (
    <div>{children}</div>
  );
}