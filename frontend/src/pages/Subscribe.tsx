import { useEffect, useState } from "react";
import TopBar from "@/components/TopBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import heroEducation from "@/assets/hero-education.jpg";

const shippingNotes = [
  "The subscription would begin from the next month cycle from the date of order.",
  "The order is accepted for an annual subscription only (12 months).",
  "The magazines will be delivered on or before 20th of that month.",
];

const API_BASE = (import.meta.env.VITE_API_URL as string) || "";

type Product = {
  id: string;
  category: "pre-primary" | "library" | "classroom" | "magazine";
  name: string;
  description?: string;
  badge?: string;
  tag?: string;
  price: number;
  oldPrice?: number;
  currency?: string;
  imageUrl?: string;
};

const formatRupees = (amount: number, currency = "INR") =>
  amount.toLocaleString("en-IN", { style: "currency", currency, maximumFractionDigits: 0 });

const Subscribe = () => {
  const { addItem } = useCart();
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch(`${API_BASE}/api/products`)
      .then((res) => (res.ok ? res.json() : []))
      .then((data: Product[]) => {
        if (Array.isArray(data) && data.length) setProducts(data);
      })
      .catch(() => {
        // Fallback to built-in static data when API fails – keep page usable
        setProducts([]);
      });
  }, []);

  const prePrimaryPacks = products.filter((p) => p.category === "pre-primary");
  const libraryPacks = products.filter((p) => p.category === "library");
  const classroomPacks = products.filter((p) => p.category === "classroom");
  const magazines = products.filter((p) => p.category === "magazine");

  return (
    <div className="min-h-screen bg-background">
      <TopBar />
      <Header />

      <main>
        {/* Hero */}
        <section className="relative min-h-[40vh] md:min-h-[45vh] flex items-end overflow-hidden border-b border-border/60">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${heroEducation})` }}
            aria-hidden
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/85 to-background/40" />
          <div className="container relative z-10 w-full pb-12 pt-24 md:pb-16 md:pt-28">
            <ScrollReveal direction="up" once>
              <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-foreground">
                Subscribe
              </h1>
              <p className="mt-4 max-w-2xl text-muted-foreground font-sans">
                Choose from curated packs for classrooms, libraries and pre-primary learners, or subscribe to individual Brainfeed magazines.
              </p>
            </ScrollReveal>
          </div>
        </section>

        {/* Shipping policy */}
        <section className="py-10 md:py-12 border-b border-border/50">
          <div className="container">
            <ScrollReveal direction="up" once>
              <h2 className="section-title">Shipping Policy</h2>
              <ul className="mt-4 space-y-2 text-sm md:text-base text-muted-foreground font-sans">
                {shippingNotes.map((note) => (
                  <li key={note} className="flex gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-accent" />
                    <span>{note}</span>
                  </li>
                ))}
              </ul>
            </ScrollReveal>
          </div>
        </section>

        {/* Packs */}
        <section className="py-12 md:py-16 border-b border-border/50">
          <div className="container space-y-12 md:space-y-14">
            <ScrollReveal direction="up" once>
              <h2 className="section-title">Pre Primary Packs</h2>
            </ScrollReveal>
            <div className="grid gap-6 md:gap-8 md:grid-cols-3">
              {prePrimaryPacks.map((pack) => (
                <ScrollReveal key={pack.name} direction="up" once>
                  <Card className="glass-card h-full flex flex-col">
                    <CardHeader className="pb-4">
                      {pack.imageUrl && (
                        <div className="mb-3 rounded-lg overflow-hidden">
                          <img src={pack.imageUrl} alt={pack.name} className="w-full h-32 object-cover" />
                        </div>
                      )}
                      <div className="flex items-center justify-between mb-2">
                        <span className="inline-flex items-center rounded-full bg-accent/10 text-accent text-xs font-semibold px-3 py-1">
                          {pack.badge || ""}
                        </span>
                        <span className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
                          {pack.tag || "Pre Primary Packs"}
                        </span>
                      </div>
                      <CardTitle className="text-xl font-serif">{pack.name}</CardTitle>
                      <CardDescription>
                        {pack.description || "Ideal bundle for early-years classrooms and centres."}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-0 flex-1 flex flex-col justify-between">
                      <div className="space-y-1 mb-4">
                        {pack.oldPrice ? (
                          <p className="text-sm text-muted-foreground line-through">
                            {formatRupees(pack.oldPrice, pack.currency)}
                          </p>
                        ) : null}
                        <p className="text-xl font-semibold text-foreground">
                          {formatRupees(pack.price, pack.currency)}
                        </p>
                      </div>
                    </CardContent>
                    <CardFooter className="pt-0">
                      <Button
                        type="button"
                        className="w-full bg-accent text-accent-foreground hover:bg-accent/90 rounded-lg text-xs font-semibold uppercase tracking-[0.18em]"
                        onClick={() =>
                          addItem({
                            id: `pre-primary-${pack.name}`,
                            name: `${pack.name} (Pre Primary Pack)`,
                            price: pack.price,
                          })
                        }
                      >
                        Add to cart
                      </Button>
                    </CardFooter>
                  </Card>
                </ScrollReveal>
              ))}
            </div>

            <ScrollReveal direction="up" once>
              <h2 className="section-title mt-8">Library Packs</h2>
            </ScrollReveal>
            <div className="grid gap-6 md:gap-8 md:grid-cols-3">
              {libraryPacks.map((pack) => (
                <ScrollReveal key={pack.name} direction="up" once>
                  <Card className="glass-card h-full flex flex-col">
                    <CardHeader className="pb-4">
                      {pack.imageUrl && (
                        <div className="mb-3 rounded-lg overflow-hidden">
                          <img src={pack.imageUrl} alt={pack.name} className="w-full h-32 object-cover" />
                        </div>
                      )}
                      <div className="flex items-center justify-between mb-2">
                        <span className="inline-flex items-center rounded-full bg-accent/10 text-accent text-xs font-semibold px-3 py-1">
                          {pack.badge || ""}
                        </span>
                        <span className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
                          Library Packs
                        </span>
                      </div>
                      <CardTitle className="text-xl font-serif">{pack.name}</CardTitle>
                      <CardDescription>
                        {pack.description || "Thoughtfully curated for school and institutional libraries."}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-0 flex-1 flex flex-col justify-between">
                      <div className="space-y-1 mb-4">
                        {pack.oldPrice ? (
                          <p className="text-sm text-muted-foreground line-through">
                            {formatRupees(pack.oldPrice, pack.currency)}
                          </p>
                        ) : null}
                        <p className="text-xl font-semibold text-foreground">
                          {formatRupees(pack.price, pack.currency)}
                        </p>
                      </div>
                    </CardContent>
                    <CardFooter className="pt-0">
                      <Button
                        type="button"
                        className="w-full bg-accent text-accent-foreground hover:bg-accent/90 rounded-lg text-xs font-semibold uppercase tracking-[0.18em]"
                        onClick={() =>
                          addItem({
                            id: `library-${pack.name}`,
                            name: `${pack.name} (Library Pack)`,
                            price: pack.price,
                          })
                        }
                      >
                        Add to cart
                      </Button>
                    </CardFooter>
                  </Card>
                </ScrollReveal>
              ))}
            </div>

            <ScrollReveal direction="up" once>
              <h2 className="section-title mt-8">Classroom Packs</h2>
            </ScrollReveal>
            <div className="grid gap-6 md:gap-8 md:grid-cols-3">
              {classroomPacks.map((pack) => (
                <ScrollReveal key={pack.name} direction="up" once>
                  <Card className="glass-card h-full flex flex-col">
                    <CardHeader className="pb-4">
                      {pack.imageUrl && (
                        <div className="mb-3 rounded-lg overflow-hidden">
                          <img src={pack.imageUrl} alt={pack.name} className="w-full h-32 object-cover" />
                        </div>
                      )}
                      <div className="flex items-center justify-between mb-2">
                        <span className="inline-flex items-center rounded-full bg-accent/10 text-accent text-xs font-semibold px-3 py-1">
                          {pack.badge || ""}
                        </span>
                        <span className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
                          Classroom Packs
                        </span>
                      </div>
                      <CardTitle className="text-xl font-serif">{pack.name}</CardTitle>
                      <CardDescription>
                        {pack.description || "Bulk magazine packs for whole-class engagement."}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-0 flex-1 flex flex-col justify-between">
                      <div className="space-y-1 mb-4">
                        {pack.oldPrice ? (
                          <p className="text-sm text-muted-foreground line-through">
                            {formatRupees(pack.oldPrice, pack.currency)}
                          </p>
                        ) : null}
                        <p className="text-xl font-semibold text-foreground">
                          {formatRupees(pack.price, pack.currency)}
                        </p>
                      </div>
                    </CardContent>
                    <CardFooter className="pt-0">
                      <Button
                        type="button"
                        className="w-full bg-accent text-accent-foreground hover:bg-accent/90 rounded-lg text-xs font-semibold uppercase tracking-[0.18em]"
                        onClick={() =>
                          addItem({
                            id: `classroom-${pack.name}`,
                            name: `${pack.name} (Classroom Pack)`,
                            price: pack.price,
                          })
                        }
                      >
                        Add to cart
                      </Button>
                    </CardFooter>
                  </Card>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* Individual magazines */}
        <section className="py-12 md:py-16">
          <div className="container">
            <ScrollReveal direction="up" once>
              <h2 className="section-title">Brainfeed Magazines</h2>
              <p className="text-muted-foreground font-sans mt-3 mb-8 max-w-2xl">
                Subscribe to individual titles across age groups — from Brainfeed Junior to Brainfeed High — and build a rich reading culture in your school.
              </p>
            </ScrollReveal>
            <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-5">
              {magazines.map((mag) => (
                <ScrollReveal key={mag.name} direction="up" once>
                  <Card className="glass-card h-full flex flex-col items-stretch">
                    <CardHeader className="pb-3">
                      {mag.imageUrl && (
                        <div className="mb-3 rounded-lg overflow-hidden">
                          <img src={mag.imageUrl} alt={mag.name} className="w-full h-28 object-cover" />
                        </div>
                      )}
                      <CardTitle className="text-lg font-serif">{mag.name}</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0 flex-1 flex flex-col justify-between">
                      <p className="text-sm text-muted-foreground mb-1">
                        {mag.description || ""}
                      </p>
                      <p className="text-lg font-semibold text-foreground mb-4">
                        {formatRupees(mag.price, mag.currency)}
                      </p>
                    </CardContent>
                    <CardFooter className="pt-0">
                      <Button
                        type="button"
                        className="w-full bg-accent text-accent-foreground hover:bg-accent/90 rounded-lg text-xs font-semibold uppercase tracking-[0.18em]"
                        onClick={() =>
                          addItem({
                            id: `magazine-${mag.name}`,
                            name: mag.name,
                            price: mag.price,
                          })
                        }
                      >
                        Add to cart
                      </Button>
                    </CardFooter>
                  </Card>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Subscribe;

