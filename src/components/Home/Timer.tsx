import React from "react";
import Card from "react-bootstrap/Card";
import Countdown from "react-countdown";

const Timer: React.FC = () => {
  const september = 22 * 24 * 60 * 60 * 1000;

  const date = 1661753987000 + september + 19800000;
  return (
    <Card className="mb-2 text-center">
      <Card.Body>
        <p>
          Vader will be listed on 20 September on pancake swap and be available
          for trading!
        </p>
        <h1 className="text-primary">
          <Countdown date={date} />
        </h1>
      </Card.Body>
    </Card>
  );
};

export default Timer;
