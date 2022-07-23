import React, { useEffect } from "react";
import FAQSection from "../components/Home/FAQSection";
import GlobalInfoSection from "../components/Home/GlobalInfoSection";
import Screen from "../components/Screen";
import { getGlobal } from "../service/global.service";
import { useLogin } from "../stores";
import { useGlobal } from "../stores/globalStore";
import LoginScreen from "./LoginScreen";
import RegisterScreen from "./RegisterScreen";
const HomeScreen: React.FC = () => {
  const setGlobal = useGlobal((state) => state.setGlobal);
  const onLogin = useLogin((state) => state.onLogin);
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
        <img
          src="https://api.vadercash.com/images/Vader.png"
          style={{ width: "100%" }}
          alt="banner"
        />
      </div>
      <Screen>
        <div className="mt-5">
          <GlobalInfoSection />
          <FAQSection />
          {onLogin ? <LoginScreen /> : <RegisterScreen />}
        </div>
      </Screen>
    </div>
  );
};

export default HomeScreen;
