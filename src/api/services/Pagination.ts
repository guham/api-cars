import { compose, replace } from 'lodash/fp';

import { Pagination } from '../interfaces';

const uriBuilderStrategy = (url: string, totalRecords: number, pageSize: number, pageNumber: number): (name: string) => string => {
    const removeSubstring = (pattern: RegExp) => replace(pattern, '');

    // removes per_page & page from the original URL
    const cleanURL = (): string => {

        const cleanedString = compose(
            removeSubstring(/page=[1-9]+(&)?/),
            removeSubstring(/per_page=[1-9]+(&)?/)
        )(url);

        if (cleanedString.endsWith('?')) {
            return cleanedString;
        }
        if (cleanedString.includes('?')) {
            return cleanedString.endsWith('&') ? cleanedString : `${cleanedString}&`;
        }

        return `${cleanedString}?`;
    };

    const newUrl: string = cleanURL();

    const getPagesParams = (newPageNumber: number, newPageSize: number) =>
        `${newUrl}page=${newPageNumber}&per_page=${newPageSize}`;

    return (pageName: string): string => {
        // tslint:disable: no-null-keyword
        switch (pageName) {
            case 'first':
                return `${getPagesParams(1, pageSize)}`;
            case 'previous':
                return pageNumber === 1 ? null : `${getPagesParams(pageNumber - 1, pageSize)}`;
            case 'actual':
                return `${getPagesParams(pageNumber, pageSize)}`;
            case 'next':
                return pageNumber >= Math.ceil(totalRecords / pageSize) ? null : `${getPagesParams(pageNumber + 1, pageSize)}`;
            case 'last':
                return `${getPagesParams(Math.ceil(totalRecords / pageSize), pageSize)}`;
            default:
                throw new Error('Invalid page name');
        }
    };

};

/**
 * Creates the Pagination object
 */
export const getPaginationData = (totalRecords: number, pageSize: number, pageNumber: number, url: string): Pagination => {
    const getLink = uriBuilderStrategy(url, totalRecords, pageSize, pageNumber);
    // pagination informations
    return {
        total_records: totalRecords,
        page_size: pageSize,
        page_number: pageNumber,
        _links: {
            first: getLink('first'),
            previous: getLink('previous'),
            actual: getLink('actual'),
            next: getLink('next'),
            last: getLink('last'),
        },
    };
};
