import { defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
    globals: true,
    environment: 'node',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: ['**/node_modules/**', '**/dist/**', '**/tests/**'],
      thresholds: {
        functions: 80,
        statements: 80,
        branches: 80,
        lines: 80,
      },
      watermarks: {
        functions: [60, 70],
        statements: [60, 70],
        branches: [60, 70],
        lines: [60, 70],
      }
    },
    testTimeout: 10000,
    hookTimeout: 10000
  }
})