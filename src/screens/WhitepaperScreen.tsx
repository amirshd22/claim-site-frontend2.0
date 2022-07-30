import React, { useEffect } from "react";
import Card from "react-bootstrap/Card";
import Screen from "../components/Screen";
import Button from "react-bootstrap/Button";
import { saveAs } from "file-saver";

const WhitepaperScreen: React.FC = () => {
  const downloadFile = () => {
    saveAs("https://api.vadercash.com/images/Whitepaper.pdf", "whitepaper.pdf");
  };

  useEffect(() => {
    downloadFile();
  });
  return (
    <Screen>
      <Card className="mt-5 ">
        <Card.Header className="bg-white">
          <h3 className="text-dark">Downloading Whitepaper...</h3>
        </Card.Header>
        <Card.Body className="text-center">
          <h4 className="text-dark">
            The download should begin very soon, if not?
          </h4>
          <Button
            variant="primary"
            onClick={downloadFile}
            className="text-light w-100 mt-3"
          >
            Download Now
          </Button>
        </Card.Body>
      </Card>
    </Screen>
  );
};

export default WhitepaperScreen;
