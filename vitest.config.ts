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
        functions: 100,
        statements: 100,
        branches: 80,
        lines: 100,
      }
    },
    testTimeout: 10000,
    hookTimeout: 10000
  }
})