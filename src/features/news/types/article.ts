export type NewsArticleSection = Readonly<{
  heading: string;
  paragraphs: ReadonlyArray<string>;
  points?: ReadonlyArray<string>;
}>;

export type NewsArticle = Readonly<{
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  image: string;
  imageAlt: string;
  introduction: string;
  sections: ReadonlyArray<NewsArticleSection>;
  featured?: boolean;
}>;
