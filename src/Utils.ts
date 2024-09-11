import {ID} from "./ID.ts";

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
