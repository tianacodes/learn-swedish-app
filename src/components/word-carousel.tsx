"use client";
import { useCallback, useState } from "react";
import WordPracticeCard from "./word-practice-card";
import { FinishPracticeScreen } from "./finish-practice-screen";

const cards = [
    { id: "1", term: "en släk", answer: "relative" },
    { id: "2", term: "en bror", answer: "brother" },
    { id: "3", term: "en syster", answer: "sister" },
];

export const WordCarousel = () => {
    const [mistakesCount, setMistakesCount] = useState(0);
    const [index, setIndex] = useState(0);
    const [isDone, setIsDone] = useState(false);
    const currentCard = cards[index];

    const handleClick = useCallback(() => {
        if (index === cards.length - 1) {
            setIsDone(true);
        } else {
            setIndex((prev) => prev + 1);
        }
    }, [index]);

    const handleMistake = useCallback(() => {
        setMistakesCount((prev) => prev + 1)
    }, [])

    return (
        <>
            <div className="pb-16 flex flex-row justify-between">
                <h1 className="font-bold">Category: Familjen</h1>
                <span className="bg-red-100 text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-sm dark:bg-red-900 dark:text-red-300">Mistakes: {mistakesCount}/{cards.length}</span>
            </div>
            <div className="flex flex-col gap-4">
                {!isDone ? (
                    <div className="w-full relative mx-auto flex max-w-2xl items-center rounded-xl bg-white p-10 shadow-lg outline outline-black/5 dark:bg-slate-800 dark:shadow-none dark:-outline-offset-1 dark:outline-white/10">
                        <div className="absolute top-5 right-5">
                            <p className="text-gray-500">{index + 1}/{cards.length}</p>
                        </div>
                        <WordPracticeCard
                            key={currentCard.id}
                            id={currentCard.id}
                            term={currentCard.term}
                            answer={currentCard.answer}
                            handleClick={handleClick}
                            handleMistake={handleMistake}
                        />
                    </div>
                ) : null}
                {isDone ? (
                    <FinishPracticeScreen />
                ) : null}
            </div>
        </>
    );
};
