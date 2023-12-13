import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../config/firebaseConfig";
import { UserActionTypes } from "../store/UserReducer/UserActionTypes";
import axios from "axios";

const baseUrl = "http://127.0.0.1:5000";

// ------------------
// Signup user function
// ------------------
export const signUp = async (
  email,
  password,
  firstName,
  lastName,
  billingAddress,
  dispatch
) => {
  // Signup user on firebase
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );

  const userId = userCredential.user.uid;

  const response = await axios.post(`${baseUrl}/customers/add-customer`, {
    firebaseUID: userId,
    firstName,
    lastName,
    billingAddress,
  });

  if (response.status === 201) {
    dispatch({
      type: UserActionTypes.SET_USER_DATA,
      payload: {
        user: {
          userId,
          firstName,
          lastName,
          billingAddress,
        },
      },
    });
  } else {
    console.error(response.status, "Something went wrong");
  }
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

  const userId = userCredential.user.uid;

  const response = await axios.get(
    `${baseUrl}/customers/get-customer-details?firebaseUID=${userId}`
  );

  if (response.status === 200) {
    const data = await response.data;
    dispatch({
      type: UserActionTypes.SET_USER_DATA,
      payload: {
        user: {
          userId,
          firstName: data.FirstName,
          lastName: data.LastName,
          billingAddress: data.BillingAddress,
        },
      },
    });
  } else {
    console.error(response.status, "Something went wrong");
  }
};

// ------------------
// Set user data function
// ------------------
export const setUserData = async (userId, dispatch) => {
  const response = await axios.get(
    `${baseUrl}/customers/get-customer-details?firebaseUID=${userId}`
  );

  if (response.status === 200) {
    const data = await response.data;
    dispatch({
      type: UserActionTypes.SET_USER_DATA,
      payload: {
        user: {
          userId,
          firstName: data.FirstName,
          lastName: data.LastName,
          billingAddress: data.BillingAddress,
        },
      },
    });
  } else {
    console.error(response.status, "Something went wrong");
  }
}

// ------------------
// Logout user function
// ------------------
export const logout = async () => {
  await auth.signOut();
};
