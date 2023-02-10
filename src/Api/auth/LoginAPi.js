import client from "../index";

export const loginAPI = (username, password) => {
  return client
    .post("/auth/login_admin", { username, password })
    .then((res) => res.data);
};
export const GetUserApi = () => {
  return client.get("/users").then((res) => res.data);
};
export const addUserApi = (username, email, password, phoneNumber) => {
  return client
    .post("/auth/register", { username, email, password, phoneNumber })
    .then((res) => res.data);
};
export const putUserApi = (id, username, email, phoneNumber) => {
  return client
    .put("/users", { id, username, email, phoneNumber })
    .then((res) => res.data);
};
export const DeleteUserAPI = (id) => {
  return client.delete(`/users/${id}`).then((res) => res.data);
};
