import React from "react";
import { useFormikContext } from "formik";
import FormErrorMessages from "./FormErrorMessages";
import Form from "react-bootstrap/Form";
interface FieldProps {
  [key: string]: any;
  isMessage?: boolean;
  placeholder: string;
  type: string;
  width?: string;
  label: string;
}
const FromField: React.FC<FieldProps> = ({
  name,
  isMessage = false,
  placeholder,
  type,
  width = "100%",
  label,
}) => {
  const { touched, errors, setFieldTouched, setFieldValue } =
    useFormikContext<FieldProps>();
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column-reverse",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Form.Group className="mb-3 w-100">
        <Form.Label>{label}:</Form.Label>
        <Form.Control
          type={type}
          placeholder={placeholder}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setFieldValue(name, event.target.value)
          }
          onBlur={() => setFieldTouched(name)}
          style={{ width: width }}
        />
        <Form.Text className="text-muted">
          {!isMessage && (
            <FormErrorMessages error={errors[name]} visible={touched[name]} />
          )}
        </Form.Text>
      </Form.Group>
    </div>
  );
};

export default FromField;
