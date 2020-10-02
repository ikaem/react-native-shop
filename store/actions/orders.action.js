export const ADD_ORDER = "ADD_ORDER";

export const addOrder = (cartItems, totalSum) => {
  return {
    type: ADD_ORDER,
    payload: {
      items: cartItems,
      sum: totalSum,
    },
  };
};
