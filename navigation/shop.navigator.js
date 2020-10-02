import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createDrawerNavigator } from "react-navigation-drawer";
import { Platform } from "react-native";

import Colors from "../constants/colors.contants";
import ProductsOverview from "../screens/shop/products-overview.screen";
import ProductDetailed from "../screens/shop/product-detailed.screen";
import Cart from "../screens/shop/cart.screen";
import Orders from "../screens/shop/orders.screen";

const myDefaultNavigationOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === "android" ? Colors.primary : "",
  },
  headerTitleStyle: {
    fontFamily: "open-sans-bold",
  },
  headerBackTitleStyle: {
    fontFamily: "open-sans-regular",
  },
  headerTintColor: Platform.OS === "android" ? "white" : Colors.primary,
};

const OrdersNavigator = createStackNavigator(
  {
    Orders: {
      screen: Orders,
    },
  },
  { defaultNavigationOptions: myDefaultNavigationOptions }
);

const ProductsNavigator = createStackNavigator(
  {
    ProductsOverview: {
      screen: ProductsOverview,
    },
    ProductDetailed: {
      screen: ProductDetailed,
    },
    Cart: {
      screen: Cart,
    },
  },
  {
    defaultNavigationOptions: myDefaultNavigationOptions,
  }
);

const shopNavigator = createDrawerNavigator(
  {
    Products: {
      screen: ProductsNavigator,
    },
    Orders: {
      screen: OrdersNavigator,
    },
  },
  {
    contentOptions: {
      activeTintColor: Colors.primary,
    },
  }
);

export default createAppContainer(shopNavigator);
