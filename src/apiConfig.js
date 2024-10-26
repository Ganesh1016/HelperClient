const isProduction = import.meta.env.MODE === "production";

export const API_BASE_URL = isProduction
  ? "https://helper-node.onrender.com/api"
  : "http://localhost:3000/api";
