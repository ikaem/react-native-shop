import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  FlatList,
  Platform,
  Button,
  View,
  ActivityIndicator,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import ProductItem from "../../components/shop/product-item.component";
import CustomHeaderButton from "../../components/UI/header-button.component";

import * as cartActions from "../../store/actions/cart.actions";
import * as productsActions from "../../store/actions/product.action";
import Colors from "../../constants/colors.contants";

export default function ProductsOverview(props) {
  const [productsAreLoading, setProductsAreLoading] = useState(true);
  const [productsArePulling, setProductsArePulling] = useState(false);
  const [productsError, setProductsError] = useState();
  const availableProducts = useSelector(
    (state) => state.products.availableProducts
  );
  const dispatch = useDispatch();

  const loadProducts = async () => {
    setProductsAreLoading(true);
    setProductsArePulling(true);

    try {
      await dispatch(productsActions.setProducts());
      // setProductsAreLoading(false);
      setProductsArePulling(false);
    } catch (error) {
      setProductsError(error.message);
      // setProductsAreLoading(false);
      setProductsArePulling(false);
    }
    setProductsAreLoading(false);
  };

  useEffect(() => {
    // setProductsAreLoading(true);
    loadProducts();
  }, [dispatch]);

  useEffect(() => {
    const willFocusSubscription = props.navigation.addListener(
      "willFocus",
      loadProducts
    );

    return () => {
      willFocusSubscription.remove();
    };
  }, []);

  const navigateToProductDetailed = (id, title) => {
    props.navigation.navigate({
      routeName: "ProductDetailed",
      params: {
        productId: id,
        productTitle: title,
      },
    });
  };

  if (productsAreLoading)
    return (
      <View style={styles.spinnerContainer}>
        <ActivityIndicator size="large" color="purple" />
      </View>
    );

  if (!productsAreLoading && productsError)
    return (
      <View style={styles.spinnerContainer}>
        <Text>{productsError}</Text>
        <Button
          title="Try again"
          onPress={() => {
            setProductsError();
            loadProducts();
          }}
        />
      </View>
    );

  if (!productsAreLoading && availableProducts.length === 0)
    return (
      <View style={styles.spinnerContainer}>
        <Text>No products found</Text>
      </View>
    );

  return (
    <FlatList
      onRefresh={loadProducts}
      refreshing={productsArePulling}
      data={availableProducts}
      renderItem={(itemData) => (
        <ProductItem
          imageUrl={itemData.item.imageUrl}
          title={itemData.item.title}
          price={itemData.item.price}
          onTouchAction={() =>
            navigateToProductDetailed(itemData.item.id, itemData.item.title)
          }
        >
          <Button
            color={Colors.primary}
            title="To Details"
            onPress={() =>
              navigateToProductDetailed(itemData.item.id, itemData.item.title)
            }
          />
          <Button
            color={Colors.primary}
            title="Add to Cart"
            onPress={() => dispatch(cartActions.addToCart(itemData.item))}
          />
        </ProductItem>
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

const styles = StyleSheet.create({
  spinnerContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
});
