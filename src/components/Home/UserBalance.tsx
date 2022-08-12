import React from "react";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";

const UserBalance: React.FC = () => {
  const navigate = useNavigate();
  const goToProfile = () => {
    navigate("/profile");
  };
  return (
    <Card className="mb-2 text-center">
      <Card.Body onClick={goToProfile} style={{ cursor: "pointer" }}>
        <div>
          <h2 className="text-primary">
            <i className="bi bi-person"></i>
          </h2>
        </div>
        <div>
          <p className="text-dark">
            Your User balance can be shown if you click this section
          </p>
          <p className="text-dark">
            Claim your VCash now and withdraw it within hours
          </p>
        </div>
      </Card.Body>
    </Card>
  );
};

export default UserBalance;
