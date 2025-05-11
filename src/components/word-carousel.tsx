"use client";
import { useCallback, useEffect, useState } from "react";
import WordPracticeCard from "./word-practice-card";
import { FinishPracticeScreen } from "./finish-practice-screen/finish-practice-screen";
import { Category, Card } from "@/generated/prisma";

export const WordCarousel = ({ categoryData }: {
    categoryData: Category & {
        cards: Card[];
    };
}) => {
    const [mistakesCount, setMistakesCount] = useState(0);
    const [index, setIndex] = useState(0);
    const [isDone, setIsDone] = useState(false);
    const currentCard = categoryData.cards[index];
    const [isReady, setIsReady] = useState(false); // loading state

    // Read from localStorage only on client
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const storedIndex = sessionStorage.getItem('defaultIndex');
            if (storedIndex !== null) {
                setIndex(parseInt(storedIndex, 10));
            }
            const storedMistakesIndex = sessionStorage.getItem('mistakesCount');
            if (storedMistakesIndex !== null) {
                setMistakesCount(parseInt(storedMistakesIndex, 10));
            }
            setIsReady(true);
        }
    }, []);

    // Save to sessionStorage on index change
    useEffect(() => {
        if (isReady) {
            sessionStorage.setItem('defaultIndex', JSON.stringify(index));
            sessionStorage.setItem('mistakesCount', JSON.stringify(index));
        }
    }, [isReady, index]);

    useEffect(() => {
        return () => {
            // Clear on unmount
            sessionStorage.removeItem('defaultIndex');
            sessionStorage.removeItem('mistakesCount');
        };
    }, []);

    const handleClick = useCallback(() => {
        if (index === categoryData.cards.length - 1) {
            sessionStorage.setItem('defaultIndex', "0");
            setIndex(0);
            setIsDone(true);
        } else {
            setIndex((prev) => prev + 1);
        }
    }, [index, categoryData.cards.length]);

    const handleCategoryPracticeRestart = useCallback(() => {
        setMistakesCount(0)
        setIsDone(false);
    }, [])

    const handleMistake = useCallback(() => {
        sessionStorage.setItem('mistakesCount', JSON.stringify(mistakesCount + 1));
        setMistakesCount(prev => prev + 1)
    }, [mistakesCount])

    if (!currentCard) {
        return null;
    }

    if (!isReady) return <div>Loading...</div>;

    return (
        <div className="flex flex-col gap-8">
            <div className="flex flex-row justify-between">
                <h1 className="text-2xl font-bold">Category: {categoryData.name}</h1>
                <span className="bg-red-100 text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-sm dark:bg-red-900 dark:text-red-300">Mistakes: {mistakesCount}</span>
            </div>
            <div className="flex flex-col gap-4">
                {!isDone ? (
                    <div className="w-full relative mx-auto flex max-w-2xl items-center rounded-xl bg-white p-10 shadow-lg outline outline-black/5 dark:bg-slate-800 dark:shadow-none dark:-outline-offset-1 dark:outline-white/10">
                        <div className="absolute top-5 right-5">
                            <p className="text-gray-500 font-bold">{index + 1}/{categoryData.cards.length}</p>
                        </div>
                        <WordPracticeCard
                            key={currentCard.id}
                            categorySlug={categoryData.slug}
                            term={currentCard.term}
                            answer={currentCard.answer}
                            handleClick={handleClick}
                            handleMistake={handleMistake}
                        />
                    </div>
                ) : null}
                {isDone ? (
                    <FinishPracticeScreen mistakes={`${mistakesCount}/${categoryData.cards.length}`} handleCategoryPracticeRestart={handleCategoryPracticeRestart} />
                ) : null}
            </div>
        </div>
    );
};
