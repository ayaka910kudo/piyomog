# 本番環境へのデプロイ手順

## 概要

このプロジェクトは Docker Compose を使用して、以下のサービスを本番環境で動作させます：

- **PostgreSQL**: データベース（内部ポート 5432、外部公開なし）
- **Express API**: バックエンド API（ポート 3001）
- **Next.js**: フロントエンド Web アプリ（ポート 3000）

## 前提条件

- Docker
- Docker Compose

## デプロイ手順

### 1. ポート競合の確認と対処

他のサービスが動いているサーバーでは、ポート競合に注意してください：

```bash
# 現在使用中のポートを確認
sudo netstat -tlnp | grep -E ":(3000|3001|5432)"

# または
sudo lsof -i :3000 -i :3001 -i :5432
```

**ポート競合がある場合の対処法:**

- PostgreSQL（5432）: デフォルトで外部公開していないため問題なし
- バックエンド（3001）: `docker-compose.yml`で `"8001:3001"` などに変更
- フロントエンド（3000）: `docker-compose.yml`で `"8080:3000"` などに変更

### 2. 環境変数の設定

本番環境に合わせて以下の環境変数を設定してください：

#### 2-1. プロジェクトルート（Docker Compose 用）

プロジェクトルートの`.env`ファイルを編集：

```bash
# サンプルからコピー（既に実行済み）
# cp env.sample .env

# .envファイルを編集
vi .env
```

主要な設定項目：

```bash
# PostgreSQL設定
POSTGRES_DB=piyomog
POSTGRES_USER=postgres
POSTGRES_PASSWORD=password  # 本番環境では必ず変更！

# データベース接続URL
DATABASE_URL=postgresql://postgres:password@postgres:5432/piyomog

# Node.js環境
NODE_ENV=production

# フロントエンド設定
NEXT_PUBLIC_API_URL=http://localhost:3001  # 本番環境では実際のURLに変更
```

#### 2-2. バックエンド（開発環境用）

```bash
# サンプルからコピー（既に実行済み）
# cp apps/backend/env.sample apps/backend/.env

# 開発環境用に編集
vi apps/backend/.env
```

#### 2-3. フロントエンド（開発環境用）

```bash
# サンプルからコピー（既に実行済み）
# cp apps/frontend/env.sample apps/frontend/.env

# 開発環境用に編集
vi apps/frontend/.env
```

**重要**: 本番環境では以下の点にご注意ください：

- `POSTGRES_PASSWORD`: デフォルトの `password` から強固なパスワードに変更
- `NEXT_PUBLIC_API_URL`: 実際のドメインまたはサーバー IP に変更
- `NODE_ENV`: 本番環境では `production` に設定

### 3. データディレクトリの作成

PostgreSQL のデータを保存するディレクトリを作成します：

```bash
# データディレクトリを作成
mkdir -p ./data/postgres
```

### 4. アプリケーションの起動

```bash
# Docker Composeでアプリケーションを起動
docker-compose up -d

# ログを確認
docker-compose logs -f
```

### 5. データベースマイグレーション

初回起動時は自動的にマイグレーションが実行されますが、手動で実行する場合：

```bash
# バックエンドコンテナに入る
docker-compose exec backend sh

# マイグレーション実行
npx prisma migrate deploy
```

### 6. アプリケーションの確認

- フロントエンド: http://localhost:3000
- バックエンド API: http://localhost:3001
- PostgreSQL: localhost:5432

## 開発環境での使用

開発環境では引き続き以下のコマンドを使用してください：

```bash
# バックエンド
cd apps/backend
npm run dev

# フロントエンド
cd apps/frontend
npm run dev
```

## トラブルシューティング

### データベース接続エラー

- PostgreSQL コンテナが正常に起動しているか確認
- データベース認証情報が正しいか確認

### ポート競合エラー

**症状**: `Error starting userland proxy: listen tcp4 0.0.0.0:3000: bind: address already in use`

**確認方法**:

```bash
# 使用中のポートを確認
sudo lsof -i :3000  # または該当するポート番号
```

**対処法**:

1. **他のサービスを停止** (可能な場合)
2. **ポート番号を変更** (推奨)
   ```yaml
   # docker-compose.ymlで変更
   ports:
     - "8080:3000" # フロントエンド
     - "8001:3001" # バックエンド
   ```
3. **PostgreSQL ポート**: 既にコメントアウト済みのため問題なし

**ポート変更時の注意点**:

- フロントエンドのポートを変更した場合: ブラウザのアクセス先を変更
- バックエンドのポートを変更した場合: `NEXT_PUBLIC_API_URL`環境変数を更新

### ビルドエラー

- Docker ファイルの内容を確認
- 依存関係が正しくインストールされているか確認

## セキュリティ注意事項

本番環境では以下の点にご注意ください：

- データベースのパスワードを強固なものに変更
- 環境変数をセキュアに管理
- HTTPS の設定
- ファイアウォールの設定
