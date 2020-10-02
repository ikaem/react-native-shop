import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
} from "react-native";

import Colors from "../../constants/colors.contants";

export default function ProductItem(props) {
  const TouchableComponent =
    Platform.OS === "android" && Platform.Version > 20
      ? TouchableNativeFeedback
      : TouchableOpacity;

  return (
    <TouchableComponent onPress={props.onViewDetails} useForeground>
      <View style={styles.productItem}>
        <Image style={styles.productImage} source={{ uri: props.imageUrl }} />
        <View style={styles.productInfo}>
          <Text style={styles.productTitle}>{props.title}</Text>
          <Text style={styles.productPrice}>${props.price.toFixed(2)}</Text>
        </View>
        <View style={styles.productButtonsContainer}>
          <Button
            color={Colors.primary}
            title="To Details"
            onPress={props.onViewDetails}
          />
          <Button
            color={Colors.primary}
            title="Add to Cart"
            onPress={props.onAddToCart}
          />
        </View>
      </View>
    </TouchableComponent>
  );
}

const styles = StyleSheet.create({
  productItem: {
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
    height: 300,
    margin: 20,
  },
  productImage: {
    width: "100%",
    height: "60%",
  },
  productInfo: {
    alignItems: "center",
    height: "15%",
    paddingVertical: 5,
  },
  productTitle: {
    fontSize: 18,
    marginVertical: 4,
  },
  productPrice: {
    fontSize: 14,
    color: "#888",
  },
  productButtonsContainer: {
    height: "25%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
  },
});
