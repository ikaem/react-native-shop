import React from "react";
import { StyleSheet, FlatList, Platform } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import ProductItem from "../../components/shop/product-item.component";
import CustomHeaderButton from "../../components/UI/header-button.component";

import * as cartActions from "../../store/actions/cart.actions";

export default function ProductsOverview(props) {
  const availableProducts = useSelector(
    (state) => state.products.availableProducts
  );
  const dispatch = useDispatch();

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
                productTitle: itemData.item.title,
              },
            })
          }
          onAddToCart={() => dispatch(cartActions.addToCart(itemData.item))}
        />
      )}
    />
  );
}

ProductsOverview.navigationOptions = ({ navigation }) => {
  return {
    headerTitle: "All Products",
    headerLeft: () => {
      return (
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
          <Item
            title="Menu"
            iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
            onPress={() => navigation.toggleDrawer()}
          />
        </HeaderButtons>
      );
    },
    headerRight: () => {
      return (
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
          <Item
            title="Cart"
            iconName={Platform.OS === "android" ? "md-cart" : "ios-cart"}
            onPress={() =>
              navigation.navigate({
                routeName: "Cart",
              })
            }
          />
        </HeaderButtons>
      );
    },
  };
};

const styles = StyleSheet.create({});
