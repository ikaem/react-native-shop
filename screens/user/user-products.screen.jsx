import React from "react";
import { FlatList, Platform, Button, Alert } from "react-native";
import { useSelector } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useDispatch } from "react-redux";

import ProductItem from "../../components/shop/product-item.component";
import CustomHeaderButton from "../../components/UI/header-button.component";

import Colors from "../../constants/colors.contants";
import * as productsActions from "../../store/actions/product.action";

export default function UserProducts({ navigation }) {
  const userProducts = useSelector((state) => state.products.userProducts);

  const dispatch = useDispatch();

  const editProductHandler = (productId, productTitle) => {
    navigation.navigate({
      routeName: "EditProduct",
      params: {
        productId,
        productTitle,
      },
    });
  };

  const deleteHandler = (productTitle, productId) => {
    Alert.alert(
      "Confirm delete",
      `Are you sure you want to delete ${productTitle}?`,
      [
        {
          text: "No",
          style: "default",
        },
        {
          text: "Yes",
          style: "destructive",
          onPress: () => dispatch(productsActions.deleteProduct(productId)),
        },
      ]
    );
  };

  return (
    <FlatList
      data={userProducts}
      renderItem={(itemData) => (
        <ProductItem
          title={itemData.item.title}
          price={itemData.item.price}
          imageUrl={itemData.item.imageUrl}
          onTouchAction={() =>
            editProductHandler(itemData.item.id, itemData.item.title)
          }
        >
          <Button
            color={Colors.primary}
            title="Edit"
            onPress={() =>
              editProductHandler(itemData.item.id, itemData.item.title)
            }
          />
          <Button
            color={Colors.primary}
            title="Delete"
            onPress={() => deleteHandler(itemData.item.title, itemData.item.id)}
          />
        </ProductItem>
      )}
    />
  );
}

UserProducts.navigationOptions = ({ navigation }) => {
  return {
    headerTitle: "My Products for Sale",
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
          title="Menu"
          onPress={() => navigation.toggleDrawer()}
        />
      </HeaderButtons>
    ),
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title="Add"
          iconName={Platform.OS === "android" ? "md-create" : "ios-create"}
          onPress={() =>
            navigation.navigate({
              routeName: "EditProduct",
            })
          }
        />
      </HeaderButtons>
    ),
  };
};
