// vite.config.js
import { fileURLToPath, URL } from "node:url";
import * as path from "path";
import { defineConfig } from "file:///C:/Users/winni/Desktop/CafeShop/node_modules/vite/dist/node/index.js";
import vue from "file:///C:/Users/winni/Desktop/CafeShop/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import vueDevTools from "file:///C:/Users/winni/Desktop/CafeShop/node_modules/vite-plugin-vue-devtools/dist/vite.mjs";
import AutoImport from "file:///C:/Users/winni/Desktop/CafeShop/node_modules/unplugin-auto-import/dist/rollup.js";
import Components from "file:///C:/Users/winni/Desktop/CafeShop/node_modules/unplugin-vue-components/dist/vite.js";
import { createSvgIconsPlugin } from "file:///C:/Users/winni/Desktop/CafeShop/node_modules/vite-plugin-svg-icons/dist/index.mjs";
var __vite_injected_original_import_meta_url = "file:///C:/Users/winni/Desktop/CafeShop/vite.config.js";
var vite_config_default = defineConfig({
  base: process.env.NODE_ENV === "production" ? "/CafeShop/" : "./",
  plugins: [
    vue(),
    AutoImport({
      imports: ["vue", "vue-router", "pinia"],
      include: [/\.[tj]sx?$/, /\.vue$/, /\.vue\?vue/, /\.md$/],
      dirs: ["src/router", "src/stores"],
      dts: "./auto-imports.d.ts"
    }),
    Components({
      extensions: ["vue"],
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
      dirs: ["src/components", "src/layout", "src/views"],
      dts: "./components.d.ts"
    }),
    createSvgIconsPlugin({
      iconDirs: [path.resolve(process.cwd(), "src/assets/icons")],
      // icon存放的目录
      symbolId: "icon-[name]",
      // symbol的id
      inject: "body-last",
      // 插入的位置
      customDomId: "__svg__icons__dom__"
      // svg的id
    })
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", __vite_injected_original_import_meta_url))
    }
  },
  css: {
    //模塊化CSS檔被編譯後，也能在瀏覽器樣式找到源頭的設置
    devSourcemap: true
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFx3aW5uaVxcXFxEZXNrdG9wXFxcXENhZmVTaG9wXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFx3aW5uaVxcXFxEZXNrdG9wXFxcXENhZmVTaG9wXFxcXHZpdGUuY29uZmlnLmpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9Vc2Vycy93aW5uaS9EZXNrdG9wL0NhZmVTaG9wL3ZpdGUuY29uZmlnLmpzXCI7aW1wb3J0IHsgZmlsZVVSTFRvUGF0aCwgVVJMIH0gZnJvbSBcIm5vZGU6dXJsXCI7XHJcbmltcG9ydCAqIGFzIHBhdGggZnJvbSBcInBhdGhcIjtcclxuaW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSBcInZpdGVcIjtcclxuaW1wb3J0IHZ1ZSBmcm9tIFwiQHZpdGVqcy9wbHVnaW4tdnVlXCI7XHJcbmltcG9ydCB2dWVEZXZUb29scyBmcm9tIFwidml0ZS1wbHVnaW4tdnVlLWRldnRvb2xzXCI7XHJcbmltcG9ydCBBdXRvSW1wb3J0IGZyb20gXCJ1bnBsdWdpbi1hdXRvLWltcG9ydC9yb2xsdXBcIjtcclxuaW1wb3J0IENvbXBvbmVudHMgZnJvbSBcInVucGx1Z2luLXZ1ZS1jb21wb25lbnRzL3ZpdGVcIjtcclxuaW1wb3J0IHsgY3JlYXRlU3ZnSWNvbnNQbHVnaW4gfSBmcm9tIFwidml0ZS1wbHVnaW4tc3ZnLWljb25zXCI7XHJcblxyXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xyXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xyXG4gIGJhc2U6IHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSBcInByb2R1Y3Rpb25cIiA/IFwiL0NhZmVTaG9wL1wiIDogXCIuL1wiLFxyXG4gIHBsdWdpbnM6IFtcclxuICAgIHZ1ZSgpLFxyXG4gICAgQXV0b0ltcG9ydCh7XHJcbiAgICAgIGltcG9ydHM6IFtcInZ1ZVwiLCBcInZ1ZS1yb3V0ZXJcIiwgXCJwaW5pYVwiXSxcclxuICAgICAgaW5jbHVkZTogWy9cXC5bdGpdc3g/JC8sIC9cXC52dWUkLywgL1xcLnZ1ZVxcP3Z1ZS8sIC9cXC5tZCQvXSxcclxuICAgICAgZGlyczogW1wic3JjL3JvdXRlclwiLCBcInNyYy9zdG9yZXNcIl0sXHJcbiAgICAgIGR0czogXCIuL2F1dG8taW1wb3J0cy5kLnRzXCIsXHJcbiAgICB9KSxcclxuICAgIENvbXBvbmVudHMoe1xyXG4gICAgICBleHRlbnNpb25zOiBbXCJ2dWVcIl0sXHJcbiAgICAgIGluY2x1ZGU6IFsvXFwudnVlJC8sIC9cXC52dWVcXD92dWUvLCAvXFwubWQkL10sXHJcbiAgICAgIGRpcnM6IFtcInNyYy9jb21wb25lbnRzXCIsIFwic3JjL2xheW91dFwiLCBcInNyYy92aWV3c1wiXSxcclxuICAgICAgZHRzOiBcIi4vY29tcG9uZW50cy5kLnRzXCIsXHJcbiAgICB9KSxcclxuICAgIGNyZWF0ZVN2Z0ljb25zUGx1Z2luKHtcclxuICAgICAgaWNvbkRpcnM6IFtwYXRoLnJlc29sdmUocHJvY2Vzcy5jd2QoKSwgXCJzcmMvYXNzZXRzL2ljb25zXCIpXSwgLy8gaWNvblx1NUI1OFx1NjUzRVx1NzY4NFx1NzZFRVx1NUY1NVxyXG4gICAgICBzeW1ib2xJZDogXCJpY29uLVtuYW1lXVwiLCAvLyBzeW1ib2xcdTc2ODRpZFxyXG4gICAgICBpbmplY3Q6IFwiYm9keS1sYXN0XCIsIC8vIFx1NjNEMlx1NTE2NVx1NzY4NFx1NEY0RFx1N0Y2RVxyXG4gICAgICBjdXN0b21Eb21JZDogXCJfX3N2Z19faWNvbnNfX2RvbV9fXCIsIC8vIHN2Z1x1NzY4NGlkXHJcbiAgICB9KSxcclxuICBdLFxyXG4gIHJlc29sdmU6IHtcclxuICAgIGFsaWFzOiB7XHJcbiAgICAgIFwiQFwiOiBmaWxlVVJMVG9QYXRoKG5ldyBVUkwoXCIuL3NyY1wiLCBpbXBvcnQubWV0YS51cmwpKSxcclxuICAgIH0sXHJcbiAgfSxcclxuICBjc3M6IHtcclxuICAgIC8vXHU2QTIxXHU1ODRBXHU1MzE2Q1NTXHU2QTk0XHU4OEFCXHU3REU4XHU4QjZGXHU1RjhDXHVGRjBDXHU0RTVGXHU4MEZEXHU1NzI4XHU3MDBGXHU4OUJEXHU1NjY4XHU2QTIzXHU1RjBGXHU2MjdFXHU1MjMwXHU2RTkwXHU5ODJEXHU3Njg0XHU4QTJEXHU3RjZFXHJcbiAgICBkZXZTb3VyY2VtYXA6IHRydWUsXHJcbiAgfSxcclxufSk7XHJcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBeVIsU0FBUyxlQUFlLFdBQVc7QUFDNVQsWUFBWSxVQUFVO0FBQ3RCLFNBQVMsb0JBQW9CO0FBQzdCLE9BQU8sU0FBUztBQUNoQixPQUFPLGlCQUFpQjtBQUN4QixPQUFPLGdCQUFnQjtBQUN2QixPQUFPLGdCQUFnQjtBQUN2QixTQUFTLDRCQUE0QjtBQVAwSSxJQUFNLDJDQUEyQztBQVVoTyxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixNQUFNLFFBQVEsSUFBSSxhQUFhLGVBQWUsZUFBZTtBQUFBLEVBQzdELFNBQVM7QUFBQSxJQUNQLElBQUk7QUFBQSxJQUNKLFdBQVc7QUFBQSxNQUNULFNBQVMsQ0FBQyxPQUFPLGNBQWMsT0FBTztBQUFBLE1BQ3RDLFNBQVMsQ0FBQyxjQUFjLFVBQVUsY0FBYyxPQUFPO0FBQUEsTUFDdkQsTUFBTSxDQUFDLGNBQWMsWUFBWTtBQUFBLE1BQ2pDLEtBQUs7QUFBQSxJQUNQLENBQUM7QUFBQSxJQUNELFdBQVc7QUFBQSxNQUNULFlBQVksQ0FBQyxLQUFLO0FBQUEsTUFDbEIsU0FBUyxDQUFDLFVBQVUsY0FBYyxPQUFPO0FBQUEsTUFDekMsTUFBTSxDQUFDLGtCQUFrQixjQUFjLFdBQVc7QUFBQSxNQUNsRCxLQUFLO0FBQUEsSUFDUCxDQUFDO0FBQUEsSUFDRCxxQkFBcUI7QUFBQSxNQUNuQixVQUFVLENBQU0sYUFBUSxRQUFRLElBQUksR0FBRyxrQkFBa0IsQ0FBQztBQUFBO0FBQUEsTUFDMUQsVUFBVTtBQUFBO0FBQUEsTUFDVixRQUFRO0FBQUE7QUFBQSxNQUNSLGFBQWE7QUFBQTtBQUFBLElBQ2YsQ0FBQztBQUFBLEVBQ0g7QUFBQSxFQUNBLFNBQVM7QUFBQSxJQUNQLE9BQU87QUFBQSxNQUNMLEtBQUssY0FBYyxJQUFJLElBQUksU0FBUyx3Q0FBZSxDQUFDO0FBQUEsSUFDdEQ7QUFBQSxFQUNGO0FBQUEsRUFDQSxLQUFLO0FBQUE7QUFBQSxJQUVILGNBQWM7QUFBQSxFQUNoQjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
