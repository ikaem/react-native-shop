import { ADD_TO_CART, REMOVE_FROM_CART } from "../actions/cart.actions";
import { ADD_ORDER } from "../actions/orders.action";
import CartItem from "../../models/cart-item.model";

const initialState = {
  items: {},
  totalSum: 0,
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const product = action.payload;
      const {
        id: productId,
        price: productPrice,
        title: productTitle,
      } = product;

      if (state.items[productId]) {
        const updatedCartItem = new CartItem(
          state.items[productId].productQuantity + 1,
          state.items[productId].productPrice,
          productTitle,
          state.items[productId].productSum + productPrice
        );

        const newState = {
          ...state,
          items: {
            ...state.items,
            [productId]: updatedCartItem,
          },
          totalSum: state.totalSum + productPrice,
        };

        return newState;
      } else {
        // add new key to the object
        const newCartItem = new CartItem(
          1,
          productPrice,
          productTitle,
          productPrice
        );
        const newState = {
          ...state,
          items: {
            ...state.items,
            [productId]: newCartItem,
          },
          totalSum: state.totalSum + productPrice,
        };

        return newState;
      }

    case REMOVE_FROM_CART:
      // lets find qunatity of the item

      const productToRemove = state.items[action.payload];

      //   // if just one exists
      if (productToRemove.productQuantity === 1) {
        // delete the cart item
        const updatedCartItems = { ...state.items };
        delete updatedCartItems[action.payload];

        // reduce the total price too
        const newTotal = state.totalSum - productToRemove.productPrice;

        // return new state
        return {
          ...state,
          items: updatedCartItems,
          totalSum: newTotal,
        };
      }
      //   // if multiple exist...
      else {
        // reduce number of products by 1 and total sum by price too

        const updatedProduct = new CartItem(
          productToRemove.productQuantity - 1,
          productToRemove.productPrice,
          productToRemove.productTitle,
          productToRemove.productSum - productToRemove.productPrice
        );

        // now create new instance of product items
        const updatedProductItems = {
          ...state.items,
          [action.payload]: updatedProduct,
        };

        // reduce the total price too
        const newTotal = state.totalSum - productToRemove.productPrice;

        // updated state
        const updatedState = {
          ...state,
          items: updatedProductItems,
          totalSum: newTotal,
        };

        return updatedState;
      }

    case ADD_ORDER:
      return initialState;

    default:
      return state;
  }
};

export default cartReducer;
