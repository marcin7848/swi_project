import { SearchResult } from './search-result';

export interface SearchResponse {
    responseHeader: any;
    response: {
        docs: SearchResult[]
    };
}
