import React, { useState, useEffect } from "react";
import Product from "../product/Product";
import Nav from "react-bootstrap/Nav";

export const Main = ({ products, addToCart, removeFromCart, cartItems }) => {
  const [searchInput, setSearchInput] = useState("");
  // original data from response
  const [data, setData] = useState(products);
  // copy of data to use for searching
  const [filteredData, setFilteredData] = useState(products);
  const [categoryData, setCategoryData] = useState(products);
  const [currentTab, setCurrentTab] = useState("All");

  useEffect(() => {
    setData(products);
    setCategoryData(products);
    setFilteredData(products);
    setSearchInput("");
  }, [products]);

  const categoryHandler = (name) => {
    let categoryResult = [];
    setCurrentTab(name);
    if (name === "All") {
      categoryResult = data;
    } else if (name === "men_clothing") {
      categoryResult = data.filter((item) =>
        item.category.includes("men's clothing")
      );
    } else if (name === "women_clothing") {
      console.log("category Result", categoryResult);
      categoryResult = data.filter((item) =>
        item.category.includes("women's clothing")
      );
    } else if (name === "jewelery") {
      categoryResult = data.filter((item) =>
        item.category.includes("jewelery")
      );
    } else if (name === "electronics") {
      categoryResult = data.filter((item) =>
        item.category.includes("electronics")
      );
    }
    setSearchInput("");
    setCategoryData(categoryResult);
    setFilteredData(categoryResult);
  };

  const inputHandler = (e) => {
    if (e.target.value === "") {
      setFilteredData(categoryData);
    } else {
      const filterResult = categoryData.filter((item) =>
        item.title.toLowerCase().includes(e.target.value.toLowerCase())
      );

      setFilteredData(filterResult);
    }
    setSearchInput(e.target.value);
  };

  return (
    <div className="products-container">
      <div className="d-flex justify-content-between mb-3">
        <h2 className="mb-0">Products</h2>

        <div class="input-groupp">
          <div class="form-outline">
            <input
              id="search-input"
              type="search"
              class="form-control"
              placeholder="Search Products"
              value={searchInput}
              onChange={inputHandler}
            />
          </div>
          <button
            id="search-button"
            type="button"
            class="btn btn-primary"
            style={{ width: "36px", height: "34px" }}
          >
            <i class="fas fa-search"></i>
          </button>
        </div>
      </div>
      <Nav variant="tabs" defaultActiveKey="All">
        <Nav.Item>
          <Nav.Link
            active={currentTab === "All"}
            onClick={() => categoryHandler("All")}
            eventKey="All"
          >
            All
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            active={currentTab === "men_clothing"}
            onClick={() => categoryHandler("men_clothing")}
            eventKey="men_clothing"
          >
            Men's Clothing
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            active={currentTab === "women_clothing"}
            onClick={() => categoryHandler("women_clothing")}
            eventKey="women_clothing"
          >
            Women's Clothing
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            active={currentTab === "jewelery"}
            onClick={() => categoryHandler("jewelery")}
            eventKey="jewelery"
          >
            Jewelery
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            active={currentTab === "electronics"}
            onClick={() => categoryHandler("electronics")}
            eventKey="electronics"
          >
            electronics
          </Nav.Link>
        </Nav.Item>
      </Nav>
      <div className="products-grid mt-3">
        {filteredData.map((product) => (
          <Product
            key={product.id}
            product={product}
            addToCart={addToCart}
            removeFromCart={removeFromCart}
            item={cartItems.find((cartItem) => cartItem.id === product.id)}
          ></Product>
        ))}
      </div>
    </div>
  );
};
