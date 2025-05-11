import { WordCarousel } from "@/components/word-carousel";
import { db } from "@/db";
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import Link from "next/link";


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
    <div className="container mx-auto max-w-2xl pt-10 flex flex-col gap-10">
      <Link href="/" className="flex items-center text-blue-600 hover:text-blue-800">
        <ArrowLeftIcon className="w-5 h-5 mr-1" />
        <span className="text-sm font-bold">Categories</span>
      </Link>
      <WordCarousel categoryData={categoryData} />
    </div>
  );
}
