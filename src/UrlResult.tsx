import React from 'react';
import {useSelectContext} from "./SelectContext.tsx";
import {ID_BRAND, ID_USE_CASE} from "./App.tsx";


export default function UrlResult(): React.ReactElement {
    const {values} = useSelectContext();

    return (
        <p>{`https://endpoint.com/${values[ID_USE_CASE]}/${values[ID_BRAND]}`}</p>
    )
}
