import React from 'react';
import {useSelectContext} from "./UseSelectContext.tsx";
import {ID} from "./ID.ts";

export default function UrlResult(): React.ReactElement {
    const {values} = useSelectContext();

    // /oru/audi/eu/ota/rn-2023-03-14-ftkm/de-de/tech-1-2/mode-day/index.html
    return (
        <blockquote>
            <strong>URL</strong> {`https://endpoint.com/${values[ID.USE_CASE]}/${values[ID.BRAND]}/${values[ID.REGION]}/${values[ID.APP]}/${values[ID.LANG]}/index.html`.toLowerCase()}
        </blockquote>
    )
}
