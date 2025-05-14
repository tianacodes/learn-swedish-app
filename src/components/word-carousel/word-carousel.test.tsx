import { render, screen, fireEvent } from "@testing-library/react";
import { WordCarousel } from "./word-carousel";
import { useWordCarousel } from "./word-carousel.hook";

// Mock the `useWordCarousel` hook
jest.mock("./word-carousel.hook", () => ({
    useWordCarousel: jest.fn(),
}));

describe("@integration WordCarousel", () => {
    const mockCategoryData = {
        id: 1,
        name: "Test Category",
        slug: "test-category",
        cards: [
            { id: 1, term: "Term 1", answer: "Answer 1", categorySlug: "test-category" },
            { id: 2, term: "Term 2", answer: "Answer 2", categorySlug: "test-category" },
        ],
    };

    const mockHandleClick = jest.fn();
    const mockHandleMistake = jest.fn();
    const mockHandleCategoryPracticeRestart = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();

        // Mock the `useWordCarousel` hook's return value
        (useWordCarousel as jest.Mock).mockReturnValue({
            currentCard: mockCategoryData.cards[0],
            isDone: false,
            index: 0,
            handleClick: mockHandleClick,
            handleMistake: mockHandleMistake,
            mistakesCount: 0,
            handleCategoryPracticeRestart: mockHandleCategoryPracticeRestart,
            isReady: true,
        });
    });

    it("renders nothing when `currentCard` is null", () => {
        (useWordCarousel as jest.Mock).mockReturnValueOnce({
            currentCard: null, // Simulate no current card
            isDone: false,
            index: 0,
            handleClick: mockHandleClick,
            handleMistake: mockHandleMistake,
            mistakesCount: 0,
            handleCategoryPracticeRestart: mockHandleCategoryPracticeRestart,
            isReady: true,
        });

        const { container } = render(<WordCarousel categoryData={mockCategoryData} />);

        expect(container.firstChild).toBeNull(); // Ensure nothing is rendered
    });

    it("renders the loading state when `isReady` is false", () => {
        (useWordCarousel as jest.Mock).mockReturnValueOnce({
            currentCard: mockCategoryData.cards[0],
            isDone: false,
            index: 0,
            handleClick: mockHandleClick,
            handleMistake: mockHandleMistake,
            mistakesCount: 0,
            handleCategoryPracticeRestart: mockHandleCategoryPracticeRestart,
            isReady: false,
        });

        render(<WordCarousel categoryData={mockCategoryData} />);

        expect(screen.getByText("Loading...")).toBeInTheDocument();
    });

    it("renders the category name and mistakes count", () => {
        render(<WordCarousel categoryData={mockCategoryData} />);

        expect(screen.getByText("Category: Test Category")).toBeInTheDocument();
        expect(screen.getByText("Mistakes: 0")).toBeInTheDocument();
    });

    it("renders the WordPracticeCard when `isDone` is false", () => {
        render(<WordCarousel categoryData={mockCategoryData} />);

        expect(screen.getByText("Term 1")).toBeInTheDocument();
        expect(screen.getByText("1/2")).toBeInTheDocument();
    });

    it("renders the FinishPracticeScreen when `isDone` is true", () => {
        (useWordCarousel as jest.Mock).mockReturnValueOnce({
            currentCard: mockCategoryData.cards[0],
            index: 0,
            handleClick: mockHandleClick,
            handleMistake: mockHandleMistake,
            handleCategoryPracticeRestart: mockHandleCategoryPracticeRestart,
            isDone: true,
            mistakesCount: 1,
            isReady: true,
        });

        render(<WordCarousel categoryData={mockCategoryData} />);

        expect(screen.getByTestId("finish-practice-screen")).toBeInTheDocument();
    });

    it("calls `handleCategoryPracticeRestart` when the FinishPracticeScreen triggers it", () => {
        (useWordCarousel as jest.Mock).mockReturnValueOnce({
            currentCard: mockCategoryData.cards[0],
            index: 0,
            handleClick: mockHandleClick,
            handleMistake: mockHandleMistake,
            mistakesCount: 0,
            handleCategoryPracticeRestart: mockHandleCategoryPracticeRestart,
            isDone: true,
            isReady: true,
        });

        render(<WordCarousel categoryData={mockCategoryData} />);

        const restartButton = screen.getByTestId("restart-button");
        fireEvent.click(restartButton);

        expect(mockHandleCategoryPracticeRestart).toHaveBeenCalled();
    });
});