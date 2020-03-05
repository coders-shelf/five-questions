import firebase from "firebase/app";
import "firebase/storage";

var firebaseConfig = {
  // Firebaseの設定を参照
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const storage = firebase.storage();
export default firebase;
