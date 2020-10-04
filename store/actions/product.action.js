export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const CREATE_PRODUCT = "CREATE_PRODUCT";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";
export const SET_PRODUCTS = "SET_PRODUCTS";

import Product from "../../models/product.model";

export const setProducts = () => {
  return async (dispatch) => {
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
          "u1",
          productsResponse[key].title,
          productsResponse[key].imageUrl,
          productsResponse[key].description,
          productsResponse[key].price
        );
        loadedProducts.push(newProduct);
      }

      dispatch({
        type: SET_PRODUCTS,
        payload: loadedProducts,
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
  return async (dispatch) => {
    try {
      const response = await fetch(
        `https://react-native-shop-b010d.firebaseio.com/products/${productId}.json`,
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
  return async (dispatch) => {
    // do async code
    const response = await fetch(
      "https://react-native-shop-b010d.firebaseio.com/products.json",
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
        }),
      }
    );

    const productResponse = await response.json();
    dispatch({
      type: CREATE_PRODUCT,
      payload: {
        id: productResponse.name,
        title,
        description,
        imageUrl,
        price,
      },
    });
  };
};

export const updateProduct = (id, title, description, imageUrl) => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        `https://react-native-shop-b010d.firebaseio.com/products/${id}.json`,
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
        throw new Error("Something went wrong...");
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
