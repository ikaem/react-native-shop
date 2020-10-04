import React from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createDrawerNavigator, DrawerItems } from "react-navigation-drawer";
import { Platform, SafeAreaView, Button, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";

import * as authActions from "../store/actions/auth.actions";
import Colors from "../constants/colors.contants";
import ProductsOverview from "../screens/shop/products-overview.screen";
import ProductDetailed from "../screens/shop/product-detailed.screen";
import Cart from "../screens/shop/cart.screen";
import Orders from "../screens/shop/orders.screen";
import UserProducts from "../screens/user/user-products.screen";
import EditProduct from "../screens/user/edit-product.screen";
import Auth from "../screens/user/auth.screen";
import Startup from "../screens/startup.screen";

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

const AuthNavigator = createStackNavigator(
  {
    Auth: {
      screen: Auth,
    },
  },
  {
    defaultNavigationOptions: myDefaultNavigationOptions,
  }
);

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
    contentComponent: (props) => {
      const dispatch = useDispatch();
      return (
        <View style={{ flex: 1, marginTop: 50 }}>
          <SafeAreaView forceInset={{ top: "always", horizontal: "never" }}>
            <DrawerItems {...props} />
            <Button
              title="Logout"
              color="purple"
              onPress={() => {
                dispatch(authActions.logout());
                props.navigation.navigate({
                  routeName: "Auth",
                });
              }}
            />
          </SafeAreaView>
        </View>
      );
    },
  }
);

const MainNavigator = createSwitchNavigator({
  Startup: {
    screen: Startup,
  },
  Auth: {
    screen: AuthNavigator,
  },
  Shop: {
    screen: shopNavigator,
  },
});

export default createAppContainer(MainNavigator);
