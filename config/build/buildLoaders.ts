import webpack from 'webpack'
import { buildBabelLoader } from './loaders/buildBabelLoader'
import { buildCssLoader } from './loaders/buildCssLoader'
import { BuildProps } from './types/config'

export function buildLoaders(options: BuildProps): webpack.RuleSetRule[] {
  const svgLoader = {
    test: /\.svg$/,
    use: ['@svgr/webpack'],
  }
  const codeBabelLoader = buildBabelLoader(options, false)
  const tsxCodeBabelLoader = buildBabelLoader(options, true)

  const fileLoader = {
    test: /\.(png|jpe?g|gif)$/i,
    use: [
      {
        loader: 'file-loader',
      },
    ],
  }
  const typescriptLoader = {
    test: /\.tsx?$/,
    use: 'ts-loader',
    exclude: /node_modules/,
  }
  const cssLoader = buildCssLoader(true)

  return [svgLoader, fileLoader, codeBabelLoader, tsxCodeBabelLoader, cssLoader]
}
