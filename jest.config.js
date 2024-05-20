module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFilesAfterEnv: ['./src/config/test.ts'],
  testTimeout: 10000,
};
