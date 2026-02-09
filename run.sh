#!/bin/bash

# 스크립트가 위치한 디렉토리로 이동
cd "$(dirname "$0")"

# 번들링된 애플리케이션 실행
echo "Starting application..."
node main.js