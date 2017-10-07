const webpack = require('webpack');

let config = {
    entry: './jgm.js',
    output: {
        filename: 'main.js'
    },
    watch: true
}

module.exports = config;