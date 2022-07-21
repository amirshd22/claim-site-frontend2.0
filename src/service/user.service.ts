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
    if (status === 201 && typeof data === "object") {
      console.log(data, data.token);
      localStorage.setItem("userInfo", JSON.stringify(data.token));
      return data.token;
    }
    return {
      accepted: false,
      details: data,
    };
  } catch (error) {
    console.log(error);
  }
};

export const getProfile = async (access: string) => {
  try {
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${access}`,
      },
      validateStatus: () => true,
    };

    const { data, status } = await client.get("users/profile", config);
    if (status === 200 && typeof data === "object") {
      return data;
    }
    return {
      details: data,
      error: true,
    };
  } catch (error) {
    console.log(error);
  }
};

export const claim = async (access: string) => {
  try {
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${access}`,
      },
      validateStatus: () => true,
    };

    const { data, status } = await client.post("users/claim/", {}, config);
    if (status === 200 && typeof data === "object") {
      return data;
    }
    throw new Error(data.details);
  } catch (error) {
    alert(error);
  }
};

export const withdraw = async (access: string) => {
  try {
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${access}`,
      },
      validateStatus: () => true,
    };
    const { data, status } = await client.post("users/withdraw/", {}, config);
    if (status === 200 && typeof data === "object") {
      return data;
    }
    throw new Error(data.details);
  } catch (error) {
    alert(error);
  }
};

interface FormData {
  name: string;
  email: string;
  phone: string;
  text: string;
}

export const createForm = async (form: FormData, access: string) => {
  try {
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${access}`,
      },
      validateStatus: () => true,
    };
    const { data, status } = await client.post(
      "systems/contacts/create/",
      form,
      config
    );
    if (status === 201 && typeof data === "object") {
      alert("Your form submitted");
    }
    throw new Error(data.details);
  } catch (error) {
    alert(error);
  }
};
