import React, { useEffect, useState, useRef } from "react";
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
import ReCAPTCHA from "react-google-recaptcha";

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
  const [loading, setLoading] = useState<boolean>(false);

  const isLoggedIn = useLogin((state) => state.isLoggedIn);
  const setAccess = useLogin((state) => state.setAccess);
  const setIsLogIn = useLogin((state) => state.setIsLogIn);
  const navigate = useNavigate();
  const location = useLocation();
  const redirect = location.search ? location.search.split("=")[1] : "/";

  const captchaRef = useRef<ReCAPTCHA>(null);

  const registerUser = async (values: FormikValues) => {
    try {
      const token = captchaRef.current?.getValue();
      captchaRef.current?.reset();

      if (typeof token === "string") {
        setLoading(true);
        const data = await register({
          username: values.username,
          password: values.password,
          referral: values.referral,
          telegram_id: values.telegram_id,
          wallet_address: values.wallet_address,
          token,
        });
        if (typeof data === "string") {
          setLoading(false);
          setAccess(data);
          setIsLogIn(true);
        }
      }
      throw new Error("Recaptcha required");
    } catch (error) {
      alert(error);
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
              <ReCAPTCHA
                sitekey="6LfkCRQhAAAAAGKfe-DqStSqB9l4xCJhX5VKB7jR"
                ref={captchaRef}
                theme="dark"
                className="mt-1 mb-1"
              />
              <SubmitButton
                title="Register"
                variant="primary"
                loading={loading}
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
