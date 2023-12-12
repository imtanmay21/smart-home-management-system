import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../config/firebaseConfig";
import { UserActionTypes } from "../store/UserReducer/UserActionTypes";

// ------------------
// Signup user function
// ------------------
export const signUp= async (email, password, dispatch) => {
  // Signup user on firebase
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );

  // Dispatch user data to the user reducer
  dispatch({
    type: UserActionTypes.SET_USER_DATA,
    payload: { user: userCredential.user },
  });
};


// ------------------
// Login user function
// ------------------
export const login = async (email, password, dispatch) => {
  // login user on firebase
  const userCredential = await signInWithEmailAndPassword(
    auth,
    email,
    password
  );

  // Dispatch user data to the user reducer
  dispatch({
    type: UserActionTypes.SET_USER_DATA,
    payload: { user: userCredential.user },
  });
};
