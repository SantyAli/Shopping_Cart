import { Container, Spinner } from "react-bootstrap";
import { Main } from "../products/Main";

export const Home = ({
  loading,
  products,
  addProductToCart,
  removeProductFromCart,
  cartItems,
}) => {
  return (
    <Container>
      {loading ? (
        <div className="loading-container spinner">
          <Spinner
            style={{ width: "150px", height: "150px" }}
            animation="border"
            role="status"
          >
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : (
        <Main
          products={products}
          addtoCart={addProductToCart}
          removefromCart={removeProductFromCart}
          cartItems={cartItems}
        />
      )}
    </Container>
  );
};
