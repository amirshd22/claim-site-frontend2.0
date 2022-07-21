import React from "react";
import FAQSection from "../components/Home/FAQSection";
import Screen from "../components/Screen";

const HomeScreen: React.FC = () => {
  return (
    <div>
      <div>
        <img src="./446984.webp" style={{ width: "100%" }} alt="banner" />
      </div>
      <Screen>
        <div className="mt-5">
          <FAQSection />
        </div>
      </Screen>
    </div>
  );
};

export default HomeScreen;
