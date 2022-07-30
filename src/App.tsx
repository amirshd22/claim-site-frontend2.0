import React, { useEffect } from "react";
import { useLogin } from "./stores";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import HomeScreen from "./screens/HomeScreen";
import ProfileScreen from "./screens/ProfileScreen";
import ContactUsScreen from "./screens/ContactUsScreen";
import Footer from "./components/Footer";
import WhitepaperScreen from "./screens/WhitepaperScreen";
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
            <Route path="/referral/:id" element={<HomeScreen />} />
            <Route path="/profile" element={<ProfileScreen />} />
            <Route path="/contact-us" element={<ContactUsScreen />} />
            <Route path="/whitepaper" element={<WhitepaperScreen />} />
          </Routes>
        </main>
        <Footer />
      </Router>
    </div>
  );
};

export default App;
