import firebase from "firebase";
import { firebaseConfig } from "./config";

export const initFirebase = () => firebase.initializeApp(firebaseConfig);

export const createFirebaseData = (
  path,
  value,
  successCallback,
  errorCallback
) => {
  firebase
    .database()
    .ref(path)
    .push(value)
    .then(res => successCallback(res))
    .catch(err => errorCallback(err));
};

export const updateFirebaseData = (
  path,
  values,
  successCallback,
  errorCallback
) => {
  firebase
    .database()
    .ref(path)
    .update(values)
    .then(res => successCallback(res))
    .catch(err => errorCallback(err));
};

export const loginFirebase = (
  email,
  password,
  successCallback,
  errorCallback
) => {
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(res => successCallback(res))
    .catch(err => errorCallback(err));
};

export const logoutFirebase = (successCallback, errorCallback) => {
  firebase
    .auth()
    .signOut()
    .then(res => successCallback(res))
    .catch(err => errorCallback(err));
};

export const signUpFirebase = (
  email,
  password,
  successCallback,
  errorCallback
) => {
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then(res => successCallback(res))
    .catch(err => errorCallback(err));
};

export const readFirebaseData = (path, eventType, successCallback) => {
  firebase
    .database()
    .ref(path)
    .on(eventType, snap => {
      const data = snap.val() ? snap.val() : {};
      successCallback(data);
    });
};

export const authFirebase = () => {
  return firebase.auth();
};
