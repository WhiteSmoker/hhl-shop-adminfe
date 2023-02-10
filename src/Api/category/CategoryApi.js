import client from "../index";

export const categoryAPI = (name, description) => {
  return client
    .post("/categories", { name, description })
    .then((res) => res.data);
};
export const getcategoryAPI = () => {
  return client.get("/categories").then((res) => res.data);
};
export const getcategoryAPIId = (id) => {
  return client.get(`/categories/:id`).then((res) => res.data);
};
export const putgetcategoryAPI = (name, description, categoryId) => {
  return client
    .put("/categories", { name, description, categoryId })
    .then((res) => res.data);
};
export const DeletegetcategoryAPI = (id) => {
  return client.delete(`/categories/${id}`).then((res) => res.data);
};
