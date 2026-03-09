import { useEffect, useState } from "react";
import ScrollReveal from "./ScrollReveal";

const API_BASE = (import.meta.env.VITE_API_URL as string) || "";

type NewsArticle = {
  id: string | number;
  imageUrl?: string;
  imageAlt?: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  readTime: string;
};

interface LatestNewsProps {
  articles?: NewsArticle[];
}

function getImageSrc(article: Pick<NewsArticle, "imageUrl">) {
  return (article.imageUrl || "").trim();
}

const LatestNews = ({ articles: articlesProp }: LatestNewsProps) => {
  const [articles, setArticles] = useState<NewsArticle[]>(articlesProp || []);

  useEffect(() => {
    if (articlesProp && articlesProp.length) {
      setArticles(articlesProp);
      return;
    }
    fetch(`${API_BASE}/api/articles`)
      .then((res) => (res.ok ? res.json() : []))
      .then((data: NewsArticle[]) => setArticles(Array.isArray(data) ? data : []))
      .catch(() => setArticles([]));
  }, [articlesProp]);

  if (!articles.length) {
    return null;
  }

  const [featured, ...restAll] = articles;
  const rest = restAll.slice(0, 3);

  return (
    <section id="news" className="py-10 sm:py-12 md:py-16 lg:py-20">
      <div className="container">
        <ScrollReveal direction="up">
          <h2 className="section-title">Latest News</h2>
        </ScrollReveal>

        <div className="mt-6 sm:mt-8 md:mt-10 grid grid-cols-1 lg:grid-cols-[3fr,2fr] gap-6 sm:gap-8 lg:gap-10">
          {/* Featured story with image */}
          <ScrollReveal direction="up">
            <article className="glass-card overflow-hidden flex flex-col h-full">
              <div className="relative">
                {getImageSrc(featured) ? (
                  <img
                    src={getImageSrc(featured)}
                    alt={featured.imageAlt || featured.title}
                    className="w-full h-56 sm:h-64 md:h-72 object-cover"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-56 sm:h-64 md:h-72 bg-muted" />
                )}
              </div>
              <div className="p-4 sm:p-5 md:p-6 flex flex-col gap-3">
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-semibold uppercase tracking-[0.18em]">
                  {featured.category}
                </span>
                <h3 className="font-serif text-lg sm:text-xl md:text-2xl text-foreground leading-snug">
                  {featured.title}
                </h3>
                <p className="text-sm md:text-base text-muted-foreground font-sans leading-relaxed">
                  {featured.excerpt}
                </p>
                <div className="mt-1 flex items-center gap-4 text-[11px] text-muted-foreground/80 font-sans">
                  <span>{featured.author}</span>
                  <span className="h-1 w-1 rounded-full bg-muted-foreground/40" />
                  <span>{featured.date}</span>
                  <span className="h-1 w-1 rounded-full bg-muted-foreground/40" />
                  <span>{featured.readTime}</span>
                </div>
              </div>
            </article>
          </ScrollReveal>

          {/* Side list of other stories */}
          <div className="flex flex-col gap-3 sm:gap-4 md:gap-5">
            {rest.map((article, index) => (
              <ScrollReveal key={article.title} delay={0.05 * index} direction="up">
                <article className="glass-card flex gap-3 md:gap-4 p-3 sm:p-3.5 md:p-4 min-h-[72px] sm:min-h-0">
                  <div className="hidden sm:block w-24 md:w-28 flex-shrink-0 overflow-hidden rounded-lg">
                    {getImageSrc(article) ? (
                      <img
                        src={getImageSrc(article)}
                        alt={article.imageAlt || article.title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full bg-muted" />
                    )}
                  </div>
                  <div className="flex-1 flex flex-col gap-1">
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-[10px] font-semibold uppercase tracking-[0.16em]">
                      {article.category}
                    </span>
                    <h4 className="font-serif text-[15px] md:text-[16px] text-foreground leading-snug line-clamp-2">
                      {article.title}
                    </h4>
                    <p className="hidden md:block text-xs text-muted-foreground/90 font-sans line-clamp-2">
                      {article.excerpt}
                    </p>
                    <div className="mt-1 flex items-center gap-3 text-[11px] text-muted-foreground/80 font-sans">
                      <span>{article.author}</span>
                      <span className="h-1 w-1 rounded-full bg-muted-foreground/40" />
                      <span>{article.readTime}</span>
                    </div>
                  </div>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LatestNews;
