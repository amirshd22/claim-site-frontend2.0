import React, { useEffect } from "react";
import FAQSection from "../components/Home/FAQSection";
import GlobalInfoSection from "../components/Home/GlobalInfoSection";
import Screen from "../components/Screen";
import { getGlobal } from "../service/global.service";
import { useGlobal } from "../stores/globalStore";

const HomeScreen: React.FC = () => {
  const setGlobal = useGlobal((state) => state.setGlobal);
  useEffect(() => {
    fetchGlobal();
  });

  const fetchGlobal = async () => {
    try {
      const data = await getGlobal();
      setGlobal(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div>
        <img src="./vader.png" style={{ width: "100%" }} alt="banner" />
      </div>
      <Screen>
        <div className="mt-5">
          <GlobalInfoSection />
          <FAQSection />
        </div>
      </Screen>
    </div>
  );
};

export default HomeScreen;
