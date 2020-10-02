import React from "react";
import { FlatList, Text } from "react-native";
import { useSelector } from "react-redux";

export default function Orders() {
  const orders = useSelector((state) => state.orders.orders);

  return (
    <FlatList
      data={orders}
      renderItem={(dataItem) => <Text>{dataItem.item.id}</Text>}
    />
  );
}

Orders.navigationOptions = () => {
  return {
    headerTitle: "My Orders",
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
  };
};
