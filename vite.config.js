import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  //base: "http://129.200.6.52/petty-cash",
  plugins: [react()],
  // resolve: {
  //   alias: [{ find: "@", replacement: "/src" }],
  // },
});
