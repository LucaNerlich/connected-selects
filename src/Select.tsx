import React, {useCallback, useEffect} from 'react';
import {useSelectContext} from "./UseSelectContext.tsx";

interface SelectProps {
    name: string;
    endpoint: string;
    resetOthersOnChange?: string[];
}

const Select: React.FC<SelectProps> = ({name, endpoint, resetOthersOnChange = []}) => {
    const {values, options, loading, setSelectValue, resetSelect, fetchOptions} = useSelectContext();

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const newValue = event.target.value;
        setSelectValue(name, newValue);

        // on change, reset dependent selects and re-fetch their options
        if (resetOthersOnChange.length > 0) {
            resetSelect([...resetOthersOnChange]);
            resetOthersOnChange.forEach((dependentSelect) => {
                fetchOptions(dependentSelect, endpoint);
            });
        }
    };

    // todo make endpoint dynamic, based on selected values
    const buildEndpoint = useCallback(() => endpoint, [endpoint]);

    useEffect(() => {
        fetchOptions(name, buildEndpoint());
    }, [name, fetchOptions, buildEndpoint]);

    const isLoading = loading[name];
    const selectOptions = options[name] || [];

    return (
        <div style={{textAlign: 'left'}}>
            <select name={name} value={values[name] || ''} onChange={handleChange} disabled={isLoading}>
                <option value="">Select an option</option>
                {selectOptions.map((option) => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </select>
            <p style={{display: 'inline-block', marginLeft: '1rem'}}>{name}</p>
        </div>
    );
};

export default Select;
