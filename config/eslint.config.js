import js from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier/flat";
import eslintImport from "eslint-plugin-import";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import { defineConfig } from "eslint/config";
import globals from "globals";
import tseslint from "typescript-eslint";

export default defineConfig([
  {
    ignores: ["node_modules/", "dist/", ".netlify"],
  },

  js.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  eslintImport.flatConfigs.typescript,
  // Node.js environment config (serverless functions, shared code, vite config, config files)
  {
    files: [
      "netlify/**/*.{ts,mts}",
      "shared/**/*.ts",
      "config/**/*.{ts,js,mjs}",
      "vite.config.ts",
    ],
    languageOptions: {
      globals: globals.node,
      parserOptions: {
        tsconfigRootDir: import.meta.dirname,
        project: ["./tsconfig.node.json"],
      },
    },
  },

  // React application config
  {
    files: ["src/**/*.{ts,tsx}"],
    plugins: {
      react,
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    settings: {
      react: {
        version: "detect",
      },
    },
    languageOptions: {
      globals: globals.browser,
      parserOptions: {
        tsconfigRootDir: import.meta.dirname,
        project: ["./tsconfig.app.json"],
      },
    },
    rules: {
      ...react.configs["jsx-runtime"].rules,
      ...reactHooks.configs.recommended.rules,
      ...reactRefresh.configs.vite.rules,
    },
  },
  {
    // disable type-aware linting on JS files
    files: ["**/*.js", "**/*.mjs"],
    extends: [tseslint.configs.disableTypeChecked],
  },
  eslintConfigPrettier,
]);
