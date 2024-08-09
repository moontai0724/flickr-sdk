/* eslint-disable import/no-extraneous-dependencies */
import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    coverage: {
      enabled: true,
      include: ["src/**/*.ts"],
      reportOnFailure: false,
      reporter: ["text", "text-summary", "json", "html", "cobertura"],
      exclude: ["**/index.ts"],
    },
    bail: 1,
    fileParallelism: false,
    poolOptions: {
      threads: {
        singleThread: true,
      },
    },
    retry: 3,
    outputFile: {
      junit: "./coverage/junit-report.xml",
    },
    passWithNoTests: true,
    reporters: ["default", "junit"],
    typecheck: {
      checker: "tsc",
      tsconfig: "./src/tsconfig.json",
    },
  },
});
