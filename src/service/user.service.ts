import { client } from "../config";

export const login = async (username: string, password: string) => {
  try {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
      validateStatus: () => true,
    };
    const { data, status } = await client.post(
      "users/login/",
      { username, password },
      config
    );

    if (status === 200 && typeof data === "object") {
      localStorage.setItem("userInfo", JSON.stringify(data.access));
      return data.access;
    }
    return false;
  } catch (error: any) {
    console.log(error);
  }
};

export const logout = () => {
  try {
    localStorage.removeItem("userInfo");
  } catch (error) {
    console.log(error);
  }
};

interface REGISTER_USER {
  username: string;
  password: string;
  wallet_address: string;
  telegram_id: string;
  referral: string;
}

export const register = async (user: REGISTER_USER) => {
  try {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
      validateStatus: () => true,
    };

    const { data, status } = await client.post("users/register/", user, config);
    if (status === 200 && typeof data === "object") {
      localStorage.setItem("userInfo", JSON.stringify(data.access));
      return data.access;
    }
    return false;
  } catch (error) {
    console.log(error);
  }
};
