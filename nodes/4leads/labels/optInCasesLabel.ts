import type { INodeProperties } from 'n8n-workflow';

export const optInCasesOperations: INodeProperties[] = [
    {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: {
            show: {
                resource: ['optInCases'],
            },
        },
        options: [
            {
                name: 'Get',
                value: 'get',
                action: 'List opt-in cases',
            },
            {
                name: 'Grant',
                value: 'grant',
                action: 'Grant opt-in-case',
            },
            {
                name: 'Revoke',
                value: 'revoke',
                action: 'Revoke opt-in-case',
            }
        ],
        default: 'get',
    },
];

export const optInCasesFields: INodeProperties[] = [
    {
        displayName: 'Opt-In-Case',
        name: 'optInCaseId',
        type: 'resourceLocator',
        required: true,
        default: { mode: 'list', value: '' },
        placeholder: 'Select a opt-in-case...',
        description: 'Select a opt-in-case...',
        displayOptions: {
            show: {
                resource: ['optInCases'],
                operation: ['grant', 'revoke'],
            },
        },
        modes: [
            {
                displayName: 'From List',
                name: 'list',
                type: 'list',
                placeholder: 'Select a opt-in-case...',
                typeOptions: {
                    searchListMethod: 'getOptInCases',
                    searchable: true,
                },
            },
            {
                displayName: 'By ID',
                name: 'id',
                type: 'string',
                validation: [
                    {
                        type: 'regex',
                        properties: {
                            regex: '^[0-9]*$',
                            errorMessage: 'Not a valid opt-in-case ID',
                        },
                    },
                ],
            },
        ],
    },
    {
        displayName: 'Opt-In-Case',
        name: 'optInCaseId',
        type: 'resourceLocator',
        required: true,
        default: { mode: 'list', value: '' },
        placeholder: 'Select a opt-in-case...',
        description: 'Select a opt-in-case...',
        displayOptions: {
            show: {
                resource: ['optInCases'],
                operation: ['get'],
                bReturnAll: [false],
            },
        },
        modes: [
            {
                displayName: 'From List',
                name: 'list',
                type: 'list',
                placeholder: 'Select a opt-in-case...',
                typeOptions: {
                    searchListMethod: 'getOptInCases',
                    searchable: true,
                },
            },
            {
                displayName: 'By ID',
                name: 'id',
                type: 'string',
                validation: [
                    {
                        type: 'regex',
                        properties: {
                            regex: '^[0-9]*$',
                            errorMessage: 'Not a valid opt-in-case ID',
                        },
                    },
                ],
            },
        ],
    },
    {
        displayName: 'Contact',
        name: 'OptInCaseContactId',
        type: 'resourceLocator',
        required: true,
        default: { mode: 'id', value: '' },
        placeholder: 'Select a contact...',
        description: 'Select a contact...',
        displayOptions: {
            show: {
                resource: ['optInCases'],
                operation: ['grant', 'revoke'],
            },
        },
        modes: [
            {
                displayName: 'From List',
                name: 'list',
                type: 'list',
                placeholder: 'Select a contact...',
                typeOptions: {
                    searchListMethod: 'getContacts',
                    searchable: true,
                },
            },
            {
                displayName: 'By ID',
                name: 'id',
                type: 'string',
                validation: [
                    {
                        type: 'regex',
                        properties: {
                            regex: '^[0-9]*$',
                            errorMessage: 'Not a valid contact ID',
                        },
                    },
                ],
            },
        ],
    },
    {
        displayName: 'Return everything',
        name: 'bReturnAll',
        type: 'boolean',
        displayOptions: {
            show: {
                operation: ['get'],
                resource: ['optInCases'],
            },
        },
        default: false,
        description: 'Enable this option to return everything.',
    },
    {
        displayName: 'Additional Fields',
        name: 'optInCaseQs',
        type: 'collection',
        placeholder: 'Add Field',
        default: {},
        displayOptions: {
            show: {
                resource: [
                    'optInCases',
                ],
                operation: [
                    'get',
                ],
                bReturnAll: [true]
            },
        },
        options: [
            {
                displayName: 'Search string',
                name: 'optInCaseSearchString',
                type: 'string',
                default: '',
                description: 'This parameter is used to specify the text you want to search for within the name fields. For example, if you\'re looking for names containing "@muster.de", you would enter this value in the searchString parameter.',
            },
            {
                displayName: 'Page size',
                name: 'optInCasePageSize',
                type: 'string',
                default: '',
                description: 'This parameter defines the number of results to display per page. You can specify values like 5, 10, 20, 50, or 200, depending on how many results you want to be shown per page in the response.',
            },
            {
                displayName: 'Page number',
                name: 'optInCasePageNum',
                type: 'string',
                default: '',
                description: 'This parameter is used to indicate the page number you want to retrieve in the result set. For example, if you want the first set of results, you would set this value to 1. If you want the second set, set it to 2, and so on.',
            },
        ]
    },
    {
        displayName: 'Additional Fields',
        name: 'optInCaseAdditionalFields',
        type: 'collection',
        placeholder: 'Add Field',
        default: {},
        displayOptions: {
            show: {
                resource: ['optInCases'],
                operation: ['grant', 'revoke'],
            },
        },
        options: [
            {
                displayName: 'IP',
                name: 'optInCaseIp',
                type: 'string',
                default: '',
                description: 'The end user ip can be provided here to determine who is responsible for granting/revoking this case for this contact. Leave the parameter if set by system.',
            },
        ],
    },
];