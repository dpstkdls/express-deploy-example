const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  // 1. 번들링된 코드가 Node.js 환경에서 실행되도록 설정
  target: 'node',
  
  // 2. 애플리케이션 진입점
  entry: './src/index.js',
  
  // 3. 번들링 결과물 설정
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js',
    clean: true,
  },

  // 4. node_modules를 번들에 포함하지 않도록 설정
  externals: [nodeExternals()],

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.node$/,
        use: 'node-loader',
      },
    ],
  },

  // 5. __dirname이 번들링된 파일의 실제 경로를 가리키도록 설정
  node: {
    __dirname: false,
  },

  // 6. 배포에 필요한 파일들을 dist 폴더로 복사
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: 'src/public', to: 'public' },
        {
          from: 'node_modules',
          to: 'node_modules',
          // 이 옵션은 Webpack에게 해당 에셋들이 이미 최적화되었음을 알려
          // Terser 같은 minimizer가 다시 처리하지 않도록 합니다.
          info: { minimized: true },
        },
      ],
    }),
  ],

  devtool: 'source-map',
};