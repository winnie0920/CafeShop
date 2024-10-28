import { fileURLToPath, URL } from "node:url";
import * as path from "path";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueDevTools from "vite-plugin-vue-devtools";
import AutoImport from "unplugin-auto-import/rollup";
import Components from "unplugin-vue-components/vite";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";

// https://vitejs.dev/config/
export default defineConfig({
  base: process.env.NODE_ENV === "production" ? "/CafeShop/" : "./",
  plugins: [
    vue(),
    vueDevTools(),
    AutoImport({
      imports: ["vue", "vue-router", "pinia"],
      include: [/\.[tj]sx?$/, /\.vue$/, /\.vue\?vue/, /\.md$/],
      dirs: ["src/router", "src/stores"],
      dts: "./auto-imports.d.ts",
    }),
    Components({
      extensions: ["vue"],
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
      dirs: ["src/components", "src/layout", "src/views"],
      dts: "./components.d.ts",
    }),
    createSvgIconsPlugin({
      iconDirs: [path.resolve(process.cwd(), "src/assets/icons")], // icon存放的目录
      symbolId: "icon-[name]", // symbol的id
      inject: "body-last", // 插入的位置
      customDomId: "__svg__icons__dom__", // svg的id
    }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  css: {
    //模塊化CSS檔被編譯後，也能在瀏覽器樣式找到源頭的設置
    devSourcemap: true,
  },
});
