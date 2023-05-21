import { useLayoutEffect } from "react";
import LoginForm from "../components/LoginForm";
import { PropTypes } from "prop-types";

export default function Login({ isAuthenticated }) {
  useLayoutEffect(() => {
    document.title = "LogIn Page";
  }, []);
  return (
    <>
      <LoginForm isAuthenticated={isAuthenticated} />
    </>
  );
}

Login.propTypes = {
  isAuthenticated: PropTypes.bool,
};
