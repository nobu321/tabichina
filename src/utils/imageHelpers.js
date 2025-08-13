/**
 * 画像最適化のためのヘルパー関数
 * tabichina プロジェクト用に最適化
 */

/**
 * 画像タイプに応じた幅配列を取得
 * @param {string} type - 画像タイプ (photo, screenshot, hero, logo)
 * @param {number} baseWidth - ベース幅（指定されている場合）
 * @returns {number[]} 幅配列
 */
export function getImageWidths(type, baseWidth = null) {
  const defaults = {
    photo: [480, 768, 1024, 1200],
    screenshot: [320, 480, 640],
    hero: [768, 1024, 1400, 1920],
    logo: [120, 240, 360]
  };

  const defaultWidths = defaults[type] || defaults.photo;
  
  // baseWidthが指定されている場合は、それを基準にした配列を生成
  if (baseWidth) {
    const ratios = [0.5, 0.75, 1, 1.5];
    return ratios.map(ratio => Math.round(baseWidth * ratio))
      .filter(width => width >= 240); // 最小幅は240px
  }
  
  return defaultWidths;
}

/**
 * 画像タイプに応じたsizes属性を取得
 * @param {string} type - 画像タイプ
 * @returns {string} sizes属性の値
 */
export function getImageSizes(type) {
  const sizes = {
    photo: "(max-width: 768px) 480px, (max-width: 1024px) 768px, 1024px",
    screenshot: "(max-width: 480px) 320px, 480px",
    hero: "100vw",
    logo: "240px"
  };
  
  return sizes[type] || sizes.photo;
}

/**
 * 画像タイプに応じた品質を取得
 * @param {string} type - 画像タイプ
 * @returns {number} 品質 (0-100)
 */
export function getImageQuality(type) {
  const qualities = {
    photo: 80,
    screenshot: 90, // 文字の可読性重視
    hero: 80,
    logo: 95 // 高品質を維持
  };
  
  return qualities[type] || 80;
}

/**
 * 画像タイプに応じたデフォルトサイズを取得
 * @param {string} type - 画像タイプ
 * @returns {object} {width, height}
 */
export function getImageSize(type) {
  const sizes = {
    photo: { width: 800, height: 600 },
    screenshot: { width: 480, height: 720 },
    hero: { width: 1200, height: 800 },
    logo: { width: 240, height: 120 }
  };
  
  return sizes[type] || sizes.photo;
}

/**
 * 画像パスを構築
 * @param {string} type - 画像タイプ
 * @param {string} src - 画像ファイル名
 * @returns {string} 構築されたパス
 */
export function getImagePath(type, src) {
  const basePaths = {
    photo: 'photos',
    screenshot: 'screenshots', 
    hero: 'hero',
    logo: 'logos'
  };
  
  const basePath = basePaths[type] || basePaths.photo;
  return `${basePath}/${src}`;
}

/**
 * 画像インポート用の動的インポート関数を生成
 * @param {string} type - 画像タイプ
 * @param {string} src - 画像ファイル名
 * @returns {function} インポート関数
 */
// Vite対応：全画像ファイルをglobで事前読み込み
const imageModules = import.meta.glob('../assets/images/**/*', { eager: false });


export function createImageImporter(type, src) {
  const path = getImagePath(type, src);
  
  return async () => {
    // 拡張子が既に含まれているかチェック
    const hasExtension = /\.(jpg|jpeg|png|webp|avif|gif)$/i.test(src);
    
    if (hasExtension) {
      // 拡張子がある場合はそのまま使用
      const fullPath = `../assets/images/${path}`;
      
      if (imageModules[fullPath]) {
        const module = await imageModules[fullPath]();
        return module;
      } else {
        throw new Error(`Image not found: ${path}`);
      }
    } else {
      // 拡張子がない場合は一般的な拡張子を試行
      const extensions = ['jpg', 'jpeg', 'png', 'webp'];
      
      for (const ext of extensions) {
        const pathWithExt = `${path}.${ext}`;
        const fullPath = `../assets/images/${pathWithExt}`;
        
        if (imageModules[fullPath]) {
          const module = await imageModules[fullPath]();
          return module;
        }
      }
      
      // 全ての拡張子で失敗した場合はフォールバック
      const fallbacks = {
        photo: 'default-photo.jpg',
        screenshot: 'default-screenshot.jpg',
        hero: 'default-hero.jpg',
        logo: 'default-logo.png'
      };
      
      const fallbackFile = fallbacks[type];
      if (fallbackFile && src !== fallbackFile) {
        const fallbackPath = `../assets/images/${getImagePath(type, fallbackFile)}`;
        
        if (imageModules[fallbackPath]) {
          const fallbackModule = await imageModules[fallbackPath]();
          console.warn(`Image not found: ${path}, using fallback: ${fallbackFile}`);
          return fallbackModule;
        } else {
          console.error(`Fallback image also not found: ${fallbackFile}`);
          throw new Error(`Image not found: ${src} (tried extensions: ${extensions.join(', ')})`);
        }
      }
      throw new Error(`Image not found: ${src} (tried extensions: ${extensions.join(', ')})`);
    }
  };
}