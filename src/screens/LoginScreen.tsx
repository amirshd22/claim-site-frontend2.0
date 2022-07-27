import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import { colors } from "../config";
import "../components/css/login.css";
import FormContainer from "../components/forms/FormContainer";
import * as Yup from "yup";
import FromField from "../components/forms/FromField";
import { FormikValues } from "formik";
import SubmitButton from "../components/forms/SubmitButton";
import { useLogin } from "../stores";
import { login } from "../service";
import { useNavigate } from "react-router-dom";

const validationSchema = Yup.object().shape({
  username: Yup.string().required("Email is Required").label("Username"),
  password: Yup.string().required("Password is Required").label("Password"),
});

const LoginScreen: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const setAccess = useLogin((state) => state.setAccess);
  const setIsLogIn = useLogin((state) => state.setIsLogIn);
  const setOnLogin = useLogin((state) => state.setOnLogin);

  const navigate = useNavigate();

  const loginHandler = async (values: FormikValues) => {
    try {
      setLoading(true);
      const data = await login(values.username, values.password);
      setLoading(false);
      if (data) {
        setAccess(data);
        setIsLogIn(true);
        navigate("/profile");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="d-flex w-100 mt-5">
      <Card className="login-card m-auto shadow-none">
        <Card.Body>
          <FormContainer
            validationSchema={validationSchema}
            initialValues={{ username: "", password: "" }}
            onSubmit={loginHandler}
          >
            <FromField
              key="username"
              name="username"
              label="Wallet Address"
              placeholder="Enter your Wallet address"
              type="text"
              width="100%"
            />
            <FromField
              key="password"
              name="password"
              label="Telegram Id"
              placeholder="Enter your telegram Id"
              type="text"
              width="100%"
            />

            <SubmitButton
              title="Login"
              variant="primary"
              loading={loading}
              style={{ width: "100%" }}
            />
          </FormContainer>
        </Card.Body>
        <Card.Footer className="bg-white text-center">
          <p style={{ color: colors.gray }}>
            New User?{" "}
            <span
              className="text-primary text-decoration-underline"
              style={{ cursor: "pointer" }}
              onClick={() => setOnLogin(false)}
            >
              Register
            </span>
          </p>
          <p style={{ color: colors.gray }}>
            By logging in you are agreeing to the privacy and policy of
            VaderCash.com
          </p>
        </Card.Footer>
      </Card>
    </div>
  );
};

export default LoginScreen;
