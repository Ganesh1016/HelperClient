import { defineConfig } from "vite";
// import path from "path";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
  },
  resolve: {
    alias: {
      // "@": path.resolve("./src"),
      "@": new URL("src", import.meta.url).pathname,
    },
  },
});
