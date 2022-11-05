import webpack from 'webpack'
import { BuildProps } from './types/config'
import { buildPlugins } from './buildPlugins'
import { buildLoaders } from './buildLoaders'
import { buildResolvers } from './buildResolvers'
import { buildDevServer } from './buildDevServer'

export function buildWebpackConfig(options: BuildProps): webpack.Configuration {
  const { paths, mode, isDev } = options
  return {
    mode: mode,
    entry: paths.entry,
    module: {
      rules: buildLoaders(options),
    },
    resolve: buildResolvers(options),
    output: {
      path: paths.build,
      filename: '[name].[contenthash].js',
      clean: true,
      publicPath: '/'
    },
    plugins: buildPlugins(options),
    devtool: isDev ? 'inline-source-map' : undefined,
    devServer: isDev ? buildDevServer(options) : undefined,
  }
}
