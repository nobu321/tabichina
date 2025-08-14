/**
 * MDXグローバルコンポーネント定義
 * 
 * すべてのMDXファイルで自動的に利用可能なコンポーネントを定義します。
 * これにより、各MDXファイルでのインポート文が不要になります。
 */

// コンポーネントのインポート
import Summary from '../components/Summary.astro';
import ArticleSection from '../components/ArticleSection.astro';
import TextBlock from '../components/TextBlock.astro';
import BasicList from '../components/BasicList.astro';
import ConclusionSection from '../components/ConclusionSection.astro';
import HighlightBlock from '../components/HighlightBlock.astro';
import ImageCard from '../components/ImageCard.astro';
import DataShowcase from '../components/DataShowcase.astro';
import DataTable from '../components/DataTable.astro';
import FeatureList from '../components/FeatureList.astro';
import QuoteSection from '../components/QuoteSection.astro';
import MessageBox from '../components/MessageBox.astro';
import ArticleCrossLink from '../components/ArticleCrossLink.astro';
import ArticleCrossLinks from '../components/ArticleCrossLinks.astro';

/**
 * MDXで利用可能なコンポーネント一覧
 * 
 * このオブジェクトに定義されたコンポーネントは、
 * 全てのMDXファイルで自動的に利用可能になります。
 */
export const mdxComponents = {
  // 記事構造コンポーネント
  Summary,
  ArticleSection,
  ConclusionSection,
  
  // コンテンツ表示コンポーネント
  TextBlock,
  BasicList,
  FeatureList,
  DataTable,
  DataShowcase,
  
  // 強調・装飾コンポーネント
  HighlightBlock,
  QuoteSection,
  MessageBox,
  
  // メディアコンポーネント
  ImageCard,
  
  // 記事間リンクコンポーネント
  ArticleCrossLink,
  ArticleCrossLinks,
};

/**
 * MDXコンポーネントの型定義
 */
export type MDXComponents = typeof mdxComponents;

/**
 * 個別のコンポーネント型をエクスポート（必要に応じて）
 */
export type {
  Props as SummaryProps
} from '../components/Summary.astro';

export type {
  Props as ArticleSectionProps
} from '../components/ArticleSection.astro';

export type {
  Props as ImageCardProps
} from '../components/ImageCard.astro';


export type {
  Props as DataShowcaseProps,
  Metric
} from '../components/DataShowcase.astro';

export type {
  Props as QuoteSectionProps
} from '../components/QuoteSection.astro';

export type {
  Props as MessageBoxProps
} from '../components/MessageBox.astro';