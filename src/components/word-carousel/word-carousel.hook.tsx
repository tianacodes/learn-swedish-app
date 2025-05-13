import { useCallback, useEffect, useState } from "react";
import { Category, Card } from "@/generated/prisma";

export type UseWordCarouselType = {
    categoryData: Category & {
        cards: Card[];
    };
}

export const useWordCarousel = ({ categoryData }: UseWordCarouselType) => {
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

    return {
        currentCard,
        isDone,
        index,
        handleClick,
        handleMistake,
        mistakesCount,
        handleCategoryPracticeRestart,
        isReady
    }
}