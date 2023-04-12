import axios from "axios";

export const endpoints = {
  user: "/user",
  chat: "/chat",
  chatGroup: "/chat/group",
  message: "/message",
};

export default axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL + "/api",
});
