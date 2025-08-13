# OGP画像生成システム実装完了ガイド

## 🎉 実装完了内容

tabichina用のビルド時静的OGP画像生成システムが完了しました。

### ✅ 実装ファイル

1. **依存関係追加** (`package.json`)
   - `satori`: ReactコンポーネントをSVGに変換
   - `tsx`: TypeScriptスクリプト実行
   - `@types/react`, `@types/react-dom`: 型定義

2. **OGPシステムファイル**
   - `src/utils/ogp/types.ts` - 型定義（簡素化版）
   - `src/utils/ogp/fontLoader.ts` - 日本語フォント管理
   - `src/utils/ogp/OGPTemplate.tsx` - tabichina用デザインテンプレート
   - `src/utils/ogp/generateStaticOGP.ts` - 静的生成メイン機能
   - `src/utils/ogp/fonts/` - 日本語フォント（Kaisei Harunoumi）

3. **ビルドスクリプト**
   - `scripts/generate-ogp.ts` - OGP画像一括生成スクリプト
   - `package.json` scripts統合（prebuild実行）

4. **Layout.astro更新**
   - OGP画像URLの自動生成ロジック
   - `og:image`, `twitter:image` タグ追加

## 🚀 使用方法

### 1. ビルド時自動生成
```bash
# 通常ビルド（OGP画像も自動生成）
npm run build

# OGP画像のみ生成（差分）
npm run generate-ogp

# OGP画像を全て再生成
npm run generate-ogp:force
```

### 2. Amplifyビルド統合
```yaml
# amplify.yml
version: 1
frontend:
  phases:
    preBuild:
      commands:
        - npm ci
    build:
      commands:
        - npm run build  # prebuildでOGP生成が自動実行
```

## 📁 生成される画像

### 出力先
```
public/ogp/
├── home.png                    # トップページ用OGP
├── articles/                   # 記事ページ用OGP
│   ├── alipay-guide.png
│   ├── alipay-registration-guide.png
│   ├── alipay-basic-operations.png
│   └── （全16記事分）
└── .ogp-cache.json            # 差分生成用キャッシュ
```

### OGP画像仕様
- **サイズ**: 1200x630px（OGP標準）
- **フォーマット**: PNG
- **デザイン**: tabichinaブランド（赤系グラデーション）
- **フォント**: Kaisei Harunoumi（日本語対応）

## ⚡ 差分生成システム

### 効率的なビルド
1. **ハッシュベース検出**: 記事の `title` + `description` のMD5ハッシュで変更検出
2. **キャッシュ管理**: `.ogp-cache.json` で生成済み画像を管理
3. **選択的生成**: 変更があった記事のみ再生成→**ビルド時間大幅短縮**

### キャッシュファイル例
```json
{
  "images": {
    "articles/alipay-guide.png": {
      "filePath": "public/ogp/articles/alipay-guide.png",
      "url": "/ogp/articles/alipay-guide.png",
      "generatedAt": "2025-01-31T...",
      "pageSlug": "alipay-guide",
      "contentHash": "abc123..."
    }
  },
  "lastUpdated": "2025-01-31T...",
  "version": "1.0.0"
}
```

## 🎨 デザイン特徴

### tabichina用カスタマイズ
- **メインカラー**: `#D32F2F` (現在のサイトカラー)
- **グラデーション**: 赤系グラデーション背景
- **ブランディング**: "CHINA PAYMENTS GUIDE"
- **装飾要素**: 
  - スマートフォン・QRコード（決済をイメージ）
  - Alipayロゴ風の"A"マーク
  - 決済フローをイメージした線・円

### レスポンシブ文字サイズ
- 長いタイトル（30文字以上）: 44px
- 通常タイトル: 52px
- 説明文: 24px（記事ページのみ）

## 🔧 技術仕様

### 生成フロー
1. **MDX解析**: frontmatter（title, description）を抽出
2. **ハッシュ計算**: 変更検出用MD5ハッシュ生成
3. **差分判定**: キャッシュと比較して生成必要性を判定
4. **Satori生成**: ReactコンポーネントをSVGに変換
5. **Sharp変換**: SVGをPNGに変換・最適化
6. **ファイル保存**: `public/ogp/` に出力
7. **キャッシュ更新**: `.ogp-cache.json` を更新

### エラーハンドリング
- フォントファイル不在時のエラー表示
- MDX解析エラー時の警告
- 画像生成失敗時の詳細ログ

## 📊 効果測定

### SNS共有最適化
- Twitter Card: `summary_large_image`
- Facebook OGP: 1200x630px標準サイズ
- LINE共有: OGP画像対応

### SEO効果
- 各記事に専用OGP画像
- ブランド統一されたデザイン
- 日本語コンテンツに最適化

## 🚨 注意事項

### リポジトリ管理
- 生成されたOGP画像はリポジトリにコミット推奨
- `.ogp-cache.json` もコミットして差分生成を有効活用
- `public/ogp/` をGitignoreに含めない

### 本番デプロイ
1. `src/utils/ogp/generateStaticOGP.ts` の `siteUrl` を本番ドメインに変更
2. Amplifyの環境変数で動的設定も可能

## 🎯 次のステップ

1. **初回ビルド実行**: `npm run generate-ogp:force` で全画像生成
2. **記事追加時**: 自動的にOGP画像が生成される
3. **デザイン調整**: `OGPTemplate.tsx` で必要に応じてカスタマイズ

実装完了！ビルド時に自動的にOGP画像が生成され、SNS共有が最適化されます。