import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import pluginPrettier from "eslint-plugin-prettier";
import configPrettier from "eslint-config-prettier";
import globals from "globals";
import js from "@eslint/js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
});

export default [
  {
    ignores: [
      "src/components/ui/",
    ],
  },
  
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  
  js.configs.recommended,
  tseslint.configs.recommended,
  
  pluginReact.configs.recommended,
  {
    settings: {
      react: {
        version: "detect",
      },
    },
  },
  
  configPrettier, // Prettier와 충돌하는 규칙 비활성화
  {
    plugins: {
      prettier: pluginPrettier, // prettier 플러그인 활성화
    },
    rules: {
      "prettier/prettier": "error",
    },
  },

  {
    languageOptions: {
      globals: {
        ...globals.browser,
      },
    },
  },
];