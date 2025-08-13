/**
 * OGP画像生成システムの型定義 - tabichina用
 */

// OGPテンプレートのプロパティ
export interface OGPTemplateProps {
  /** ページタイトル */
  pageTitle: string;
  /** ページ説明（オプション） */
  pageDescription?: string;
  /** サイトURL */
  siteUrl: string;
  /** ページタイプ（article=記事, home=トップページ） */
  pageType?: 'article' | 'home';
  /** トップページフラグ */
  isHomePage?: boolean;
}

// OGP画像生成オプション
export interface OGPGenerateOptions {
  /** 出力先ディレクトリ */
  outputDir: string;
  /** 出力ファイル名 */
  filename: string;
  /** 幅（デフォルト 1200px） */
  width?: number;
  /** 高さ（デフォルト 630px） */
  height?: number;
  /** 出力形式（デフォルト png） */
  format?: 'png' | 'jpeg';
}

// ページメタデータ（MDXから抽出）
export interface PageMetadata {
  /** ページのスラッグ */
  slug: string;
  /** ページタイトル */
  title: string;
  /** ページの説明 */
  description?: string;
  /** ページタイプ */
  pageType?: 'article' | 'home';
  /** 最終更新日 */
  lastModified?: Date;
  /** frontmatterのハッシュ値（差分生成用） */
  contentHash?: string;
}


// 静的生成パラメータ
export interface StaticOGPParams {
  /** ページタイトル */
  title: string;
  /** ページの説明 */
  description?: string;
  /** ページタイプ */
  pageType?: 'article' | 'home';
  /** 出力ファイルパス */
  outputPath: string;
  /** 強制的に再生成するか */
  forceGenerate?: boolean;
  /** トップページフラグ */
  isHomePage?: boolean;
}

// フォント設定
export interface FontConfig {
  /** レギュラーフォントのパス */
  regular: string;
  /** ボールドフォントのパス */
  bold: string;
}

// Satoriフォント設定
export interface SatoriFont {
  name: string;
  data: ArrayBuffer;
  weight?: number;
  style?: 'normal' | 'italic';
}