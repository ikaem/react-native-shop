import React, { useState, useEffect } from "react";
import {
  FlatList,
  View,
  Text,
  Platform,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import CustomHeaderButton from "../../components/UI/header-button.component";
import OrderItem from "../../components/shop/order-item.component";

import * as ordersActions from "../../store/actions/orders.action";

export default function Orders(props) {
  const [isLoading, setIsLoading] = useState(false);
  const [fetchOrdersError, setFetchOrdersError] = useState();

  const orders = useSelector((state) => state.orders.orders);
  const dispatch = useDispatch();

  const fetchOrdersHandler = async () => {
    setIsLoading(true);
    setFetchOrdersError(null);

    try {
      await dispatch(ordersActions.fetchOrders());
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setFetchOrdersError(error.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOrdersHandler();
  }, []);

  useEffect(() => {
    const ordersSub = props.navigation.addListener(
      "willFocus",
      fetchOrdersHandler
    );

    return () => {
      ordersSub.remove();
    };
  });

  if (!isLoading && fetchOrdersError)
    return (
      <View style={styles.spinnerContainer}>
        <Text>{fetchOrdersError}</Text>
      </View>
    );

  if (isLoading)
    return (
      <View style={styles.spinnerContainer}>
        <ActivityIndicator size="large" color="purple" />
      </View>
    );

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

const styles = StyleSheet.create({
  spinnerContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
});
