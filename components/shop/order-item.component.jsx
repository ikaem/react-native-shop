import React, { useState } from "react";
import { StyleSheet, Text, View, Button } from "react-native";

import CartItem from "./cart-item.component";

import Colors from "../../constants/colors.contants";

export default function OrderItem(props) {
  const [showDetails, setShowDetails] = useState(false);
  return (
    <View style={styles.orderItem}>
      <View style={styles.orderSummary}>
        <Text style={styles.orderAmount}>${props.amount.toFixed(2)}</Text>
        <Text style={styles.orderDate}>{props.date}</Text>
      </View>
      <Button
        color={Colors.primary}
        title={!showDetails ? "Show Details" : "Hide details"}
        onPress={() => setShowDetails((prevState) => !prevState)}
      />
      {showDetails && (
        <View style={styles.orderDetails}>
          {props.items.map((item) => (
            <CartItem
              key={item.productId}
              productTitle={item.productTitle}
              productPrice={item.productPrice}
              productQuantity={item.productQuantity}
              productSum={item.productSum}
            />
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  orderItem: {
    shadowColor: "black",
    shadowOffset: {
      width: 3,
      height: 3,
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 7,
    borderRadius: 10,
    backgroundColor: "white",
    overflow: "hidden",
    margin: 20,
    padding: 10,
    alignItems: "center",
  },
  orderSummary: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginBottom: 10,
  },
  orderAmount: {
    fontFamily: "open-sans-bold",
    fontSize: 16,
  },
  orderDate: {
    fontFamily: "open-sans-regular",
    fontSize: 16,
    color: "#888",
  },
  orderDetails: {
    marginTop: 15,
    width: "100%",
  },
});
