import React from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import { useSelector } from "react-redux";

import ProductItem from "../../components/shop/product-item.component";

export default function ProductsOverview(props) {
  const availableProducts = useSelector(
    (state) => state.products.availableProducts
  );

  return (
    <FlatList
      data={availableProducts}
      renderItem={(itemData) => (
        <ProductItem
          imageUrl={itemData.item.imageUrl}
          title={itemData.item.title}
          price={itemData.item.price}
          onViewDetails={() =>
            props.navigation.navigate({
              routeName: "ProductDetailed",
              params: {
                productId: itemData.item.id,
                productTitle: itemData.item.title
              },
            })
          }
          onAddToCart={() => console.log("Add to Cart")}
        />
      )}
    />
  );
}

ProductsOverview.navigationOptions = () => {
  return {
    headerTitle: "All Products",
  };
};

const styles = StyleSheet.create({});
