import React from "react";
import { StyleSheet, Text, View, Platform } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";

export default function CartItem(props) {
  return (
    <View style={styles.cartItem}>
      <View style={styles.cartItemData}>
  <Text style={styles.cartItemQuantity}>{props.productQuantity}{" x "}</Text>
        <Text style={styles.cartItemTitle}>{props.productTitle}</Text>
      </View>
      <View style={styles.cartItemData}>
        <Text style={styles.cartItemAmount}>{props.productSum.toFixed(2)}</Text>
        <TouchableOpacity
          onPress={props.onRemove}
          style={styles.cartItemDelete}
        >
          <Ionicons
            name={Platform.OS === "android" ? "md-trash" : "ios-trash"}
            size={23}
            color="red"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cartItem: {
    padding: 10,
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 20,
  },
  cartItemData: {
    flexDirection: "row",
    alignItems: "center",
  },
  cartItemQuantity: {
    fontFamily: "open-sans-bold",
    color: "#888",
    fontSize: 16,
  },
  cartItemTitle: {
    fontFamily: "open-sans-bold",
    fontSize: 16,
  },
  cartItemAmount: {
    fontFamily: "open-sans-bold",
    fontSize: 16,
  },
  cartItemDelete: {
    marginLeft: 20,
  },
});
