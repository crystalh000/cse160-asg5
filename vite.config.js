// vite.config.js
import { nodeResolve } from '@rollup/plugin-node-resolve';

export default {
  publicDir: "src",
  base: "/cse160-asg5/",
  build: {
    rollupOptions: {
      plugins: [nodeResolve({ browser: true })],
    },
  },
  optimizeDeps: {
    include: ["three"]
  }
};