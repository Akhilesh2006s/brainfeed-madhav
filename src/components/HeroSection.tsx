import { motion } from "framer-motion";
import CardStack from "./CardStack";

const heroArticles = [
  {
    tag: "Education Trends",
    title: "The Future of Education: AI‑Powered Learning in Indian Classrooms",
  },
  {
    tag: "Student Development",
    title: "Building Critical Thinking Skills: A Complete Guide for Parents",
  },
  {
    tag: "School Management",
    title: "What Makes a Great School Principal?",
  },
  {
    tag: "STEM Learning",
    title: "Making Science Fun: Interactive Experiments for Primary Students",
  },
  {
    tag: "Parenting",
    title: "Balancing Screen Time and Study Hours at Home",
  },
];

const HeroSection = () => {
  return (
    <section className="relative border-b border-border/60 bg-[#f5f5f7] text-slate-900 min-h-screen flex items-start">
      <div className="container pt-10 md:pt-12 lg:pt-14 pb-10 md:pb-12 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-[3fr,2.4fr] gap-8 lg:gap-14 items-start">
          {/* Left: heading, description, CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="space-y-4 md:space-y-5 max-w-xl"
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#ff5c35]">
              Brainfeed · Education Magazine
            </p>

            <h1 className="font-serif text-[2rem] sm:text-[2.4rem] md:text-[2.8rem] lg:text-[3rem] leading-tight text-slate-900">
              How schools{" "}
              <span className="text-[#ff5c35]">build future‑ready learners</span>.
            </h1>

            <p className="text-sm md:text-base text-slate-600 font-sans leading-relaxed">
              Brainfeed brings educators, parents and students one step closer—covering board
              exams, NEP 2020, classroom practices and wellbeing in a single, beautifully
              curated reading experience.
            </p>

            <div className="flex flex-wrap gap-3 pt-1">
              <motion.a
                href="#news"
                whileHover={{ scale: 1.03, y: -1 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 rounded-full bg-[#ff5c35] px-6 py-2.8 text-xs font-semibold uppercase tracking-[0.22em] text-white shadow-md"
              >
                Browse latest articles
                <span className="text-base translate-y-[1px]">→</span>
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 rounded-full bg-transparent text-[#ff5c35] px-6 py-2.8 text-xs font-semibold uppercase tracking-[0.22em] border border-[#ff5c35]/60 hover:bg-[#ff5c35]/5 transition-colors"
              >
                View magazine editions
              </motion.a>
            </div>

            <div className="space-y-2 pt-2">
              <p className="text-[11px] text-slate-500 font-sans">
                No login needed. Updated with every issue and major education headline.
              </p>
              <div className="flex flex-wrap gap-6 text-xs md:text-sm text-slate-600 font-sans">
                <div>
                  <p className="font-semibold text-slate-900">12+ years</p>
                  <p className="mt-0.5">of trusted education coverage</p>
                </div>
                <div>
                  <p className="font-semibold text-slate-900">10,000+</p>
                  <p className="mt-0.5">schools &amp; educators reached</p>
                </div>
                <div>
                  <p className="font-semibold text-slate-900">5 editions</p>
                  <p className="mt-0.5">for students, parents &amp; leaders</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: card stack that rotates articles one after another */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
            className="w-full mt-6 lg:mt-0 flex justify-center lg:justify-end"
          >
            <CardStack items={heroArticles} autoRotateMs={4500} />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
