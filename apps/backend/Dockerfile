# ベースイメージとしてNode.js 20を使用
FROM node:20-alpine

# 作業ディレクトリを設定
WORKDIR /app

# package.jsonとpackage-lock.jsonをコピー
COPY package*.json ./

# 全ての依存関係をインストール
RUN npm ci

# ソースコードをコピー
COPY . .

# Prismaクライアントを生成
RUN npx prisma generate

# TypeScriptをビルド（distディレクトリに出力）
RUN npm run build

# distディレクトリが作成されたか確認
RUN ls -la dist/

# ポート3001を公開
EXPOSE 3001

# アプリケーションを起動
CMD ["npm", "run", "start"]