export const initialState = {
    product: {
      products: [],
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
  
  export const reducer = (state, action) => {
    const cartState = state.cart;
  
    switch (action.type) {
      case "PRODUCT_LIST_REQUEST":
        return {
          ...state, //rootReducer
          product: {
            products: [],
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
            loading: false,
            success: "Successfull!",
          },
        };
      case "PRODUCT_LIST_FAIL":
        return {
          ...state,
          product: {
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
  