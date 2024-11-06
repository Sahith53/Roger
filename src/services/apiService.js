import { db } from "../lib/appwrite/config";
import { doc, collection, addDoc, getDocs, setDoc } from "firebase/firestore";

export const saveToWatchlist = async (mediaType, mediaId , genres) => {
  try {
    const userst = localStorage.getItem("ui");
    if (!userst) {
      console.log("User not logged in");
      return;
    }

    const user = JSON.parse(userst);
    if (!user || !user.uid) {
      console.log("User not valid");
      return;
    }

    const userId = user.uid;

    if (!mediaType || !mediaId) {
      console.error("mediaType or mediaId is undefined");
      return;
    }

    // Reference to the user's watchlist subcollection
    const userWatchlistRef = collection(db, "watchlist", userId, "items");

    await addDoc(userWatchlistRef, {
      mediaType,
      mediaId,
      timestamp: new Date(),
    });
    console.log("Added to watchlist");
  } catch (error) {
    console.error("Error adding document to watchlist: ", error);
  }
};

export const getUserWatchlist = async () => {
  try {
    const userst = localStorage.getItem("ui");
    if (!userst) {
      console.log("User not logged in");
      return [];
    }

    const user = JSON.parse(userst);
    if (!user || !user.uid) {
      console.log("User not valid");
      return [];
    }

    const userId = user.uid;

    // Reference to the user's watchlist subcollection
    const userWatchlistRef = collection(db, "watchlist", userId, "items");

    // Get all documents from the user's watchlist subcollection
    const watchlistSnapshot = await getDocs(userWatchlistRef);

    // Map the documents to an array of data
    const watchlist = watchlistSnapshot.docs.map((doc) => doc.data());
    console.log("User watchlist: ", watchlist);
    return watchlist;
  } catch (error) {
    console.error("Error fetching user watchlist: ", error);
    return [];
  }
};
export const removeFromWatchlist = async (mediaType, mediaId) => {
  try {
    const userst = localStorage.getItem("ui");
    if (!userst) {
      console.log("User not logged in");
      return;
    }

    const user = JSON.parse(userst);
    if (!user || !user.uid) {
      console.log("User not valid");
      return;
    }

    const userId = user.uid;

    if (!mediaType || !mediaId) {
      console.error("mediaType or mediaId is undefined");
      return;
    }

    // Reference to the user's watchlist subcollection
    const userWatchlistRef = collection(db, "watchlist", userId, "items");

    const querySnapshot = await getDocs(userWatchlistRef);
    querySnapshot.forEach((doc) => {
      if (doc.data().mediaType === mediaType && doc.data().mediaId === mediaId) {
        doc.ref.delete();
        console.log("Removed from watchlist");
      }
    });
  } catch (error) {
    console.error("Error removing document from watchlist: ", error);
  }
};


