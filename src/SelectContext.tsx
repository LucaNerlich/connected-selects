import React, {createContext, useCallback, useReducer} from 'react';

export interface SelectContextProps {
    values: Record<string, string>;
    options: Record<string, string[]>;
    loading: Record<string, boolean>;
    setSelectValue: (name: string, value: string) => void;
    resetSelect: (names: string[]) => void;
    fetchOptions: (name: string, endpoint: string) => void;
}

export const SelectContext = createContext<SelectContextProps | undefined>(undefined);

const initialState = {
    values: {} as Record<string, string>,
    options: {} as Record<string, string[]>,
    loading: {} as Record<string, boolean>
};

type Action =
    | { type: 'SET_VALUE', name: string, value: string }
    | { type: 'RESET_VALUES', names: string[] }
    | { type: 'SET_OPTIONS', name: string, options: string[] }
    | { type: 'SET_LOADING', name: string, loading: boolean };

function reducer(state: typeof initialState, action: Action) {
    switch (action.type) {
        case 'SET_VALUE':
            return {...state, values: {...state.values, [action.name]: action.value}};
        case 'RESET_VALUES': {
            const newValues = {...state.values};
            action.names.forEach(name => {
                newValues[name] = '';
            });
            return {...state, values: newValues};
        }
        case 'SET_OPTIONS':
            return {...state, options: {...state.options, [action.name]: action.options}};
        case 'SET_LOADING':
            return {...state, loading: {...state.loading, [action.name]: action.loading}};
        default:
            return state;
    }
}

export const SelectProvider: React.FC<{ children: React.ReactNode }> = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const setSelectValue = useCallback((name: string, value: string) => {
        dispatch({type: 'SET_VALUE', name, value});
    }, []);

    const resetSelect = useCallback((names: string[]) => {
        dispatch({type: 'RESET_VALUES', names});
    }, []);

    const fetchOptions = useCallback(async (name: string, endpoint: string) => {
        dispatch({type: 'SET_LOADING', name, loading: true});
        try {
            const response = await fetch(endpoint);
            const data = await response.json();
            dispatch({type: 'SET_OPTIONS', name, options: data});
        } catch (error) {
            console.error(`Failed to load options for ${name} from ${endpoint}`, error);
        } finally {
            dispatch({type: 'SET_LOADING', name, loading: false});
        }
    }, []);

    return (
        <SelectContext.Provider value={{...state, setSelectValue, resetSelect, fetchOptions}}>
            {children}
        </SelectContext.Provider>
    );
};


