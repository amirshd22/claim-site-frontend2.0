import React, { useEffect, useState } from "react";
import Screen from "../components/Screen";
import Card from "react-bootstrap/Card";
import FormContainer from "../components/forms/FormContainer";
import * as Yup from "yup";
import FromField from "../components/forms/FromField";
import SubmitButton from "../components/forms/SubmitButton";
import { colors } from "../config";
import { useLogin } from "../stores";
import { useNavigate } from "react-router-dom";
import { createForm } from "../service";
import { FormikValues } from "formik";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required").label("name"),
  email: Yup.string().required("Email is Required").label("email"),
  phone: Yup.string().required("Phone number is Required").label("phone"),
  text: Yup.string().required("Description is Required").label("text"),
});

const ContactUsScreen: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const access = useLogin((state) => state.access);
  const isLoggedIn = useLogin((state) => state.isLoggedIn);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) navigate("/login?redirect=/contact-us");
  }, [isLoggedIn, navigate]);

  const handleSubmit = async (values: FormikValues) => {
    try {
      setLoading(true);
      await createForm(
        {
          name: values.name,
          email: values.email,
          text: values.text,
          phone: values.phone,
        },
        access
      );
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Screen>
      <Card className="mt-5">
        <Card.Header className="bg-white">
          <h3 className="text-dark">Have Any Question?</h3>
        </Card.Header>
        <Card.Body>
          <FormContainer
            validationSchema={validationSchema}
            initialValues={{ name: "", email: "", phone: "", text: "" }}
            onSubmit={handleSubmit}
          >
            <FromField
              name="name"
              key="name"
              type="text"
              placeholder="Write your name here"
              label="Name"
            />
            <FromField
              name="email"
              key="email"
              type="email"
              placeholder="Write your email here"
              label="Email"
            />
            <FromField
              name="phone"
              key="phone"
              type="number"
              placeholder="Write your phone number here"
              label="Phone Number"
            />
            <FromField
              name="text"
              key="text"
              type="text"
              placeholder="Write your question here"
              label="Describe your question"
            />
            <SubmitButton title="Submit" variant="primary" loading={loading} />
          </FormContainer>
        </Card.Body>
        <Card.Footer className="text-center">
          <p style={{ color: colors.gray }}>
            This process might take some time so please be patient
          </p>
          <p style={{ color: colors.gray }}>
            We will make sure your data is safe
          </p>
        </Card.Footer>
      </Card>
    </Screen>
  );
};

export default ContactUsScreen;
