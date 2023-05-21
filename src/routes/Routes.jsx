import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Suspense, lazy } from "react";

import { useSelector } from "react-redux";
import Loader from "../components/Loader";

// eslint-disable-next-line react/display-name
const Loadable = (Component) => (props) => {
  return (
    <Suspense fallback={<Loader />}>
      <Component {...props} />
    </Suspense>
  );
};

function RouteComp() {
  const isAuthenticated = useSelector(
    (state) => state.authUser?.isAuthenticate
  );
  const authData = JSON.parse(localStorage.getItem("authData"));
  return (
    <Router>
      <Header />
      <Routes>
        <Route
          path="/register"
          element={
            authData?.isAuthenticate ? (
              <Navigate to="/dashboard" />
            ) : (
              <Register />
            )
          }
        />
        <Route
          path="/login"
          element={
            authData?.isAuthenticate ? (
              <Navigate to="/dashboard" />
            ) : (
              <Login isAuthenticated={isAuthenticated} />
            )
          }
        />{" "}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        {/*

      */}
      </Routes>
    </Router>
  );
}

export default RouteComp;

const Register = Loadable(lazy(() => import("../pages/Register")));
const Dashboard = Loadable(lazy(() => import("../pages/Dashboard")));
const Login = Loadable(lazy(() => import("../pages/Login")));
const ProtectedRoute = Loadable(lazy(() => import("./ProtectedRoute")));
const Header = Loadable(lazy(() => import("../components/Header")));
