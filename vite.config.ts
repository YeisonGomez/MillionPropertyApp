import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import path from "path";

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  resolve: {
    alias: {
      "~": path.resolve(__dirname, "./app"),
    },
  },
  build: {
    outDir: "dist",
  },
  server: {
    port: 5173,
  },
  esbuild: {
    jsx: "automatic",
  },
});
