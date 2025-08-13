# Logos フォルダ

ロゴ・ブランド画像を配置するフォルダです。

## 推奨設定
- **形式**: PNG推奨（透明背景対応）、SVG推奨
- **サイズ**: 240x120px程度
- **品質**: 95%（高品質維持）
- **レスポンシブ**: [120, 240, 360]px で自動生成

## 使用例
```astro
<OptimizedImage 
  src="alipay" 
  type="logo" 
  alt="Alipayロゴ"
  width={240}
/>
```

## ファイル名の例
- alipay.png
- wechat.png
- unionpay.png
- china-flag.svg

## 注意事項
- 透明背景のPNGまたはSVGを推奨
- 高解像度で鮮明なロゴを使用
- 著作権に注意（公式ロゴのみ使用）
- ファイル名は英数字とハイフンのみ使用