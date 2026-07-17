import { Suspense } from "react";
import "../../news.css";
import { ArticleReader } from "@/components/news/ArticleReader";

export default async function NewsArticlePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return (
    <div className="news-shell">
      <Suspense>
        <ArticleReader id={id} />
      </Suspense>
    </div>
  );
}
