import Order from "../../models/order.model";
import { ADD_ORDER } from "../actions/orders.action";

const initialState = {
  orders: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_ORDER:
      // WE JUST WANT to create new order
      // and add it to the state.

      const newOrder = new Order(
        new Date().toString(),
        action.payload.items,
        action.payload.sum,
        new Date()
      );

      const newOrders = [...state.orders, newOrder];

      return {
        ...state,
        orders: newOrders,
      };
  }

  return state;
};
