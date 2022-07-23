import React from "react";
import Card from "react-bootstrap/Card";

const TelegramHome: React.FC = () => {
  return (
    <Card className="mb-2 text-center">
      <Card.Body>
        <h3 className="text-primary">
          <a className="text-primary" href="https://t.me/vadercash">
            <i className="bi bi-telegram"></i>
          </a>
        </h3>
        <p>Our official telegram channel</p>
        <p>
          Before Registering or Login on this website it’s mandatory that you
          click the telegram icon above
        </p>
      </Card.Body>
    </Card>
  );
};

export default TelegramHome;
