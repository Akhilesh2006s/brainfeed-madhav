import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Menu, X, ChevronDown, ShoppingCart } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import logo from "@/assets/logo-brainfeed.png";
import { useCart } from "@/context/CartContext";

const newsCategories = [
  { label: "All News", href: "/news" },
  { label: "Achievement", href: "/news?category=achievement" },
  { label: "Press Release", href: "/news?category=press-release" },
  { label: "Career", href: "/news?category=career" },
  { label: "Education", href: "/news?category=education" },
  { label: "Institutional Profile", href: "/news?category=institutional-profile" },
  { label: "Internship", href: "/news?category=internship" },
  { label: "Jobs", href: "/news?category=jobs" },
  { label: "Science & Environment", href: "/news?category=science-environment" },
  { label: "Technology", href: "/news?category=technology" },
  { label: "Expert View", href: "/news?category=expert-view" },
];

const usefulLinks = [
  { label: "Cancellation & Refund Policy", href: "/cancellation-refund-policy" },
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Shipping Policy", href: "/shipping-policy" },
  { label: "Terms and Conditions", href: "/terms-and-conditions" },
];

const navItems = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "News", dropdown: newsCategories },
  { label: "Blog", href: "/blog" },
  { label: "Subscribe", href: "/subscribe" },
  { label: "Useful Links", dropdown: usefulLinks },
  { label: "Contact Us", href: "/contact" },
];

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const { itemCount } = useCart();

  const isActive = (href: string) =>
    href === "/" ? location.pathname === "/" : location.pathname.startsWith(href.replace(/#.*/, ""));

  return (
    <motion.header
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="bg-card/95 backdrop-blur-lg border-b border-border/60 sticky top-0 z-50"
    >
      <div className="container flex items-center justify-between py-3.5 sm:py-4 md:py-5">
        <Link to="/" className="flex-shrink-0 min-h-[44px] flex items-center">
          <img src={logo} alt="Brainfeed Magazine" className="h-9 sm:h-10 md:h-11 w-auto" />
        </Link>

        <nav className="hidden lg:flex items-center gap-8">
          {navItems.map((item, i) => {
            if ("dropdown" in item && item.dropdown) {
              return (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.05 }}
                >
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button
                        type="button"
                        className="text-[13px] font-medium uppercase tracking-widest text-foreground/70 hover:text-accent transition-colors duration-300 inline-flex items-center gap-1 focus:outline-none focus:ring-0"
                      >
                        {item.label}
                        <ChevronDown className="h-3.5 w-3.5" />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="min-w-[220px] rounded-lg border-border shadow-lg py-0">
                      {item.dropdown.map((sub, idx) => (
                        <span key={sub.href}>
                          {idx > 0 && <DropdownMenuSeparator className="bg-border" />}
                          <DropdownMenuItem asChild>
                            <Link
                              to={sub.href}
                              className="cursor-pointer text-[13px] font-medium uppercase tracking-wide text-foreground focus:bg-accent/10 focus:text-accent py-2.5 px-3"
                            >
                              {sub.label}
                            </Link>
                          </DropdownMenuItem>
                        </span>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </motion.div>
              );
            }
            const href = (item as { label: string; href: string }).href;
            return (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.05 }}
              >
                <Link
                  to={href}
                  className={`text-[13px] font-medium uppercase tracking-widest transition-colors duration-300 ${isActive(href) ? "text-accent" : "text-foreground/70 hover:text-accent"}`}
                >
                  {item.label}
                </Link>
              </motion.div>
            );
          })}
        </nav>

        <div className="flex items-center gap-5">
          <motion.button
            whileHover={{ scale: 1.1 }}
            className="text-foreground/60 hover:text-accent transition-colors"
          >
            <Search className="h-[18px] w-[18px]" />
          </motion.button>
          <motion.div whileHover={{ scale: 1.05 }}>
            <Link
              to="/cart"
              className="relative inline-flex items-center justify-center text-foreground/70 hover:text-accent transition-colors"
              aria-label="View cart"
            >
              <ShoppingCart className="h-[19px] w-[19px]" />
              {itemCount > 0 && (
                <span className="absolute -top-1.5 -right-2 rounded-full bg-accent text-[10px] font-semibold text-accent-foreground px-1.5 py-0.5">
                  {itemCount}
                </span>
              )}
            </Link>
          </motion.div>
          <motion.a
            href="/subscribe"
            className="hidden sm:inline-flex items-center gap-2 bg-accent text-accent-foreground px-5 py-2 text-xs font-semibold uppercase tracking-widest rounded-full hover:bg-accent/90 transition-colors"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            Subscribe
          </motion.a>
          <button
            type="button"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            className="lg:hidden text-foreground p-2 -mr-2 min-h-[44px] min-w-[44px] flex items-center justify-center touch-manipulation"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden border-t border-border/60 bg-card overflow-hidden"
          >
            <div className="container py-4 sm:py-5 flex flex-col gap-0">
              {navItems.map((item, i) => {
                if ("dropdown" in item && item.dropdown) {
                  return (
                    <motion.div
                      key={item.label}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: i * 0.05 }}
                      className="border-b border-border/30"
                    >
                      <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground py-2 px-1">
                        {item.label}
                      </p>
                      {item.dropdown.map((sub) => (
                        <Link
                          key={sub.href}
                          to={sub.href}
                          onClick={() => setMobileOpen(false)}
                          className="text-sm font-medium text-foreground/70 hover:text-accent transition-colors py-2.5 pl-4 pr-3 flex items-center touch-manipulation"
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </motion.div>
                  );
                }
                const href = (item as { label: string; href: string }).href;
                return (
                  <motion.div
                    key={item.label}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Link
                      to={href}
                      onClick={() => setMobileOpen(false)}
                      className="text-sm font-medium text-foreground/70 hover:text-accent transition-colors py-3.5 sm:py-3 min-h-[48px] flex items-center border-b border-border/30 touch-manipulation"
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;
