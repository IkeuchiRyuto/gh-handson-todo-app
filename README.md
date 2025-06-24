# 新卒研修向けガイド

このリポジトリは新卒研修用の Next.js ハンズオン教材です。以下のルール・手順に従って開発を進めてください。

## 1. 前提条件

- Node.js（推奨: 最新の LTS バージョン）
- npm または yarn, pnpm, bun のいずれか
- Git（GitHub アカウント必須）
- 推奨エディタ: [Visual Studio Code](https://code.visualstudio.com/)

## 2. 推奨 VSCode 拡張機能

- ESLint
- Prettier
- GitHub Pull Requests and Issues
- Japanese Language Pack（必要に応じて）

## 3. プロジェクトセットアップ手順

1. このリポジトリを Fork し、自分の GitHub アカウントにコピーします。
2. Fork したリポジトリをローカルに Clone します。
   ```bash
   git clone https://github.com/あなたのユーザー名/gh-handson-todo-app.git
   cd gh-handson-todo-app
   ```
3. パッケージをインストールします。
   ```bash
   npm install
   # または
   yarn install
   # または
   pnpm install
   # または
   bun install
   ```
4. 開発サーバーを起動します。
   ```bash
   npm run dev
   ```
5. [http://localhost:3000](http://localhost:3000) をブラウザで開き、動作確認してください。

## 4. ブランチ運用ルール

- `main` ブランチは常にデプロイ可能な状態を保ちます。
- 機能追加や修正は必ず新しいブランチ（例: `feature/タスク名` や `fix/バグ内容`）を作成して作業してください。
- 直接 `main` へコミット・プッシュは禁止です。

## 5. コミットメッセージ規約

- コミットメッセージは簡潔かつ内容が分かるように記述してください。
- 例:
  - `feat: タスク追加機能を実装`
  - `fix: 日付表示バグを修正`
  - `docs: READMEにセットアップ手順を追記`

## 6. Pull Request（PR）ルール

1. 作業が完了したら GitHub 上で PR を作成してください。
2. PR タイトル・説明欄には「何を・なぜ」行ったかを明記してください。
3. PR 作成後は必ず他のメンバーにレビュー依頼を出してください。
4. レビューで指摘があれば修正し、再度レビューを依頼してください。
5. LGTM（Approve）が 1 件以上ついたら `main` へマージ可能です。
6. マージは「Squash and merge」方式を推奨します。

## 7. コードフォーマット・Lint・テスト

- コード整形: `npm run format` または `npx prettier --write .`
- Lint: `npm run lint`
- テスト（必要に応じて）: `npm test` など
- PR 作成前に必ず Lint・フォーマットを実行してください。

## 8. よくあるトラブル・FAQ

- **依存パッケージの不整合**: `node_modules` を削除し再インストール
  ```bash
  rm -rf node_modules && npm install
  ```
- **ポート競合でサーバーが起動しない**: 他のアプリが 3000 番ポートを使っていないか確認
- **TypeScript エラー**: エラーメッセージをよく読み、型定義や import を見直す
- **分からないことがあれば必ずメンターやチームに相談してください**

---