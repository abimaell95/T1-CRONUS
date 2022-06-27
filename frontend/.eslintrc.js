module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    // camelcase: ['error', { ignoreDestructuring: true, properties: 'never' }],
    camelcase: 'off',
    'react/no-array-index-key': 'off',
    'import/prefer-default-export': 'off',
    'react/forbid-prop-types': 'off',
    'linebreak-style': 'off',
  },
};
