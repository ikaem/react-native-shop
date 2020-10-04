import PRODUCTS from "../../data/dummy.data";
import {
  DELETE_PRODUCT,
  UPDATE_PRODUCT,
  CREATE_PRODUCT,
  SET_PRODUCTS,
} from "../actions/product.action";
import Product from "../../models/product.model";

const initialState = {
  // availableProducts: PRODUCTS,
  availableProducts: [],
  // userProducts: PRODUCTS.filter((product) => product.ownerId === "u1"),
  userProducts: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_PRODUCTS:
      return {
        ...state,
        availableProducts: action.payload,
        userProducts: action.payload.filter(
          (product) => product.ownerId === "u1"
        ),
      };

    case DELETE_PRODUCT:
      const { payload: productId } = action;

      return {
        ...state,
        userProducts: state.userProducts.filter(
          (product) => product.id !== productId
        ),
        availableProducts: state.availableProducts.filter(
          (product) => product.id !== productId
        ),
      };

    case CREATE_PRODUCT:
      const { id, title, description, imageUrl, price } = action.payload;
      const newProduct = new Product(
        // new Date().toString(),
        id,
        "u1",
        title,
        imageUrl,
        description,
        price
      );

      const newState = {
        ...state,
        availableProducts: [...state.availableProducts, newProduct],
        userProducts: [...state.userProducts, newProduct],
      };

      return newState;

    case UPDATE_PRODUCT:
      const { productId: productForUpdateId, productData } = action.payload;
      const productIndexAtUser = state.userProducts.findIndex(
        (product) => product.id === productForUpdateId
      );
      const productIndexAtAvailable = state.availableProducts.findIndex(
        (product) => product.id === productForUpdateId
      );

      const updatedProduct = new Product(
        productForUpdateId,
        state.userProducts[productIndexAtUser].ownerId,
        productData.title,
        productData.imageUrl,
        productData.description,
        state.userProducts[productIndexAtUser].price
      );

      const updatedUserProducts = [...state.userProducts];
      const updatedAvailableProducts = [...state.availableProducts];

      updatedUserProducts[productIndexAtUser] = updatedProduct;
      updatedAvailableProducts[productIndexAtAvailable] = updatedProduct;

      return {
        ...state,
        availableProducts: updatedAvailableProducts,
        userProducts: updatedUserProducts,
      };

    default:
      return state;
  }
};
