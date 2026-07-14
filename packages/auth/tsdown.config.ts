import { defineConfig } from "tsdown"

export default defineConfig({
  entry: "lib/*.ts",
  dts: {
    sourcemap: true,
  },
  format: ["esm", "cjs"],
  clean: true,
})
