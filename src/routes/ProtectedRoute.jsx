import { Navigate } from "react-router-dom";
import { PropTypes } from "prop-types";
const ProtectedRoute = ({ children }) => {
  const authData = JSON.parse(localStorage.getItem("authData"));
  if (!authData?.isAuthenticate) {
    return <Navigate to="/login" />;
  }
  return children;
};
export default ProtectedRoute;
ProtectedRoute.propTypes = {
  children: PropTypes.node,
  isAuthenticated: PropTypes.bool,
};
