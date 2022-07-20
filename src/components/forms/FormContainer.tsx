import React from "react";
import { Formik, FormikValues } from "formik";
import Container from "react-bootstrap/Container";
interface FormProps {
  initialValues: object;
  validationSchema: object;
  onSubmit: (values: FormikValues) => void;
  children: React.ReactNode;
}

const FormContainer: React.FC<FormProps> = ({
  initialValues,
  validationSchema,
  onSubmit,
  children,
}) => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {() => <Container style={{ width: "100%" }}>{children}</Container>}
    </Formik>
  );
};

export default FormContainer;
