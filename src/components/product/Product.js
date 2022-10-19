import React from "react";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";

import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import IconButton from "@mui/material/IconButton";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import AddCircleIcon from "@mui/icons-material/AddCircle";


function Product({ product, addtoCart, removefromCart, item }) {
  const navigateTo = useNavigate();
  const { user } = useContext(AuthContext);
  const { setAuthStatus } = useContext(AuthContext);
 
  const buttonToggleHandler = () => {
    if (user.auth === true) {
      addToCart();
    } else {
      setAuthStatus("", false);
      navigateTo("/login");
    }
  };

  const addToCart = () => {
    addtoCart(product);
    // dispatch({ type: "ADD_TO_CART", payload: product})
  };
  const removeFromCart = () => {
    removefromCart(product);
  };

  return (
    <div className="product-card ">
      <div
        className="grow"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img
          className="small"
          src={product.image}
          style={{ width: "200px", height: "250px" }}
          alt={product.title}
        />
      </div>
      <p className="text-decoration">{product.title}</p>
      <h4>${product.price} </h4>
      <>
        {item ? (
          <div className="button-group">
            <IconButton
              aria-label="delete"
              onClick={removeFromCart}
              size="large"
            >
              <RemoveCircleIcon fontSize="large" />
            </IconButton>
            <span className="p-1">{item.quantity}</span>
            <IconButton aria-label="delete" onClick={addToCart} size="large">
              <AddCircleIcon fontSize="large" />
            </IconButton>
          </div>
        ) : (
          <Button
            variant="contained"
            startIcon={<AddShoppingCartIcon />}
            onClick={buttonToggleHandler}
            className="button"
          >
            Add to Cart
          </Button>
        )}
      </>
    </div>
  );
}

export default Product;
