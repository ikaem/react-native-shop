import React from "react";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createDrawerNavigator } from "react-navigation-drawer";
import { Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import Colors from "../constants/colors.contants";
import ProductsOverview from "../screens/shop/products-overview.screen";
import ProductDetailed from "../screens/shop/product-detailed.screen";
import Cart from "../screens/shop/cart.screen";
import Orders from "../screens/shop/orders.screen";
import UserProducts from "../screens/user/user-products.screen";
import EditProduct from "../screens/user/edit-product.screen";

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

const AdminNavigator = createStackNavigator(
  {
    UserProducts: {
      screen: UserProducts,
    },
    EditProduct: {
      screen: EditProduct,
    },
  },
  {
    navigationOptions: {
      drawerIcon: (drawerConfig) => (
        <Ionicons
          name={Platform.OS === "android" ? "md-create" : "ios-create"}
          size={23}
          color={drawerConfig.tintColor}
        />
      ),
    },
    defaultNavigationOptions: myDefaultNavigationOptions,
  }
);

const OrdersNavigator = createStackNavigator(
  {
    Orders: {
      screen: Orders,
    },
  },
  {
    navigationOptions: {
      drawerIcon: (drawerConfig) => (
        <Ionicons
          name={Platform.OS === "android" ? "md-list" : "ios-list"}
          size={23}
          color={drawerConfig.tintColor}
        />
      ),
    },
    defaultNavigationOptions: myDefaultNavigationOptions,
  }
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
    navigationOptions: {
      drawerIcon: (drawerConfig) => (
        <Ionicons
          name={Platform.OS === "android" ? "md-cart" : "ios-cart"}
          color={drawerConfig.tintColor}
          size={23}
        />
      ),
    },
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
    Admin: {
      screen: AdminNavigator,
    },
  },
  {
    contentOptions: {
      activeTintColor: Colors.primary,
    },
  }
);

export default createAppContainer(shopNavigator);
