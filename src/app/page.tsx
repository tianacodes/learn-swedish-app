import WordPracticeCard from "@/components/word-practice-card";

export default function Home() {
  return (
    <div className="container mx-auto pt-20">
      <div className="pb-16 max-w-2xl mx-auto flex flex-row justify-between">
        <h1 className="font-bold">Category: City</h1>
        <span className="bg-red-100 text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-sm dark:bg-red-900 dark:text-red-300">Mistakes: 5/20</span>
      </div>
      <WordPracticeCard />
    </div>
  );
}
