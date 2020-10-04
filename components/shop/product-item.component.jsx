import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
} from "react-native";

import Card from "../../components/UI/card.component"


export default function ProductItem(props) {
  const TouchableComponent =
    Platform.OS === "android" && Platform.Version > 20
      ? TouchableNativeFeedback
      : TouchableOpacity;

  return (
    <TouchableOpacity onPress={props.onTouchAction} useForeground>
      <Card style={styles.productItem}>
        <Image style={styles.productImage} source={{ uri: props.imageUrl }} />
        <View style={styles.productInfo}>
          <Text style={styles.productTitle}>{props.title}</Text>
          <Text style={styles.productPrice}>${props.price.toFixed(2)}</Text>
        </View>
        <View style={styles.productButtonsContainer}>
          {props.children}
        </View>
      </Card>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  productItem: {
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
