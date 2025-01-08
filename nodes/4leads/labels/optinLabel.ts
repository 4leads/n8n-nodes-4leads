import type { INodeProperties } from 'n8n-workflow';

export const optinOperations: INodeProperties[] = [
    {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: {
            show: {
                resource: ['optin'],
            },
        },
        options: [
            {
                name: 'Delete',
                value: 'delete',
                action: 'Delete a Opt-in',
            },
            {
                name: 'Get',
                value: 'get',
                action: 'List Opt-ins',
            },
            {
                name: 'Send',
                value: 'send',
                action: 'Send a Opt-in to Contact',
            },
            {
                name: 'Opt-out',
                value: 'optout',
                action: 'Opt-out a contact globally',
            }
        ],
        default: 'get',
    },
];

export const optinFields: INodeProperties[] = [
    {
        displayName: 'Return everything',
        name: 'bReturnAll',
        type: 'boolean',
        displayOptions: {
            show: {
                operation: ['get'],
                resource: ['optin'],
            },
        },
        default: false,
        description: 'Enable this option to return everything.',
    },
    {
        displayName: 'Opt-in ID',
        name: 'optinId',
        type: 'number',
        default: '',
        required: true,
        displayOptions: {
            show: {
                resource: ['optin'],
                operation: ['get', 'delete', 'send'],
                bReturnAll: [false],
            },
        },
        description: 'The ID of the opt-in',
    },
    {
        displayName: 'Contact ID',
        name: 'optinContactId',
        type: 'number',
        default: '',
        required: true,
        displayOptions: {
            show: {
                resource: ['optin'],
                operation: ['send', 'optout'],
            },
        },
        description: 'The ID of the contact to whom the opt-in message is sent.',
    },
    {
        displayName: 'Additional Fields',
        name: 'optinQs',
        type: 'collection',
        placeholder: 'Add Field',
        default: {},
        displayOptions: {
            show: {
                resource: [
                    'optin',
                ],
                operation: [
                    'get',
                ],
                bReturnAll: [true],
            },
        },
        options: [
            {
                displayName: 'Search string',
                name: 'optinSearchString',
                type: 'string',
                default: '',
                description: 'This parameter is used to specify the text you want to search for within the name fields. For example, if you\'re looking for names containing "@muster.de", you would enter this value in the searchString parameter.',
            },
            {
                displayName: 'Page size',
                name: 'optinPageSize',
                type: 'number',
                default: '',
                description: 'This parameter defines the number of results to display per page. You can specify values like 5, 10, 20, 50, or 200, depending on how many results you want to be shown per page in the response.',
            },
            {
                displayName: 'Page number',
                name: 'optinPageNum',
                type: 'number',
                default: '',
                description: 'This parameter is used to indicate the page number you want to retrieve in the result set. For example, if you want the first set of results, you would set this value to 1. If you want the second set, set it to 2, and so on.',
            },
        ],
    },
];