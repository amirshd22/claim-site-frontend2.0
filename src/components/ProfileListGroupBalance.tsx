import React from "react";
import { ListGroup } from "react-bootstrap";
import NumberFormat from "react-number-format";

interface props {
  value: number;
  title: string;
  prefix: boolean;
}

const ProfileListGroupBalance: React.FC<props> = ({ value, title, prefix }) => {
  return (
    <ListGroup.Item>
      <div className="d-flex flex-column flex-md-row justify-content-between w-75  m-auto text-center">
        <p>{title}</p>
        <p className="text-dark">
          <NumberFormat
            thousandSeparator
            displayType="text"
            value={value}
            prefix={prefix ? "$" : undefined}
          />
        </p>
      </div>
    </ListGroup.Item>
  );
};

export default ProfileListGroupBalance;
