import client from "../index";

export const productAPI = (
  name,
  price,
  image,
  description,
  quantity,
  categoryId,
  amount
) => {
  return client
    .post("/products", {
      name,
      price,
      image,
      description,
      quantity,
      categoryId,
      amount,
    })
    .then((res) => res.data);
};
export const getProductApi = () => {
  return client.get("/products").then((res) => res.data);
};
export const deleteProductApi = (id) => {
  return client.delete(`/products/${id}`).then((res) => res.data);
};
export const editproductApi = (
  id,
  name,
  price,
  image,
  description,
  amount,
  quantity
) => {
  return client
    .put("/products", { id, name, price, image, description, amount, quantity })
    .then((res) => res.data);
};
