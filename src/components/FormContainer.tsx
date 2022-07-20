import React from "react";
import { Formik } from "formik";

interface FormProps {
  initialValues: object;
  validationSchema: object;
  onSubmit: () => void;
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
      {children}
    </Formik>
  );
};

export default FormContainer;
