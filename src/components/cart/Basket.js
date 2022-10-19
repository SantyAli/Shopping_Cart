import React, { useState } from "react";
import Button from "@mui/material/Button";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import IconButton from "@mui/material/IconButton";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import AddCircleIcon from "@mui/icons-material/AddCircle";

export const Basket = ({ addtoCart, removefromCart, cartItems }) => {
  const [validated, setValidated] = useState(false);
  const [promoCode, setPromoCode] = useState("");
  const [promoCodeValid, setPromoCodeValid] = useState("");
  const [discountPrice, setDiscountPrice] = useState(0);
  const itemsPrice = cartItems.reduce((a, c) => a + c.quantity * c.price, 0);
  const taxPrice = itemsPrice * 0.12;
  const shippingPrice = itemsPrice > 9000 ? 0 : 20;
  const totalPrice = itemsPrice + taxPrice + shippingPrice - discountPrice;
  const addToCart = (cartItem) => {
    addtoCart(cartItem);
    // dispatch({ type: "ADD_TO_CART", payload: product})
  };
  const removeFromCart = (cartItem) => {
    removefromCart(cartItem);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (promoCode === "123456") {
      setValidated(true);
      setPromoCodeValid("");
      setDiscountPrice(30);
    } else {
      setPromoCodeValid("false");
      setValidated(false);
    }
  };

  return (
    <div className="cart-container">
      <h2>Cart Items</h2>
      {cartItems.length === 0 && <div> Cart is empty </div>}
      <div className="row">
        <div className="col-9">
          {cartItems.map((cartItem) => (
            <div className="cart-item-box row" key={cartItem.id}>
              <div className="img-wrapper col-2 ">
                <img
                  src={cartItem.image}
                  style={{ width: "145px", height: "160px" }}
                  alt={cartItem.title}
                />
              </div>
              <div className="col-6 d-flex flex-column">
                <p className="font-decoration">{cartItem.title}</p>
                <div>
                  <IconButton
                    aria-label="delete"
                    onClick={() => removeFromCart(cartItem)}
                    size="large"
                  >
                    <RemoveCircleIcon fontSize="large" />
                  </IconButton>
                  <span className="p-1">{cartItem.quantity}</span>
                  <IconButton
                    aria-label="delete"
                    onClick={() => addToCart(cartItem)}
                    size="large"
                  >
                    <AddCircleIcon fontSize="large" />
                  </IconButton>
                </div>
              </div>
              <div
                className="col-4 d-flex justify-content-end"
                style={{ fontSize: "18px" }}
              >
                <p>
                  {cartItem.quantity} x <b>$</b> {cartItem.price}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="col-3 ">
          <div className="order-box d-flex flex-column justify ">
            <h2 className="text-center">Promo Code</h2>
            <p className="text-center">Get 30$ Discount.</p>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              <Form.Group controlId="promoCodeGroup">
                <Form.Control
                  type="text"
                  isInvalid={!!promoCodeValid}
                  onChange={(e) => setPromoCode(e.target.value)}
                  placeholder="Promo Code"
                  required  
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a valid Promo Code.
                </Form.Control.Feedback>
              </Form.Group>
              <Button
                type="submit"
                className="mt-3"
                variant="contained"
                onClick={(e) => handleSubmit(e)}
              >
                Apply
              </Button>
            </Form>
            {/* <InputGroup
              className="mb-3"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
            >
              <Form.Control placeholder="Promo Code" />
              <Button
                variant="contained"
                type="submit"
                onClick={discountHandler}
              >
                Apply
              </Button>
              <Form.Control.Feedback type="invalid">
                Please provide a valid Promo Code.
              </Form.Control.Feedback>
            </InputGroup> */}
          </div>
          {cartItems.length !== 0 && (
            <div className="order-box">
              <h2 className="text-center">Order Summary</h2>
              <div className="d-flex flex-row justify-content-between p-wrapper">
                <p>Items Price</p>
                <p>${itemsPrice.toFixed(2)}</p>
              </div>
              <div className="d-flex flex-row justify-content-between p-wrapper">
                <p>Tax Price</p>
                <p>${taxPrice.toFixed(2)}</p>
              </div>
              <div className="d-flex flex-row justify-content-between p-wrapper">
                <p>Shipping Price</p>
                <p>${shippingPrice.toFixed(2)}</p>
              </div>
              <div className="d-flex flex-row justify-content-between p-wrapper">
                <p>Discount Price</p>
                <p>${discountPrice.toFixed(2)}</p>
              </div>
              <hr />
              <div className="d-flex flex-row justify-content-between p-wrapper">
                <p>
                  <b>Total Price</b>
                </p>
                <p>
                  <b>${totalPrice.toFixed(2)}</b>
                </p>
              </div>
              <div className="d-flex flex-column align-items-center pt-2">
                <Button
                  variant="contained"
                  className="text-center"
                  onClick={() => alert("Checkout")}
                  startIcon={<ShoppingCartCheckoutIcon />}
                >
                  Checkout
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
