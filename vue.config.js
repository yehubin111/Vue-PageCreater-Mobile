const path = require('path');
function resolve(dir) {
    return path.join(__dirname, dir)
}
module.exports = {
    lintOnSave: false,
    pages: {
        index: {
            entry: './src/pagetemplate/index.ts',
            template: './src/pagetemplate/index.html'
        },
        pagecreater: {
            entry: './src/pagecreater/index.ts',
            template: './src/pagecreater/index.html'
        }
    },
    configureWebpack: config => {
        // 性能检测，文件大小超过最大限制，会提示
        // config.performance = {
        //     hints: false
        // };
        config.resolve = {
            extensions: ['.js', '.vue', '.json', '.css', 'svg', '.ts'],
            alias: {
                'vue$': 'vue/dist/vue.esm.js',
                '@': resolve('src')
            }
        };
    },
    productionSourceMap: false, // 开发环境是否生成sourcemap文件
    devServer: {
        port: 8008,
        proxy: {
            '/api_yuncang': {
                target: 'http://dev-web-yuncang.highstreet.top',
                changeOrigin: true,
                pathRewrite: {
                    '^/api_yuncang': '/api_yuncang'
                }
            },
            // '/mgr_yuncang': {
            //     target: 'http://dev-mgr-yuncang.highstreet.top',
            //     changeOrigin: true,
            //     pathRewrite: {
            //         '^/mgr_yuncang': '/mgr_yuncang'
            //     }
            // },
        }
    }
}