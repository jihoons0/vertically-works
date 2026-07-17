import type { Metadata } from "next";
import "./news.css";
import { FrontPage } from "@/components/news/FrontPage";

export const metadata: Metadata = {
  title: "News",
  description:
    "Vertically News · a daily news reader that sets live Korean, Japanese, and Chinese headlines as a vertical, right-to-left newspaper front page. A Vertically Works application.",
};

// Edition + reading-face preferences apply before first paint (theme itself
// is handled by the site's next-themes script).
const newsInit = `(function(){try{var e=localStorage.getItem('vn:edition')||'ko';document.documentElement.setAttribute('data-edition',e);var f=localStorage.getItem('vn:font:'+e);if(f&&f!=='serif'){document.documentElement.setAttribute('data-font',f);}}catch(e){}})();`;

export default function NewsPage() {
  return (
    <div className="news-shell">
      <script dangerouslySetInnerHTML={{ __html: newsInit }} />
      <FrontPage />
    </div>
  );
}
