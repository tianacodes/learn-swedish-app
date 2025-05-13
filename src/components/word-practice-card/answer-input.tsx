const messageSuccessClasses =
    "mt-2 text-sm text-green-600 dark:text-green-500";
const messageErrorClasses = "mt-2 text-sm text-red-600 dark:text-red-500";
const inputClasses =
    "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-yellow-300 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500";

export function AnswerInput({
    inputRef,
    message,
    status,
}: {
    inputRef: React.RefObject<HTMLInputElement | null>;
    message: string;
    status: string;
}) {
    const showMessage = status === "error";
    const messageStyles =
        showMessage ? messageErrorClasses : messageSuccessClasses;

    return (
        <div>
            <label
                htmlFor="word_query"
                className="block mb-2 text-sm font-medium text-gray-500 dark:text-white"
            >
                Answer:
            </label>
            <input
                id="word_query"
                ref={inputRef}
                autoComplete="off"
                type="text"
                name="word_query"
                className={inputClasses}
                placeholder="Type your answer here..."
                required
            />
            {showMessage && <p className={messageStyles}>{message}</p>}
        </div>
    );
}