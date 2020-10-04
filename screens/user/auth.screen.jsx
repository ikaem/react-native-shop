import React, { useReducer, useState, useEffect } from "react";
import {
  ScrollView,
  Text,
  View,
  Button,
  KeyboardAvoidingView,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useDispatch } from "react-redux";

import Input from "../../components/UI/input.component";
import Card from "../../components/UI/card.component";

import Colors from "../../constants/colors.contants";
import * as AuthActions from "../../store/actions/auth.actions";

const FORM_UPDATE = "FORM_UPDATE";

const formReducer = (state, action) => {
  switch (action.type) {
    case FORM_UPDATE:
      const updatedInputValues = {
        ...state.inputValues,
        [action.payload.inputIdentifier]: action.payload.inputValue,
      };

      const updatedInputValidities = {
        ...state.inputValidities,
        [action.payload.inputIdentifier]: action.payload.inputValidity,
      };

      let formIsValid = true;

      for (const key in updatedInputValidities) {
        // if (!updatedInputValidities[key]) {
        // formIsValid = false;
        formIsValid = formIsValid && updatedInputValidities[key];
        // }
      }

      const newState = {
        ...state,
        inputValues: updatedInputValues,
        inputValidities: updatedInputValidities,
        formIsValid,
      };

      return newState;

    default:
      return state;
  }
};

export default function Auth(props) {
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState();
  const [isSignup, setIsSignup] = useState(false);
  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      email: "",
      password: "",
    },
    inputValidities: {
      email: false,
      password: false,
    },
    formIsValid: false,
  });

  const dispatch = useDispatch();

  useEffect(() => {
    props.navigation.setParams({
      isSignup,
    });
  }, [isSignup]);

  useEffect(() => {
    if (!authError) return;

    Alert.alert("Authentication error", authError, [
      {
        text: "Okay",
        style: "default",
        onPress: () => setAuthError(),
      },
    ]);
  }, [authError]);

  const submitHandler = async () => {
    if (!formState.formIsValid) {
      Alert.alert("Invalid form submission", "Please check your form", [
        {
          text: "Okay",
          style: "default",
        },
      ]);

      return;
    }

    setIsLoading(true);
    setAuthError(null);

    try {
      if (isSignup) {
        await dispatch(
          AuthActions.signup(
            formState.inputValues.email,
            formState.inputValues.password
          )
        );


        props.navigation.navigate({
          routeName: "Shop",
        });
      } else {
        await dispatch(
          AuthActions.login(
            formState.inputValues.email,
            formState.inputValues.password
          )
        );
      }


      props.navigation.navigate({
        routeName: "Shop",
      });
    } catch (error) {
      console.log(error);
      setAuthError(error.message);
      setIsLoading(false);
    }
  };

  const onInputChange = (inputIdentifier, inputValue, inputValidity) => {
    dispatchFormState({
      type: FORM_UPDATE,
      payload: {
        inputIdentifier,
        inputValue,
        inputValidity,
      },
    });
  };

  return (
    <KeyboardAvoidingView
      // behavior="padding"
      // keyboardVerticalOffset={1}
      style={styles.screen}
    >
      <LinearGradient colors={["#ffedff", "#ffe3ff"]} style={styles.gradient}>
        <Card style={styles.authInputContainer}>
          <ScrollView>
            <Input
              onInputChange={onInputChange}
              identifier="email"
              label="e-mail"
              keyboardType="email-address"
              required
              email
              autoCapitalize="none"
              errorMessage="Please enter valid email"
              initialValue=""
            />
            <Input
              onInputChange={onInputChange}
              identifier="password"
              label="password"
              keyboardType="default"
              secureTextEntry
              required
              minLength={6}
              autoCapitalize="none"
              errorMessage="Please enter valid password"
              initialValue=""
            />
          </ScrollView>
          <View style={styles.authActionsContainer}>
            <View style={styles.button}>
              {isLoading && <ActivityIndicator size="small" color="purple" />}
              {!isLoading && (
                <Button
                  title={isSignup ? "Sign Up" : "Log In"}
                  color={Colors.primary}
                  onPress={submitHandler}
                />
              )}
            </View>

            <View style={styles.button}>
              <Button
                title={isSignup ? "Switch to Login" : "Switch to Signup"}
                color="purple"
                onPress={() => setIsSignup((prev) => !prev)}
                disabled={isLoading}
              />
            </View>
          </View>
        </Card>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
}

Auth.navigationOptions = ({ navigation }) => {
  const isSignup = navigation.getParam("isSignup");
  return {
    headerTitle: isSignup ? "Sign Up" : "Login",
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  authInputContainer: {
    width: "80%",
    padding: 20,
    maxWidth: 400,
  },
  authActionsContainer: {
    marginTop: 20,
  },
  button: {
    marginBottom: 10,
  },
});
