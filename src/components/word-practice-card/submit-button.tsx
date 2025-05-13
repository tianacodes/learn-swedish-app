export function SubmitButton() {
    return (
        <button
            data-testid="submit-button"
            type="submit"
            className="self-end max-w-20 text-lg font-bold focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 rounded-lg px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900 hover:cursor-pointer"
        >
            Next
        </button>
    );
}