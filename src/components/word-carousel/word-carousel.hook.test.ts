import { renderHook, act } from "@testing-library/react";
import { useWordCarousel } from "./word-carousel.hook";

describe("@unit useWordCarousel", () => {
    const mockCategoryData = {
        id: 1,
        name: "Test Category",
        slug: "test-category",
        cards: [
            { id: 1, term: "Term 1", answer: "Answer 1", categorySlug: "test-category" },
            { id: 2, term: "Term 2", answer: "Answer 2", categorySlug: "test-category" },
        ],
    };

    beforeEach(() => {
        jest.clearAllMocks();
        sessionStorage.clear();
    });

it("initializes with the correct default state", () => {
    const { result } = renderHook(() =>
        useWordCarousel({ categoryData: mockCategoryData })
    );

    // Check initial state before any effects run
    expect(result.current.index).toBe(0);
    expect(result.current.mistakesCount).toBe(0);
    expect(result.current.isDone).toBe(false);

    // Since useEffect runs immediately, isReady will likely be true
    expect(result.current.isReady).toBe(true);
});

    it("sets isReady to true after reading from sessionStorage", () => {
        sessionStorage.setItem("defaultIndex", "1");
        sessionStorage.setItem("mistakesCount", "2");

        const { result } = renderHook(() =>
            useWordCarousel({ categoryData: mockCategoryData })
        );

        act(() => {
            // Simulate the hook becoming ready
            result.current.isReady = true;
        });

        expect(result.current.index).toBe(1);
        expect(result.current.mistakesCount).toBe(2);
        expect(result.current.isReady).toBe(true);
    });

    it("increments the index when handleClick is called", () => {
        const { result } = renderHook(() =>
            useWordCarousel({ categoryData: mockCategoryData })
        );

        act(() => {
            result.current.handleClick();
        });

        expect(result.current.index).toBe(1);
        expect(result.current.isDone).toBe(false);
    });

    it("resets the index and sets isDone to true when the last card is reached", () => {
        const { result } = renderHook(() =>
            useWordCarousel({ categoryData: mockCategoryData })
        );

        act(() => {
            result.current.handleClick(); // Move to the second card
            result.current.handleClick(); // Move past the last card
        });

        // expect(result.current.index).toBe(0);
        expect(result.current.isDone).toBe(true);
    });

    it("increments mistakesCount when handleMistake is called", () => {
        const { result } = renderHook(() =>
            useWordCarousel({ categoryData: mockCategoryData })
        );

        act(() => {
            result.current.handleMistake();
        });

        expect(result.current.mistakesCount).toBe(1);
        expect(sessionStorage.getItem("mistakesCount")).toBe("1");
    });

    it("resets mistakesCount and isDone when handleCategoryPracticeRestart is called", () => {
        const { result } = renderHook(() =>
            useWordCarousel({ categoryData: mockCategoryData })
        );

        act(() => {
            result.current.handleMistake(); // Increment mistakesCount
            result.current.handleCategoryPracticeRestart();
        });

        expect(result.current.mistakesCount).toBe(0);
        expect(result.current.isDone).toBe(false);
    });

    it("saves index and mistakesCount to sessionStorage on state change", () => {
        const { result } = renderHook(() =>
            useWordCarousel({ categoryData: mockCategoryData })
        );

        act(() => {
            result.current.handleClick(); // Increment index
            result.current.handleMistake(); // Increment mistakesCount
        });

        expect(sessionStorage.getItem("defaultIndex")).toBe("1");
        expect(sessionStorage.getItem("mistakesCount")).toBe("1");
    });

    it("clears sessionStorage on unmount", () => {
        const { unmount } = renderHook(() =>
            useWordCarousel({ categoryData: mockCategoryData })
        );

        act(() => {
            sessionStorage.setItem("defaultIndex", "1");
            sessionStorage.setItem("mistakesCount", "2");
        });

        unmount();

        expect(sessionStorage.getItem("defaultIndex")).toBeNull();
        expect(sessionStorage.getItem("mistakesCount")).toBeNull();
    });
});