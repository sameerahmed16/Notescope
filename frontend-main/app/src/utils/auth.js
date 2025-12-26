import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile, // Import updateProfile to set photoURL
} from "firebase/auth";
import { auth, storage } from "./firebaseConfig";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { db } from "./firebaseConfig";

// Signup function
export const signUp = async (email, password, fullname, profilePicture) => {
  try {
    // Create user with email and password
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    let profilePictureURL = null;

    // If profile picture is provided, upload it to Firebase Storage
    if (profilePicture) {
      const storageRef = ref(storage, `profilePictures/${user.uid}`);
      await uploadBytes(storageRef, profilePicture);
      profilePictureURL = await getDownloadURL(storageRef);

      // Update the user profile with the photoURL
      await updateProfile(user, {
        displayName: fullname,
        photoURL: profilePictureURL, // Save the profile picture URL
      });
    } else {
      // If no profile picture, update the displayName only
      await updateProfile(user, {
        displayName: fullname,
      });
    }

    // Save additional user info in Firestore (optional)
    await setDoc(doc(db, "users", user.uid), {
      uid: user.uid,
      email: user.email,
      fullname: fullname,
      photoURL: profilePictureURL, // Save the photoURL to Firestore
    });

    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Login function
export const login = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Logout function
export const logout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    throw new Error(error.message);
  }
};
