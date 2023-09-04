import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:8080",
  validateStatus: false,
  headers: {
    "Content-type": "application/json",
  },
});
