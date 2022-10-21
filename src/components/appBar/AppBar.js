import * as React from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { AuthContext } from "../../context/authContext";
import { LinkContainer } from "react-router-bootstrap";
import { Badge } from "react-bootstrap";
import { Cart } from "../cart/Cart";

const ResponsiveAppBar = ({ cartItemCount }) => {
  const navigateTo = useNavigate();
  const { user, setAuthStatus } = useContext(AuthContext);

  const logoutHandler = () => {
    setAuthStatus("", false);
    navigateTo("/login");
  };

  return (
    <>
      <Navbar bg="primary" variant="dark">
        <Container>
          <LinkContainer to="/store">
            <Navbar.Brand>
              <ShoppingCartIcon />
              CHKOUT
            </Navbar.Brand>
          </LinkContainer>
          <Nav className="me-auto">
            <LinkContainer to="/store">
              <Nav.Link>Store</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/cart">
              <Nav.Link>
                Cart&nbsp;<sup><Badge bg="warning" text="dark">{cartItemCount}</Badge></sup>
              </Nav.Link>
            </LinkContainer>
            <LinkContainer to="/login">
              {user.auth === true ? (
                <Nav.Link onClick={logoutHandler}>LOGOUT</Nav.Link>
              ) : (
                <Nav.Link onClick={logoutHandler}>LOGIN</Nav.Link>
              )}
            </LinkContainer>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};
export default ResponsiveAppBar;
