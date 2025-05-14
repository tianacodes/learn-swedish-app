// eslint-disable-next-line @typescript-eslint/no-require-imports
const nextJest = require("next/jest");

// Provide the path to your Next.js app to load next.config.js and .env files in your test environment
const createJestConfig = nextJest({
  dir: "./",
});

// Add any custom config to be passed to Jest
/** @type {import('jest').Config} */
const customJestConfig = {
  // Add more setup options before each test is run
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"], // or .ts

  // if using TypeScript with a baseUrl set to the root directory then you need the below for alias' to work
  moduleDirectories: ["node_modules", "<rootDir>/"],

  testEnvironment: "jest-environment-jsdom",

  // Handle module aliases (if you have them in your tsconfig.json)
  // This should match your tsconfig.json "paths"
  moduleNameMapper: {
    "^@/components/(.*)$": "<rootDir>/components/$1",
    "^@/pages/(.*)$": "<rootDir>/pages/$1",
    // Add other aliases here if you have them
    // e.g. '^@/lib/(.*)$': '<rootDir>/lib/$1',

    // Handle CSS imports (if you're not using CSS Modules yet)
    // '\\.(css|less|scss|sass)$': 'identity-obj-proxy', // If you need to test CSS Modules

    // Handle image imports
    // https://jestjs.io/docs/webpack#handling-static-assets
    // '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
    //   '<rootDir>/__mocks__/fileMock.js', // You'd create this mock file
  },
  collectCoverageFrom: [
    "**/*.{js,jsx,ts,tsx}", // All JS/TS files
    // --- EXCLUDE DEFINITION AND TYPE-ONLY FILES ---
    "!**/*.d.ts", // Exclude all TypeScript definition files (e.g., next-env.d.ts)
    "!**/*types.ts", // Exclude any file ending with types.ts (e.g., src/types.ts, components/Button/types.ts)
    "!**/*interfaces.ts", // Exclude any file ending with interfaces.ts
    "!**/*enums.ts",
    // --- EXCLUDE VENDOR/GENERATED/CONFIGS ---
    "!**/node_modules/**",
    "!<rootDir>/out/**",
    "!<rootDir>/.next/**",
    "!<rootDir>/coverage/**",
    "!<rootDir>/jest.setup.{js,jsx,ts,tsx}",
    "!<rootDir>/jest.config.{js,jsx,ts,tsx}",
    "!<rootDir>/next.config.{js,jsx,ts,mjs}",
    "!<rootDir>/postcss.config.js",
    "!<rootDir>/tailwind.config.js",
    "!<rootDir>/prisma/**",
    "!<rootDir>/src/generated/**", // Assuming this contains primarily generated types/clients
    "!<rootDir>/src/db/**", // If this is also primarily setup/generated types
    // --- EXCLUDE REDUNDANT FILES ---
    "!<rootDir>/src/**/*redundant.ts",
  ],

  coverageThreshold: {
    global: {
      // Thresholds for all files combined
      branches: 80, // e.g., 80% of branches must be covered
      functions: 80,
      lines: 80,
      statements: -10, // e.g., allow statements to be 10% less than 80% (so 70%) - useful if statements are high but other metrics are more important
      // Or just set a positive number like 80
    },
    // You can also set thresholds for specific files or glob patterns:
    // "./components/critical-component/": {
    //   branches: 90,
    //   statements: 90,
    // },
  },
  // Next.js's `next/jest` plugin takes care of transforming .ts/.tsx files.
  // You don't typically need to specify `transform` here if using `next/jest`.
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig);
