import React, {useCallback, useEffect} from 'react';
import {useSelectContext} from "./SelectContext.tsx";

interface SelectProps {
    name: string;
    endpoint: string;
    resetOthersOnChange?: string[];
}

const Select: React.FC<SelectProps> = ({name, endpoint, resetOthersOnChange = []}) => {
    const {values, options, loading, setSelectValue, resetSelect, fetchOptions} = useSelectContext();

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectValue(name, event.target.value);
        if (resetOthersOnChange.length > 0) {
            resetSelect(resetOthersOnChange);
        }
    };

    const buildEndpoint = useCallback(() => {
        // todo pass url template via props
        return endpoint;
    }, [endpoint]);

    useEffect(() => {
        fetchOptions(name, buildEndpoint());
    }, [name, endpoint, fetchOptions, buildEndpoint]);

    const isLoading = loading[name];
    const selectOptions = options[name] || [];

    return (
        <select name={name} value={values[name] || ''} onChange={handleChange} disabled={isLoading}>
            <option value="">Select an option</option>
            {selectOptions.map((option) => (
                <option key={option} value={option}>
                    {option}
                </option>
            ))}
        </select>
    );
};

export default Select;
