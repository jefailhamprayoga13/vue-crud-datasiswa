import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3000", // Ganti dengan URL Fake API JSON Server yang sedang berjalan di komputer lokal Anda
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
