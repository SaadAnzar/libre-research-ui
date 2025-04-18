import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ChevronDownIcon, Sparkles } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { useTheme } from "@/contexts/theme-context";
import { cn } from "@/lib/utils";
import { useAuth } from "@/services/auth-service";

export default function LandingPage() {
  const {
    currentUser: { data: user },
  } = useAuth();

  const { theme, setTheme } = useTheme();

  return (
    <div>
      <header
        className={`sticky top-0 z-100 transition-all duration-300 backdrop-blur-lg p-3 md:px-8 md:py-4`}
      >
        <div className="flex justify-between items-center">
          <div className="inline-flex items-center gap-2">
            <img src="/libre.svg" alt="Libre Research" className="size-7" />
            <span className="text-xl font-semibold gradient-text">
              Libre Research
            </span>
          </div>

          <div className="flex items-center md:gap-2">
            <button
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            >
              {theme === "light" ? "🌙" : "🌞"}
            </button>
            {user ? (
              <Link
                to="/home"
                className={cn(
                  buttonVariants(),
                  "h-8 bg-sky-600 hover:bg-sky-500 rounded-xl"
                )}
              >
                Home
              </Link>
            ) : (
              <>
                <Link
                  to="/login"
                  className={cn(
                    buttonVariants({
                      variant: "ghost",
                    }),
                    "h-8 text-sky-600 hover:text-sky-500"
                  )}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className={cn(
                    buttonVariants(),
                    "h-8 bg-sky-600 hover:bg-sky-500 rounded-xl"
                  )}
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      <section className="relative min-h-screen flex items-center justify-center">
        <div className="relative z-20">
          <div className="max-w-3xl mx-auto text-center mb-12 px-4">
            <motion.h1
              className="text-4xl md:text-7xl font-bold mb-6 leading-tight gradient-text"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="">Libre Research</span>
            </motion.h1>
            <motion.h1
              className="text-2xl md:text-4xl font-bold mb-6 leading-tight text-primary/80"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 4 }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <span className="block">Research Reimagined</span>
              <span className="block">Powered by AI</span>
            </motion.h1>
            <motion.p
              className="text-xl text-muted-foreground mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              Generate comprehensive research reports on any topic in minutes,
              not days. Experience the future of knowledge creation.
            </motion.p>
          </div>

          <motion.div
            className="max-w-3xl mx-auto relative"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <div className="bg-card backdrop-blur-lg rounded-xl p-6 shadow-2xl">
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <Sparkles className="size-5 mr-2 text-yellow-400" />
                Try it now
              </h3>

              <div className="mt-4 pt-4 border-t border-ring">
                <div className="flex justify-between items-center text-xs">
                  <div>Powered by advanced AI research models</div>
                  <div className="flex items-center">
                    <span className="inline-block size-2 rounded-full bg-green-500 mr-1"></span>
                    All sources verified
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-4 -right-0 -left-0 md:-right-4 md:-left-4 h-20 bg-gradient-to-t dark:from-background to-transparent z-10"></div>
          </motion.div>
        </div>

        <div className="absolute bottom-20 left-0 right-0 flex justify-center z-20">
          <div className="animate-bounce">
            <ChevronDownIcon className="size-8 text-sky-500" />
          </div>
        </div>
      </section>

      <section
        id="discover"
        className="relative py-24 bg-sidebar overflow-hidden"
      >
        <div className="relative z-10">
          <div className="max-w-xl mx-auto text-center mb-16 px-4">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Discover New Frontiers
            </h2>
            <p className="text-muted-foreground">
              Explore trending research topics across disciplines or dive deep
              into your specific area of interest.
            </p>
          </div>

          <div className="relative max-w-3xl mx-auto h-[400px] md:h-[500px]">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              {[
                { name: "Climate Change", x: -40, y: -120 },
                { name: "Quantum Computing", x: 120, y: -70 },
                { name: "Artificial Intelligence", x: -100, y: 20 },
                { name: "Renewable Energy", x: 150, y: 100 },
                { name: "Blockchain", x: -100, y: 150 },
                { name: "Neuroscience", x: 0, y: -200 },
                { name: "Genomics", x: -200, y: -50 },
                { name: "Space Exploration", x: 200, y: -150 },
                { name: "Nanotechnology", x: 50, y: 200 },
                { name: "Biotechnology", x: -150, y: 90 },
              ].map((topic, i) => (
                <button
                  key={i}
                  className="absolute px-4 py-2 rounded-4xl backdrop-blur-sm transition-all duration-300 border hover:bg-accent"
                  style={{
                    left: `calc(50% + ${topic.x}px)`,
                    top: `calc(50% + ${topic.y}px)`,
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  {topic.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer>
        <div className="p-8">
          <div className="flex gap-2 items-center text-xl font-bold">
            <img src="/libre.svg" alt="Libre Research" className="size-6" />
            <span className="gradient-text">Libre Research</span>
          </div>
          <p className="text-muted-foreground">
            Transforming the way the world conducts research with AI-powered
            insights and analysis.
          </p>
        </div>

        <div className="border-t p-4 flex flex-col gap-2 items-center justify-between text-sm">
          <p>
            built with ❤️ by{" "}
            <a
              href="https://mdanzarahmad.vercel.app"
              target="_blank"
              className="font-semibold hover:underline text-sky-600"
            >
              anzar
            </a>
          </p>
          <p className="text-muted-foreground">
            &copy; 2025 Libre Research. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
