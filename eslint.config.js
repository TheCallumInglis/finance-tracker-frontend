import eslintPluginReact from "eslint-plugin-react";
import eslintPluginPrettier from "eslint-plugin-prettier";
import typescriptEslint from "@typescript-eslint/eslint-plugin";
import typescriptParser from "@typescript-eslint/parser";

export default [
    {
        files: ["src/**/*.ts", "src/**/*.tsx"],
        languageOptions: {
            parser: typescriptParser,
            sourceType: "module",
        },
        plugins: {
            prettier: eslintPluginPrettier,
            react: eslintPluginReact,
            "@typescript-eslint": typescriptEslint,
        },
        rules: {
            "prettier/prettier": "error",
            "react/react-in-jsx-scope": "off",
            "react/jsx-uses-react": "off",
            "react/jsx-uses-vars": "warn",
            "@typescript-eslint/no-unused-vars": ["warn"],
            "@typescript-eslint/no-unused-imports": ["error"],
        },
        settings: {
            react: {
                version: "detect",
            },
        },
    },
];