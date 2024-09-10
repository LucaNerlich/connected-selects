import {useContext} from "react";
import {SelectContext, SelectContextProps} from "./SelectContext.tsx";

export const useSelectContext = (): SelectContextProps => {
    const context = useContext(SelectContext);
    if (!context) {
        throw new Error('useSelectContext must be used within a SelectProvider');
    }
    return context;
};
