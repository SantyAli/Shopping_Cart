import { useReducer, useEffect } from "react";
import axios from "axios";
// components
import { Basket } from "./components/Basket";
import { Header } from "./components/Header";
import { Main } from "./components/Main";

// productreducer
// const initialState = {
//   products: [],
//   loading: false,
//   error: "",
//   success: "",
// };

// rootreducer
const initialState = {
  product: {
    products: [],
    quantity: 0,
    loading: false,
    error: "",
    success: "",
  },
  cart: {
    cartItems: [],
    count: 0,
  },
  user: {
    loggedInUser: {},
    loading: false,
    error: "",
    success: "",
  },
};

const reducer = (state, action) => {
  const cartState = state.cart;

  switch (action.type) {
    case "PRODUCT_LIST_REQUEST":
      return {
        ...state, //rootReducer
        product: {
          //product reducer
          ...state.product,
          quantity: 0,
          loading: true,
          error: "",
          success: "",
        },
      };
    case "PRODUCT_LIST_SUCCESS":
      return {
        ...state,
        product: {
          products: action.payload,
          quantity: 0,
          loading: false,
          success: "Successfull!",
        },
      };
    case "PRODUCT_LIST_FAIL":
      return {
        ...state,
        product: {
          quantity: 0,
          loading: false,
          error: "Something went wrong!",
          success: "",
        },
      };
    case "ADD_TO_CART":
      //Checking whether the Product is in CartItems or not.....
      const isProductInCart = cartState.cartItems.find(
        (cartItem) => cartItem.id === action.payload.id
      );

      let newCartItemsForAddition = null;
      //Condition for updating the existing Product in CartItems
      if (isProductInCart) {
        newCartItemsForAddition = cartState.cartItems.map((cartItem) =>
          cartItem.id === action.payload.id
            ? { ...isProductInCart, quantity: isProductInCart.quantity + 1 }
            : { ...cartItem }
        );
      } else {
        newCartItemsForAddition = [
          ...cartState.cartItems,
          { ...action.payload, quantity: 1 },
        ];
      }

      return {
        ...state,
        cart: {
          ...cartState,
          cartItems: newCartItemsForAddition,
          count: ++cartState.count,
        },
      };

    case "REMOVE_FROM_CART":
      const productInCart = cartState.cartItems.find(
        (cartItem) => cartItem.id === action.payload.id
      );
      let newCartItemsForRemoval = [...cartState.cartItems];

      if (productInCart) {
        if (productInCart.quantity === 1) {
          newCartItemsForRemoval = newCartItemsForRemoval.filter(
            (cartItem) => cartItem.id !== action.payload.id
          );
        } else {
          newCartItemsForRemoval = newCartItemsForRemoval.map((cartItem) =>
            cartItem.id === action.payload.id
              ? { ...productInCart, quantity: productInCart.quantity - 1 }
              : { ...cartItem }
          );
        }
      }

      return {
        ...state,
        cart: {
          ...cartState,
          cartItems: newCartItemsForRemoval,
          count: --cartState.count,
        },
      };
    default:
      return state;
  }
};

function App() {
  // Root Reducer to combine all the reducers
  const [rootReducer, dispatch] = useReducer(reducer, initialState);
  //Product Reducer
  const { products, loading, success, error } = rootReducer.product;
  //Cart Reducer
  const { cartItems, count } = rootReducer.cart;

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
    <div>
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
    </div>
  );
}

export default App;
