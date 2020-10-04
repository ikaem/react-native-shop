import React, { useEffect } from "react";
import { View, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import { useDispatch } from "react-redux";

import { USER_DATA_KEY, authenticate } from "../store/actions/auth.actions";

export default function Startup(props) {
  const dispatch = useDispatch();
  useEffect(() => {
    const tryLogin = async () => {
      const userData = await AsyncStorage.getItem(USER_DATA_KEY);

      if (!userData) {
        props.navigation.navigate({
          routeName: "Auth",
        });
        return;
      }
      const transformedData = JSON.parse(userData);
      const { token, userId, expirationDate } = transformedData;

      const realExpirationDate = new Date(expirationDate);

      if (realExpirationDate <= new Date() || !token || !userId) {
        props.navigation.navigate({
          routeName: "Auth",
        });
        return;
      }

      const expirationPeriod =
        realExpirationDate.getTime - new Date().getTime();

      dispatch(authenticate(userId, token, expirationPeriod));
      props.navigation.navigate({
        routeName: "Shop",
      });
    };

    tryLogin();
  }, []);
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size="large" color="purple" />
    </View>
  );
}
