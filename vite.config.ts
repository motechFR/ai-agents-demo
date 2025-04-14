import { vitePlugin as remix } from "@remix-run/dev";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import {plugin as mdPlugin, Mode} from 'vite-plugin-markdown';


export default defineConfig({
  plugins: [
    remix({
      ignoredRouteFiles: ["**/*.css"],
    }),
    tsconfigPaths(),
    mdPlugin({
      mode: [Mode.MARKDOWN],
    }),
  ],
});
