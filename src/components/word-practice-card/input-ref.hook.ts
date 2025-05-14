import { useEffect, useRef } from "react";

export function useFocusInput() {
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        inputRef.current?.focus(); // Focus input on mount
    }, []);

    return inputRef;
}