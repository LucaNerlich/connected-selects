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

        // Re-fetch options after selection change
        fetchOptions(name, buildEndpoint());
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
