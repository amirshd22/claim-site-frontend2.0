import React, { useEffect } from "react";
import FAQSection from "../components/Home/FAQSection";
import GlobalInfoSection from "../components/Home/GlobalInfoSection";
import Screen from "../components/Screen";
import { getGlobal } from "../service/global.service";
import { useLogin } from "../stores";
import { useGlobal } from "../stores/globalStore";
import LoginScreen from "./LoginScreen";
import RegisterScreen from "./RegisterScreen";
import { useParams } from "react-router-dom";
import TelegramHome from "../components/Home/TelegramHome";

const HomeScreen: React.FC = () => {
  const params = useParams();

  const setGlobal = useGlobal((state) => state.setGlobal);
  const setRef = useLogin((state) => state.setRef);

  const onLogin = useLogin((state) => state.onLogin);
  useEffect(() => {
    fetchGlobal();
  });

  if (params.id) {
    setRef(params.id);
  }

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
          <TelegramHome />
          <FAQSection />
          {onLogin ? <LoginScreen /> : <RegisterScreen />}
        </div>
      </Screen>
    </div>
  );
};

export default HomeScreen;
