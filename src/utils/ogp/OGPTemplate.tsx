import React from 'react';
import type { OGPTemplateProps } from './types';

/**
 * OGP画像のテンプレートコンポーネント - tabichina用
 * Satoriによってレンダリングされ、PNG画像に変換される
 */
const OGPTemplate: React.FC<OGPTemplateProps> = ({
  pageTitle = "Alipayの使い方をわかりやすく解説",
  pageDescription,
  siteUrl,
  pageType = "article",
  isHomePage = false,
}) => {
  // tabichina用のテーマカラー
  const primaryColor = '#D32F2F'; // メインカラー（赤系）
  const textColor = '#FFFFFF';
  const bgGradient = 'linear-gradient(135deg, #D32F2F 0%, #B71C1C 100%)';

  // サイトURLからドメイン部分を抽出
  let displayUrl = 'tabichina.jp';
  
  if (siteUrl && siteUrl.trim() !== '') {
    try {
      const url = new URL(siteUrl);
      displayUrl = url.hostname;
    } catch (e) {
      console.error("Invalid siteUrl:", siteUrl, e);
    }
  }

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      height: '100%',
      background: bgGradient,
      position: 'relative',
      overflow: 'hidden',
      fontFamily: '"Kaisei Harunoumi", sans-serif',
    }}>
      {/* 幾何学模様の背景 - 右上（決済・スマホをイメージ） */}
      <div style={{
        position: 'absolute',
        top: 0,
        right: 0,
        width: '400px',
        height: '400px',
        overflow: 'hidden',
        opacity: 0.1,
        display: 'flex',
      }}>
        {/* スマートフォンをイメージした四角形 */}
        <div style={{
          position: 'absolute',
          width: '120px',
          height: '200px',
          borderRadius: '15px',
          backgroundColor: '#FFFFFF',
          top: '50px',
          right: '100px',
        }} />
        {/* QRコードをイメージした正方形 */}
        <div style={{
          position: 'absolute',
          width: '80px',
          height: '80px',
          borderRadius: '8px',
          backgroundColor: '#FFFFFF',
          top: '90px',
          right: '130px',
        }} />
        {/* 決済をイメージした円形 */}
        <div style={{
          position: 'absolute',
          width: '100px',
          height: '100px',
          borderRadius: '50%',
          backgroundColor: '#FFFFFF',
          top: '200px',
          right: '50px',
        }} />
        {/* クレジットカードをイメージした長方形 */}
        <div style={{
          position: 'absolute',
          width: '150px',
          height: '30px',
          backgroundColor: '#FFFFFF',
          borderRadius: '5px',
          transform: 'rotate(-15deg)',
          top: '250px',
          right: '80px',
        }} />
      </div>

      {/* 左下の幾何学模様（Alipayロゴをイメージ） */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '350px',
        height: '350px',
        overflow: 'hidden',
        opacity: 0.1,
        display: 'flex',
      }}>
        {/* 大きな円（Alipayのロゴをイメージ） */}
        <div style={{
          position: 'absolute',
          width: '180px',
          height: '180px',
          borderRadius: '50%',
          backgroundColor: '#FFFFFF',
          bottom: '50px',
          left: '20px',
        }} />
        {/* 中央の円 */}
        <div style={{
          position: 'absolute',
          width: '100px',
          height: '100px',
          borderRadius: '50%',
          backgroundColor: '#FFFFFF',
          bottom: '150px',
          left: '120px',
        }} />
        {/* 決済フローをイメージした線 */}
        <div style={{
          position: 'absolute',
          width: '120px',
          height: '4px',
          backgroundColor: '#FFFFFF',
          transform: 'rotate(30deg)',
          bottom: '180px',
          left: '150px',
        }} />
      </div>

      {/* 背景装飾 - 上部 */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '4px',
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
      }} />

      {/* 背景装飾 - 下部 */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        height: '4px',
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
      }} />

      {/* Alipayアイコン風装飾 - 背景 */}
      <div style={{
        position: 'absolute',
        top: '40px',
        right: '40px',
        color: 'rgba(255, 255, 255, 0.08)',
        fontSize: '180px',
        fontWeight: 'bold',
      }}>
        A
      </div>

      {/* 決済アイコン風装飾 - 背景 */}
      <div style={{
        position: 'absolute',
        bottom: '40px',
        left: '100px',
        color: 'rgba(255, 255, 255, 0.08)',
        fontSize: '140px',
        fontWeight: 'bold',
      }}>
        ¥
      </div>

      {/* メインコンテンツエリア */}
      <div style={{
        position: 'absolute',
        top: '40px',
        left: '40px',
        right: '40px',
        bottom: '40px',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        display: 'flex',
        flexDirection: 'column',
      }}>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '40px 60px',
          height: '100%',
        }}>
          {/* サイトロゴ - 最上部 */}
          <div style={{
            marginBottom: '30px',
            display: 'flex',
          }}>
            <div style={{
              backgroundColor: 'white',
              color: primaryColor,
              fontSize: '18px',
              paddingLeft: '20px',
              paddingRight: '20px',
              paddingTop: '6px',
              paddingBottom: '6px',
              borderRadius: '8px',
              fontWeight: 700,
              letterSpacing: '0.5px',
            }}>
              ALIPAY USAGE GUIDE
            </div>
          </div>

          {/* メインタイトル */}
          <div style={{
            textAlign: 'center',
            marginBottom: '40px',
            display: 'flex',
            flexDirection: 'column',
          }}>
            <h1 style={{
              fontSize: pageTitle.length > 30 ? '44px' : '52px',
              fontWeight: 'bold',
              color: textColor,
              lineHeight: 1.3,
              maxWidth: '900px',
              fontFamily: '"Kaisei Harunoumi", serif',
              whiteSpace: 'pre-wrap',
              textAlign: 'center',
            }}>
              {pageTitle}
            </h1>
            
          </div>

          {/* 装飾ライン */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '40px',
            width: '60%',
          }}>
            <div style={{
              width: '100%',
              height: '2px',
              backgroundColor: 'rgba(255, 255, 255, 0.4)',
            }} />
          </div>

          {/* サイトタイトル */}
          {!isHomePage && (
            <div style={{
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
            }}>
              <h2 style={{
                fontSize: '36px',
                fontWeight: 'bold',
                color: textColor,
                lineHeight: 1.3,
                fontFamily: '"Kaisei Harunoumi", serif',
              }}>
                Alipayの使い方ガイド
              </h2>
            </div>
          )}
        </div>
      </div>

      {/* URL (右下) */}
      <div style={{
        position: 'absolute',
        bottom: '16px',
        right: '24px',
        color: 'rgba(255, 255, 255, 0.8)',
        fontSize: '14px',
        fontFamily: '"Kaisei Harunoumi", sans-serif',
      }}>
        {displayUrl}
      </div>
    </div>
  );
};

export default OGPTemplate;