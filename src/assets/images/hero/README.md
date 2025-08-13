# Hero フォルダ

ヒーロー画像（背景画像、メイン画像など）を配置するフォルダです。

## 推奨設定
- **形式**: JPG推奨
- **サイズ**: 幅1920px以上を推奨
- **品質**: 80%（自動最適化）
- **レスポンシブ**: [768, 1024, 1400, 1920]px で自動生成

## 使用例
```astro
<OptimizedImage 
  src="waitan" 
  type="hero" 
  alt="上海外灘の夜景"
  width={1200}
/>
```

## 既存ファイル
- **waitan.jpg**: 上海外灘の夜景（現在サイトのヒーロー画像として使用中）

## ファイル名の例
- shanghai-skyline.jpg
- beijing-forbidden-city.jpg
- guangzhou-tower.jpg
- shenzhen-cityscape.jpg

## 注意事項
- 高解像度で美しい画像を使用
- 横長のアスペクト比（16:9または3:2）を推奨
- 著作権フリーまたは使用許可のある画像のみ
- ファイル名は英数字とハイフンのみ使用