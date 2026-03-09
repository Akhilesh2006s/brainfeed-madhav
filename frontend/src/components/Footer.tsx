import { motion } from "framer-motion";
import { Facebook, Twitter, Instagram, Linkedin, Youtube, Mail } from "lucide-react";
import logo from "@/assets/logo-brainfeed.png";

const Footer = () => {
  return (
    <footer className="bg-foreground text-background/70 pt-10 sm:pt-12 md:pt-16 pb-6 sm:pb-8">
      <div className="container">
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 sm:gap-10 md:gap-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="sm:col-span-2 md:col-span-1">
            <img src={logo} alt="Brainfeed Magazine" className="h-9 sm:h-10 brightness-200 w-auto" />
            <p className="mt-4 sm:mt-5 text-[13px] sm:text-sm leading-[1.8] font-sans text-background/50">
              India's premier education magazine empowering educators, parents, and students since 2010.
            </p>
          </div>

          <div>
            <h4 className="font-serif text-background text-base sm:text-lg mb-4 sm:mb-5">Quick Links</h4>
            <ul className="space-y-2.5 sm:space-y-3 text-[13px] sm:text-sm font-sans">
              {[
                { label: "Home", href: "/" },
                { label: "About Us", href: "/about" },
                { label: "News", href: "/news" },
                { label: "Subscribe", href: "/subscribe" },
                { label: "Contact Us", href: "/contact" },
              ].map(({ label, href }) => (
                <li key={label}>
                  <a href={href} className="hover:text-accent transition-colors duration-300">{label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-background text-base sm:text-lg mb-4 sm:mb-5">Useful Links</h4>
            <ul className="space-y-2.5 sm:space-y-3 text-[13px] sm:text-sm font-sans">
              <li><a href="/cancellation-refund-policy" className="hover:text-accent transition-colors duration-300">Cancellation & Refund Policy</a></li>
              <li><a href="/privacy-policy" className="hover:text-accent transition-colors duration-300">Privacy Policy</a></li>
              <li><a href="/shipping-policy" className="hover:text-accent transition-colors duration-300">Shipping Policy</a></li>
              <li><a href="/terms-and-conditions" className="hover:text-accent transition-colors duration-300">Terms and Conditions</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-background text-base sm:text-lg mb-4 sm:mb-5">Categories</h4>
            <ul className="space-y-2.5 sm:space-y-3 text-[13px] sm:text-sm font-sans">
              {[
                { label: "All News", href: "/news" },
                { label: "Achievement", href: "/news?category=achievement" },
                { label: "Press Release", href: "/news?category=press-release" },
                { label: "Education", href: "/news" },
                { label: "Technology", href: "/news" },
                { label: "Parenting", href: "/news" },
                { label: "Expert View", href: "/news?category=expert-view" },
              ].map(({ label, href }) => (
                <li key={label}>
                  <a href={href} className="hover:text-accent transition-colors duration-300">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-background text-base sm:text-lg mb-4 sm:mb-5">Connect</h4>
            <div className="flex items-center gap-3 sm:gap-4">
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
                  target={i === 5 ? undefined : "_blank"}
                  rel={i === 5 ? undefined : "noreferrer"}
                  className="text-background/50 hover:text-accent transition-colors duration-300 flex items-center justify-center"
                  whileHover={{ scale: 1.2, y: -2 }}
                >
                  <Icon className="h-5 w-5" />
                </motion.a>
              ))}
            </div>
            <p className="mt-4 sm:mt-5 text-[13px] sm:text-sm font-sans text-background/40 break-all">
              admin@brainfeedmagazine.com
            </p>
          </div>
        </motion.div>

        <div className="mt-10 sm:mt-14 pt-4 sm:pt-6 border-t border-background/10 text-center text-[11px] sm:text-xs text-background/30 font-sans tracking-wide px-2">
          © {new Date().getFullYear()} Brainfeed Magazine. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
