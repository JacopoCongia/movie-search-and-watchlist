import { createContext, useState } from "react";
import { addUserToDb, auth } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  deleteUser
} from "firebase/auth";

const AuthContext = createContext();

function AuthContextProvider({ children }) {
  const [error, setError] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  onAuthStateChanged(auth, (user) => {
    if (user) {
      // const uid = user.uid;
      setCurrentUser(user);
    } else {
      setCurrentUser(null);
    }
  });

  function createAccount(userData) {
    createUserWithEmailAndPassword(auth, userData.email, userData.password)
      .then((credential) => {
        addUserToDb(credential.user);
      })
      .catch((error) => setError(error));
  }

  function logIn(userData) {
    signInWithEmailAndPassword(auth, userData.email, userData.password).catch(
      (error) => {
        setError(error);
      }
    );
  }

  function logOut() {
    signOut(auth)
      .then(() => {
        console.log("Log out successful");
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setError(null);
      });
  }

  function deleteAccount() {
    const user = auth.currentUser;
    deleteUser(user)
      .then(() => {
        console.log("Account deleted");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <AuthContext.Provider
      value={{
        createAccount,
        logIn,
        logOut,
        deleteAccount,
        currentUser,
        error
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContextProvider };
export default AuthContext;
