import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Navbar } from "@/components/Navbar";
import logoWhite from "@assets/White_L&N_PNG_1771891683420.png";
import "@/styles/portfolio.css";

import portfolioHtml from "@assets/portfolio_1778614590355.html?raw";

function getBodyContent(html: string): string {
  const match = html.match(/<body>([\s\S]*?)<\/body>/);
  return match ? match[1] : "";
}

function getScriptContent(html: string): string {
  const match = html.match(/<script>([\s\S]*?)<\/script>/);
  return match ? match[1] : "";
}

export default function Portfolio() {
  const bodyContent = getBodyContent(portfolioHtml);

  useEffect(() => {
    const scriptContent = getScriptContent(portfolioHtml);
    if (!scriptContent) return;

    const scriptEl = document.createElement("script");
    scriptEl.id = "portfolio-runtime-script";
    scriptEl.textContent = scriptContent;
    document.body.appendChild(scriptEl);

    return () => {
      document.getElementById("portfolio-runtime-script")?.remove();
    };
  }, []);

  return (
    <>
      <Helmet>
        <title>AI Builder Portfolio | Thomas Nilsen | Diamond Ace Growth</title>
        <meta
          name="description"
          content="A look at the AI-powered workflows, automations, and tools Thomas Nilsen has been building — systems that run so you can focus on the work that actually matters."
        />
      </Helmet>

      <Navbar />

      <div
        className="portfolio-page"
        style={{ paddingTop: "58px" }}
        dangerouslySetInnerHTML={{ __html: bodyContent }}
      />

      <footer className="py-12 border-t border-border/20 bg-background text-center">
        <div className="max-w-7xl mx-auto px-6 flex flex-col items-center">
          <img
            src={logoWhite}
            alt="Diamond Ace Growth"
            className="h-12 w-auto mb-6"
          />
          <p className="text-muted-foreground mb-8">Building marketing ops that scale.</p>
          <div className="flex gap-6 mb-8">
            <a href="/privacy" className="text-sm text-muted-foreground hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="/terms" className="text-sm text-muted-foreground hover:text-white transition-colors">
              Terms of Service
            </a>
          </div>
          <div className="text-sm text-muted-foreground/60">
            &copy; {new Date().getFullYear()} Diamond Ace Growth. All rights reserved.
          </div>
        </div>
      </footer>
    </>
  );
}
