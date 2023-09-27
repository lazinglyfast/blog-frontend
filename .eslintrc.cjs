module.exports = {
  rules: {
  },
}
module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    "jest/globals": true,
  },
  extends: [
    "airbnb",
    // 'eslint:recommended',
    // 'plugin:react/recommended',
    // 'plugin:react/jsx-runtime',
    // 'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  overrides: [
    {
      env: {
        node: true,
      },
      files: [
        ".eslintrc.{js,cjs}",
      ],
      parserOptions: {
        sourceType: "script",
      },
    },
  ],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  settings: { react: { version: '18.2' } },
  plugins: ['react-refresh', "jest"],
  rules: {
    // "react/prop-types": "off",
    semi: ["error", "never"],
    quotes: ["error", "double"],
    // "func-style": ["error", "declaration", { allowArrowFunctions: true }],
    "react/function-component-definition": ["error", {
      namedComponents: "arrow-function",
      unnamedComponents: "arrow-function",
    }],
    indent: ["error", 2],
    "linebreak-style": ["error", "unix"],
    eqeqeq: "error",
    "no-trailing-spaces": "error",
    "object-curly-spacing": ["error", "always"],
    "arrow-spacing": ["error", { "before": true, "after": true }],
    "react/react-in-jsx-scope": "off",
    'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
  },
}
