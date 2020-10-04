import React from "react";
import {} from "react-native";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import { AppLoading } from "expo";
import { useFonts } from "expo-font";
import ReduxThunk from "redux-thunk";

import productsReducer from "./store/reducers/products.reducer";
import cartReducer from "./store/reducers/cart.reducer";
import ordersReducer from "./store/reducers/orders.reducer";
import authReducer from "./store/reducers/auth.reducer";

import NavigationContainer from "./navigation/navigation-container";

const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer,
  orders: ordersReducer,
  auth: authReducer,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default function App() {
  const [fontsLoaded] = useFonts({
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
    "open-sans-regular": require("./assets/fonts/OpenSans-Regular.ttf"),
  });

  if (!fontsLoaded) return <AppLoading />;

  return (
    <Provider store={store}>
      <NavigationContainer />
    </Provider>
  );
}
