const path = require('path');
const glob = require('glob');

module.exports = {
  publicRuntimeConfig: { // Will be available on both server and client
    ALGOLIA_APP_ID: '0BJH6ZHANS',
    ALGOLIA_API_KEY: '6b603f518f8226fe184df623bba4dce1',
    ALGOLIA_INDEX_NAME: 'SYNTAX_FM'
  },
  webpack: (config, { dev }) => {
    config.module.rules.push(
      {
        test: /\.(css|styl)/,
        loader: 'emit-file-loader',
        options: {
          name: 'dist/[path][name].[ext]'
        }
      }
    ,
      {
        test: /\.css$/,
        use: ['babel-loader', 'raw-loader', 'postcss-loader']
      }
    ,
      {
        test: /\.styl$/,
        use: ['babel-loader', 'raw-loader', 'postcss-loader',
          { loader: 'stylus-loader',
            options: {
              includePaths: ['styles', 'node_modules']
                .map((d) => path.join(__dirname, d))
                .map((g) => glob.sync(g))
                .reduce((a, c) => a.concat(c), [])
            }
          }
        ]
      }
    )
    return config
  }
}
