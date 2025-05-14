import { render, screen, fireEvent } from "@testing-library/react";
import WordPracticeCard from "./word-practice-card";
import { useWordPracticeCard } from "./word-practice-card.hook";
import { useFocusInput } from "./input-ref.hook";

// Mock hooks
jest.mock("./word-practice-card.hook", () => ({
    useWordPracticeCard: jest.fn(),
}));

jest.mock("./input-ref.hook", () => ({
    useFocusInput: jest.fn(),
}));

describe("@integration WordPracticeCard", () => {
    const mockHandleClick = jest.fn();
    const mockHandleMistake = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();

        // Mock `useWordPracticeCard` hook
        (useWordPracticeCard as jest.Mock).mockReturnValue({
            formAction: jest.fn(),
            state: {
                message: "Test message",
                status: "error",
            },
        });

        // Mock `useFocusInput` hook
        const mockInputRef = { current: document.createElement("input") };
        (useFocusInput as jest.Mock).mockReturnValue(mockInputRef);
    });

    it("renders the component with all child components", () => {
        render(
            <WordPracticeCard
                term="Test Term"
                answer="Test Answer"
                handleClick={mockHandleClick}
                handleMistake={mockHandleMistake}
                categorySlug="test-category"
            />
        );

        // Check if TermDisplay renders the term
        expect(screen.getByText("Test Term")).toBeInTheDocument();

        // Check if AnswerInput renders with the correct placeholder
        expect(screen.getByPlaceholderText("Type your answer here...")).toBeInTheDocument();

        // Check if SubmitButton renders
        expect(screen.getByRole("button", { name: /next/i })).toBeInTheDocument();
    });

    it("displays the error message when status is 'error'", () => {
        render(
            <WordPracticeCard
                term="Test Term"
                answer="Test Answer"
                handleClick={mockHandleClick}
                handleMistake={mockHandleMistake}
                categorySlug="test-category"
            />
        );

        // Check if the error message is displayed
        expect(screen.getByText("Test message")).toBeInTheDocument();
        expect(screen.getByText("Test message")).toHaveClass("text-red-600");
    });

    it("calls the form action when the form is submitted", () => {
        const mockFormAction = jest.fn();
        (useWordPracticeCard as jest.Mock).mockReturnValue({
            formAction: mockFormAction,
            state: {
                message: "",
                status: "",
            },
        });

        render(
            <WordPracticeCard
                term="Test Term"
                answer="Test Answer"
                handleClick={mockHandleClick}
                handleMistake={mockHandleMistake}
                categorySlug="test-category"
            />
        );

        const form = screen.getByTestId("word-practice-action-form")
        fireEvent.submit(form);

        expect(mockFormAction).toHaveBeenCalled();
    });
});