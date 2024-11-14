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
    vueDevTools(),
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFx3aW5uaVxcXFxEZXNrdG9wXFxcXENhZmVTaG9wXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFx3aW5uaVxcXFxEZXNrdG9wXFxcXENhZmVTaG9wXFxcXHZpdGUuY29uZmlnLmpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9Vc2Vycy93aW5uaS9EZXNrdG9wL0NhZmVTaG9wL3ZpdGUuY29uZmlnLmpzXCI7aW1wb3J0IHsgZmlsZVVSTFRvUGF0aCwgVVJMIH0gZnJvbSBcIm5vZGU6dXJsXCI7XHJcbmltcG9ydCAqIGFzIHBhdGggZnJvbSBcInBhdGhcIjtcclxuaW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSBcInZpdGVcIjtcclxuaW1wb3J0IHZ1ZSBmcm9tIFwiQHZpdGVqcy9wbHVnaW4tdnVlXCI7XHJcbmltcG9ydCB2dWVEZXZUb29scyBmcm9tIFwidml0ZS1wbHVnaW4tdnVlLWRldnRvb2xzXCI7XHJcbmltcG9ydCBBdXRvSW1wb3J0IGZyb20gXCJ1bnBsdWdpbi1hdXRvLWltcG9ydC9yb2xsdXBcIjtcclxuaW1wb3J0IENvbXBvbmVudHMgZnJvbSBcInVucGx1Z2luLXZ1ZS1jb21wb25lbnRzL3ZpdGVcIjtcclxuaW1wb3J0IHsgY3JlYXRlU3ZnSWNvbnNQbHVnaW4gfSBmcm9tIFwidml0ZS1wbHVnaW4tc3ZnLWljb25zXCI7XHJcblxyXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xyXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xyXG4gIGJhc2U6IHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSBcInByb2R1Y3Rpb25cIiA/IFwiL0NhZmVTaG9wL1wiIDogXCIuL1wiLFxyXG4gIHBsdWdpbnM6IFtcclxuICAgIHZ1ZSgpLFxyXG4gICAgdnVlRGV2VG9vbHMoKSxcclxuICAgIEF1dG9JbXBvcnQoe1xyXG4gICAgICBpbXBvcnRzOiBbXCJ2dWVcIiwgXCJ2dWUtcm91dGVyXCIsIFwicGluaWFcIl0sXHJcbiAgICAgIGluY2x1ZGU6IFsvXFwuW3RqXXN4PyQvLCAvXFwudnVlJC8sIC9cXC52dWVcXD92dWUvLCAvXFwubWQkL10sXHJcbiAgICAgIGRpcnM6IFtcInNyYy9yb3V0ZXJcIiwgXCJzcmMvc3RvcmVzXCJdLFxyXG4gICAgICBkdHM6IFwiLi9hdXRvLWltcG9ydHMuZC50c1wiLFxyXG4gICAgfSksXHJcbiAgICBDb21wb25lbnRzKHtcclxuICAgICAgZXh0ZW5zaW9uczogW1widnVlXCJdLFxyXG4gICAgICBpbmNsdWRlOiBbL1xcLnZ1ZSQvLCAvXFwudnVlXFw/dnVlLywgL1xcLm1kJC9dLFxyXG4gICAgICBkaXJzOiBbXCJzcmMvY29tcG9uZW50c1wiLCBcInNyYy9sYXlvdXRcIiwgXCJzcmMvdmlld3NcIl0sXHJcbiAgICAgIGR0czogXCIuL2NvbXBvbmVudHMuZC50c1wiLFxyXG4gICAgfSksXHJcbiAgICBjcmVhdGVTdmdJY29uc1BsdWdpbih7XHJcbiAgICAgIGljb25EaXJzOiBbcGF0aC5yZXNvbHZlKHByb2Nlc3MuY3dkKCksIFwic3JjL2Fzc2V0cy9pY29uc1wiKV0sIC8vIGljb25cdTVCNThcdTY1M0VcdTc2ODRcdTc2RUVcdTVGNTVcclxuICAgICAgc3ltYm9sSWQ6IFwiaWNvbi1bbmFtZV1cIiwgLy8gc3ltYm9sXHU3Njg0aWRcclxuICAgICAgaW5qZWN0OiBcImJvZHktbGFzdFwiLCAvLyBcdTYzRDJcdTUxNjVcdTc2ODRcdTRGNERcdTdGNkVcclxuICAgICAgY3VzdG9tRG9tSWQ6IFwiX19zdmdfX2ljb25zX19kb21fX1wiLCAvLyBzdmdcdTc2ODRpZFxyXG4gICAgfSksXHJcbiAgXSxcclxuICByZXNvbHZlOiB7XHJcbiAgICBhbGlhczoge1xyXG4gICAgICBcIkBcIjogZmlsZVVSTFRvUGF0aChuZXcgVVJMKFwiLi9zcmNcIiwgaW1wb3J0Lm1ldGEudXJsKSksXHJcbiAgICB9LFxyXG4gIH0sXHJcbiAgY3NzOiB7XHJcbiAgICAvL1x1NkEyMVx1NTg0QVx1NTMxNkNTU1x1NkE5NFx1ODhBQlx1N0RFOFx1OEI2Rlx1NUY4Q1x1RkYwQ1x1NEU1Rlx1ODBGRFx1NTcyOFx1NzAwRlx1ODlCRFx1NTY2OFx1NkEyM1x1NUYwRlx1NjI3RVx1NTIzMFx1NkU5MFx1OTgyRFx1NzY4NFx1OEEyRFx1N0Y2RVxyXG4gICAgZGV2U291cmNlbWFwOiB0cnVlLFxyXG4gIH0sXHJcbn0pO1xyXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQXlSLFNBQVMsZUFBZSxXQUFXO0FBQzVULFlBQVksVUFBVTtBQUN0QixTQUFTLG9CQUFvQjtBQUM3QixPQUFPLFNBQVM7QUFDaEIsT0FBTyxpQkFBaUI7QUFDeEIsT0FBTyxnQkFBZ0I7QUFDdkIsT0FBTyxnQkFBZ0I7QUFDdkIsU0FBUyw0QkFBNEI7QUFQMEksSUFBTSwyQ0FBMkM7QUFVaE8sSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsTUFBTSxRQUFRLElBQUksYUFBYSxlQUFlLGVBQWU7QUFBQSxFQUM3RCxTQUFTO0FBQUEsSUFDUCxJQUFJO0FBQUEsSUFDSixZQUFZO0FBQUEsSUFDWixXQUFXO0FBQUEsTUFDVCxTQUFTLENBQUMsT0FBTyxjQUFjLE9BQU87QUFBQSxNQUN0QyxTQUFTLENBQUMsY0FBYyxVQUFVLGNBQWMsT0FBTztBQUFBLE1BQ3ZELE1BQU0sQ0FBQyxjQUFjLFlBQVk7QUFBQSxNQUNqQyxLQUFLO0FBQUEsSUFDUCxDQUFDO0FBQUEsSUFDRCxXQUFXO0FBQUEsTUFDVCxZQUFZLENBQUMsS0FBSztBQUFBLE1BQ2xCLFNBQVMsQ0FBQyxVQUFVLGNBQWMsT0FBTztBQUFBLE1BQ3pDLE1BQU0sQ0FBQyxrQkFBa0IsY0FBYyxXQUFXO0FBQUEsTUFDbEQsS0FBSztBQUFBLElBQ1AsQ0FBQztBQUFBLElBQ0QscUJBQXFCO0FBQUEsTUFDbkIsVUFBVSxDQUFNLGFBQVEsUUFBUSxJQUFJLEdBQUcsa0JBQWtCLENBQUM7QUFBQTtBQUFBLE1BQzFELFVBQVU7QUFBQTtBQUFBLE1BQ1YsUUFBUTtBQUFBO0FBQUEsTUFDUixhQUFhO0FBQUE7QUFBQSxJQUNmLENBQUM7QUFBQSxFQUNIO0FBQUEsRUFDQSxTQUFTO0FBQUEsSUFDUCxPQUFPO0FBQUEsTUFDTCxLQUFLLGNBQWMsSUFBSSxJQUFJLFNBQVMsd0NBQWUsQ0FBQztBQUFBLElBQ3REO0FBQUEsRUFDRjtBQUFBLEVBQ0EsS0FBSztBQUFBO0FBQUEsSUFFSCxjQUFjO0FBQUEsRUFDaEI7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
