export const FinishPracticeScreen = () => {
    return (
        <>
            <h1 className="font-bold">You reviewed all terms!</h1>
            <div className="flex flex-row gap-16 justify-evenly">
                <button
                    type="button"
                    className="w-xs text-white bg-blue-400 hover:bg-blue-500 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                >
                    Do again
                </button>
                <button
                    type="button"
                    className="w-xs focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900"
                >
                    Back to Categories
                </button>
            </div>
        </>
    );
};
