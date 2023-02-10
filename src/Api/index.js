import axios from "axios";

const client = axios.create({
  baseURL: "https://hhl-shop-be.herokuapp.com/api",
  timeout: 100000,
});

client.interceptors.request.use(
  async (config) => {
    if (config.method === "get") {
      const currentTime = new Date().getTime();
      const oldUrl = config.url;
      let newUrl = config.url;
      if (oldUrl.includes("?")) {
        newUrl = `${oldUrl}&time=${currentTime}`;
      } else {
        newUrl = `${oldUrl}?time=${currentTime}`;
      }
      config.url = newUrl;
    }
    const accessToken = localStorage.getItem("accessToken");
    const cloneConfig = { ...config };
    if (accessToken) {
      cloneConfig.headers["Authorization"] = `bearer ${accessToken}`;
    }

    return cloneConfig;
  },
  (error) => Promise.reject(error)
);

client.interceptors.response.use(
  (response) => response,
  (error) => responseErrorHandler(error)
);

const responseErrorHandler = async (error) => {
  if (error.response.status === 401) {
    localStorage.clear();
    window.location.href = "/sign-in";
  }
  return Promise.reject(error.response.data);
};

export default client;
