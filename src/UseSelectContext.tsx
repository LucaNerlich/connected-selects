import {useContext} from "react";
import {SelectContext, SelectContextProps} from "./SelectContext.tsx";

/**
 * A custom React hook that retrieves the current context value for the SelectContext.
 * It throws an error if used outside of a SelectProvider.
 *
 * @returns {SelectContextProps} The current context value for the SelectContext.
 * @throws {Error} If called outside of a SelectProvider.
 */
export const useSelectContext = (): SelectContextProps => {
    const context = useContext(SelectContext);
    if (!context) {
        throw new Error('useSelectContext must be used within a SelectProvider');
    }
    return context;
};
