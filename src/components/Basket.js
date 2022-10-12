import React from "react";

export const Basket = ({ addtoCart, removefromCart, cartItems }) => {
  const itemsPrice = cartItems.reduce((a, c) => a + c.quantity * c.price, 0);
  const taxPrice = itemsPrice * 0.12;
  const shippingPrice = itemsPrice > 300 ? 0 : 20;
  const totalPrice = itemsPrice + taxPrice + shippingPrice;

  const addToCart = (cartItem) => {
    addtoCart(cartItem);
    // dispatch({ type: "ADD_TO_CART", payload: product})
  };
  const removeFromCart = (cartItem) => {
    removefromCart(cartItem);
  };

  return (
    <aside className="col-1 block">
      <h2>Cart Items</h2>
      <div>
        {cartItems.length === 0 && <div> Cart is empty </div>}
        {cartItems.map((cartItem) => (
          <div key={cartItem.id} className="row">
            <div className="col-1">{cartItem.title} </div>
            <div className="col-1">
              <button
                onClick={() => removeFromCart(cartItem)}
                className="remove"
              >
                -
              </button>
              <span className="p-1">{cartItem.quantity}</span>
              <button className="add" onClick={() => addToCart(cartItem)}>
                +
              </button>
            </div>
            <div className="col-1 text-right">
              {cartItem.quantity} x $ {cartItem.price}
            </div>
          </div>
        ))}
        {cartItems.length !== 0 && (
          <>
            <hr />
            <div className="row">
              <div className="col-2">Items Price</div>
              <div className="col-1 text-right ">${itemsPrice.toFixed(2)}</div>
            </div>
            <div className="row">
              <div className="col-2">Tax Price</div>
              <div className="col-1 text-right ">${taxPrice.toFixed(2)}</div>
            </div>
            <div className="row">
              <div className="col-2">Shipping Price</div>
              <div className="col-1 text-right ">
                ${shippingPrice.toFixed(2)}
              </div>
            </div>
            <div className="row">
              <div className="col-2">Total Price</div>
              <div className="col-1 text-right ">${totalPrice.toFixed(2)}</div>
            </div>
            <hr />
            <div className="row">
              <button onClick={() => alert("Checkout")}>Checkout</button>
            </div>
          </>
        )}
      </div>
    </aside>
  );
};
