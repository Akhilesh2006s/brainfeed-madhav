import { useEffect, useState } from "react";
import TopBar from "@/components/TopBar";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import LatestNews from "@/components/LatestNews";
import CategorySection from "@/components/CategorySection";
import MagazineSection from "@/components/MagazineSection";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";
import FloatingSubscribe from "@/components/FloatingSubscribe";

const API_BASE = (import.meta.env.VITE_API_URL as string) || "";

type NewsArticle = {
  id: string | number;
  imageUrl?: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  readTime: string;
};

const Index = () => {
  const [articles, setArticles] = useState<NewsArticle[]>([]);

  useEffect(() => {
    fetch(`${API_BASE}/api/articles`)
      .then((res) => (res.ok ? res.json() : []))
      .then((data: NewsArticle[]) => setArticles(Array.isArray(data) ? data : []))
      .catch(() => setArticles([]));
  }, []);

  const byCategory = (name: string) =>
    articles.filter((a) => a.category === name).slice(0, 4).map((a) => ({
      image: a.imageUrl,
      title: a.title,
      date: a.date,
      tag: a.category,
      readTime: a.readTime,
    }));

  const expertViewArticles = byCategory("Expert View");
  const technologyArticles = byCategory("Technology");
  const parentingArticles = byCategory("Parenting");
  return (
    <div className="min-h-screen bg-background">
      <TopBar />
      <Header />
      <main>
        <HeroSection />
        <LatestNews articles={articles} />
        <div className="border-t border-border/50">
          <CategorySection title="Expert View" articles={expertViewArticles} />
        </div>
        <div className="border-t border-border/50">
          <CategorySection title="Technology" articles={technologyArticles} />
        </div>
        <div className="border-t border-border/50">
          <CategorySection title="Parenting" articles={parentingArticles} />
        </div>
        <MagazineSection />
        <Newsletter />
      </main>
      <Footer />
      <FloatingSubscribe />
    </div>
  );
};

export default Index;
