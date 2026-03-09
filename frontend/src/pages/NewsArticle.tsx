import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import TopBar from "@/components/TopBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import { Calendar, Clock } from "lucide-react";

const API_BASE = (import.meta.env.VITE_API_URL as string) || "";

type NewsPost = {
  id: string;
  title: string;
  content?: string;
  excerpt?: string;
  category?: string;
  imageUrl?: string;
  imageAlt?: string;
  createdAt?: string;
  readTime?: string;
};

type NewsSummary = {
  id: string | number;
  title: string;
  date: string;
};

const formatDate = (iso?: string) => {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

const NewsArticle = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<NewsPost | null>(null);
  const [latest, setLatest] = useState<NewsSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    setNotFound(false);
    fetch(`${API_BASE}/api/posts/news/${id}`)
      .then(async (res) => {
        if (res.status === 404) {
          setNotFound(true);
          return null;
        }
        if (!res.ok) {
          throw new Error("Failed to load article");
        }
        return (await res.json()) as NewsPost;
      })
      .then((data) => {
        if (data) setPost(data);
      })
      .catch(() => {
        setNotFound(true);
      })
      .finally(() => setLoading(false));
  }, [id]);

  useEffect(() => {
    if (!post) return;
    const originalTitle = document.title;
    const originalDescription = document
      .querySelector('meta[name="description"]')
      ?.getAttribute("content");

    const metaTitle = post.title ? `${post.title} | Brainfeed News` : "Brainfeed News";
    document.title = metaTitle;

    const desc = post.excerpt || "";
    let metaEl = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
    if (!metaEl) {
      metaEl = document.createElement("meta");
      metaEl.name = "description";
      document.head.appendChild(metaEl);
    }
    if (desc) {
      metaEl.content = desc;
    }

    return () => {
      document.title = originalTitle;
      if (metaEl && originalDescription !== null && originalDescription !== undefined) {
        metaEl.content = originalDescription;
      }
    };
  }, [post]);

  useEffect(() => {
    fetch(`${API_BASE}/api/articles`)
      .then((res) => (res.ok ? res.json() : []))
      .then((data: any[]) => {
        const items = (Array.isArray(data) ? data : [])
          .slice(0, 5)
          .map((a) => ({ id: a.id, title: a.title, date: a.date })) as NewsSummary[];
        setLatest(items);
      })
      .catch(() => setLatest([]));
  }, []);

  const imageSrc = post?.imageUrl?.trim() || "";

  return (
    <div className="min-h-screen bg-background">
      <TopBar />
      <Header />

      <main>
        <section className="border-b border-border/60 py-6 md:py-8">
          <div className="container">
            <ScrollReveal direction="up" once>
              <nav className="text-xs text-muted-foreground font-sans mb-2">
                <Link to="/" className="hover:text-accent">
                  Home
                </Link>
                <span className="mx-1">›</span>
                <Link to="/news" className="hover:text-accent">
                  News
                </Link>
                {post?.category && (
                  <>
                    <span className="mx-1">›</span>
                    <span>{post.category}</span>
                  </>
                )}
              </nav>
              {loading ? (
                <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl text-foreground">
                  Loading article…
                </h1>
              ) : notFound || !post ? (
                <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl text-foreground">
                  Article not found
                </h1>
              ) : (
                <>
                  <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-foreground leading-tight">
                    {post.title}
                  </h1>
                  <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-muted-foreground font-sans">
                    {post.category && (
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-accent/10 text-accent text-[10px] font-semibold uppercase tracking-[0.16em]">
                        {post.category}
                      </span>
                    )}
                    {post.createdAt && (
                      <span className="flex items-center gap-1.5">
                        <Calendar className="h-3.5 w-3.5" />
                        {formatDate(post.createdAt)}
                      </span>
                    )}
                    {post.readTime && (
                      <span className="flex items-center gap-1.5">
                        <Clock className="h-3.5 w-3.5" />
                        {post.readTime}
                      </span>
                    )}
                  </div>
                </>
              )}
            </ScrollReveal>
          </div>
        </section>

        {!loading && post && !notFound && (
          <section className="py-10 md:py-14">
            <div className="container grid gap-10 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] items-start">
              <ScrollReveal direction="up" once>
                <article>
                  {imageSrc && (
                    <div className="mb-6 rounded-2xl overflow-hidden border border-border/60 bg-card">
                      <img
                        src={imageSrc}
                        alt={post.imageAlt || post.title}
                        className="w-full h-auto object-cover"
                      />
                    </div>
                  )}
                  <div className="news-article-body prose prose-sm sm:prose-base max-w-none text-foreground font-sans leading-relaxed">
                    {post.content ? (
                      <div
                        className="space-y-4"
                        dangerouslySetInnerHTML={{ __html: post.content }}
                      />
                    ) : (
                      <p className="text-muted-foreground">
                        Full article content will be available soon.
                      </p>
                    )}
                  </div>
                </article>
              </ScrollReveal>

              <ScrollReveal direction="up" once>
                <aside className="space-y-8">
                  <div>
                    <h2 className="font-serif text-sm uppercase tracking-[0.22em] text-muted-foreground mb-3">
                      Latest News
                    </h2>
                    <div className="space-y-3 text-sm font-sans">
                      {latest.map((item) => (
                        <div key={item.id} className="border-b border-border/40 pb-2 last:border-b-0">
                          <Link
                            to={`/news/${item.id}`}
                            className="block text-foreground hover:text-accent leading-snug"
                          >
                            {item.title}
                          </Link>
                          {item.date && (
                            <p className="mt-1 text-[11px] text-muted-foreground">{item.date}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </aside>
              </ScrollReveal>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default NewsArticle;

