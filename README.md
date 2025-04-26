# gpt-image-1 画像加工デモ

このリポジトリは、Azure OpenAI の画像編集機能を利用して、Web ブラウザ上で参照画像をアップロードし、プロンプトを指定して画像を加工・生成するデモアプリケーションです。

## ディレクトリ構成

- [LICENSE](LICENSE)  
- [src/index.html](src/index.html) — HTML テンプレート  
- [src/styles.css](src/styles.css) — カスタムスタイル  
- [src/script.js](src/script.js) — フロントエンドのロジック  

## 主な機能

- 参照画像のプレビュー表示  
- プロンプト入力による画像編集リクエスト  
- Azure OpenAI Images API への POST リクエスト  
- Base64 エンコードされた生成画像の表示    

## 必要条件

- GitHub アカウント  
- Azure サブスクリプション  
- Azure OpenAI リソース（アカウント名、デプロイ名、API キー）  

## ローカルでの動作確認

1. リポジトリをクローン  
   ```bash
   git clone https://github.com/tokawa-ms/gpt-image-1-demo.git
   cd gpt-image-1-demo
   ```
2. ローカルサーバーを起動（例: VS Code Live Server 拡張機能、あるいは任意の静的サーバー）  
3. `src/index.html` をブラウザで開き、Azure OpenAI のアカウント情報を入力して動作を確認  

## 参照

- Azure OpenAI Service ドキュメント  
  https://docs.microsoft.com/azure/cognitive-services/openai/  

- How to use Azure OpenAI image generation models
  https://learn.microsoft.com/en-us/azure/ai-services/openai/how-to/dall-e?tabs=gpt-image-1

---

MIT License © 2025 Takashi Okawa  