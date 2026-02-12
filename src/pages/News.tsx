import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useSearchParams } from "react-router-dom";
import TopBar from "@/components/TopBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Search, Calendar, ArrowRight, Newspaper } from "lucide-react";
import { Input } from "@/components/ui/input";
import news1 from "@/assets/news-1.jpg";
import news2 from "@/assets/news-2.jpg";
import news3 from "@/assets/news-3.jpg";
import news4 from "@/assets/news-4.jpg";
import news5 from "@/assets/news-5.jpg";
import news6 from "@/assets/news-6.jpg";

const newsCategorySlugToLabel: Record<string, string> = {
  achievement: "Achievement",
  "press-release": "Press Release",
  career: "Career",
  education: "Education",
  "institutional-profile": "Institutional Profile",
  internship: "Internship",
  jobs: "Jobs",
  "science-environment": "Science & Environment",
  technology: "Technology",
  "expert-view": "Expert View",
};

const newsCategories = [
  "All",
  "Achievement",
  "Press Release",
  "Career",
  "Education",
  "Institutional Profile",
  "Internship",
  "Jobs",
  "Science & Environment",
  "Technology",
  "Expert View",
];

const newsArticles = [
  {
    id: 1,
    image: news1,
    title: "ISC Class 12 Board Exams 2026 Begin February 12; Over 1.5 Lakh Students To Appear",
    excerpt:
      "The Indian School Certificate (ISC) Class 12 Board Examinations 2026 will begin on February 12, with Psychology as the first paper. The examinations will continue …",
    date: "Feb 10, 2026",
    category: "Education",
    readTime: "4 min read",
  },
  {
    id: 2,
    image: news2,
    title: "NCERT Launches Free Online Physics Course For Class 12 Students On SWAYAM",
    excerpt:
      "The National Council of Educational Research and Training (NCERT), under the Ministry of Education, has launched a free online Physics course for Class 12 students …",
    date: "Feb 10, 2026",
    category: "Education",
    readTime: "5 min read",
  },
  {
    id: 3,
    image: news3,
    title: "CBSE Board Exam 2026: Live Webcast On Exam Modalities To Be Held Tomorrow",
    excerpt:
      "CBSE Board Exams 2026: Nearly 46 lakh students will appear for the Class 10 and 12 examinations across India and abroad. The Central Board of …",
    date: "Feb 10, 2026",
    category: "Education",
    readTime: "4 min read",
  },
  {
    id: 4,
    image: news4,
    title: "CBSE Directs Schools To Upload Practical, Internal Assessment Marks By February 14",
    excerpt:
      "CBSE Board Exams 2026: School principals have been instructed to ensure strict compliance with deadlines and complete all pending processes before February 14. The Central …",
    date: "Feb 10, 2026",
    category: "Education",
    readTime: "4 min read",
  },
  {
    id: 5,
    image: news5,
    title: "CBSE Directs Schools To Update Class 11, 12 Teachers' Data For On-Screen Marking 2026",
    excerpt:
      "The Central Board of Secondary Education (CBSE) has directed all affiliated schools to update the data of teachers teaching Classes 11 and 12 on the …",
    date: "Feb 9, 2026",
    category: "Education",
    readTime: "5 min read",
  },
  {
    id: 6,
    image: news6,
    title: "Rashtriya Military Schools Admission 2026: Class 6, 9 Result, Interview Call Letter Released",
    excerpt:
      "The Rashtriya Military Schools (RMS) have announced the Common Entrance Test (CET) results for admission to Classes 6 and 9 for the 2026 academic session. …",
    date: "Feb 9, 2026",
    category: "Education",
    readTime: "4 min read",
  },
  {
    id: 7,
    image: news1,
    title: "West Bengal HS 2026: CCTV Cameras Mandatory At Centres, Strict Security Checks Announced",
    excerpt:
      "To ensure fair and smooth examinations, the West Bengal Council of Higher Secondary Education (WBCHSE) has announced enhanced monitoring and security measures for the Class …",
    date: "Feb 9, 2026",
    category: "Education",
    readTime: "4 min read",
  },
  {
    id: 8,
    image: news2,
    title: "Maharashtra Class 12 Board Exams Begin Today, Over 13 Lakh Students To Appear",
    excerpt:
      "The Maharashtra State Board of Secondary and Higher Secondary Education (MSBSHSE) has begun the Class 12 (HSC) board examinations today, February 10, 2026, which will …",
    date: "Feb 10, 2026",
    category: "Education",
    readTime: "4 min read",
  },
  {
    id: 9,
    image: news3,
    title: "CBSE Introduces On-Screen Marking for Class 12 Board Exams from 2026",
    excerpt:
      "The Central Board of Secondary Education (CBSE) has announced the introduction of On-Screen Marking (OSM) for the evaluation of Class 12 answer books, starting with …",
    date: "Feb 8, 2026",
    category: "Education",
    readTime: "5 min read",
  },
];

const News = () => {
  const [searchParams] = useSearchParams();
  const categoryFromUrl = searchParams.get("category");
  const initialCategory =
    categoryFromUrl && newsCategorySlugToLabel[categoryFromUrl]
      ? newsCategorySlugToLabel[categoryFromUrl]
      : "All";
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (categoryFromUrl && newsCategorySlugToLabel[categoryFromUrl]) {
      setActiveCategory(newsCategorySlugToLabel[categoryFromUrl]);
    }
  }, [categoryFromUrl]);

  const filteredArticles = newsArticles.filter((article) => {
    const matchCategory =
      activeCategory === "All" || article.category === activeCategory;
    const matchSearch =
      !searchQuery ||
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  const featuredArticle = filteredArticles[0];
  const gridArticles = filteredArticles.slice(1);

  return (
    <div className="min-h-screen bg-background">
      <TopBar />
      <Header />

      <main>
        <section className="relative py-16 md:py-24 lg:py-28 overflow-hidden border-b border-border/60">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
          <div className="container relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-2xl"
            >
              <div className="inline-flex items-center gap-2 text-accent mb-4">
                <Newspaper className="h-5 w-5" />
                <span className="text-xs font-semibold uppercase tracking-[0.2em]">
                  Brainfeed News
                </span>
              </div>
              <h1 className="font-serif text-4xl sm:text-5xl md:text-[3.25rem] lg:text-6xl text-foreground leading-tight">
                Latest education news and updates.
              </h1>
              <p className="mt-5 text-lg text-muted-foreground font-sans">
                Board exams, policy updates, and headlines from the education sector.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="bg-background border-b border-border/50 py-4">
          <div className="container">
            <div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                <Input
                  type="search"
                  placeholder="Search news..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 h-11 rounded-lg border-border bg-card"
                />
              </div>
              <div className="flex flex-wrap gap-2">
                {newsCategories.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setActiveCategory(cat)}
                    className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-colors ${
                      activeCategory === cat
                        ? "bg-accent text-accent-foreground"
                        : "bg-secondary text-muted-foreground hover:bg-secondary/80 hover:text-foreground"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 md:py-16">
          <div className="container">
            <AnimatePresence mode="wait">
              {filteredArticles.length === 0 ? (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center text-muted-foreground py-16"
                >
                  No news articles match your search.
                </motion.p>
              ) : (
                <>
                  {featuredArticle && (
                    <motion.div
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                      className="mb-12 md:mb-16"
                    >
                      <Link
                        to="#"
                        className="group block rounded-2xl overflow-hidden bg-card border border-border/50 shadow-sm hover:shadow-xl hover:border-accent/30 transition-all duration-300"
                      >
                        <div className="grid md:grid-cols-2 gap-0">
                          <div className="relative aspect-[16/10] md:aspect-auto md:min-h-[320px]">
                            <img
                              src={featuredArticle.image}
                              alt=""
                              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                          </div>
                          <div className="p-6 sm:p-8 md:p-10 flex flex-col justify-center">
                            <span className="inline-block px-2.5 py-1 rounded-full bg-accent/15 text-accent text-[10px] font-semibold uppercase tracking-wider mb-3">
                              {featuredArticle.category}
                            </span>
                            <h2 className="font-serif text-2xl md:text-3xl text-foreground leading-tight group-hover:text-accent transition-colors">
                              {featuredArticle.title}
                            </h2>
                            <p className="mt-3 text-muted-foreground font-sans leading-relaxed line-clamp-2">
                              {featuredArticle.excerpt}
                            </p>
                            <div className="mt-5 flex items-center gap-4 text-xs text-muted-foreground font-sans">
                              <span className="flex items-center gap-1.5">
                                <Calendar className="h-3.5 w-3.5" />
                                {featuredArticle.date}
                              </span>
                              <span>{featuredArticle.readTime}</span>
                            </div>
                            <span className="inline-flex items-center gap-1 mt-4 text-accent text-xs font-semibold uppercase tracking-wider group-hover:gap-2 transition-all">
                              Read more
                              <ArrowRight className="h-3.5 w-3.5" />
                            </span>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  )}

                  <motion.div
                    layout
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10"
                    initial="hidden"
                    animate="visible"
                    variants={{
                      visible: { transition: { staggerChildren: 0.06 } },
                      hidden: {},
                    }}
                  >
                    {gridArticles.map((post, index) => (
                      <motion.article
                        key={post.id}
                        layout
                        variants={{
                          hidden: { opacity: 0, y: 24 },
                          visible: { opacity: 1, y: 0 },
                        }}
                        transition={{ duration: 0.4 }}
                        className="group"
                      >
                        <Link
                          to="#"
                          className="block h-full rounded-2xl overflow-hidden bg-card border border-border/50 shadow-sm hover:shadow-lg hover:border-accent/30 transition-all duration-300"
                        >
                          <div className="relative overflow-hidden aspect-[16/10]">
                            <img
                              src={post.image}
                              alt=""
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                            <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-background/90 text-[10px] font-semibold uppercase tracking-wider text-foreground">
                              {post.category}
                            </span>
                          </div>
                          <div className="p-5 sm:p-6">
                            <h3 className="font-serif text-lg sm:text-xl text-foreground leading-snug line-clamp-2 group-hover:text-accent transition-colors">
                              {post.title}
                            </h3>
                            <p className="mt-2 text-sm text-muted-foreground line-clamp-2 font-sans">
                              {post.excerpt}
                            </p>
                            <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground font-sans">
                              <span className="flex items-center gap-1.5">
                                <Calendar className="h-3.5 w-3.5" />
                                {post.date}
                              </span>
                              <span>{post.readTime}</span>
                            </div>
                            <span className="inline-flex items-center gap-1 mt-4 text-accent text-xs font-semibold uppercase tracking-wider group-hover:gap-2 transition-all">
                              Read more
                              <ArrowRight className="h-3.5 w-3.5" />
                            </span>
                          </div>
                        </Link>
                      </motion.article>
                    ))}
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default News;
