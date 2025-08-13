import { defineConfig } from 'astro/config';
import icon from "astro-icon";
import sitemap from "@astrojs/sitemap";
import react from "@astrojs/react";
import mdx from "@astrojs/mdx";

// 支払い・サイト設定
const paymentConfig = {
  // サイト情報
  SITE_TITLE: 'Alipayの使い方',
  SITE_TITLE_TEMPLATE: '%s | Alipayの使い方',
  SITE_DESCRIPTION: 'Alipay、WeChat Pay、UnionPayなど中国の決済方法を徹底解説。使える場所、使えない場所から設定方法まで完全ガイド。',
  
  // 国の設定
  TARGET_COUNTRY_NAME: '中国',
  TARGET_COUNTRY_SLUG: 'china',
  TARGET_COUNTRY_FLAG: 'china.svg'
};

export default defineConfig({
  site: 'https://www.tabichina.jp',
  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp'
    }
  },
  integrations: [
    react(),
    mdx(),
    icon({
      include: {
        mdi: "*", // 全MDIアイコンを許可（開発時）
      },
    }),
    sitemap({
      i18n: {
        defaultLocale: 'ja',
        locales: {
          ja: 'ja-JP'
        }
      }
    })
  ],
  vite: {
    define: {
      'import.meta.env.PAYMENT_CONFIG': JSON.stringify(paymentConfig)
    }
  }
});