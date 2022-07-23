import React from "react";
import Card from "react-bootstrap/Card";
import NumberFormat from "react-number-format";
import { useGlobal } from "../../stores/globalStore";
import "../css/home.css";
const GlobalInfoSection: React.FC = () => {
  const global = useGlobal((state) => state.global);
  return (
    <div className="d-flex flex-column flex-md-row justify-content-between text-center">
      <Card className="mb-2 card-home">
        <Card.Body>
          <div>
            <h4 className="text-primary">Users</h4>
            <h4 className="text-dark">
              <NumberFormat
                value={global.users}
                thousandSeparator
                displayType="text"
              />
            </h4>
          </div>
        </Card.Body>
      </Card>
      <Card className="mb-2 card-home">
        <Card.Body>
          <div>
            <h4 className="text-primary">Total Withdrawals</h4>
            <h4 className="text-dark">
              <NumberFormat
                value={global.total_withdrawals}
                thousandSeparator
                displayType="text"
                prefix="$"
              />
            </h4>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default GlobalInfoSection;
