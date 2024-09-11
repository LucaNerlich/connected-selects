import React, {useEffect} from 'react';
import {useSelectContext} from "./UseSelectContext.tsx";
import {ID} from "./ID.ts";

interface SelectProps {
    id: ID;
    resetOthersOnChange?: ID[];
    disableIfEmpty?: ID[];
}

/**
 * A functional React component that renders a select input field. It integrates with a context to fetch and manage options dynamically.
 *
 * @param {object} props - React component props.
 * @param {string} props.id - A unique identifier for the select input.
 * @param {string[]} [props.resetOthersOnChange=[]] - An array of other select IDs to reset when the value of this select changes.
 * @param {string[]} [props.disableIfEmpty=[]] - An array of select IDs that will cause this select to be disabled if they are empty.
 *
 * @returns {JSX.Element} The rendered React select component.
 */
const Select: React.FC<SelectProps> = ({id, resetOthersOnChange = [], disableIfEmpty = []}) => {
    const {values, options, loading, setSelectValue, resetSelect, fetchOptions} = useSelectContext();

    /**
     * Handle the change event for a selection.
     *
     * This function retrieves the selected value from the event,
     * updates the selection state, and conditionally resets dependent
     * select elements, subsequently fetching their options.
     *
     * @param {React.ChangeEvent<HTMLSelectElement>} event - The change event triggered by user interaction.
     */
    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const newValue = event.target.value;
        setSelectValue(id, newValue);

        // on change, reset dependent selects and re-fetch their options
        if (resetOthersOnChange.length > 0) {
            resetSelect([...resetOthersOnChange]);
            resetOthersOnChange.forEach((dependentSelect) => {
                fetchOptions(dependentSelect);
            });
        }
    };

    useEffect(() => {
        fetchOptions(id);
    }, [id, fetchOptions]);

    const isLoading = loading[id];
    const selectOptions = options[id] || [];
    const disabled = disableIfEmpty.some(select => values[select] == undefined || values[select] === '');

    return (
        <div style={{textAlign: 'left'}}>
            <select id={id} value={values[id] || ''} onChange={handleChange} disabled={disabled || isLoading}>
                <option value="">Select an option</option>
                {selectOptions.map((option) => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </select>
            <p style={{display: 'inline-block', marginLeft: '1rem'}}>{id}</p>
        </div>
    );
};

export default Select;
