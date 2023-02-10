import client from "../index";

export const revenueApi = () => {
  return client.get("/home").then((res) => res.data);
};
