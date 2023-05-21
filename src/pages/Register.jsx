import { useLayoutEffect } from "react";
import RegisterForm from "../components/RegisterForm";

export default function Register() {
  useLayoutEffect(() => {
    document.title = "SignUp Page";
  }, []);
  return (
    <>
      <RegisterForm />
    </>
  );
}
