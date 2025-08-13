import { type CollectionEntry, getCollection } from 'astro:content';

export type ArticleEntry = CollectionEntry<'articles'>;
export type CategoryType = 'info' | 'setup' | 'howto';

/**
 * カテゴリ別記事取得
 */
export async function getArticlesByCategory(category: CategoryType): Promise<ArticleEntry[]> {
  const articles = await getCollection('articles', ({ data }) => {
    return data.draft !== true && data.category === category;
  });
  
  // order順でソート
  return articles.sort((a, b) => a.data.order - b.data.order);
}

/**
 * 全記事を取得
 */
export async function getAllArticles(): Promise<ArticleEntry[]> {
  const articles = await getCollection('articles', ({ data }) => {
    return data.draft !== true;
  });
  
  return articles.sort((a, b) => {
    // カテゴリ順、その後order順でソート
    const categoryOrder = { info: 1, setup: 2, howto: 3 };
    const categoryDiff = categoryOrder[a.data.category] - categoryOrder[b.data.category];
    
    if (categoryDiff !== 0) return categoryDiff;
    return a.data.order - b.data.order;
  });
}

/**
 * 関連記事取得（タグベースまたは同カテゴリ）
 */
export async function getRelatedArticles(
  currentArticle: ArticleEntry, 
  limit: number = 3
): Promise<ArticleEntry[]> {
  const allArticles = await getAllArticles();
  const currentTags = currentArticle.data.tags || [];
  
  // 現在の記事を除外
  const otherArticles = allArticles.filter(article => article.slug !== currentArticle.slug);
  
  // タグマッチ記事
  const tagMatchArticles = otherArticles.filter(article => {
    const articleTags = article.data.tags || [];
    return articleTags.some(tag => currentTags.includes(tag));
  });
  
  // タグマッチ記事が足りない場合は同カテゴリから補完
  if (tagMatchArticles.length < limit) {
    const sameCategoryArticles = otherArticles.filter(article => 
      article.data.category === currentArticle.data.category &&
      !tagMatchArticles.includes(article)
    );
    
    tagMatchArticles.push(...sameCategoryArticles.slice(0, limit - tagMatchArticles.length));
  }
  
  return tagMatchArticles.slice(0, limit);
}

/**
 * 前後記事取得（同カテゴリ内での順序）
 */
export async function getPrevNextArticle(currentArticle: ArticleEntry): Promise<{
  prev: ArticleEntry | null;
  next: ArticleEntry | null;
}> {
  const categoryArticles = await getArticlesByCategory(currentArticle.data.category);
  const currentIndex = categoryArticles.findIndex(article => article.slug === currentArticle.slug);
  
  return {
    prev: currentIndex > 0 ? categoryArticles[currentIndex - 1] : null,
    next: currentIndex < categoryArticles.length - 1 ? categoryArticles[currentIndex + 1] : null
  };
}

/**
 * カテゴリ別記事数取得
 */
export async function getArticleCount(): Promise<Record<CategoryType, number>> {
  const allArticles = await getAllArticles();
  
  return {
    info: allArticles.filter(article => article.data.category === 'info').length,
    setup: allArticles.filter(article => article.data.category === 'setup').length,
    howto: allArticles.filter(article => article.data.category === 'howto').length,
  };
}

/**
 * 現在記事のカテゴリ内位置取得
 */
export async function getArticlePosition(currentArticle: ArticleEntry): Promise<{
  current: number;
  total: number;
  category: CategoryType;
}> {
  const categoryArticles = await getArticlesByCategory(currentArticle.data.category);
  const currentIndex = categoryArticles.findIndex(article => article.slug === currentArticle.slug);
  
  return {
    current: currentIndex + 1,
    total: categoryArticles.length,
    category: currentArticle.data.category
  };
}

/**
 * カテゴリ表示名取得
 */
export function getCategoryName(category: CategoryType): string {
  const categoryNames = {
    info: '基本情報',
    setup: 'セットアップ',
    howto: '使い方'
  };
  
  return categoryNames[category] || category;
}

/**
 * 次に読むべき推奨記事取得（シンプルなロジック）
 */
export async function getRecommendedNext(currentArticle: ArticleEntry): Promise<ArticleEntry | null> {
  const { next } = await getPrevNextArticle(currentArticle);
  
  // 同カテゴリの次の記事があればそれを返す
  if (next) {
    return next;
  }
  
  // 同カテゴリが終わった場合、次のカテゴリの最初の記事を推奨
  const categoryOrder: CategoryType[] = ['info', 'setup', 'howto'];
  const currentCategoryIndex = categoryOrder.indexOf(currentArticle.data.category);
  
  if (currentCategoryIndex < categoryOrder.length - 1) {
    const nextCategory = categoryOrder[currentCategoryIndex + 1];
    const nextCategoryArticles = await getArticlesByCategory(nextCategory);
    return nextCategoryArticles[0] || null;
  }
  
  return null;
}