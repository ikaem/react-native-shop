import Order from "../../models/order.model";
import { ADD_ORDER, FETCH_ORDERS } from "../actions/orders.action";

const initialState = {
  orders: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ORDERS:
      // we just set payload to tthe state..
      return {
        ...state,
        orders: action.payload,
      };

    case ADD_ORDER:
      // WE JUST WANT to create new order
      // and add it to the state.

      const newOrder = new Order(
        // new Date().toString(),
        action.payload.id,
        action.payload.items,
        action.payload.sum,
        // new Date()
        action.payload.date
      );

      const newOrders = [...state.orders, newOrder];

      return {
        ...state,
        orders: newOrders,
      };
  }

  return state;
};
