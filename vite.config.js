import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  base: "/Extension_manager/",
  plugins: [tailwindcss()],
});
