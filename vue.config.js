const path = require("path");
// const merge = require('webpack-merge');
// const tsImportPluginFactory = require('ts-import-plugin');
function resolve(dir) {
  return path.join(__dirname, dir);
}
module.exports = {
  lintOnSave: false,
  publicPath: '/h5activity/', // 部署应用包时的基本 URL
  pages: {
    pagetemplate: {
      entry: "./src/pagetemplate/index.ts",
      template: "./src/pagetemplate/index.html"
    },
    pagecreater: {
      entry: "./src/pagecreater/index.ts",
      template: "./src/pagecreater/index.html"
    }
  },
  configureWebpack: config => {
    // 性能检测，文件大小超过最大限制，会提示
    config.performance = {
        hints: false
    };
    config.resolve = {
      extensions: [".js", ".vue", ".json", ".css", "svg", ".ts"],
      alias: {
        "vue$": "vue/dist/vue.esm.js",
        "@": resolve("src")
      }
    };
  },
  // chainWebpack: config => {
  //     config.module
  //         .rule('ts')
  //         .use('ts-loader')
  //         .tap(options => {
  //             options = merge(options, {
  //                 transpileOnly: true,
  //                 getCustomTransformers: () => ({
  //                     before: [
  //                         tsImportPluginFactory({
  //                             libraryName: 'vant',
  //                             libraryDirectory: 'es',
  //                             style: true
  //                         })
  //                     ]
  //                 }),
  //                 compilerOptions: {
  //                     module: 'es2015'
  //                 }
  //             });
  //             return options;
  //         });
  // },
  productionSourceMap: false, // 开发环境是否生成sourcemap文件
  devServer: {
    port: 8008,
    proxy: {
      "/api_yuncang": {
        target: "http://dev-web-yuncang.highstreet.top",
        changeOrigin: true,
        pathRewrite: {
          "^/api_yuncang": "/api_yuncang"
        }
      },
      "/delete": {
        target: "http://rs.qiniu.com",
        changeOrigin: true,
        pathRewrite: {
          "^/delete": "/delete"
        }
      }
    }
  }
};
