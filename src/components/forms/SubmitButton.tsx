import { useFormikContext } from "formik";
import React from "react";
import Button from "react-bootstrap/Button";
interface buttonProps {
  title: string;
  loading: boolean;
  variant: string;
  style?: object;
}

const SubmitButton: React.FC<buttonProps> = ({
  title,
  loading,
  variant,
  style,
}) => {
  const { handleSubmit } = useFormikContext();

  return loading ? (
    <Button style={style} className="text-light" disabled variant={variant}>
      Loading...
    </Button>
  ) : (
    <Button
      onClick={() => handleSubmit()}
      variant={variant}
      style={style}
      className="text-light"
    >
      {title}
    </Button>
  );
};

export default SubmitButton;
