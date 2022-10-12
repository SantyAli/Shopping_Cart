import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
// components
import Login from "./components/login/Login";
import { Home } from "./components/home/Home";
import { useReducer } from "react";
import { reducer, initialState } from "./store/store";
import Contact from "./components/Contact";
import PublicRoute from "./utils/PublicRoute";
import PrivateRoute from "./utils/PrivateRoute";

function App() {
  const [rootReducer, dispatch] = useReducer(reducer, initialState);

  return (
    <>
      <Routes>
        {/* public */}
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login dispatch={dispatch} />
            </PublicRoute>
          }
        />
        \{/* private */}
        <Route
          path="/store"
          element={
            <PrivateRoute>
              <Home state={rootReducer} dispatch={dispatch} />
            </PrivateRoute>
          }
        ></Route>
        {/* open */}
        <Route path="/" element={<Navigate to="store" replace />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </>
  );
}

export default App;
