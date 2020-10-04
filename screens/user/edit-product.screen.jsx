import React, { useState, useEffect, useCallback, useReducer } from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  Platform,
  Alert,
  KeyboardAvoidingView,
  ActivityIndicator,
} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useSelector, useDispatch } from "react-redux";

import CustomHeaderButton from "../../components/UI/header-button.component";
import Input from "../../components/UI/input.component";

import * as productsActions from "../../store/actions/product.action";

const FORM_UPDATE = "UPDATE";

const formReducer = (state, action) => {
  switch (action.type) {
    case FORM_UPDATE:
      const updatedInputValues = {
        ...state.inputValues,
        [action.payload.input]: action.payload.value,
      };

      const updatedInputValidities = {
        ...state.inputValidities,
        [action.payload.input]: action.payload.isValid,
      };

      // overall form validity
      let formIsValid = true;
      for (let key in updatedInputValidities) {
        if (!updatedInputValidities[key]) {
          formIsValid = false;
          break;
        }
        // formIsValid = formIsValid && updatedInputValidities[key];
      }

      // and store the update value..
      return {
        ...state,
        inputValues: updatedInputValues,
        inputValidities: updatedInputValidities,
        formValid: formIsValid,
      };

    default:
      return state;
  }
};

export default function EditProduct(props) {
  const [isLoading, setIsLoading] = useState(false);
  const [productError, setProductError] = useState();

  const productId = props.navigation.getParam("productId");

  const editableProduct = useSelector((state) => {
    const userProducts = state.products.userProducts;
    const something = userProducts.find((product) => product.id === productId);
    return something;
  });

  const dispatch = useDispatch();

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      title: editableProduct ? editableProduct.title : "",
      imageUrl: editableProduct ? editableProduct.imageUrl : "",
      price: "",
      description: editableProduct ? editableProduct.description : "",
    },
    inputValidities: {
      title: editableProduct ? true : false,
      imageUrl: editableProduct ? true : false,
      price: editableProduct ? true : false,
      description: editableProduct ? true : false,
    },
    formValid: editableProduct ? true : false,
  });

  useEffect(() => {
    if (!productError) return;
    Alert.alert(
      "Error",
      `There was an issue ${
        editableProduct ? "editing the" : "creating a new"
      } product`,
      [
        {
          text: "Okay",
          style: "default",
          onPress: () => setProductError(),
        },
      ]
    );
  }, [productError]);

  const submitHandler = useCallback(async () => {
    if (!formState.formValid) {
      return Alert.alert(
        "Invalid input",
        `Your form is invalid. Please check yourself.`,
        [
          {
            text: "Alright",
            style: "default",
          },
        ]
      );
    }
    setProductError(null);
    setIsLoading(true);

    try {
      if (editableProduct) {
        await dispatch(
          productsActions.updateProduct(
            productId,
            formState.inputValues.title,
            formState.inputValues.description,
            formState.inputValues.imageUrl
          )
        );
      } else {
        await dispatch(
          productsActions.createProduct(
            formState.inputValues.title,
            formState.inputValues.description,
            formState.inputValues.imageUrl,
            +formState.inputValues.price
          )
        );
      }
      setIsLoading(false);
      props.navigation.goBack();
    } catch (error) {
      console.log(error);
      setProductError(error.message);
    }
  }, [dispatch, productId, formState]);

  useEffect(() => {
    props.navigation.setParams({
      submitHandler,
    });
  }, [submitHandler]);

  const inputChangeHandler = useCallback(
    (inputIdentifier, inputValue, inputValidity) => {
      dispatchFormState({
        type: FORM_UPDATE,
        payload: {
          value: inputValue,
          isValid: inputValidity,
          input: inputIdentifier,
        },
      });
    },
    []
  );

  if (isLoading)
    return (
      <View style={styles.spinnerContainer}>
        <ActivityIndicator size="large" color="purple" />
      </View>
    );

  return (
    <KeyboardAvoidingView
      // style={{ flex: 1 }}
      behavior="padding"
      keyboardVerticalOffset={100}
    >
      <ScrollView
      // style={{ flex: 1 }}
      >
        <View style={styles.form}>
          <Input
            identifier="title"
            label="Title"
            initialValue={formState.inputValues.title}
            errorMessage="Please enter title of the product"
            returnType="next"
            onInputChange={inputChangeHandler}
            isInitiallyValid={!!editableProduct}
            required
          />
          <Input
            identifier="imageUrl"
            label="Image URL"
            initialValue={formState.inputValues.imageUrl}
            errorMessage="Please enter image URL for the product"
            onInputChange={inputChangeHandler}
            isInitiallyValid={!!editableProduct}
            returnType="next"
            required
          />

          {!editableProduct && (
            <Input
              identifier="price"
              label="Price"
              keyboardType="decimal-pad"
              errorMessage="Please enter price of the product"
              returnType="next"
              onInputChange={inputChangeHandler}
              required
              min={0.1}
            />
          )}

          <Input
            identifier="description"
            label="Description"
            initialValue={formState.inputValues.description}
            errorMessage="Please enter description of the product"
            onInputChange={inputChangeHandler}
            isInitiallyValid={!!editableProduct}
            numberOfLines={3}
            multiline
            autoCorrect
            autoCapitalize="sentences"
            minLength={5}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

EditProduct.navigationOptions = ({ navigation }) => {
  const submitHandler = navigation.getParam("submitHandler");
  return {
    headerTitle: navigation.getParam("productTitle")
      ? `Edit ${navigation.getParam("productTitle")}`
      : "Add Product",
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title="Save"
          name={Platform.OS === "android" ? "md-checkmark" : "ios-checkmark"}
          onPress={() => submitHandler()}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  form: {
    margin: 20,
  },
  spinnerContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
});
