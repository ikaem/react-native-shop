import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Button,
  ScrollView,
} from "react-native";

import { useSelector } from "react-redux";

export default function ProductDetailed(props) {
  const productId = props.navigation.getParam("productId");

  const productDetailed = useSelector((state) =>
    state.products.availableProducts.find((product) => product.id === productId)
  );

  return (
    <View>
      <Text>{productDetailed.title}</Text>
    </View>
  );
}

ProductDetailed.navigationOptions = (data) => {
  const headerTitle = data.navigation.getParam("productTitle");
  return {
    headerTitle,
  };
};

const styles = StyleSheet.create({});
