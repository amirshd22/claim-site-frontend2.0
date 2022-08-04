import React from "react";
import { colors } from "../config";
import { logout } from "../service";
import { useLogin } from "../stores";

const Footer: React.FC = () => {
  const isLoggedIn = useLogin((state) => state.isLoggedIn);
  const logUserOut = () => {
    try {
      logout();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <footer className="text-center">
      <p style={{ color: colors.gray }}>
        All Rights Reserved &copy;2022 VaderCash.com{" "}
        {isLoggedIn && <span onClick={logUserOut}>Logout</span>}
      </p>
    </footer>
  );
};

export default Footer;
