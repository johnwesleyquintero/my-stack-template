import nextJest from "next/jest.js";

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: "./",
});

// Add any custom config to be passed to Jest
/** @type {import('jest').Config} */
const config = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  testEnvironment: "jest-environment-jsdom",
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1",
  },
  collectCoverage: true,
  collectCoverageFrom: [
    "app/**/*.{js,jsx,ts,tsx}",
    "!app/**/*.d.ts",
    "!app/**/layout.{js,jsx,ts,tsx}",
    "!app/**/page.{js,jsx,ts,tsx}",
    "!app/api/**",
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
};

config.testPathIgnorePatterns = ["<rootDir>/e2e", "<rootDir>/__tests__/setup.ts"];
config.modulePathIgnorePatterns = ["<rootDir>/__tests__/setup.ts"];

export default createJestConfig(config);
