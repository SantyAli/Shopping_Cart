import { useReducer, useEffect } from "react";
import axios from "axios";
import { Basket } from "../Basket";
import { Header } from "../Header";
import { Main } from "../Main";

export const Home = ({state, dispatch}) => {
  
  //Product Reducer
  const { products, loading, success, error } = state.product;
  //Cart Reducer
  const { cartItems, count } = state.cart;

  useEffect(() => {
    callApi();
  }, []);

  const callApi = () => {
    dispatch({ type: "PRODUCT_LIST_REQUEST" });
    axios
      .get("https://fakestoreapi.com/products?limit=4")
      .then((response) => {
        dispatch({ type: "PRODUCT_LIST_SUCCESS", payload: response.data });
        console.log("Response Data", response.data);
      })
      .catch(() => {
        dispatch({ type: "PRODUCT_LIST_FAIL" });
      });
  };

  const addProductToCart = (product) => {
    dispatch({ type: "ADD_TO_CART", payload: product });
  };
  const removeProductFromCart = (product) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: product });
  };

  return (
    <>
      <Header cartItemCount={count} />
      <div className="row">
        <Main
          products={products}
          addtoCart={addProductToCart}
          removefromCart={removeProductFromCart}
          cartItems={cartItems}
        />
        <Basket
          addtoCart={addProductToCart}
          removefromCart={removeProductFromCart}
          cartItems={cartItems}
        />
      </div>
    </>
  );
};
