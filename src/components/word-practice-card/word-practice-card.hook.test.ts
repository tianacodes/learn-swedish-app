import { renderHook, act } from '@testing-library/react';
import { useWordPracticeCard, UseWordPracticeType } from './word-practice-card.hook';
import { INPUT_STATUS } from '../../types';

// Mock react.useActionState
// We need to be able to control the 'state' it returns and mock the 'formAction' it provides.
let mockActionState: any; // This will hold the state we want useActionState to return
const mockDispatchFormAction = jest.fn(); // This is the action dispatcher useActionState would return

jest.mock('react', () => {
    const originalReact = jest.requireActual('react');
    return {
        ...originalReact,
        useActionState: jest.fn((actionFn, initialState) => {
            // If mockActionState is set by a test, use it. Otherwise, use the initialState.
            // This allows us to simulate state changes coming from useActionState.
            const currentState = mockActionState !== undefined ? mockActionState : initialState;
            return [currentState, mockDispatchFormAction];
        }),
    };
});

describe('useWordPracticeCard', () => {
    const mockHandleClick = jest.fn();
    const mockHandleMistake = jest.fn();
    const defaultProps: UseWordPracticeType = {
        handleClick: mockHandleClick,
        handleMistake: mockHandleMistake,
        categorySlug: 'fruits',
        term: 'Apple',
        answer: 'Manzana',
    };

    const initialHookStateFromUseActionState = {
        term: defaultProps.term,
        answer: defaultProps.answer,
        status: INPUT_STATUS.DEFAULT,
        message: "",
        categorySlug: defaultProps.categorySlug,
    };

    beforeEach(() => {
        jest.clearAllMocks();
        jest.useFakeTimers(); // For the setTimeout
        mockActionState = undefined; // Reset controlled state for useActionState
        // Ensure useActionState mock is freshly applied with default behavior
        (require('react').useActionState as jest.Mock).mockImplementation((actionFn, initialState) => {
            const currentState = mockActionState !== undefined ? mockActionState : initialState;
            return [currentState, mockDispatchFormAction];
        });
    });

    afterEach(() => {
        jest.runOnlyPendingTimers();
        jest.useRealTimers();
    });

    it('should return initial state and formAction from useActionState', () => {
        const { result } = renderHook(() => useWordPracticeCard(defaultProps));

        expect(result.current.state).toEqual(initialHookStateFromUseActionState);
        expect(result.current.formAction).toBe(mockDispatchFormAction); // The hook just passes this through
        expect(require('react').useActionState).toHaveBeenCalledWith(
            expect.any(Function), // checkInput
            initialHookStateFromUseActionState
        );
    });

    it('should call handleClick after a delay when state.status becomes SUCCESS', () => {
        const { rerender } = renderHook(() => useWordPracticeCard(defaultProps));

        // Simulate useActionState updating its state to SUCCESS
        mockActionState = { ...initialHookStateFromUseActionState, status: INPUT_STATUS.SUCCESS, message: "Correct!" };

        act(() => {
            rerender(); // Rerender to trigger useEffect with new state
        });

        expect(mockHandleClick).not.toHaveBeenCalled(); // Not called immediately

        act(() => {
            jest.advanceTimersByTime(500); // Advance timer
        });

        expect(mockHandleClick).toHaveBeenCalledTimes(1);
        expect(mockHandleMistake).not.toHaveBeenCalled();
    });

    it('should call handleMistake when state.status becomes ERROR for the first time', () => {
        const { rerender } = renderHook(() => useWordPracticeCard(defaultProps));

        // Simulate useActionState updating its state to ERROR
        mockActionState = { ...initialHookStateFromUseActionState, status: INPUT_STATUS.ERROR, message: "Incorrect!" };

        act(() => {
            rerender();
        });

        expect(mockHandleMistake).toHaveBeenCalledTimes(1);
        expect(mockHandleClick).not.toHaveBeenCalled();
    });

    it('should NOT call handleMistake when state.status becomes ERROR if already made a mistake', () => {
        const { rerender } = renderHook(() => useWordPracticeCard(defaultProps));

        // First mistake
        mockActionState = { ...initialHookStateFromUseActionState, status: INPUT_STATUS.ERROR, message: "Incorrect!" };
        act(() => {
            rerender();
        });
        expect(mockHandleMistake).toHaveBeenCalledTimes(1);
        mockHandleMistake.mockClear(); // Clear for the next check

        // Simulate another action that also results in an error
        // The state from useActionState might change message but keep status ERROR
        mockActionState = { ...initialHookStateFromUseActionState, status: INPUT_STATUS.ERROR, message: "Still incorrect!" };
        act(() => {
            rerender();
        });

        expect(mockHandleMistake).not.toHaveBeenCalled();
        expect(mockHandleClick).not.toHaveBeenCalled();
    });

    // it('should reset hasDoneMistake if the term/answer changes (simulated by re-rendering with new props)', () => {
    //     // This tests if the internal `hasDoneMistake` state resets if the component context changes.
    //     // `useWordPracticeCard` would typically be re-invoked if its parent re-renders it with new term/answer.
    //     const { rerender } = renderHook(
    //         (props) => useWordPracticeCard(props),
    //         { initialProps: defaultProps }
    //     );

    //     // First mistake on "Apple"
    //     mockActionState = { ...initialHookStateFromUseActionState, status: INPUT_STATUS.ERROR, message: "Incorrect Apple!" };
    //     act(() => { rerender(defaultProps); }); // Rerender with current props and new mocked state
    //     expect(mockHandleMistake).toHaveBeenCalledTimes(1);
    //     mockHandleMistake.mockClear();

    //     // Change props to a new word, this will effectively re-initialize the hook's scope
    //     // including the `useState(false)` for `hasDoneMistake`.
    //     // We also need to reset mockActionState to reflect the new initial state for the new word.
    //     const newProps = { ...defaultProps, term: "Banana", answer: "Platano" };
    //     const newInitialHookState = {
    //         term: newProps.term,
    //         answer: newProps.answer,
    //         status: INPUT_STATUS.DEFAULT,
    //         message: "",
    //         categorySlug: newProps.categorySlug,
    //     };
    //     mockActionState = newInitialHookState; // Reset to default for the new word

    //     // Re-render with new props, which effectively means useWordPracticeCard is called "freshly"
    //     // for "Banana", so hasDoneMistake should be false again.
    //     act(() => { rerender(newProps); });

    //     // Now, make a mistake on "Banana"
    //     mockActionState = { ...newInitialHookState, status: INPUT_STATUS.ERROR, message: "Incorrect Banana!" };
    //     act(() => { rerender(newProps); }); // Rerender with new props and new mocked error state

    //     expect(mockHandleMistake).toHaveBeenCalledTimes(1); // Called again for the new word
    // });

    it('should not call handleClick or handleMistake if status remains DEFAULT', () => {
        const { rerender } = renderHook(() => useWordPracticeCard(defaultProps));

        // Simulate state remaining default (e.g., after an unrelated rerender)
        mockActionState = { ...initialHookStateFromUseActionState, status: INPUT_STATUS.DEFAULT };
        act(() => {
            rerender();
        });

        act(() => {
            jest.advanceTimersByTime(500);
        });

        expect(mockHandleClick).not.toHaveBeenCalled();
        expect(mockHandleMistake).not.toHaveBeenCalled();
    });
});