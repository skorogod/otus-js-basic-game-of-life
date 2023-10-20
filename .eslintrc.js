module.exports = {
  env: {
    browser: true,
    es2021: true,
    "jest/globals": true,
  },
  extends: [
    'airbnb-base',
    'eslint-config-prettier',
    "plugin:jest/recommended", 
    "plugin:@typescript-eslint/recommended",
    'prettier'
  ],
  parser: "@typescript-eslint/parser",
  plugins: ['jest', '@typescript-eslint'],
  rules: {
    "import/prefer-default-export": "off",
    "jest/valid-title": "off",
    "no-console": "off",
    "no-alert": "off",
    "no-restricted-globals": "off",
    "no-plusplus": "off",
    "import/no-unresolved": "off", // https://github.com/typescript-eslint/typescript-eslint/issues/1624
    "import/extensions": ["warn", "never"] // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/extensions.md
  }
};
