var webpack = require('webpack');
module.exports = {
    entry:{
        main:"./src/js/main.js"
    },
    output:{
        path:__dirname,
        filename:'public/js/[name].build.js'
    },
    module:{
        noParse: [],
        loaders:[
            {
                test:/\.vue$/,
                loader:'vue'
            },
            {
                test:/\.js$/,
                loader:'babel',
                exclude:/node_modules/
            },
            {
                test:/\.css$/,
                loader:'style!css'
            },
            { 
                test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/, 
                loader: 'url-loader?limit=50000&name=[path][name].[ext]'
            }
        ]
    },
    vue:{
        loaders:{
            scss:"sass"
        }
    },
    babel:{
        presets:['es2015'],
        plugins:['transform-runtime']
    }
}