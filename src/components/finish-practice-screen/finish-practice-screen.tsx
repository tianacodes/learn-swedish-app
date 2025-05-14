'use client'
import Link from "next/link";

export const FinishPracticeScreen = ({ mistakes, handleCategoryPracticeRestart }: { mistakes: string, handleCategoryPracticeRestart: () => void }) => {
    return (
        <div data-testid="finish-practice-screen">
            <h1 className="font-bold">You reviewed all terms!</h1>
            <p>Mistakes: {mistakes}</p>
            <div className="flex flex-row gap-16 justify-evenly">
                <button
                    data-testid="restart-button"
                    type="button"
                    onClick={() => handleCategoryPracticeRestart()}
                    className="w-xs font-bold text-white bg-blue-400 hover:bg-blue-500 focus:ring-4 focus:ring-blue-300 rounded-lg px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 hover:cursor-pointer text-center"
                >
                    Do again
                </button>
                <Link
                    type="button"
                    href="/"
                    className="w-xs font-bold focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 rounded-lg px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900 hover:cursor-pointer text-center"
                >
                    Back to Categories
                </Link>
            </div >
        </div>
    );
};
