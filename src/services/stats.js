import { db } from "../lib/appwrite/config"; // Ensure your Firebase config is correct
import {
  doc,
  getDoc,
  setDoc,
  collection,
  addDoc,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { orderBy, limit } from "firebase/firestore";
import { toast } from "sonner";
import { getCast } from "./MovieServices";
import { getTvCast } from "./TVService";

export const addToWatchedList = async (
  mediaType,
  mediaId,
  runtime,
  cast,
  genres
) => {
  try {
    const userStr = localStorage.getItem("ui");
    if (!userStr) {
      console.log("User not logged in");
      return;
    }

    const user = JSON.parse(userStr);
    if (!user || !user.uid) {
      console.log("User not valid");
      return;
    }

    const userId = user.uid;

    if (!mediaType || !mediaId || !runtime) {
      console.error("mediaType, mediaId, or runtime is undefined");
      return;
    }

    // Reference to the user's watched list subcollection
    const userWatchedRef = collection(db, "users", userId, "watched");

    // Check if the media is already in the watched list
    const q = query(
      userWatchedRef,
      where("mediaId", "==", mediaId),
      where("mediaType", "==", mediaType)
    );
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      console.log("Media already exists in the watched list");
      toast("Media already exists in the watched list", " error");
      return;
    }

    // Add new document to the watched list
    await addDoc(userWatchedRef, {
      mediaType,
      mediaId,
      runtime,
      timestamp: new Date(),
    });

    // Reference to the user's document in the stats collection
    const userStatsRef = doc(db, "stats", userId);

    // Get the current user stats
    const userStatsSnap = await getDoc(userStatsRef);
    const userStats = userStatsSnap.exists()
      ? userStatsSnap.data()
      : {
          totalWatchTime: 0,
          movieCount: 0,
          tvShowCount: 0,
        };

    // Update stats
    const newStats = {
      totalWatchTime: userStats.totalWatchTime + runtime,
      movieCount:
        mediaType === "movie" ? userStats.movieCount + 1 : userStats.movieCount,
      tvShowCount:
        mediaType === "tv" ? userStats.tvShowCount + 1 : userStats.tvShowCount,
    };

    await setDoc(userStatsRef, newStats, { merge: true });

    // Fetch and update cast details
    let castDetails;
    if (mediaType === "movie") {
      castDetails = await getCast(mediaId);
    } else {
      castDetails = await getTvCast(mediaId);
    }
    cast = castDetails.cast || [];

    // Update cast counts in the user's cast stats collection
    await updateCastStats(userId, cast);
    await updateGenreWatched(genres);

    console.log("Added to watched list and updated watchtime and cast stats");
    toast(
      "Added to watched list and updated watchtime and cast stats",
      "success"
    );
  } catch (error) {
    console.error("Error adding document to watched list: ", error);
  }
};

const updateCastStats = async (userId, castDetails) => {
  console.log(castDetails);
  try {
    // Ensure castDetails is an array
    if (!Array.isArray(castDetails)) {
      console.error(
        "Invalid castDetails: Expected an array but received:",
        castDetails
      );
      throw new Error("castDetails must be an array");
    }

    // Reference to the user's cast stats subcollection
    const castStatsRef = collection(db, "users", userId, "user_cast_stats");

    for (const castMember of castDetails) {
      if (!castMember || typeof castMember.id !== "number") {
        console.error("Invalid cast member:", castMember);
        continue; // Skip invalid cast members
      }

      const id = castMember.id; // Use `id` field from the cast member object
      console.log("Updating cast stats for cast member with id: ", id);

      const castDocRef = doc(castStatsRef, id.toString()); // Ensure `id` is a string
      const castDocSnap = await getDoc(castDocRef);

      // Log the current data
      if (castDocSnap.exists()) {
        console.log("Current cast data: ", castDocSnap.data());
      } else {
        console.log("No existing cast data found for ID: ", id);
      }
      console.log("Updating cast stats for ID: ", id);
      const castData = castDocSnap.exists() ? castDocSnap.data() : { count: 0 };

      await setDoc(castDocRef, { count: castData.count + 1 }, { merge: true });

      // Confirm update
      console.log(`Updated cast count for ID ${id} to ${castData.count + 1}`);
    }

    console.log("Updated cast stats");
  } catch (error) {
    console.error("Error updating cast stats: ", error);
  }
};

export const getStatsofUser = async () => {
  const userStr = localStorage.getItem("ui");
  if (!userStr) {
    console.log("User not logged in");
    return;
  }

  const user = JSON.parse(userStr);
  if (!user || !user.uid) {
    console.log("User not valid");
    return;
  }

  const userId = user.uid;

  const userStatsRef = doc(db, "stats", userId);
  const userStatsSnap = await getDoc(userStatsRef);
  return userStatsSnap.data();
};

export const getPopularPeople = async () => {
  try {
    const userStr = localStorage.getItem("ui");
    if (!userStr) {
      console.log("User not logged in");
      return;
    }

    const user = JSON.parse(userStr);
    if (!user || !user.uid) {
      console.log("User not valid");
      return;
    }

    const userId = user.uid;

    // Reference to the user's cast stats collection
    const castStatsRef = collection(db, "users", userId, "user_cast_stats");

    // Query to get the top 10 cast members by count
    const q = query(castStatsRef, orderBy("count", "desc"), limit(10));

    const castStatsSnap = await getDocs(q);
    const castStats = castStatsSnap.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    console.log(castStats);
    return castStats;
  } catch (error) {
    console.error("Error fetching cast stats: ", error);
  }
};

export const updateGenreWatched = async (genres) => {
  try {
    const userStr = localStorage.getItem("ui");
    if (!userStr) {
      console.log("User not logged in");
      return;
    }

    const user = JSON.parse(userStr);
    if (!user || !user.uid) {
      console.log("User not valid");
      return;
    }

    const userId = user.uid;

    // Reference to the user's genre stats collection
    const genreStatsRef = collection(db, "users", userId, "user_genre_stats");

    // Iterate over each genre and update its count
    for (const genre of genres) {
      const genreDocRef = doc(genreStatsRef, genre.id.toString());
      const genreDocSnap = await getDoc(genreDocRef);

      // Log the current data
      if (genreDocSnap.exists()) {
        console.log("Current genre data: ", genreDocSnap.data());
      } else {
        console.log("No existing genre data found for genre: ", genre.id);
      }

      const genreData = genreDocSnap.exists()
        ? genreDocSnap.data()
        : { count: 0 };

      await setDoc(
        genreDocRef,
        { count: genreData.count + 1, name: genre.name },
        { merge: true }
      );

      // Confirm update
      console.log(
        `Updated genre count for genre ${genre.id} to ${genreData.count + 1}`
      );
    }

    console.log("Updated genre stats");
  } catch (error) {
    console.error("Error updating genre stats: ", error);
  }
};
