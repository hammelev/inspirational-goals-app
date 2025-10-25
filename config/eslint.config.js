import js from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier/flat";
import eslintImport from "eslint-plugin-import";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import { defineConfig } from "eslint/config";
import globals from "globals";
import tseslint from "typescript-eslint";
import { fileURLToPath } from "url";

export default defineConfig([
  {
    ignores: [
      "node_modules/",
      "dist/",
      "config/",
      "eslint.config.js",
      "prettier.config.js",
      "stylelint.config.mjs",
    ],
  },
  js.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  eslintImport.flatConfigs.typescript,
  eslintConfigPrettier,
  {
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
        tsconfigRootDir: fileURLToPath(new URL("..", import.meta.url)),
        project: [
          "./tsconfig.json",
          "./config/tsconfig.app.json",
          "./config/tsconfig.node.json",
        ],
      },
    },
    rules: {
      ...react.configs["jsx-runtime"].rules,
      ...reactHooks.configs.recommended.rules,
      ...reactRefresh.configs.vite.rules,
    },
  },
]);
