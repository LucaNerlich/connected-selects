import React from 'react';
import {useSelectContext} from "./SelectContext.tsx";
import {ID_APP, ID_BRAND, ID_LANG, ID_REGION, ID_USE_CASE} from "./App.tsx";


export default function UrlResult(): React.ReactElement {
    const {values} = useSelectContext();

    // /oru/audi/eu/ota/rn-2023-03-14-ftkm/de-de/tech-1-2/mode-day/index.html

    const buildEndpoint = () => {
        return `https://endpoint.com/${values[ID_USE_CASE]}/${values[ID_BRAND]}/${values[ID_REGION]}/${values[ID_APP]}/${values[ID_LANG]}/index.html`.toLowerCase()
    }

    return (
        <p>{buildEndpoint()}</p>
    )
}
