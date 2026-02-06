import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// React Compiler Configuration
// Change return value to true to enable for entire project
const ReactCompilerConfig = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  sources: (_filename: string) => {
    // Currently disabled - change to true to enable React Compiler
    return false;
  },
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [["babel-plugin-react-compiler", ReactCompilerConfig]],
      },
    }),
  ],
});
