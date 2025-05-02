"use client";
import { checkInput } from "@/actions";
import { INPUT_STATUS } from "@/types";
import { useActionState, useEffect } from "react";

export default function WordPracticeCard({
    id,
    term,
    answer,
    handleClick,
    handleMistake
}: {
    id: number;
    term: string;
    answer: string;
    handleClick: () => void;
    handleMistake: () => void;
}) {
    const [state, formAction] = useActionState(checkInput, {
        wordId: id,
        status: INPUT_STATUS.DEFAULT,
        message: "",
        answer: answer,
    });

    const defaultInputClasses =
        "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500";
    const showMessage = state.status === "error";

    const messageSuccessClasses =
        "mt-2 text-sm text-green-600 dark:text-green-500";
    const messageErrorClasses = "mt-2 text-sm text-red-600 dark:text-red-500";

    const messageStyles =
        state.status === "error" ? messageErrorClasses : messageSuccessClasses;

    useEffect(() => {
        if (state.status === INPUT_STATUS.SUCCESS) {
            setTimeout(() => { }, 500);
            handleClick();
        }
        if (state.status === INPUT_STATUS.ERROR) {
            handleMistake();
        }
    }, [state, handleClick, handleMistake]);

    return (
        <form action={formAction} className="w-full">
            <div className="flex flex-col gap-16">
                <p className="font-bold">{term}</p>
                <div>
                    <label
                        htmlFor="first_name"
                        className="block mb-2 text-sm font-medium text-gray-500 dark:text-white"
                    >
                        Answer:
                    </label>
                    <input
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
                    className="max-w-20 focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900"
                >
                    Next
                </button>
            </div>
        </form>
    );
}
