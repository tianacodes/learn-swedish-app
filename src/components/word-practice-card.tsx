"use client";
import { checkInput } from "@/actions";
import { INPUT_STATUS } from "@/types";
import { useActionState, useEffect, useRef, useState } from "react";
import { LightBulbIcon } from '@heroicons/react/24/outline';

export default function WordPracticeCard({
    term,
    answer,
    handleClick,
    handleMistake,
    categorySlug
}: {
    term: string;
    answer: string;
    handleClick: () => void;
    handleMistake: () => void
    categorySlug: string;
}) {
    const [hasDoneMistake, setHasDoneMistake] = useState(false);
    // const [showHint, setShowHint] = useState(false);
    const [state, formAction] = useActionState(checkInput, {
        term,
        answer,
        status: INPUT_STATUS.DEFAULT,
        message: "",
        categorySlug
    });

    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        inputRef.current?.focus(); // Focus input on mount
    }, []);

    const defaultInputClasses =
        "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-yellow-300 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500";
    const showMessage = state.status === "error";

    const messageSuccessClasses =
        "mt-2 text-sm text-green-600 dark:text-green-500";
    const messageErrorClasses = "mt-2 text-sm text-red-600 dark:text-red-500";

    const messageStyles =
        state.status === "error" ? messageErrorClasses : messageSuccessClasses;

    useEffect(() => {
        if (state.status === INPUT_STATUS.SUCCESS) {
            // if (categorySlug === "mistakes") {
            //     handleTrainedMistakes()
            // }
            setTimeout(() => { }, 500);
            handleClick();
        }
        if (state.status === INPUT_STATUS.ERROR && !hasDoneMistake) {
            handleMistake();
            setHasDoneMistake(true);
        }
    }, [state, handleClick, handleMistake, hasDoneMistake]);

    return (
        <form action={formAction} className="w-full">
            <div className="flex flex-col gap-16">
                <div className="flex flex-row gap-4 items-center">
                    <p className="text-xl font-bold">{term}</p>

                    {/* Tooltip container must be a group */}
                    <div className="relative group">
                        {/* Icon */}
                        <LightBulbIcon className="w-6 h-6 text-yellow-500 hover:text-yellow-600 cursor-pointer" />

                        {/* Tooltip
                        <div className="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 whitespace-nowrap bg-gray-800 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            Show Hint
                        </div> */}
                        {/* Modal */}
                    </div>
                </div>

                <div>
                    <label
                        htmlFor="first_name"
                        className="block mb-2 text-sm font-medium text-gray-500 dark:text-white"
                    >
                        Answer:
                    </label>
                    <input
                        ref={inputRef}
                        autoComplete="off"
                        type="text"
                        name="word_query"
                        className={defaultInputClasses}
                        placeholder="Type your answer here..."
                        required
                    />
                    {showMessage ? (
                        <p className={messageStyles}>{state.message}</p>
                    ) : null}
                </div>
                <button
                    type="submit"
                    className="self-end max-w-20 text-lg font-bold focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 rounded-lg px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900 hover:cursor-pointer"
                >
                    Next
                </button>
            </div>
        </form>
    );
}
