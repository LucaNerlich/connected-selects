import React, {createContext, useCallback, useContext, useState} from 'react';

interface SelectContextProps {
    values: Record<string, string>;
    options: Record<string, string[]>;
    loading: Record<string, boolean>;
    setSelectValue: (name: string, value: string) => void;
    resetSelect: (names: string[]) => void;
    fetchOptions: (name: string, endpoint: string) => void;
}

const SelectContext = createContext<SelectContextProps | undefined>(undefined);

export const SelectProvider: React.FC<{ children: React.ReactNode }> = ({children}) => {
    const [values, setValues] = useState<Record<string, string>>({});
    const [options, setOptions] = useState<Record<string, string[]>>({});
    const [loading, setLoading] = useState<Record<string, boolean>>({});

    const setSelectValue = useCallback((name: string, value: string) => {
        setValues((prevValues) => ({...prevValues, [name]: value}));
    }, []);

    const resetSelect = useCallback((names: string[]) => {
        setValues((prevValues) => {
            const newValues = {...prevValues};
            names.forEach((name) => {
                newValues[name] = '';
            });
            return newValues;
        });
    }, []);

    // useCallback, since it does not change on rerender, infinite loop otherwise
    const fetchOptions = useCallback(async (name: string, endpoint: string) => {
        setLoading((prevLoading) => ({...prevLoading, [name]: true}));
        try {
            const response = await fetch(endpoint);
            const data = await response.json();
            console.log("data", data);
            setOptions((prevOptions) => ({...prevOptions, [name]: data}));
        } catch (error) {
            console.error(`Failed to load options for ${name} from ${endpoint}`, error);
        } finally {
            setLoading((prevLoading) => ({...prevLoading, [name]: false}));
        }
    }, []);

    return (
        <SelectContext.Provider value={{values, options, loading, setSelectValue, resetSelect, fetchOptions}}>
            {children}
        </SelectContext.Provider>
    );
};

export const useSelectContext = (): SelectContextProps => {
    const context = useContext(SelectContext);
    if (!context) {
        throw new Error('useSelectContext must be used within a SelectProvider');
    }
    return context;
};
