import { WordCarousel } from "@/components/word-carousel";
import { db } from "@/db";

export default async function Home() {
  const slug = 'familjen'
  const wordCardsByCategory = await db.category.findUnique({
    where: { slug },
    include: {
      cards: true, // Fetch related cards
    },
  });
  const wordCards = wordCardsByCategory?.cards;

  if (!wordCards) {
    return null;
  }

  return (
    <div className="container mx-auto max-w-2xl pt-20">
      <WordCarousel wordCards={wordCards} />
    </div>
  );
}
