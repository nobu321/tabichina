#!/usr/bin/env node

/**
 * OGP画像一括生成スクリプト - tabichina用
 * 
 * ビルド時に実行され、全ページのOGP画像を静的生成します。
 * 
 * 使用方法:
 *   npm run generate-ogp          # 差分生成
 *   npm run generate-ogp -- --force # 全て再生成
 */

import { generateAllStaticOGP } from '../src/utils/ogp/generateStaticOGP';

async function main() {
  const startTime = Date.now();
  
  // コマンドライン引数の解析
  const args = process.argv.slice(2);
  const forceGenerate = args.includes('--force') || args.includes('-f');
  
  console.log('🖼️  OGP画像生成を開始します...');
  console.log(`モード: ${forceGenerate ? '全て再生成' : '差分生成'}`);
  console.log('');
  
  try {
    // フォントの存在確認
    const { validateFonts } = await import('../src/utils/ogp/fontLoader');
    if (!validateFonts()) {
      throw new Error('必要なフォントファイルが見つかりません');
    }
    
    // OGP画像の一括生成
    await generateAllStaticOGP(forceGenerate);
    
    const endTime = Date.now();
    const duration = ((endTime - startTime) / 1000).toFixed(2);
    
    console.log('');
    console.log(`✅ OGP画像生成が完了しました（実行時間: ${duration}秒）`);
    console.log('');
    console.log('生成された画像:');
    console.log('  - public/ogp/home-[hash].png              (トップページ)');
    console.log('  - public/ogp/articles/*-[hash].png        (記事ページ)');
    console.log('');
    
  } catch (error) {
    console.error('❌ OGP画像生成中にエラーが発生しました:');
    console.error(error);
    process.exit(1);
  }
}

// エラーハンドリング
process.on('unhandledRejection', (reason, promise) => {
  console.error('❌ 未処理のPromise拒否:', reason);
  process.exit(1);
});

process.on('uncaughtException', (error) => {
  console.error('❌ 未捕捉の例外:', error);
  process.exit(1);
});

// メイン処理の実行
main().catch((error) => {
  console.error('❌ メイン処理でエラーが発生しました:', error);
  process.exit(1);
});