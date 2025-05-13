import { renderHook } from "@testing-library/react";
import { useFocusInput } from "./input-ref.hook";
import React from "react";

describe("useFocusInput", () => {
    it("should return a ref object", () => {
        const { result } = renderHook(() => useFocusInput());
        expect(result.current).toHaveProperty("current");
    });

    it("should focus the input element on mount", () => {
        const focusMock = jest.fn();
        const inputElement = { focus: focusMock };

        // Mock the ref's current property
        jest.spyOn(React, "useRef").mockReturnValueOnce({ current: inputElement });

        renderHook(() => useFocusInput());

        expect(focusMock).toHaveBeenCalled();
    });
});