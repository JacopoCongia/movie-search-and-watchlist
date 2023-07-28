import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  addDoc,
  setDoc,
  deleteDoc
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCPFCfcuSddcH1J8-SI0B5iR24RU0jZXRo",
  authDomain: "moviesearchbyjako.firebaseapp.com",
  projectId: "moviesearchbyjako",
  storageBucket: "moviesearchbyjako.appspot.com",
  messagingSenderId: "665091770638",
  appId: "1:665091770638:web:fa7cb56e909a9936296f5f"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

// Gets the watchlist from Firebase

export async function getWatchlist(currentUser) {
  const snapshot = await getDocs(
    collection(db, "users", currentUser.uid, "watchlist")
  );

  if (snapshot) {
    const savedMovies = snapshot.docs.map((doc) => {
      return {
        ...doc.data(),
        id: doc.id
      };
    });

    return savedMovies;
  }
}

export async function addToDb(movie, currentUser) {
  const docRef = await addDoc(
    collection(db, "users", currentUser.uid, "watchlist"),
    movie
  );

  await setDoc(doc(db, "users", currentUser.uid, "watchlist", docRef.id), {
    ...movie,
    id: docRef.id,
    dateAdded: Date.now()
  });
}

export function removeFromDb(id, currentUser) {
  // delete doc from the database given the movie's id
  deleteDoc(doc(db, "users", currentUser.uid, "watchlist", id));
}

export async function addUserToDb(user) {
  await setDoc(doc(db, "users", user.uid), {
    email: user.email
  });
}
