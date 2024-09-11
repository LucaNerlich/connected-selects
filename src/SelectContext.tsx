import React, {createContext, useCallback, useReducer} from 'react';
import {getEndpoint} from "./Utils.ts";
import {ID} from "./ID.ts";

export interface SelectContextProps {
    values: Record<ID, string>;
    options: Record<string, string[]>;
    loading: Record<string, boolean>;
    setSelectValue: (id: ID, value: string) => void;
    resetSelect: (ids: ID[]) => void;
    fetchOptions: (id: ID) => void;
}

export const SelectContext = createContext<SelectContextProps | undefined>(undefined);

const initialState = {
    values: {} as Record<string, string>,
    options: {} as Record<string, string[]>,
    loading: {} as Record<string, boolean>
};

type Action =
    | { type: 'SET_VALUE', id: string, value: string }
    | { type: 'RESET_VALUES', ids: string[] }
    | { type: 'SET_OPTIONS', id: string, options: string[] }
    | { type: 'SET_LOADING', id: string, loading: boolean };

function reducer(state: typeof initialState, action: Action) {
    switch (action.type) {
        case 'SET_VALUE':
            return {...state, values: {...state.values, [action.id]: action.value}};
        case 'RESET_VALUES': {
            const newValues = {...state.values};
            action.ids.forEach(id => {
                newValues[id] = '';
            });
            return {...state, values: newValues};
        }
        case 'SET_OPTIONS':
            return {...state, options: {...state.options, [action.id]: action.options}};
        case 'SET_LOADING':
            return {...state, loading: {...state.loading, [action.id]: action.loading}};
        default:
            return state;
    }
}

export const SelectProvider: React.FC<{ children: React.ReactNode }> = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const setSelectValue = useCallback((id: ID, value: string) => {
        dispatch({type: 'SET_VALUE', id, value});
    }, []);

    const resetSelect = useCallback((ids: ID[]) => {
        dispatch({type: 'RESET_VALUES', ids});
    }, []);

    const fetchOptions = useCallback(async (id: ID) => {
        dispatch({type: 'SET_LOADING', id: id, loading: true});
        try {
            const response = await fetch(getEndpoint(id));
            const data = await response.json();
            dispatch({type: 'SET_OPTIONS', id: id, options: data});
        } catch (error) {
            console.error(`Failed to load options for ${id} from ${id}`, error);
        } finally {
            dispatch({type: 'SET_LOADING', id: id, loading: false});
        }
    }, []);

    return (
        <SelectContext.Provider value={{...state, setSelectValue, resetSelect, fetchOptions}}>
            {children}
        </SelectContext.Provider>
    );
};


