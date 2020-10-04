export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const CREATE_PRODUCT = "CREATE_PRODUCT";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";
export const SET_PRODUCTS = "SET_PRODUCTS";

import Product from "../../models/product.model";

export const setProducts = () => {
  return async (dispatch, getState) => {
    const { userId } = getState().auth;
    try {
      const response = await fetch(
        "https://react-native-shop-b010d.firebaseio.com/products.json"
      );

      if (!response.ok) {
        throw new Error("Something went wrong");
      }

      const productsResponse = await response.json();
      const loadedProducts = [];

      for (const key in productsResponse) {
        const newProduct = new Product(
          key,
          productsResponse[key].ownerId,
          productsResponse[key].title,
          productsResponse[key].imageUrl,
          productsResponse[key].description,
          productsResponse[key].price
        );
        loadedProducts.push(newProduct);
      }

      dispatch({
        type: SET_PRODUCTS,
        payload: { products: loadedProducts, userId },
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

export const deleteProduct = (productId) => {
  return async (dispatch, getState) => {
    const { token } = getState().auth;
    try {
      const response = await fetch(
        `https://react-native-shop-b010d.firebaseio.com/products/${productId}.json?auth=${token}`,
        {
          method: "delete",
        }
      );

      if (!response.ok) throw new Error("S0mething went wrong");

      dispatch({ type: DELETE_PRODUCT, payload: productId });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};

export const createProduct = (title, description, imageUrl, price) => {
  return async (dispatch, getState) => {
    // do async code
    const { token, userId } = getState().auth;
    const response = await fetch(
      `https://react-native-shop-b010d.firebaseio.com/products.json?auth=${token}`,
      {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          imageUrl,
          price,
          ownerId: userId,
        }),
      }
    );

    if (!response.ok) {
      const createProductError = await response.json();
      console.log(createProductError);
    }

    const productResponse = await response.json();
    dispatch({
      type: CREATE_PRODUCT,
      payload: {
        id: productResponse.name,
        title,
        description,
        imageUrl,
        price,
        ownerId: userId,
      },
    });
  };
};

export const updateProduct = (id, title, description, imageUrl) => {
  return async (dispatch, getState) => {
    const { token } = getState().auth;
    try {
      const response = await fetch(
        `https://react-native-shop-b010d.firebaseio.com/products/${id}.json?auth=${token}`,
        {
          method: "patch",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title,
            description,
            imageUrl,
          }),
        }
      );

      if (!response.ok) {
        const updateProductError = await response.json();
        console.log(updateProductError);
      }

      dispatch({
        type: UPDATE_PRODUCT,
        payload: {
          productId: id,
          productData: {
            title,
            description,
            imageUrl,
          },
        },
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};
