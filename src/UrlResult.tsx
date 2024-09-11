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

/**
 * UrlResult is a functional component that retrieves the current values from
 * the selection context and generates a URL based on these values.
 * It displays the URL within a blockquote element.
 *
 * @return {React.ReactElement} A React element that includes the generated URL.
 */
export default function UrlResult(): React.ReactElement {
    const {values} = useSelectContext();

    return (
        <blockquote>
            <strong>URL</strong> {generateUrl(values)}
        </blockquote>
    );
}
