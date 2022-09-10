import { boot } from "quasar/wrappers";
import axios from "axios";

// const api = axios.create({ baseURL: "http://localhost:3010" });
const api = axios.create({ baseURL: "http://103.230.48.151:3010" });

export default boot(({ app }) => {
  app.config.globalProperties.$axios = api;
});

export { api };
