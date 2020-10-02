import React from "react";
import { FlatList, Text, Platform } from "react-native";
import { useSelector } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import CustomHeaderButton from "../../components/UI/header-button.component";
import OrderItem from "../../components/shop/order-item.component";

export default function Orders() {
  const orders = useSelector((state) => state.orders.orders);

  return (
    <FlatList
      data={orders}
      renderItem={(dataItem) => (
        <OrderItem
          amount={dataItem.item.totalSum}
          items={dataItem.item.items}
          date={dataItem.item.readableDate}
          toggleDetails={() => console.log("Toggle details")}
        />
      )}
    />
  );
}

Orders.navigationOptions = ({ navigation }) => {
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
