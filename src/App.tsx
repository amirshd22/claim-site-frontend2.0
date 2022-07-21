import React, { useEffect } from "react";
import { useLogin } from "./stores";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen";
import ContactUsScreen from "./screens/ContactUsScreen";
const App: React.FC = () => {
  const setAccess = useLogin((state) => state.setAccess);
  const setIsLogIn = useLogin((state) => state.setIsLogIn);
  useEffect(() => {
    try {
      const userInfo = localStorage.getItem("userInfo");
      if (userInfo) {
        setAccess(JSON.parse(userInfo));
        setIsLogIn(true);
      }
    } catch (error) {
      console.log(error);
    }
  });
  return (
    <div className="App">
      <Router>
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/register" element={<RegisterScreen />} />
            <Route path="/profile" element={<ProfileScreen />} />
            <Route path="/contact-us" element={<ContactUsScreen />} />
          </Routes>
        </main>
      </Router>
    </div>
  );
};

export default App;
