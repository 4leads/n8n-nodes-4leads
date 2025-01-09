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
        displayName: 'Opt-in-case ID',
        name: 'optInCaseId',
        type: 'number',
        default: '',
        required: true,
        displayOptions: {
            show: {
                resource: ['optInCases'],
                operation: ['grant', 'revoke'],
            },
        },
        description: 'The ID of the opt-in-case',
    },
    {
        displayName: 'Opt-in-case ID',
        name: 'optInCaseId',
        type: 'number',
        default: '',
        required: true,
        displayOptions: {
            show: {
                resource: ['optInCases'],
                operation: ['get'],
                bReturnAll: [false],
            },
        },
        description: 'The ID of the opt-in-case',
    },
    {
        displayName: 'Contact ID',
        name: 'OptInCaseContactId',
        type: 'number',
        default: '',
        required: true,
        displayOptions: {
            show: {
                resource: ['optInCases'],
                operation: ['grant', 'revoke'],
            },
        },
        description: 'The ID of the contact',
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