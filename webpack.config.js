const webpack = require('webpack');

let config = {
    entry: './src/jgm.js',
    output: {
        filename: 'public/main.js'
    },
    watch: true
}

module.exports = config;