import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import { visualizer } from "rollup-plugin-visualizer";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),

    visualizer({
      filename: "./dist/stats.html",
      open: true,
      gzipSize: true,
      brotliSize: true,
    }),
  ],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },

  build: {
    chunkSizeWarningLimit: 800,

    rollupOptions: {
      output: {
    manualChunks(id) {
  if (id.includes("node_modules")) {
    if (id.includes("@base-ui/react")) return "ui";

    if (id.includes("framer-motion")) return "motion";

    if (id.includes("lucide-react")) return "icons";

    if (id.includes("axios")) return "axios";

    if (
      id.includes("react-router")
    )
      return "router";

    return "vendor";
  }
},
      },
    },
  },
});