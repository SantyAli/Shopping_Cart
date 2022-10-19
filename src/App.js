import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import axios from "axios";
// components
import Login from "./components/login/Login";
import { Home } from "./components/home/Home";
import { useReducer, useEffect } from "react";
import { reducer, initialState } from "./store/store";
import PublicRoute from "./utils/PublicRoute";
import PrivateRoute from "./utils/PrivateRoute";
import { Basket } from "./components/cart/Basket";
import ResponsiveAppBar from "./components/appBar/AppBar";
import Container from "react-bootstrap/Container";

function App() {
  const [rootReducer, dispatch] = useReducer(reducer, initialState);

  //Product Reducer
  const { products, loading, success, error } = rootReducer.product;
  //Cart Reducer
  const { cartItems, count } = rootReducer.cart;

  useEffect(() => {
    callApi();
  }, []);

  const callApi = () => {
    // setLoading(true);
    dispatch({ type: "PRODUCT_LIST_REQUEST" });

    axios
      .get("https://fakestoreapi.com/products")
      .then((response) => {
        // setLoading(false);
        dispatch({ type: "PRODUCT_LIST_SUCCESS", payload: response.data });
        console.log("Response Data", response.data);
      })
      .catch(() => {
        // setLoading(false);
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
      <ResponsiveAppBar />
      <Routes>
        {/* public */}
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login dispatch={dispatch} />
            </PublicRoute>
          }
        />

        {/* private */}

        <Route
          path="/cart"
          element={
            <PrivateRoute>
              <Basket
                addtoCart={addProductToCart}
                removefromCart={removeProductFromCart}
                cartItems={cartItems}
              />
            </PrivateRoute>
          }
        >
          {" "}
        </Route>
        {/* open */}
        <Route
          path="/store"
          element={
            <Home
              loading={loading}
              products={products}
              addProductToCart={addProductToCart}
              removeProductFromCart={removeProductFromCart}
              cartItems={cartItems}
            />
          }
        ></Route>
        <Route path="/" element={<Navigate to="store" replace />} />
      </Routes>
    </>
  );
}

export default App;
