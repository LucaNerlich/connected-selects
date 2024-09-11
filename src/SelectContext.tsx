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

/**
 * Defines actions that can be dispatched to manipulate state.
 *
 * @typedef {Object} Action
 *
 * @property {'SET_VALUE'} type Specifies the action type.
 * @property {string} id Unique identifier associated with the action.
 * @property {string} [value] The new value to be set for the specified id.
 *
 * @typedef {Object} Action
 *
 * @property {'RESET_VALUES'} type Specifies the action type.
 * @property {string[]} ids List of unique identifiers whose values are to be reset.
 *
 * @typedef {Object} Action
 *
 * @property {'SET_OPTIONS'} type Specifies the action type.
 * @property {string} id Unique identifier associated with the action.
 * @property {string[]} options Array of new options to be set for the specified id.
 *
 * @typedef {Object} Action
 *
 * @property {'SET_LOADING'} type Specifies the action type.
 * @property {string} id Unique identifier associated with the action.
 * @property {boolean} loading Indicates the new loading state for the specified id.
 */
type Action =
    | { type: 'SET_VALUE', id: string, value: string }
    | { type: 'RESET_VALUES', ids: string[] }
    | { type: 'SET_OPTIONS', id: string, options: string[] }
    | { type: 'SET_LOADING', id: string, loading: boolean };

/**
 * Reducer function to manage state transitions based on action types.
 *
 * @param {typeof initialState} state - The current state of the application.
 * @param {Action} action - The action that triggers state changes, containing type and payload.
 *
 * @return {typeof initialState} - The updated state based on the action type.
 */
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

/**
 * SelectProvider is a functional component that provides context for managing
 * state associated with select inputs in the application. It maintains the
 * state using a reducer and offers methods to set select values, reset select
 * values, and fetch options.
 *
 * @typedef {Object} Props
 * @property {React.ReactNode} children - The child components that will consume the context.
 *
 * @param {Props} props - The properties object.
 *
 * @returns {JSX.Element} The context provider with the managed state and actions.
 */
export const SelectProvider: React.FC<{ children: React.ReactNode }> = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    /**
     * A callback function to update the value of a select input.
     *
     * @param {ID} id - The unique identifier of the select input to be updated.
     * @param {string} value - The new value to be set for the select input.
     *
     * The callback function triggers a dispatch action to update the value of the specified select input.
     * The action type is 'SET_VALUE'.
     *
     * This memoized callback function ensures that the dispatch action does not change unless the dependencies change.
     */
    const setSelectValue = useCallback((id: ID, value: string) => {
        dispatch({type: 'SET_VALUE', id, value});
    }, []);

    /**
     * A callback function to reset selected values based on the provided IDs.
     *
     * This function dispatches an action with the type 'RESET_VALUES' and the specified array of IDs.
     * It is memoized using `useCallback` to ensure that it is only re-created if its dependencies change.
     *
     * @param {ID[]} ids - An array of IDs representing the items to reset.
     */
    const resetSelect = useCallback((ids: ID[]) => {
        dispatch({type: 'RESET_VALUES', ids});
    }, []);

    /**
     * Asynchronously fetches options for a given ID and updates the application state based on the fetch result.
     *
     * Uses the `getEndpoint` function to determine the URL to fetch data from,
     * and dispatches actions to update loading status and data options in the state.
     *
     * @callback fetchOptions
     * @param {ID} id - The unique identifier used to fetch data.
     * @throws Will log an error message if the fetch operation fails.
     */
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


