import React from "react";
import Lottie from "react-lottie";
import data from "../lotties/loader.json";

const Loader: React.FC = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: data,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return <Lottie options={defaultOptions} width={300} />;
};

export default Loader;
