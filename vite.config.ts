import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        entryFileNames: "assets/[name].js", // JavaScript entry file
        chunkFileNames: "assets/[name].js", // Other JS chunks
        assetFileNames: "assets/[name][extname]", // CSS and other assets
      },
    },
  },
});
