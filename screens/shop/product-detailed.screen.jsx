import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Button,
  ScrollView,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";

import Colors from "../../constants/colors.contants";
import * as cartActions from "../../store/actions/cart.actions";

export default function ProductDetailed(props) {
  const productId = props.navigation.getParam("productId");

  const productDetailed = useSelector((state) =>
    state.products.availableProducts.find((product) => product.id === productId)
  );

  const dispatch = useDispatch();

  return (
    <ScrollView>
      <Image
        style={styles.productDetailedImage}
        source={{ uri: productDetailed.imageUrl }}
      />
      <View style={styles.productDetailedButtonContainer}>
        <Button
          color={Colors.primary}
          title={"Add to Cart"}
          onPress={() => dispatch(cartActions.addToCart(productDetailed))}
        />
      </View>
      <Text style={styles.productDetailedPrice}>${productDetailed.price}</Text>
      <Text style={styles.productDetailedDescription}>
        {productDetailed.description}
      </Text>
    </ScrollView>
  );
}

ProductDetailed.navigationOptions = (data) => {
  const headerTitle = data.navigation.getParam("productTitle");
  return {
    headerTitle,
  };
};

const styles = StyleSheet.create({
  productDetailedImage: {
    width: "100%",
    height: 300,
  },
  productDetailedButtonContainer: {
    marginVertical: 10,
    alignItems: "center",
  },
  productDetailedPrice: {
    fontSize: 20,
    color: "#888",
    textAlign: "center",
    marginVertical: 20,
    fontFamily: "open-sans-bold",
  },
  productDetailedDescription: {
    fontSize: 14,
    textAlign: "center",
    marginHorizontal: 20,
  },
});
