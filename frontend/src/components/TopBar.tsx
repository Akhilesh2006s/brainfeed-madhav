import { motion } from "framer-motion";
import { Facebook, Twitter, Instagram, Linkedin, Youtube, Mail } from "lucide-react";

const TopBar = () => {
  return (
    <motion.div
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-primary text-primary-foreground"
    >
      <div className="container flex items-center justify-between py-2 sm:py-2.5">
        <div className="hidden md:flex items-center gap-5">
          <a
            href="https://michampsindia.com/"
            target="_blank"
            rel="noreferrer"
            className="top-bar-link"
          >
            Michampsindia
          </a>
          <span className="text-primary-foreground/20">·</span>
          <a
            href="https://highereducationplus.com/"
            target="_blank"
            rel="noreferrer"
            className="top-bar-link"
          >
            Higher Education Plus
          </a>
          <span className="text-primary-foreground/20">·</span>
          <a
            href="https://brainfeedmagazine.com/schools-search/"
            target="_blank"
            rel="noreferrer"
            className="top-bar-link"
          >
            School Search
          </a>
        </div>
        <div className="flex items-center justify-end gap-2 sm:gap-3 ml-auto">
          {[Facebook, Twitter, Instagram, Linkedin, Youtube, Mail].map((Icon, i) => (
            <motion.a
              key={i}
              href={
                i === 0
                  ? "https://www.facebook.com/brainfeededumag"
                  : i === 1
                  ? "https://twitter.com/brainfeededumag"
                  : i === 2
                  ? "https://www.instagram.com/brainfeededumag/"
                  : i === 3
                  ? "https://www.linkedin.com/in/brainfeededumag/"
                  : i === 4
                  ? "https://www.youtube.com/@brainfeedmagazine"
                  : "mailto:info@brainfeedmagazine.com"
              }
              target="_blank"
              rel={i === 5 ? undefined : "noreferrer"}
              className="top-bar-link flex items-center justify-center"
              whileHover={{ scale: 1.2 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <Icon className="h-4 w-4 sm:h-3.5 sm:w-3.5" />
            </motion.a>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default TopBar;
