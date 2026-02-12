import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useSearchParams } from "react-router-dom";
import TopBar from "@/components/TopBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Search, Calendar, ArrowRight, BookOpen } from "lucide-react";
import { Input } from "@/components/ui/input";
import news1 from "@/assets/news-1.jpg";
import news2 from "@/assets/news-2.jpg";
import news3 from "@/assets/news-3.jpg";
import news4 from "@/assets/news-4.jpg";
import news5 from "@/assets/news-5.jpg";
import news6 from "@/assets/news-6.jpg";

const categorySlugToLabel: Record<string, string> = {
  education: "Education",
  policy: "Policy",
  parenting: "Parenting",
  "expert-view": "Expert View",
  technology: "Technology",
};

const categories = [
  "All",
  "Education",
  "Policy",
  "Parenting",
  "Expert View",
  "Technology",
];

const blogPosts = [
  {
    id: 1,
    image: news1,
    title: "Union Budget 2026: Sahil Bista Urges Higher Education Funding to Build India as a Global Talent Hub",
    excerpt:
      "As the Union Budget approaches, the education sector is witnessing rising expectations amid growing practical challenges across the country.",
    date: "Feb 10, 2026",
    category: "Policy",
    readTime: "5 min read",
  },
  {
    id: 2,
    image: news2,
    title: "10 UNICEF Tips Every Parent Should Follow to Support a Child's Mental Health",
    excerpt:
      "In today's fast-paced environment, many parents struggle to balance work demands and children's emotional needs. UNICEF's guidance can help.",
    date: "Feb 9, 2026",
    category: "Parenting",
    readTime: "6 min read",
  },
  {
    id: 3,
    image: news3,
    title: "CBSE Class 12 Political Science Board Exam 2026: Sample Paper and Solutions Explained",
    excerpt:
      "With Class 12 board examinations approaching, CBSE has released the Political Science sample question paper and marking scheme for 2026.",
    date: "Feb 9, 2026",
    category: "Education",
    readTime: "4 min read",
  },
  {
    id: 4,
    image: news4,
    title: "Best Countries in the World at Reading",
    excerpt:
      "Reading remains a cornerstone of education. Nations that prioritise literacy shape how individuals think critically and engage with society.",
    date: "Feb 8, 2026",
    category: "Education",
    readTime: "7 min read",
  },
  {
    id: 5,
    image: news5,
    title: "From 'Gigil' to 'Morto': Oxford Adds Nearly 600 New Words in 2025",
    excerpt:
      "The Oxford English Dictionary has expanded again in 2025, adding close to 600 new words and expressions that reflect the rapid evolution of language.",
    date: "Feb 8, 2026",
    category: "Expert View",
    readTime: "5 min read",
  },
  {
    id: 6,
    image: news6,
    title: "The Aravallis Remained the Mughals' Unfinished Conquest. But Why?",
    excerpt:
      "Despite deploying vast resources and elite cavalry, the Mughal Empire never fully subdued the Aravalli range. A fascinating slice of history.",
    date: "Feb 7, 2026",
    category: "Education",
    readTime: "8 min read",
  },
  {
    id: 7,
    image: news1,
    title: "€104 Million to Undo a Digital Bet: Sweden Reverses a School Policy It Once Led",
    excerpt:
      "A significant shift is underway in Sweden's education system, signalling a rethink about the role of screens in learning.",
    date: "Feb 7, 2026",
    category: "Technology",
    readTime: "6 min read",
  },
  {
    id: 8,
    image: news2,
    title: "A New Continuum in the Classroom: How NCERT's Revised Class 7 Textbook Reconnects India's Past with Its Present",
    excerpt:
      "The revised Class 7 Social Science Part 2 textbook from NCERT represents a significant rethinking of how history is taught.",
    date: "Feb 6, 2026",
    category: "Education",
    readTime: "7 min read",
  },
  {
    id: 9,
    image: news3,
    title: "National Mathematics Day: Remembering Srinivasa Ramanujan and Why Maths Matters in Everyday Life",
    excerpt:
      "India observes National Mathematics Day every December 22 to commemorate the birth anniversary of one of the country's most celebrated mathematicians.",
    date: "Feb 6, 2026",
    category: "Education",
    readTime: "5 min read",
  },
  {
    id: 10,
    image: news4,
    title: "When Schools Exist Without Students: Inside India’s Growing Network of Empty Government Classrooms",
    excerpt:
      "Across India, thousands of government schools continue to operate in name—complete with sanctioned teachers, standing buildings, and annual budget allocations—despite having no students at all. …",
    date: "Jan 30, 2026",
    category: "Policy",
    readTime: "6 min read",
  },
  {
    id: 11,
    image: news5,
    title: "Top 5 Smart Strategies to Score High in Class 12 CBSE Biology 2026",
    excerpt:
      "Biology is a subject that demands a careful balance of conceptual understanding and retention. Relying solely on rote learning can be counterproductive, especially in the …",
    date: "Jan 28, 2026",
    category: "Education",
    readTime: "5 min read",
  },
  {
    id: 12,
    image: news6,
    title: "Over 5,000 Government Schools Report Zero Enrolment; Telangana and West Bengal Account for 70%",
    excerpt:
      "More than 5,000 government-run schools across India recorded zero student enrolment in the 2024–25 academic year, according to official data presented in Parliament. The figures …",
    date: "Jan 25, 2026",
    category: "Policy",
    readTime: "5 min read",
  },
  {
    id: 13,
    image: news1,
    title: "Is debating an essential skill for all students?",
    excerpt:
      "In classrooms around the world, students are increasingly being introduced to the art of debating. From small group discussions to formal competitions, debating has found …",
    date: "Jan 20, 2026",
    category: "Education",
    readTime: "4 min read",
  },
  {
    id: 14,
    image: news2,
    title: "CBSE Reforms 2025: Key Changes Poised to Redefine Student Learning",
    excerpt:
      "The Central Board of Secondary Education (CBSE) has announced a series of significant reforms that will reshape India’s school education landscape from 2026 onward. Designed …",
    date: "Jan 15, 2026",
    category: "Policy",
    readTime: "6 min read",
  },
  {
    id: 15,
    image: news3,
    title: "From Class 9 to Harvard: A Complete Guide to Ivy League Admissions for Indian Students",
    excerpt:
      "For thousands of ambitious Indian students, the phrase “Ivy League” evokes more than academic prestige—it represents a gateway to global opportunity. Comprising Harvard, Yale, …",
    date: "Dec 20, 2025",
    category: "Education",
    readTime: "8 min read",
  },
  {
    id: 16,
    image: news4,
    title: "CBSE Class 10 Mathematics Sample Paper 2025-26 Out",
    excerpt:
      "The Central Board of Secondary Education (CBSE) has released the Mathematics (Code 041) sample paper for the 2025-26 session for Class 10 students. The CBSE …",
    date: "Dec 10, 2025",
    category: "Education",
    readTime: "4 min read",
  },
  {
    id: 17,
    image: news5,
    title: "National Education Day 2025: Why India Celebrates It on November 11",
    excerpt:
      "Every year on November 11, India observes National Education Day, a tribute to Maulana Abul Kalam Azad, the nation’s first Education Minister and a central …",
    date: "Nov 11, 2025",
    category: "Education",
    readTime: "5 min read",
  },
  {
    id: 18,
    image: news6,
    title: "PM SHRI Schools: Translating NEP 2020 from Policy to Practice",
    excerpt:
      "When Prime Minister Narendra Modi announced the PM SHRI (Prime Minister Schools for Rising India) initiative in 2022, it marked one of the most ambitious …",
    date: "Nov 5, 2025",
    category: "Policy",
    readTime: "6 min read",
  },
  /* Blog page 3 – https://brainfeedmagazine.com/category/blog/page/3/ */
  {
    id: 19,
    image: news1,
    title: "KBC Contestant's TV Moment Sparks Parenting Debate",
    excerpt:
      "A recent episode of Kaun Banega Crorepati (KBC) featuring 10-year-old contestant, from Gujarat, has sparked a wave of social media debate. Instead of leaving the …",
    date: "Oct 28, 2025",
    category: "Parenting",
    readTime: "5 min read",
  },
  {
    id: 20,
    image: news2,
    title: "No TikTok, Insta: Chilean School Blocks Phones, Students Reconnect With Real-World Life",
    excerpt:
      "Volleyball, basketball, ping pong, dancing rehearsals or simple chats. Dozens of teens are rediscovering how to reconnect to the real world after a school in …",
    date: "Oct 25, 2025",
    category: "Education",
    readTime: "5 min read",
  },
  {
    id: 21,
    image: news3,
    title: "Over 33 Lakh Students Study in Single-Teacher Schools Across India: Report",
    excerpt:
      "India's education system continues to face a significant challenge with the existence of over one lakh single-teacher schools across the country. According to the Ministry …",
    date: "Oct 20, 2025",
    category: "Policy",
    readTime: "5 min read",
  },
  {
    id: 22,
    image: news4,
    title: "8 proven tips to ace Scholastic Assessment Test and boost your marks",
    excerpt:
      "For students aspiring to study at top global universities, the SAT remains a gateway to opportunity. Far more than just another exam, it is designed …",
    date: "Oct 15, 2025",
    category: "Education",
    readTime: "6 min read",
  },
  {
    id: 23,
    image: news5,
    title: "Reflections: Growth Through Learning and Experience",
    excerpt:
      "As every child is unique with various capabilities, so is each teacher. Being a teacher today, when I reflect on my childhood and school life, …",
    date: "Oct 10, 2025",
    category: "Expert View",
    readTime: "5 min read",
  },
  {
    id: 24,
    image: news6,
    title: "Inspiring Educators: How Teachers Shape Character and Knowledge for Tomorrow",
    excerpt:
      "Modelling the role of a perfect human being is the primary duty of a teacher. The idiom \"walk the talk\" perfectly suits a teacher in …",
    date: "Oct 5, 2025",
    category: "Education",
    readTime: "6 min read",
  },
  {
    id: 25,
    image: news1,
    title: "Nineteen Years of Passionate Teaching: A Heartfelt Journey of Inspiration",
    excerpt:
      "Nineteen years ago, I stepped into this noble profession, along with my little son who was just beginning his own schooling. What started as a …",
    date: "Sep 28, 2025",
    category: "Expert View",
    readTime: "6 min read",
  },
  {
    id: 26,
    image: news2,
    title: "Teachers as Architects of Young Minds: Guiding Beyond the Classroom",
    excerpt:
      "\"Teachers can change lives with just the mixture of chalk and challenges.\" Education is not just to reform students, to amuse them, or to make …",
    date: "Sep 22, 2025",
    category: "Education",
    readTime: "5 min read",
  },
  {
    id: 27,
    image: news3,
    title: "How Denmark's School System Prepares Students For Future",
    excerpt:
      "Do you want to know how schools in Denmark prepare students for life? Denmark's school system focuses on helping students learn useful skills for work …",
    date: "Sep 15, 2025",
    category: "Education",
    readTime: "6 min read",
  },
  /* Blog page 4 – https://brainfeedmagazine.com/category/blog/page/4/ */
  {
    id: 28,
    image: news4,
    title: "Teaching Beyond Textbooks: The Journey of Touching Lives",
    excerpt:
      "In my classroom, I have always believed that education is not confined to lessons in a textbook. When I remind my children that even a …",
    date: "Sep 10, 2025",
    category: "Expert View",
    readTime: "5 min read",
  },
  {
    id: 29,
    image: news5,
    title: "Guiding Students Through Industry 4.0: An Educator's Perspective",
    excerpt:
      "The Fourth Industrial Revolution (Industry 4.0)—driven by Artificial Intelligence, robotics, big data, and automation—is reshaping the skills our students need to succeed. AI is no …",
    date: "Sep 5, 2025",
    category: "Technology",
    readTime: "7 min read",
  },
  {
    id: 30,
    image: news6,
    title: "From Chalkboards to Mentorship: How Teachers Are Shaping the Future of Education",
    excerpt:
      "For centuries, the image of a teacher was closely tied to chalk, blackboards, and rows of students dutifully taking notes. Teachers were considered the primary …",
    date: "Aug 30, 2025",
    category: "Education",
    readTime: "6 min read",
  },
  {
    id: 31,
    image: news1,
    title: "How To Remember Everything When You are Reading for Exams",
    excerpt:
      "Students often struggle to retain information, finding that hours of studying seem to go to waste when they can't recall key details in the exam …",
    date: "Aug 25, 2025",
    category: "Education",
    readTime: "5 min read",
  },
  {
    id: 32,
    image: news2,
    title: "Teachers: Guiding Minds, Shaping Futures, Transforming Society",
    excerpt:
      "Teachers are pivotal figures in shaping society and future generations. Their influence extends far beyond the classroom, touching every aspect of human development and progress. …",
    date: "Aug 20, 2025",
    category: "Education",
    readTime: "5 min read",
  },
  {
    id: 33,
    image: news3,
    title: "Teachers' Day is a Celebration of Patience, Compassion, and Transformation: Hansa Chhabra",
    excerpt:
      "For many, Teachers' Day is a celebration marked by flowers, handmade cards, and heartfelt greetings. But for Hansa Chhabra, teacher at Sunbeam School, Varuna, Varanasi, …",
    date: "Aug 15, 2025",
    category: "Expert View",
    readTime: "5 min read",
  },
  {
    id: 34,
    image: news4,
    title: "Teachers as Guiding Lights: Nurturing Minds in the Age of AI",
    excerpt:
      "Teachers are often called the torchbearers of society. They guide not just individuals but entire generations, shaping how a community thinks, grows, and progresses. Having …",
    date: "Aug 10, 2025",
    category: "Education",
    readTime: "6 min read",
  },
  {
    id: 35,
    image: news5,
    title: "Equipping Young Minds with 21st Century Skills: Teachers as Catalysts of Change",
    excerpt:
      "The National Education Policy (NEP) emphasises the need for a child-centred approach in our classrooms. Its aim is to create a superior, holistic, and egalitarian …",
    date: "Aug 5, 2025",
    category: "Policy",
    readTime: "6 min read",
  },
  {
    id: 36,
    image: news6,
    title: "The Torchbearers: Illuminating Minds, Shaping Tomorrow",
    excerpt:
      "My Esteemed Colleagues, Dear Students, and Respected Parents, On this sacred occasion of Teacher's Day, my heart swells with immense joy and a profound sense …",
    date: "Aug 1, 2025",
    category: "Expert View",
    readTime: "6 min read",
  },
  /* Blog page 5 – https://brainfeedmagazine.com/category/blog/page/5/ */
  {
    id: 37,
    image: news1,
    title: "The Role of Teachers in Moulding Young Minds",
    excerpt:
      "Teachers are essential members of our society. They are pillars of knowledge, shaping the future of our children – educators, mentors, guides, and inspirations. Being …",
    date: "Jul 28, 2025",
    category: "Education",
    readTime: "5 min read",
  },
  {
    id: 38,
    image: news2,
    title: "Teaching Beyond the Blackboard: A Journey of Learning, Unlearning, and Relearning",
    excerpt:
      "Every teacher enters the classroom with a lesson plan, but often walks out with far more than what was written on the board. As a …",
    date: "Jul 25, 2025",
    category: "Expert View",
    readTime: "6 min read",
  },
  {
    id: 39,
    image: news3,
    title: "Teachers: The Timeless Architects of Future Generations",
    excerpt:
      "The influence of a teacher is like a ripple in water — it spreads silently yet reaches far and wide. A teacher's words, actions, and …",
    date: "Jul 20, 2025",
    category: "Education",
    readTime: "5 min read",
  },
  {
    id: 40,
    image: news4,
    title: "Teachers: Architects of Society and Shapers of the Future",
    excerpt:
      "\"Education is the most powerful weapon which you can use to change the world.\" – Nelson Mandela As a teacher, I have a new story …",
    date: "Jul 15, 2025",
    category: "Education",
    readTime: "6 min read",
  },
  {
    id: 41,
    image: news5,
    title: "Lighting the Spark: Inspiring Young Minds Through Teaching",
    excerpt:
      "Every smile, every spark, every question in the classroom becomes a stepping stone towards a brighter tomorrow. Teaching is not about finishing a syllabus; it …",
    date: "Jul 10, 2025",
    category: "Expert View",
    readTime: "5 min read",
  },
  {
    id: 42,
    image: news6,
    title: "Teaching Beyond Classrooms: A Journey of Growth, Flexibility, and Inspiration",
    excerpt:
      "Teachers are the torchbearers of knowledge who play an important role in moulding young minds. Often called the most noble profession, it carries with it …",
    date: "Jul 5, 2025",
    category: "Education",
    readTime: "5 min read",
  },
  {
    id: 43,
    image: news1,
    title: "Reflections: Respecting Teachers – A Call to Restore Dignity in Education",
    excerpt:
      "I began my journey in the world of education not out of passion but out of necessity. However, I soon realised that what started as …",
    date: "Jun 30, 2025",
    category: "Expert View",
    readTime: "6 min read",
  },
  {
    id: 44,
    image: news2,
    title: "Teachers: The Pillars of Society and Shapers of Future Generations",
    excerpt:
      "There was a time when students were recognised by the names of their teachers. Can you say why? It is because teachers are the creators …",
    date: "Jun 25, 2025",
    category: "Education",
    readTime: "5 min read",
  },
  {
    id: 45,
    image: news3,
    title: "From Mundane Lectures to Lively Classrooms",
    excerpt:
      "\"The classroom, to me, is now a stage where stories, ideas, and perspectives intersect, and each story, I believe, is more than just a text …",
    date: "Jun 20, 2025",
    category: "Education",
    readTime: "5 min read",
  },
  /* Blog page 6 – https://brainfeedmagazine.com/category/blog/page/6/ */
  {
    id: 46,
    image: news4,
    title: "Discipline and Proactivity: The Twin Powers that Shape Student Success",
    excerpt:
      "Every student has dreams. Some dream of becoming doctors, engineers, artists, or teachers. Some simply dream of making their parents proud. But have you ever …",
    date: "Jun 15, 2025",
    category: "Education",
    readTime: "5 min read",
  },
  {
    id: 47,
    image: news5,
    title: "Teachers as Burning Lenses: Shaping Knowledge into the Light of Tomorrow",
    excerpt:
      "In the journey of education, teachers can best be described as burning lenses. Much like a convex lens that gathers scattered rays of light and …",
    date: "Jun 10, 2025",
    category: "Expert View",
    readTime: "5 min read",
  },
  {
    id: 48,
    image: news6,
    title: "Shaping Minds, Shaping Society: The Enduring Impact of Teachers",
    excerpt:
      "Teachers are essential members of our society. They are pillars of knowledge, shaping the future of our children – educators, mentors, guides, and inspirations. Being …",
    date: "Jun 5, 2025",
    category: "Education",
    readTime: "5 min read",
  },
  {
    id: 49,
    image: news1,
    title: "Teaching: A Lifelong Calling That Touches Eternity",
    excerpt:
      "There are some professions that people choose for convenience, for stability, or for financial security. And then there are a few rare professions that choose …",
    date: "May 30, 2025",
    category: "Expert View",
    readTime: "6 min read",
  },
  {
    id: 50,
    image: news2,
    title: "Educators: Shaping Human Values in the Age of Artificial Intelligence",
    excerpt:
      "In a world evolving at breakneck speed, one truth remains timeless: educators are the architects of our future. Every lesson taught, every question answered, and …",
    date: "May 25, 2025",
    category: "Technology",
    readTime: "6 min read",
  },
  {
    id: 51,
    image: news3,
    title: "Teachers' Day 2025: Top 5 Inspiring Speeches from Around the World!",
    excerpt:
      "From long ago, teachers have been the cornerstone of every society as they not only help students build careers, but they also build nations, and …",
    date: "May 20, 2025",
    category: "Education",
    readTime: "6 min read",
  },
  {
    id: 52,
    image: news4,
    title: "Teachers: The Architects of Curiosity, Confidence, and Purpose",
    excerpt:
      "\"The best teachers are those who show you where to look, but don't tell you what to see.\" – Alexandra K. Trenfor Teachers are the …",
    date: "May 15, 2025",
    category: "Education",
    readTime: "5 min read",
  },
  {
    id: 53,
    image: news5,
    title: "Teachers: Shaping Tomorrow's Leaders with Compassion and Wisdom",
    excerpt:
      "Teachers, without a doubt, are role models for young children, and through their language, impressions, behaviour, and attitude, they significantly impact society and younger generations. …",
    date: "May 10, 2025",
    category: "Education",
    readTime: "5 min read",
  },
  {
    id: 54,
    image: news6,
    title: "Educators Honoured on Teachers' Day for Inspiring Generations",
    excerpt:
      "Every year, on 5th September, schools across India resonate with joy as students celebrate Teachers' Day. For children, it is a day to thank their …",
    date: "May 5, 2025",
    category: "Education",
    readTime: "5 min read",
  },
];

const POSTS_PER_PAGE = 9;

const Blog = () => {
  const [searchParams] = useSearchParams();
  const categoryFromUrl = searchParams.get("category");
  const pageFromUrl = searchParams.get("page");
  const initialCategory =
    categoryFromUrl && categorySlugToLabel[categoryFromUrl]
      ? categorySlugToLabel[categoryFromUrl]
      : "All";
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (categoryFromUrl && categorySlugToLabel[categoryFromUrl]) {
      setActiveCategory(categorySlugToLabel[categoryFromUrl]);
    }
  }, [categoryFromUrl]);

  const filteredPosts = blogPosts.filter((post) => {
    const matchCategory =
      activeCategory === "All" || post.category === activeCategory;
    const matchSearch =
      !searchQuery ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  const totalPages = Math.max(1, Math.ceil(filteredPosts.length / POSTS_PER_PAGE));
  const currentPage = Math.min(
    Math.max(1, parseInt(pageFromUrl || "1", 10) || 1),
    totalPages
  );
  const paginatedPosts = filteredPosts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

  const featuredPost = paginatedPosts[0];
  const gridPosts = paginatedPosts.slice(1);

  const pageUrl = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", String(page));
    return `/blog?${params.toString()}`;
  };

  return (
    <div className="min-h-screen bg-background">
      <TopBar />
      <Header />

      <main>
        {/* Hero */}
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
                <BookOpen className="h-5 w-5" />
                <span className="text-xs font-semibold uppercase tracking-[0.2em]">
                  Brainfeed Blog
                </span>
              </div>
              <h1 className="font-serif text-4xl sm:text-5xl md:text-[3.25rem] lg:text-6xl text-foreground leading-tight">
                Ideas, insights and stories from education.
              </h1>
              <p className="mt-5 text-lg text-muted-foreground font-sans">
                Expert views, policy updates, and inspiration for educators and
                parents.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Filters + search */}
        <section className="bg-background border-b border-border/50 py-4">
          <div className="container">
            <div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                <Input
                  type="search"
                  placeholder="Search blog posts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 h-11 rounded-lg border-border bg-card"
                />
              </div>
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
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

        {/* Blog grid */}
        <section className="py-12 md:py-16">
          <div className="container">
            <AnimatePresence mode="wait">
              {paginatedPosts.length === 0 ? (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center text-muted-foreground py-16"
                >
                  No articles match your filters.
                </motion.p>
              ) : (
                <>
                  {/* Featured post */}
                  {featuredPost && (
                    <motion.div
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                      className="mb-12 md:mb-16"
                    >
                      <Link
                        to="#"
                        className="group block rounded-2xl overflow-hidden bg-card border border-border/50 shadow-sm hover:shadow-xl hover:border-accent/30 transition-all duration-300 p-6 sm:p-8 md:p-10"
                      >
                        <span className="inline-block px-2.5 py-1 rounded-full bg-accent/15 text-accent text-[10px] font-semibold uppercase tracking-wider mb-3">
                          {featuredPost.category}
                        </span>
                        <h2 className="font-serif text-2xl md:text-3xl text-foreground leading-tight group-hover:text-accent transition-colors">
                          {featuredPost.title}
                        </h2>
                        <p className="mt-3 text-muted-foreground font-sans leading-relaxed line-clamp-2">
                          {featuredPost.excerpt}
                        </p>
                        <div className="mt-5 flex items-center gap-4 text-xs text-muted-foreground font-sans">
                          <span className="flex items-center gap-1.5">
                            <Calendar className="h-3.5 w-3.5" />
                            {featuredPost.date}
                          </span>
                          <span>{featuredPost.readTime}</span>
                        </div>
                        <span className="inline-flex items-center gap-1 mt-4 text-accent text-xs font-semibold uppercase tracking-wider group-hover:gap-2 transition-all">
                          Read more
                          <ArrowRight className="h-3.5 w-3.5" />
                        </span>
                      </Link>
                    </motion.div>
                  )}

                  <motion.div
                    layout
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10"
                    initial="hidden"
                    animate="visible"
                    variants={{
                      visible: {
                        transition: { staggerChildren: 0.06 },
                      },
                      hidden: {},
                    }}
                  >
                  {gridPosts.map((post, index) => (
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
                        className="block h-full rounded-2xl overflow-hidden bg-card border border-border/50 shadow-sm hover:shadow-lg hover:border-accent/30 transition-all duration-300 p-5 sm:p-6"
                      >
                        <span className="inline-block px-2.5 py-1 rounded-full bg-accent/15 text-accent text-[10px] font-semibold uppercase tracking-wider mb-2">
                          {post.category}
                        </span>
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
                      </Link>
                    </motion.article>
                  ))}
                  </motion.div>
                </>
              )}
            </AnimatePresence>

            {/* Pagination */}
            {totalPages > 1 && (
              <motion.nav
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="mt-14 flex justify-center flex-wrap gap-2"
                aria-label="Blog pagination"
              >
                <Link
                  to={pageUrl(currentPage - 1)}
                  className={`inline-flex items-center justify-center px-4 py-2 rounded-lg border border-border text-sm font-medium transition-colors ${
                    currentPage <= 1
                      ? "pointer-events-none text-muted-foreground opacity-60"
                      : "text-foreground hover:bg-secondary"
                  }`}
                >
                  Previous
                </Link>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                  <Link
                    key={p}
                    to={pageUrl(p)}
                    className={`inline-flex items-center justify-center min-w-[2.5rem] px-4 py-2 rounded-lg border text-sm font-medium transition-colors ${
                      p === currentPage
                        ? "bg-accent text-accent-foreground border-accent"
                        : "border-border text-foreground hover:bg-secondary"
                    }`}
                  >
                    {p}
                  </Link>
                ))}
                <Link
                  to={pageUrl(currentPage + 1)}
                  className={`inline-flex items-center justify-center px-4 py-2 rounded-lg border border-border text-sm font-medium transition-colors ${
                    currentPage >= totalPages
                      ? "pointer-events-none text-muted-foreground opacity-60"
                      : "text-foreground hover:bg-secondary"
                  }`}
                >
                  Next
                </Link>
              </motion.nav>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Blog;
