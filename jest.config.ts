import type { Config } from "jest";
import nextJest from "next/jest.js";

const createJestConfig = nextJest({
  dir: "./",
});

const config: Config = {
  coverageProvider: "v8",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  collectCoverageFrom: [
    "src/**/*.{ts,tsx}",
    "!src/**/*.d.ts",
    "!src/**/__tests__/**",
  ],
  coverageThreshold: {
    global: {
      statements: 40,
      branches: 75,
      functions: 50,
      lines: 40,
    },
  },
  coverageReporters: ["text", "json-summary", "lcov"],
};

export default createJestConfig(config);
