module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.ts$": "ts-jest",
  },
  testMatch: ["**/src/utils/*.spec.ts"],
  moduleFileExtensions: ["ts", "js"],
};