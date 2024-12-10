/**
 * @type {import('eslint').Linter.Config<import('eslint/rules/index').ESLintRules>}
 */
module.exports = {
  extends: ["next/core-web-vitals", "next/typescript", "plugin:prettier/recommended"],
  plugins: ["unused-imports"],
  rules: {
    "prettier/prettier": "warn",

    "array-callback-return": "warn", // enforce return on Array.map() and etc.
    "no-constant-binary-expression": "warn", // a + b ?? c

    "@typescript-eslint/no-unused-vars": "off", // handled by "unused-imports" plugin
    "unused-imports/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
    "unused-imports/no-unused-imports": "warn",

    "no-empty": "off", // annoying when writing new code
    "react-hooks/exhaustive-deps": "off", // the amount of extra dependencies is excessive
    "@next/next/no-img-element": "off", // not useful at the moment
    "@typescript-eslint/method-signature-style": ["warn", "property"],
    "@typescript-eslint/array-type": "warn", // prefer T[] over Array<T>
  },
};
