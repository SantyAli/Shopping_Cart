import React from "react";

export const Header = ({ cartItemCount }) => {
  return (
    <div className="row center block">
      <div>
        <a href="#/">
          <h2>Shopping Cart</h2>
        </a>
      </div>
      <div>
        <a href="#/cart" style={{ fontWeight: "bold" }}>
          Cart <span>({cartItemCount})</span>
        </a>{" "}
        <a href="#/signin">Sign In</a>
      </div>
    </div>
  );
};
