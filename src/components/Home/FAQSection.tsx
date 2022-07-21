import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Accordion from "react-bootstrap/Accordion";
import Loader from "../Loader";
import { getFAQs } from "../../service/global.service";
import { useGlobal } from "../../stores/globalStore";

const FAQSection: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const faqs = useGlobal((state) => state.faqs);
  const setFAQs = useGlobal((state) => state.setFAQ);

  useEffect(() => {
    fetchFAQs();
  }, []);

  const fetchFAQs = async () => {
    try {
      setLoading(true);
      const data = await getFAQs();
      setFAQs(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  return loading ? (
    <Loader />
  ) : (
    <Card>
      <Card.Header className="bg-white text-center">
        <h1 className="text-primary">FAQ</h1>
      </Card.Header>
      <Card.Body>
        <Accordion flush>
          {faqs.map((item, index) => (
            <Accordion.Item eventKey={`${index}`} key={item.id}>
              <Accordion.Header>
                <p className="text-dark">{item.question}</p>
              </Accordion.Header>
              <Accordion.Body>
                <p className="text-dark">{item.answer}</p>
              </Accordion.Body>
            </Accordion.Item>
          ))}
        </Accordion>
      </Card.Body>
    </Card>
  );
};

export default FAQSection;
