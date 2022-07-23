import React, { useEffect, useState } from "react";
import Screen from "../components/Screen";
import Card from "react-bootstrap/Card";
import { colors } from "../config";
import "../components/css/login.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import FormContainer from "../components/forms/FormContainer";
import * as Yup from "yup";
import FromField from "../components/forms/FromField";
import { FormikValues } from "formik";
import SubmitButton from "../components/forms/SubmitButton";
import { useLogin } from "../stores";
import { login } from "../service";

const validationSchema = Yup.object().shape({
  username: Yup.string().required("Email is Required").label("Username"),
  password: Yup.string().required("Password is Required").label("Password"),
});

const LoginScreen: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const isLoggedIn = useLogin((state) => state.isLoggedIn);
  const setAccess = useLogin((state) => state.setAccess);
  const setIsLogIn = useLogin((state) => state.setIsLogIn);
  const navigate = useNavigate();
  const location = useLocation();

  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    if (isLoggedIn) navigate(redirect);
  }, [isLoggedIn, navigate, redirect]);

  const loginHandler = async (values: FormikValues) => {
    try {
      setLoading(true);
      const data = await login(values.username, values.password);
      setLoading(false);
      if (data) {
        setAccess(data);
        setIsLogIn(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Screen>
      <div className="d-flex w-100 mt-5">
        <Card className="login-card m-auto shadow-none">
          <Card.Header className="bg-white text-center">
            <h3 style={{ color: colors.black }}>Welcome Back</h3>
            <p style={{ color: colors.gray }}>
              Use your Email and Password to login to your account
            </p>
          </Card.Header>
          <Card.Body>
            <FormContainer
              validationSchema={validationSchema}
              initialValues={{ username: "", password: "" }}
              onSubmit={loginHandler}
            >
              <FromField
                key="username"
                name="username"
                label="Email"
                placeholder="Enter your email"
                type="email"
                width="100%"
              />
              <FromField
                key="password"
                name="password"
                label="Password"
                placeholder="Enter your password"
                type="password"
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
              <span>
                <Link
                  to={redirect ? `/register?redirect=${redirect}` : "/register"}
                >
                  Register
                </Link>
              </span>
            </p>
            <p style={{ color: colors.gray }}>
              By logging in you are agreeing to the privacy and policy of
              VaderCash.com
            </p>
          </Card.Footer>
        </Card>
      </div>
    </Screen>
  );
};

export default LoginScreen;
