'use client';
import { checkInput } from "@/actions";
import { INPUT_STATUS } from "@/types";
import { useActionState } from "react";

export default function WordPracticeCard() {
    const id = "123";

    const [state, formAction] = useActionState(checkInput, { wordId: id, status: INPUT_STATUS.DEFAULT, message: "" })

    const defaultInputClasses = "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500";
    const successInputClasses = "bg-green-50 border border-green-500 text-green-900 dark:text-green-400 placeholder-green-700 dark:placeholder-green-500 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-green-500";
    const errorInputClasses = "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 block w-full p-2.5 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500"
    const showMessage = !!state.message;

    const inputStyles = state.status === "success" ? successInputClasses : state.status === "error" ? errorInputClasses : defaultInputClasses

    const messageSuccessClasses = "mt-2 text-sm text-green-600 dark:text-green-500";
    const messageErrorClasses = "mt-2 text-sm text-red-600 dark:text-red-500";

    const messageStyles = state.status === "error" ? messageErrorClasses : messageSuccessClasses;

    return (
        <form action={formAction}>
            <div className="relative mx-auto flex max-w-2xl items-center rounded-xl bg-white p-10 shadow-lg outline outline-black/5 dark:bg-slate-800 dark:shadow-none dark:-outline-offset-1 dark:outline-white/10">
                <div className="absolute top-5 right-5">
                    <p className="text-gray-500">1/20</p>
                </div>
                <div className="flex flex-col w-full gap-16">
                    <div className="font-bold">en släkt</div>
                    <div>
                        <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-500 dark:text-white">Answer:</label>
                        <input type="text" name="word_query" className={inputStyles} placeholder="Type your answer here..." required />
                        {showMessage ? <p className={messageStyles}>{state.message}</p> : null}
                    </div>
                    <button type="submit" className="max-w-20 focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900">Next</button>
                </div>
            </div>
        </form>
    );
}

