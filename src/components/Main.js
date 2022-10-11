import React from "react";
import Product from "./Product";

export const Main = ({ products, addtoCart, removefromCart, cartItems }) => {
  return (
    <div className="col-2 block">
      <h2>Products</h2>

      <div className="row">
        {products.map((product) => (
          <div>
            <Product
              key={product.id}
              product={product}
              addtoCart={addtoCart}
              removefromCart={removefromCart}
              item={cartItems.find((cartItem) => cartItem.id === product.id)}
            ></Product>
          </div>
        ))}
      </div>
    </div>
  );
};
