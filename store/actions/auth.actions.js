// import { AsyncStorage } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";

export const SIGNUP = "SIGNUP";
export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";
export const AUTHENTICATE = "AUTHENTICATE";

export const USER_DATA_KEY = "userData";

let timerId;

const cleanLogoutTimer = () => {
  if (timerId) clearTimeout(timerId);
};

const setLogoutTimer = (expirationPeriod) => {
  // return (dispatch) => {
  //   timerId = setTimeout(() => {
  //     logout();
  //     console.log("logging out...");
  //   }, expirationPeriod / 1000);
  //   };
  return (dispatch) => {
    timerId = setTimeout(() => {
      dispatch(logout());
      console.log("logging out...");
    }, expirationPeriod / 1000);
  };
};

const saveDataToStorage = (token, userId, expirationDate) => {
  AsyncStorage.setItem(
    USER_DATA_KEY,
    JSON.stringify({
      token,
      userId,
      expirationDate,
    })
  );
};

export const logout = () => {
  return async (dispatch) => {
    cleanLogoutTimer();
    await AsyncStorage.removeItem(USER_DATA_KEY);
    dispatch({
      type: LOGOUT,
    });
  };
};

export const authenticate = (userId, token, expirationPeriod) => {
  return (dispatch) => {
    dispatch(setLogoutTimer(expirationPeriod));
    // setLogoutTimer(expirationPeriod);
    dispatch({
      type: AUTHENTICATE,
      payload: {
        token,
        userId,
      },
    });
  };
};

export const signup = (email, password) => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${"AIzaSyDB67AwZTslUChf-51cNA5CW6jFUSr6mgs"}`,
        {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
            returnSecureToken: true,
          }),
        }
      );

      if (!response.ok) {
        const errorResponse = await response.json();

        console.log(errorResponse);
        const errorId = errorResponse.error.message;
        let message = "Something went wrong";

        if (errorId === "EMAIL_EXISTS")
          message =
            "This email is in use. Please choose another email or login with this email.";
        if (errorId === "INVALID_EMAIL")
          message = "This email address is not valid. Please check your input.";
        if (
          errorId === "WEAK_PASSWORD : Password should be at least 6 characters"
        )
          message =
            "Password should be at least 6 characters. Please strengten your password.";

        throw new Error(message);
      }

      const signupResponse = await response.json();

      dispatch(setLogoutTimer(parseInt(signupResponse.expiresIn) * 1000));

      //   setLogoutTimer(parseInt(signupResponse.expiresIn) * 1000);
      dispatch({
        type: SIGNUP,
        payload: {
          token: signupResponse.idToken,
          userId: signupResponse.localId,
        },
      });

      const expirationDate = new Date(
        new Date().getTime() + parseInt(loginResponse.expiresIn) * 1000
      ).toISOString();

      saveDataToStorage(
        loginResponse.idToken,
        loginResponse.localId,
        expirationDate
      );
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};

export const login = (email, password) => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${"AIzaSyDB67AwZTslUChf-51cNA5CW6jFUSr6mgs"}`,
        {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
            returnSecureToken: true,
          }),
        }
      );

      if (!response.ok) {
        const errorResponse = await response.json();

        console.log(errorResponse);
        const errorId = errorResponse.error.message;
        let message = "Something went wrong";

        if (errorId === "EMAIL_NOT_FOUND" || errorId === "INVALID_PASSWORD")
          message = "Invalid credentials. Please check your inputs";
        if (errorId === "INVALID_EMAIL")
          message =
            "This user does not exist. Please check your email or register.";

        throw new Error(message);
      }

      const loginResponse = await response.json();

      dispatch(setLogoutTimer(parseInt(loginResponse.expiresIn) * 1000));

      //   setLogoutTimer(parseInt(loginResponse.expiresIn) * 1000);

      dispatch({
        type: LOGIN,
        payload: {
          token: loginResponse.idToken,
          userId: loginResponse.localId,
        },
      });

      const expirationDate = new Date(
        new Date().getTime() + parseInt(loginResponse.expiresIn) * 1000
      ).toISOString();

      saveDataToStorage(
        loginResponse.idToken,
        loginResponse.localId,
        expirationDate
      );
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};
