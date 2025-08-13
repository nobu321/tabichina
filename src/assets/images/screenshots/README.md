# Screenshots フォルダ

アプリスクリーンショット（UI画面、操作手順など）を配置するフォルダです。

## 推奨設定
- **形式**: PNG推奨（文字の鮮明さ重視）
- **サイズ**: 実際のスクリーンショットサイズのまま
- **品質**: 90%（文字の可読性重視）
- **レスポンシブ**: [320, 480, 640]px で自動生成

## 使用例
```astro
<OptimizedImage 
  src="alipay-registration-step1" 
  type="screenshot" 
  alt="Alipay登録画面のスクリーンショット"
/>
```

## ファイル名の例
- alipay-registration-step1.png
- alipay-payment-screen.png
- wechat-qr-scan-screen.png
- unionpay-card-setup.png

## 注意事項
- 文字が読みやすいように高品質を維持
- 個人情報は必ずマスキング
- デバイスのスクリーンショット機能を使用
- ファイル名は英数字とハイフンのみ使用