import js from "@eslint/js";
import tseslint from "typescript-eslint";

export default tseslint.config(
  js.configs.recommended,

  {
    files: ["**/*.ts", "**/*.tsx"],
    extends: [...tseslint.configs.recommended],
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],
      "@typescript-eslint/no-explicit-any": "warn",
      "prefer-const": "error",
      eqeqeq: ["error", "always"],
    },
  },

  // Build scripts run in node. Listed by hand rather than pulling in the
  // globals package for the few names these scripts actually use.
  {
    files: ["scripts/**/*.mjs"],
    languageOptions: {
      globals: { console: "readonly", process: "readonly", URL: "readonly" },
    },
  },

  {
    ignores: [".next/", "node_modules/", "eslint.config.mjs"],
  }
);
