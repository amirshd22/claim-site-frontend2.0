import React from "react";
import { colors } from "../config";

const Footer: React.FC = () => {
  return (
    <footer className="text-center">
      <p style={{ color: colors.gray }}>
        All Rights Reserved &copy;2022 VaderCash.com
      </p>
    </footer>
  );
};

export default Footer;
