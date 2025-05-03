import Navbar from "@/components/navbar";
import { WordCarousel } from "@/components/word-carousel";
import { db } from "@/db";

export default async function CategoryPage({ params }: { params: { category: string } }) {
  const slug = params.category;
  const categoryData = await db.category.findUnique({
    where: { slug },
    include: {
      cards: true
    },
  });
  const wordCards = categoryData?.cards;

  if (!wordCards) {
    return null;
  }

  return (
    <>
      <Navbar />
      <div className="container mx-auto max-w-2xl pt-20">
        <WordCarousel categoryData={categoryData} />
      </div>
    </>
  );
}
