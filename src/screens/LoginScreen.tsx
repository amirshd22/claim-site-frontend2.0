import React from "react";
import Screen from "../components/Screen";
import Card from "react-bootstrap/Card";
import { colors } from "../config";
import "../components/css/login.css";
import { Link } from "react-router-dom";
import FormContainer from "../components/FormContainer";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  username: Yup.string().required("Email is Required").label("Username"),
  password: Yup.string().required("Password is Required").label("Password"),
});

const LoginScreen: React.FC = () => {
  const loginHandler = () => {};
  return (
    <Screen>
      <div className="d-flex w-100 mt-5 text-center">
        <Card className="login-card m-auto shadow-none">
          <Card.Header className="bg-white">
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
              hello
            </FormContainer>
          </Card.Body>
          <Card.Footer className="bg-white">
            <p style={{ color: colors.gray }}>
              New User?{" "}
              <span>
                <Link to="/register">Register</Link>
              </span>
            </p>
          </Card.Footer>
        </Card>
      </div>
    </Screen>
  );
};

export default LoginScreen;
