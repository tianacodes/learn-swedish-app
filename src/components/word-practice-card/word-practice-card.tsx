"use client";
import { useWordPracticeCard } from "./word-practice-card.hook";
import { useFocusInput } from "./input-ref.hook";
import { SubmitButton } from './submit-button';
import { TermDisplay } from "./term-display";
import { AnswerInput } from "./answer-input";

type WordPracticeCard = {
    term: string;
    answer: string;
    handleClick: () => void;
    handleMistake: () => void
    categorySlug: string;
}

export default function WordPracticeCard({
    term,
    answer,
    handleClick,
    handleMistake,
    categorySlug
}: WordPracticeCard) {
    const { formAction, state } = useWordPracticeCard({
        handleClick,
        categorySlug,
        term,
        answer,
        handleMistake,
    })

    const inputRef = useFocusInput();

    return (
        <form action={formAction} className="w-full">
            <div className="flex flex-col gap-16">
                <TermDisplay term={term} />
                <AnswerInput
                    inputRef={inputRef}
                    message={state.message}
                    status={state.status}
                />
                <SubmitButton />
            </div>
        </form>
    );
}