module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript",
    "google",
    "plugin:@typescript-eslint/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: ["tsconfig.json", "tsconfig.dev.json"],
    sourceType: "module",
  },
  ignorePatterns: [
    "/lib/**/*", // Ignore built files.
  ],
  plugins: ["@typescript-eslint", "import"],
  rules: {
    quotes: ["error", "double"],
    indent: "off",
    "object-curly-spacing": "off",
    "require-jsdoc": "off",
    "max-len": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "valid-jsdoc": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "operator-linebreak": "off",
    "prefer-const": "off",
    "@typescript-eslint/no-unused-vars": "off",
    curly: "off",
    "@typescript-eslint/no-inferrable-types": "off",
  },
};
