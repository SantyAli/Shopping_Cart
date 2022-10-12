import React from "react";
import { Link } from "react-router-dom";

export const Header = ({ cartItemCount }) => {
  return (
    <div className="row center block">
      <div>
        <a href="#/">
          <h2>Shopping Cart</h2>
        </a>
      </div>
      <div>
        <Link to="/cart" style={{ fontWeight: "bold" }}>
          Cart <span>({cartItemCount})</span>
        </Link>{" "}
        <Link to="/login" >SignIn</Link>
      </div>
    </div>
  );
};
