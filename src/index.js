const express = require('express');
const path = require('path');
const bcrypt = require('bcrypt');

const app = express();
const port = process.env.PORT || 3000;

// 정적 파일을 제공하기 위한 미들웨어
// __dirname은 webpack.config.js의 node: { __dirname: false } 설정 덕분에
// 번들링된 dist/main.js 파일이 위치한 디렉토리를 올바르게 가리킵니다.
// path.join을 통해 /dist/public 경로를 완성합니다.
app.use('/static', express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.send(`
    <h1>Hello, Standalone Express!</h1>
    <p>네이티브 모듈 테스트: <a href="/hash">/hash</a></p>
    <p>정적 파일 서빙 테스트: <a href="/static/index.html">/static/index.html</a></p>
  `);
});

// 네이티브 모듈(bcrypt) 사용 예시
app.get('/hash', async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash('hello world', salt);
    res.send(`
      <p>Original: hello world</p>
      <p>Hashed: ${hash}</p>
    `);
  } catch (error) {
    res.status(500).send(`Error hashing password: ${error.message}`);
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
