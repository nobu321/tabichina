# Photos フォルダ

実写画像（風景、店舗、人物など）を配置するフォルダです。

## 推奨設定
- **形式**: JPG推奨
- **サイズ**: 幅1200px以上を推奨
- **品質**: 80%（自動最適化）
- **レスポンシブ**: [480, 768, 1024, 1200]px で自動生成

## 使用例
```astro
<OptimizedImage 
  src="shanghai-convenience-store" 
  type="photo" 
  alt="上海のコンビニエンスストア"
  width={800}
/>
```

## ファイル名の例
- shanghai-convenience-store.jpg
- alipay-shop-payment.jpg
- subway-payment-scene.jpg
- wechat-qr-display.jpg

## 注意事項
- ファイル名は英数字とハイフンのみ使用
- 拡張子(.jpg, .png)を含めてください
- 記事をまたいで共有可能な画像を配置