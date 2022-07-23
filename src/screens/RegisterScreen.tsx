import React, { useState, useRef } from "react";
import Card from "react-bootstrap/Card";
import { colors } from "../config";
import "../components/css/login.css";
import FormContainer from "../components/forms/FormContainer";
import * as Yup from "yup";
import FromField from "../components/forms/FromField";
import { FormikValues } from "formik";
import SubmitButton from "../components/forms/SubmitButton";
import { useLogin } from "../stores";
import { register } from "../service";
import ReCAPTCHA from "react-google-recaptcha";

const validationSchema = Yup.object().shape({
  referral: Yup.string().label("referral"),
  username: Yup.string()
    .required("Wallet address is Required")
    .min(26)
    .label("wallet_address"),
  password: Yup.string()
    .required("Telegram id is Required")
    .label("Telegram Id"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), "null"], "Telegram id don't match")
    .required()
    .label("Confirm telegram id"),
});
const RegisterScreen: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const isLoggedIn = useLogin((state) => state.isLoggedIn);
  const setAccess = useLogin((state) => state.setAccess);
  const setIsLogIn = useLogin((state) => state.setIsLogIn);
  const setOnLogin = useLogin((state) => state.setOnLogin);

  const captchaRef = useRef<ReCAPTCHA>(null);

  const registerUser = async (values: FormikValues) => {
    try {
      const token = captchaRef.current?.getValue();
      captchaRef.current?.reset();

      if (typeof token === "string") {
        setLoading(true);
        if (values.username[0] === "0" && values.username[1] === "x") {
          const data = await register({
            username: values.username,
            password: values.password,
            referral: values.referral,
            telegram_id: values.password,
            wallet_address: values.username,
            token,
          });
          if (typeof data === "string") {
            setLoading(false);
            setAccess(data);
            setIsLogIn(true);
          }
        } else {
          alert("wrong wallet address");
        }
      }
    } catch (error) {
      alert(error);
    }
  };
  if (isLoggedIn) return null;
  return (
    <div className="d-flex w-100 mt-5">
      <Card className="login-card m-auto shadow-none">
        <Card.Body>
          <FormContainer
            validationSchema={validationSchema}
            initialValues={{
              username: "",
              password: "",
              referral: "",
            }}
            onSubmit={registerUser}
          >
            <FromField
              key="username"
              name="username"
              label="Wallet Address"
              placeholder="Enter your BSC wallet address"
              type="text"
              width="100%"
            />
            <FromField
              key="password"
              name="password"
              label="Telegram Id"
              placeholder="Enter your Telegram Id"
              type="text"
              width="100%"
            />
            <FromField
              key="confirmPassword"
              name="confirmPassword"
              label="Confirm Telegram Id"
              placeholder="Enter your Telegram Id again"
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
            <span
              className="text-primary text-decoration-underline"
              style={{ cursor: "pointer" }}
              onClick={() => setOnLogin(true)}
            >
              Login
            </span>
          </p>
          <p style={{ color: colors.gray }}>
            By registering you are agreeing to the privacy and policy of
            VaderCash.com
          </p>
        </Card.Footer>
      </Card>
    </div>
  );
};

export default RegisterScreen;
