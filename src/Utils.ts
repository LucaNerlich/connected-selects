import {ID} from "./ID.ts";

/**
 * Retrieves the endpoint URL based on the provided ID.
 *
 * @param {ID} id - The identifier for which the endpoint URL is required.
 * @return {string} The endpoint URL corresponding to the provided ID.
 */
export function getEndpoint(id: ID): string {
    switch (id) {
        case ID.LANG:
            return 'http://localhost:3000/options/lang';
        case ID.USE_CASE:
            return 'http://localhost:3000/options/usecase';
        case ID.BRAND:
            return 'http://localhost:3000/options/brand';
        case ID.REGION:
            return 'http://localhost:3000/options/region';
        case ID.APP:
            return 'http://localhost:3000/options/app';
    }
}
