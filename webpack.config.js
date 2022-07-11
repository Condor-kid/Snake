//引入一个包
const path = require('path');

//引入html插件
const HtmlWebpackPlugin = require('html-webpack-plugin')

//引入clean插件

const { CleanWebpackPlugin } = require('clean-webpack-plugin')

//webpack中所有的配置信息都应该写在module.exports中
module.exports = {

    mode: "development",
    //指定入口文件
    entry: "./src/index.ts",

    //指定打包文件所在的目录
    output: {
        //指定打包文件的目录
        path: path.resolve(__dirname, "dist"),
        //打包后文件的文件名
        filename: "bundle.js",
        publicPath: "",
        //告诉webpack不使用箭头函数
        environment: {
            arrowFunction: false,
            const: false,
        }
    },

    //指定webpack打包时要使用的模块
    module: {
        //指定要加载的规则
        rules: [
            {
                // test指定的是规则生效的文件
                test: /\.ts$/,
                //要使用的loader,从后面往前面加载顺序
                use: [
                    //配置babel
                    {
                        //指定加载器
                        loader: "babel-loader",
                        options: {
                            //设置预定义环境
                            presets: [
                                [
                                    //指定环境的插件
                                    "@babel/preset-env",
                                    //配置信息
                                    {
                                        //兼容的目标浏览器
                                        targets: {
                                            "chrome": "88",
                                            "ie": "11"
                                        },
                                        //指定corejs的版本
                                        "corejs": "3",
                                        //使用corejs的方式“usage” 表示按需加载
                                        "useBuiltIns": "usage"
                                    }
                                ]
                            ]
                        }
                    },
                    "ts-loader"
                ],
                //要排除的文件
                exclude: /node_modules/
            },

            {
                test: /\.less$/,
                use: [
                    "style-loader",
                    "css-loader",
                    //引入postcss
                    {
                        loader: "postcss-loader",
                        options: {
                            postcssOptions: {
                                plugin: [
                                    [
                                        "postcss-preset-env",
                                        {
                                            browsers: 'last 2 versions'
                                        }
                                    ]
                                ]
                            }
                        }
                    },
                    "less-loader",
                ]
            }

        ]
    },

    //配置webpack插件
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: "Condor",
            template: "./src/index.html",
        }),
    ],
    devServer: {
        static: "./dist",
    },
    resolve: {
        extensions: ['.ts', '.js']
    }
}