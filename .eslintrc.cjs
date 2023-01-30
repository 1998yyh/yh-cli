module.exports = {
  "root": true,
  "extends": [
    "eslint:recommended", // eslint 推荐规则
    "plugin:@typescript-eslint/recommended" // ts 推荐规则
  ],
  "plugins": ["@typescript-eslint"],
  "env": {
    "browser": true,
    "node": true,
    "es6": true
  },
  "parserOptions": {
    "parser": "@typescript-eslint/parser",
    "ecmaVersion": 'latest',
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true
    }
  },
  "rules": {
    "@typescript-eslint/no-explicit-any": ["off"],
    "@typescript-eslint/ban-types": ["off"],
    "@typescript-eslint/no-var-requires": ["off"],
    "@typescript-eslint/no-non-null-assertion": ["off"],
    "no-useless-escape": ["off"]
  }
}