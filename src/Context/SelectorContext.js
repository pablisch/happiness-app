import { createContext, useContext } from "react";

export const SelectorContext = createContext(null);

export function useSelectorContext() {
    const ctx = useContext(SelectorContext);
    if (!ctx) {
        throw new Error("useSelectorContext must be used inside a SelectorProvider");
    }
    return ctx;
}