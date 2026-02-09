import express, { Request, Response } from 'express';
import path from 'path';
import bcrypt from 'bcrypt';
import 'dotenv/config'; // dotenv/config를 import하여 .env 파일을 로드

const app = express();
const port: number = parseInt(process.env.PORT || '3000', 10); // 포트 타입을 명시하고 기본값 설정

// 정적 파일을 제공하기 위한 미들웨어
app.use('/static', express.static(path.join(__dirname, 'public')));

app.get('/', (req: Request, res: Response) => {
  res.send(`
    <h1>Hello, Standalone Express with TypeScript!</h1>
    <p>네이티브 모듈 테스트: <a href="/hash">/hash</a></p>
    <p>정적 파일 서빙 테스트: <a href="/static/index.html">/static/index.html</a></p>
  `);
});

// 네이티브 모듈(bcrypt) 사용 예시
app.get('/hash', async (req: Request, res: Response) => {
  try {
    const saltRounds: number = 10;
    const salt: string = await bcrypt.genSalt(saltRounds);
    const hash: string = await bcrypt.hash('hello world', salt);
    res.send(`
      <p>Original: hello world</p>
      <p>Hashed: ${hash}</p>
    `);
  } catch (error: any) { // 에러 타입 명시
    res.status(500).send(`Error hashing password: ${error.message}`);
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});