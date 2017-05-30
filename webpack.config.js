const path = require('path')
const fs = require('fs')

const loadModules = fs
  .readdirSync('node_modules')
  .reduce(function(acc, mod) {
    if (mod === '.bin') {
      return acc
    }

    acc[mod] = 'commonjs ' + mod
    return acc
  })

module.exports = [
  {
    target: 'web',
    entry: path.resolve(__dirname, 'client', 'index'),
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'bundle.js',
    },
    resolve: {
      extensions: [ '.js', '.jsx' ],
    },
    module: {
      rules: [
        {
          test: /\/jsx?$/,
          loader: 'babel-loader',
          query: {
            presets: [ 'es2015', 'react' ],
          },
        },
      ],
    },
  },
  {
    target: 'node',
    entry: path.resolve(__dirname, 'server', 'index'),
    output: {
      path: path.resolve(__dirname, 'build'),
      filename: 'server.js',
    },
    externals: [ loadModules ],
    node: {
      console: false,
      global: false,
      process: false,
      __filename: false,
      __dirname: false,
      Buffer: false,
    },
    resolve: {
      extensions: [ '.js', '.jsx' ],
      alias: {
        'pg-hstore': path.join(__dirname, '.alias', 'pg-hstore'),
      },
    },
    module: {
      rules: [
        {
          test: /\/jsx?$/,
          loader: 'babel-loader',
          query: {
            presets: [ 'es2015', 'react' ],
          },
        },
      ],
    },
  },
]
