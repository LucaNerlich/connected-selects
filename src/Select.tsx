import React, {useCallback, useEffect} from 'react';
import {useSelectContext} from "./UseSelectContext.tsx";
import {ID} from "./ID.ts";

interface SelectProps {
    id: ID;
    endpoint: string;
    resetOthersOnChange?: ID[];
    disableIfEmpty?: ID[];
}

const Select: React.FC<SelectProps> = ({id, endpoint, resetOthersOnChange = [], disableIfEmpty = []}) => {
    const {values, options, loading, setSelectValue, resetSelect, fetchOptions} = useSelectContext();

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

    // todo make endpoint dynamic, based on selected values
    const buildEndpoint = useCallback(() => endpoint, [endpoint]);

    useEffect(() => {
        fetchOptions(id);
    }, [id, fetchOptions, buildEndpoint]);

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
