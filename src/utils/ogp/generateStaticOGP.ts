/**
 * 静的生成時のOGP画像生成サービス - tabichina用
 * 
 * ビルド時にMDX記事から自動的にOGP画像を生成するためのユーティリティ
 */
import satori from 'satori';
import sharp from 'sharp';
import { existsSync, mkdirSync, writeFileSync, readFileSync } from 'fs';
import { readdir } from 'fs/promises';
import path from 'path';
import crypto from 'crypto';
import { fileURLToPath } from 'url';
import { loadFonts, getSatoriFont } from './fontLoader';
import OGPTemplate from './OGPTemplate';
import type { 
  StaticOGPParams, 
  PageMetadata, 
  OGPTemplateProps
} from './types';

// 現在のファイルのディレクトリパスを取得
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// プロジェクトのルートディレクトリを取得
const projectRoot = path.resolve(__dirname, '../../../');

/**
 * MDXファイルからfrontmatterを抽出
 */
function extractFrontmatter(filePath: string): { title?: string; description?: string; [key: string]: any } {
  try {
    const content = readFileSync(filePath, 'utf-8');
    const frontmatterMatch = content.match(/^---\s*\n([\s\S]*?)\n---/);
    
    if (!frontmatterMatch) {
      return {};
    }
    
    const frontmatterText = frontmatterMatch[1];
    const frontmatter: any = {};
    
    // 簡単なYAMLパーサー（title, descriptionのみ対応）
    const lines = frontmatterText.split('\n');
    for (const line of lines) {
      const match = line.match(/^(\w+):\s*["']?(.*?)["']?$/);
      if (match) {
        const [, key, value] = match;
        frontmatter[key] = value;
      }
    }
    
    return frontmatter;
  } catch (error) {
    console.warn(`Failed to parse frontmatter from ${filePath}:`, error);
    return {};
  }
}

/**
 * MDXファイルからページメタデータを抽出
 */
async function extractPagesMetadata(): Promise<PageMetadata[]> {
  const articlesDir = path.join(projectRoot, 'src/content/articles');
  const pages: PageMetadata[] = [];
  
  try {
    const files = await readdir(articlesDir);
    const mdxFiles = files.filter(file => file.endsWith('.mdx'));
    
    for (const filename of mdxFiles) {
      const filePath = path.join(articlesDir, filename);
      const slug = filename.replace('.mdx', '');
      const frontmatter = extractFrontmatter(filePath);
      
      // コンテンツハッシュを生成（title + descriptionベース）
      const contentString = `${frontmatter.title || ''}|${frontmatter.description || ''}`;
      const contentHash = crypto.createHash('md5').update(contentString).digest('hex');
      
      pages.push({
        slug,
        title: frontmatter.title || slug,
        description: frontmatter.description,
        pageType: 'article',
        contentHash,
      });
    }
    
    // トップページも追加
    pages.push({
      slug: 'home',
      title: 'Alipayの使い方ガイド',
      description: '中国旅行での決済をスムーズに。Alipay、WeChat Pay、UnionPayの使える場所、使えない場所から設定方法まで徹底解説。',
      pageType: 'home',
      contentHash: crypto.createHash('md5').update('home-page-content').digest('hex'),
    });
    
  } catch (error) {
    console.error('Error reading articles directory:', error);
  }
  
  return pages;
}


/**
 * OGP画像を生成
 */
async function generateOGPImage(
  templateProps: OGPTemplateProps,
  outputPath: string
): Promise<void> {
  try {
    // フォント読み込み
    const fonts = loadFonts();
    const satoriFont = getSatoriFont(fonts);
    
    // SVG生成
    const svg = await satori(
      OGPTemplate(templateProps),
      {
        width: 1200,
        height: 630,
        fonts: satoriFont,
      }
    );
    
    // PNG変換
    const pngBuffer = await sharp(Buffer.from(svg))
      .png()
      .toBuffer();
    
    // 出力ディレクトリ確保
    const outputDir = path.dirname(outputPath);
    if (!existsSync(outputDir)) {
      mkdirSync(outputDir, { recursive: true });
    }
    
    // ファイル保存
    writeFileSync(outputPath, pngBuffer);
    
    console.log(`Generated OGP image: ${outputPath}`);
  } catch (error) {
    console.error(`Failed to generate OGP image: ${outputPath}`, error);
    throw error;
  }
}

/**
 * 単一ページのOGP画像を生成
 */
export async function generatePageOGP(params: StaticOGPParams): Promise<string> {
  const {
    title,
    description,
    pageType = 'article',
    outputPath,
    forceGenerate = false,
    isHomePage = false,
  } = params;
  
  const siteUrl = 'https://www.tabichina.jp';
  
  // ベースとなる相対パス（例: articles/article-id.png）
  const baseRelativePath = outputPath;
  const baseDir = path.dirname(baseRelativePath);
  const baseFilename = path.basename(baseRelativePath);
  const fileExtension = path.extname(baseFilename);
  const baseNameWithoutExt = path.basename(baseFilename, fileExtension);

  // タイトルからMD5ハッシュを生成
  const titleHash = crypto.createHash('md5').update(title).digest('hex');
  const filenameWithHash = `${baseNameWithoutExt}-${titleHash}${fileExtension}`;

  // 最終的な相対パスを決定
  const finalRelativePath = path.join(baseDir, filenameWithHash);

  // 完全な出力パス
  const fullOutputPath = path.join(projectRoot, 'public/ogp', finalRelativePath);
  
  // 出力ディレクトリが存在しない場合は作成
  const outputDirPath = path.dirname(fullOutputPath);
  if (!existsSync(outputDirPath)) {
    mkdirSync(outputDirPath, { recursive: true });
  }
  
  // キャッシュチェック - ファイルが存在し、強制再生成でない場合はスキップ
  if (existsSync(fullOutputPath) && !forceGenerate) {
    console.log(`Skipping OGP generation (cached): ${finalRelativePath}`);
    return `/ogp/${finalRelativePath.replace(/\\/g, '/')}`;
  }
  
  // テンプレートプロパティ準備
  const templateProps: OGPTemplateProps = {
    pageTitle: title,
    pageDescription: description,
    siteUrl,
    pageType,
    isHomePage,
  };
  
  // OGP画像生成
  await generateOGPImage(templateProps, fullOutputPath);
  
  return `/ogp/${finalRelativePath.replace(/\\/g, '/')}`;
}

/**
 * 全ページのOGP画像を静的生成（メイン関数）
 */
export async function generateAllStaticOGP(forceGenerate: boolean = false): Promise<void> {
  console.log('Starting OGP static generation...');
  
  try {
    // ページメタデータ取得
    const pages = await extractPagesMetadata();
    console.log(`Found ${pages.length} pages to process`);
    
    let processedCount = 0;
    
    // 各ページの処理
    for (const page of pages) {
      const outputPath = page.pageType === 'home' 
        ? 'home.png' 
        : `articles/${page.slug}.png`;
      
      await generatePageOGP({
        title: page.title,
        description: page.description,
        pageType: page.pageType,
        outputPath,
        forceGenerate,
        isHomePage: page.pageType === 'home',
      });
      
      processedCount++;
    }
    
    console.log(`OGP generation completed: ${processedCount} pages processed`);
    
  } catch (error) {
    console.error('Error during OGP static generation:', error);
    throw error;
  }
}