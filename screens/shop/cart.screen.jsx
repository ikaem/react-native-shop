import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Button,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";

import CartItem from "../../components/shop/cart-item.component";

import Colors from "../../constants/colors.contants";
import * as cartActions from "../../store/actions/cart.actions";
import * as ordersActions from "../../store/actions/orders.action";

export default function Cart() {
  const [isLoading, setIsLoading] = useState(false);
  const [createOrderError, setCreateOrderError] = useState();

  const cart = useSelector((state) => state.cart);
  const { items, totalSum } = cart;

  const transformedItems = [];
  for (const key in items) {
    const productItem = {
      productId: key,
      productTitle: items[key].productTitle,
      productPrice: items[key].productPrice,
      productQuantity: items[key].productQuantity,
      productSum: items[key].productSum,
    };

    transformedItems.push(productItem);
  }

  transformedItems.sort((a, b) => (a.productId > b.productId ? 1 : -1));

  const dispatch = useDispatch();

  useEffect(() => {
    if (!createOrderError) return;

    Alert.alert("Order error", "Unable to create error. Please try again", [
      {
        text: "Okay",
        style: "default",
        onPress: () => setCreateOrderError(),
      },
    ]);
  }, [createOrderError]);

  const createOrder = async () => {
    setIsLoading(true);
    setCreateOrderError(null);
    try {
      await dispatch(ordersActions.addOrder(transformedItems, totalSum));
    } catch (error) {
      console.log(error);
      setCreateOrderError(error.message);
    }
    setIsLoading(false);
  };

  return (
    <View style={styles.cart}>
      <View style={styles.cartSummary}>
        <Text style={styles.cartTotalSum}>
          Total:{" "}
          <Text style={styles.amount}>${Math.round(totalSum).toFixed(2)}</Text>
        </Text>
        <View style={styles.actionsContainer}>
          {isLoading && (
            <View style={styles.spinnerContainer}>
              <ActivityIndicator size="small" color="purple" />
            </View>
          )}

          {!isLoading && (
            <Button
              title="Order now"
              disabled={!transformedItems.length}
              onPress={() => {
                createOrder();
              }}
            />
          )}
        </View>
      </View>
      <FlatList
        data={transformedItems}
        keyExtractor={(item) => item.productTitle}
        renderItem={(dataItem) => {
          return (
            <CartItem
              productTitle={dataItem.item.productTitle}
              productPrice={dataItem.item.productPrice}
              productQuantity={dataItem.item.productQuantity}
              productSum={dataItem.item.productSum}
              onRemove={() =>
                dispatch(cartActions.removeFromCart(dataItem.item.productId))
              }
            />
          );
        }}
      />
    </View>
  );
}

Cart.navigationOptions = () => {
  return {
    headerTitle: "My Cart",
  };
};

const styles = StyleSheet.create({
  cart: {
    margin: 20,
  },
  cartSummary: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
    padding: 10,
    shadowColor: "black",
    shadowOffset: {
      width: 3,
      height: 3,
    },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: "white",
  },
  cartTotalSum: {
    fontFamily: "open-sans-bold",
    fontSize: 18,
  },
  amount: {
    color: Colors.primary,
  },
  actionsContainer: {
    margin: 0,
  },
  cartItem: {},
  spinnerContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
});
