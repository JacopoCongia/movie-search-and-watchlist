import { initializeApp } from "firebase/app";
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

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
// const watchlistCollectionRef = doc(collection(db, "watchlist"));

// Gets the watchlist from Firebase

export async function getWatchlist() {
  const snapshot = await getDocs(collection(db, "watchlist"));
  const savedMovies = snapshot.docs.map((doc) => {
    return {
      ...doc.data(),
      id: doc.id
    };
  });

  return savedMovies;
}

export async function addToDb(movie) {
  const docRef = await addDoc(collection(db, "watchlist"), movie);

  await setDoc(doc(db, "watchlist", docRef.id), {
    ...movie,
    id: docRef.id
  });
}

export async function removeFromDb(id) {
  // delete doc from the database given the movie's id
  await deleteDoc(doc(db, "watchlist", id));
}

// getWatchlist();
