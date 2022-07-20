import React, { useEffect } from "react";
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
import { register } from "../service";

const validationSchema = Yup.object().shape({
  username: Yup.string().required("Email is Required").label("Username"),
  referral: Yup.string().label("referral"),
  telegram_id: Yup.string()
    .required("Telegram id is required")
    .label("telegram_id"),
  wallet_address: Yup.string()
    .required("Wallet address is Required")
    .min(26)
    .label("wallet_address"),
  password: Yup.string().required("Password is Required").label("Password"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), "null"], "Password don't match")
    .required()
    .label("Confirm password"),
});
const RegisterScreen: React.FC = () => {
  const isLoggedIn = useLogin((state) => state.isLoggedIn);
  const setAccess = useLogin((state) => state.setAccess);
  const setIsLogIn = useLogin((state) => state.setIsLogIn);
  const navigate = useNavigate();
  const location = useLocation();
  const redirect = location.search ? location.search.split("=")[1] : "/";

  const registerUser = async (values: FormikValues) => {
    try {
      const data = await register({
        username: values.username,
        password: values.password,
        referral: values.referral,
        telegram_id: values.telegram_id,
        wallet_address: values.wallet_address,
      });
      if (data) {
        setAccess(data);
        setIsLogIn(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isLoggedIn) navigate(redirect);
  }, [isLoggedIn, navigate, redirect]);

  return (
    <Screen>
      <div className="d-flex w-100 mt-5">
        <Card className="login-card m-auto shadow-none">
          <Card.Header className="bg-white text-center">
            <h3 style={{ color: colors.black }}>Welcome To VaderCash.com</h3>
            <p style={{ color: colors.gray }}>
              Use your credentials to create an new account
            </p>
          </Card.Header>
          <Card.Body>
            <FormContainer
              validationSchema={validationSchema}
              initialValues={{
                username: "",
                password: "",
                referral: "",
                wallet_address: "",
                telegram_id: "",
              }}
              onSubmit={registerUser}
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
              <FromField
                key="confirmPassword"
                name="confirmPassword"
                label="Confirm Password"
                placeholder="Enter your password again"
                type="password"
                width="100%"
              />
              <FromField
                key="telegram_id"
                name="telegram_id"
                label="Telegram Id"
                placeholder="Enter your telegram id"
                type="text"
                width="100%"
              />
              <FromField
                key="wallet_address"
                name="wallet_address"
                label="Wallet Address"
                placeholder="Enter your BSC wallet address"
                type="text"
                width="100%"
              />
              <FromField
                key="referral"
                name="referral"
                label="Referral Code"
                placeholder="Enter referral code"
                type="text"
                width="100%"
              />
              <SubmitButton
                title="Register"
                variant="outline-primary"
                loading={false}
                style={{ width: "100%" }}
              />
            </FormContainer>
          </Card.Body>
          <Card.Footer className="bg-white text-center">
            <p style={{ color: colors.gray }}>
              Already have an account?{" "}
              <span>
                <Link to={redirect ? `/login?redirect=${redirect}` : "/login"}>
                  Login
                </Link>
              </span>
            </p>
            <p style={{ color: colors.gray }}>
              By registering you are agreeing to the privacy and policy of
              VaderCash.com
            </p>
          </Card.Footer>
        </Card>
      </div>
    </Screen>
  );
};

export default RegisterScreen;
