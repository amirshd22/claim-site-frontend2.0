import { client } from "../config";

export const getFAQs = async () => {
  try {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
      validateStatus: () => true,
    };
    const { data, status } = await client.get("systems/faqs/", config);
    if (status === 200 && typeof data === "object") {
      return data;
    }
    throw new Error(data.details);
  } catch (error) {
    console.log(error);
  }
};

export const getGlobal = async () => {
  try {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
      validateStatus: () => true,
    };
    const { data, status } = await client.get("systems/global/", config);
    if (status === 200) {
      return data;
    }
    throw new Error(data.details);
  } catch (error) {
    alert(error);
  }
};
