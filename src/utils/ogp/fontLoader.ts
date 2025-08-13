/**
 * フォント読み込み管理 - tabichina用
 */
import { readFileSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import type { FontConfig, SatoriFont } from './types';

// 現在のファイルのディレクトリパスを取得
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * フォント設定を取得
 */
export function getFontConfig(): FontConfig {
  const fontsDir = path.join(__dirname, 'fonts');
  
  return {
    regular: path.join(fontsDir, 'KaiseiHarunoUmi-Regular.ttf'),
    bold: path.join(fontsDir, 'KaiseiHarunoUmi-Bold.ttf'),
  };
}

/**
 * フォントを読み込む
 */
export function loadFonts(): { regular: ArrayBuffer; bold: ArrayBuffer } {
  const config = getFontConfig();
  
  try {
    const regular = readFileSync(config.regular);
    const bold = readFileSync(config.bold);
    
    return {
      regular: regular.buffer.slice(regular.byteOffset, regular.byteOffset + regular.byteLength),
      bold: bold.buffer.slice(bold.byteOffset, bold.byteOffset + bold.byteLength),
    };
  } catch (error) {
    console.error('フォントの読み込みに失敗しました:', error);
    throw new Error(`フォントファイルが見つかりません: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Satori用のフォント設定を生成
 */
export function getSatoriFont(fonts: { regular: ArrayBuffer; bold: ArrayBuffer }): SatoriFont[] {
  return [
    {
      name: 'Kaisei Harunoumi',
      data: fonts.regular,
      weight: 400,
      style: 'normal',
    },
    {
      name: 'Kaisei Harunoumi',
      data: fonts.bold,
      weight: 700,
      style: 'normal',
    },
  ];
}

/**
 * フォントが存在するかチェック
 */
export function validateFonts(): boolean {
  const config = getFontConfig();
  
  try {
    readFileSync(config.regular);
    readFileSync(config.bold);
    return true;
  } catch {
    return false;
  }
}