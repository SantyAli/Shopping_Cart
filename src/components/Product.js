import React from "react";

function Product({ product, addtoCart, removefromCart, item }) {
  const addToCart = () => {
    addtoCart(product);
    // dispatch({ type: "ADD_TO_CART", payload: product})
  };
  const removeFromCart = () => {
    removefromCart(product);
  };

  return (
    <div className="card">
      <img className="small" src={product.image} alt={product.title} />
      <h3> {product.title} </h3>
      <div>${product.price} </div>
      <div>
        {item ? (
          <div>
            <button onClick={removeFromCart} className="remove">
              {" "}
              -{" "}
            </button>
            <span className="p-1">{item.quantity}</span>
            <button className="add" onClick={addToCart}>
              {" "}
              +{" "}
            </button>
          </div>
        ) : (
          <button className="button" onClick={addToCart}>
            Add to cart
          </button>
        )}
      </div>
    </div>
  );
}

export default Product;
