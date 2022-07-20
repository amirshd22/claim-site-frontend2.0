import React from "react";

interface props {
  error: any;
  visible: any;
}

const FormErrorMessages: React.FC<props> = ({ error, visible }) => {
  if (!visible || !error) return null;

  return (
    <span
      style={{
        color: "red",
        paddingLeft: 15,
        fontSize: 15,
        marginBottom: 10,
        textAlign: "right",
      }}
    >
      {error}
    </span>
  );
};

export default FormErrorMessages;
