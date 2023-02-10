import client from "../index";

export const orderAPI = () => {
  return client.get("/orders").then((res) => res.data);
};
export const addorderAPI = (id) => {
  return client.get(`/orders/${id}`).then((res) => res.data);
};
export const Editorder = (orderId, status) => {
  return client.put("/orders", { orderId, status }).then((res) => res.data);
};
