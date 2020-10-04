import Order from "../../models/order.model";

export const ADD_ORDER = "ADD_ORDER";
export const FETCH_ORDERS = "FETCH_ORDERS";

export const fetchOrders = () => {
  return async (dispatch, getState) => {
    const { userId } = getState().auth
    try {
      const response = await fetch(
        `https://react-native-shop-b010d.firebaseio.com/orders/${userId}.json`
      );

      if (!response.ok) {
        throw new Error("Something went wrong");
      }

      const ordersResponse = await response.json();
      const loadedOrders = [];

      for (const key in ordersResponse) {
        const newProduct = new Order(
          key,
          ordersResponse[key].items,
          ordersResponse[key].totalSum,
          new Date(ordersResponse[key].date)
        );
        loadedOrders.push(newProduct);
      }

      /*class Order {
constructor(id, items, totalSum, date) {
this.id = id;
this.items = items;
this.totalSum = totalSum;
this.date = date;
}*/

      dispatch({
        type: FETCH_ORDERS,
        payload: loadedOrders,
      });
    } catch (error) {
      // deal with error
      // console.log(error);
      // send to some analytics
      // dispatch({
      //   type: SET_PRODUCTS,
      //   payload: [],
      // });
      throw error;
    }
  };
};

export const addOrder = (cartItems, totalSum) => {
  return async (dispatch, getState) => {
    const { token, userId } = getState().auth;
    try {
      const date = new Date();
      const response = await fetch(
        `https://react-native-shop-b010d.firebaseio.com/orders/${userId}.json?auth=${token}`,
        {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            items: cartItems,
            totalSum,
            date: date.toISOString(),
          }),
        }
      );

      if (!response.ok) throw new Error("Something is wrong...");

      const orderId = await response.json();

      dispatch({
        type: ADD_ORDER,
        payload: {
          id: orderId.name,
          items: cartItems,
          sum: totalSum,
          date,
        },
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};
