import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// ============================================
// React Compiler Configuration (React 19+)
// ============================================
// Toggle between true/false to test React Compiler behavior
// See sections/react-compiler.md for detailed explanation and exercises
//
// false = Disabled (manual optimizations needed)
// true  = Enabled (automatic memoization applied)
const ReactCompilerConfig = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  sources: (_filename: string) => {
    return false; // ← Change to true to enable React Compiler
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
