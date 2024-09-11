import React from 'react';
import {useSelectContext} from "./UseSelectContext.tsx";
import {ID} from "./ID.ts";

const generateUrl = (values: Record<ID, string>): string => {
    const useCase = values[ID.USE_CASE] ?? '';
    const brand = values[ID.BRAND] ?? '';
    const region = values[ID.REGION] ?? '';
    const app = values[ID.APP] ?? '';
    const lang = values[ID.LANG] ?? '';

    return `https://endpoint.com/${useCase}/${brand}/${region}/${app}/${lang}/index.html`.toLowerCase();
};

export default function UrlResult(): React.ReactElement {
    const {values} = useSelectContext();

    return (
        <blockquote>
            <strong>URL</strong> {generateUrl(values)}
        </blockquote>
    );
}
