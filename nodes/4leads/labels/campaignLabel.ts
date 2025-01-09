import type { INodeProperties } from 'n8n-workflow';

export const campaignOperations: INodeProperties[] = [
    {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: {
            show: {
                resource: ['campaign'],
            },
        },
        options: [
            {
                name: 'Get',
                value: 'get',
                action: 'List Campaigns',
            },
            {
                name: 'Delete',
                value: 'delete',
                action: 'Delete a Campaign',
            },
            {
                name: 'Start',
                value: 'start',
                action: 'Start Campaign for Contact',
            },
            {
                name: 'Stop',
                value: 'stop',
                action: 'Stop Campaign for Contact',
            },
        ],
        default: 'get',
    },
];

export const campaignFields: INodeProperties[] = [
    {
        displayName: 'Return everything',
        name: 'bReturnAll',
        type: 'boolean',
        displayOptions: {
            show: {
                operation: ['get'],
                resource: ['campaign'],
            },
        },
        default: false,
        description: 'Enable this option to return everything.',
    },
    {
        displayName: 'Campaign ID',
        name: 'campaignId',
        type: 'number',
        default: '',
        required: true,
        displayOptions: {
            show: {
                resource: ['campaign'],
                operation: ['get'],
                bReturnAll: [false]
            },
        },
        description: 'The ID of the campaign',
    },
    {
        displayName: 'Campaign ID',
        name: 'campaignId',
        type: 'number',
        default: '',
        required: true,
        displayOptions: {
            show: {
                resource: ['campaign'],
                operation: ['delete', 'start', 'stop'],
            },
        },
        description: 'The ID of the campaign',
    },
    {
        displayName: 'Additional Fields',
        name: 'campaignQs',
        type: 'collection',
        placeholder: 'Add Field',
        default: {},
        displayOptions: {
            show: {
                resource: [
                    'campaign',
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
                name: 'campaignSearchString',
                type: 'string',
                default: '',
                description: 'This parameter is used to specify the text you want to search for within the name fields. For example, if you\'re looking for names containing "@muster.de", you would enter this value in the searchString parameter.',
            },
            {
                displayName: 'Page size',
                name: 'campaignPageSize',
                type: 'number',
                default: '',
                description: 'This parameter defines the number of results to display per page. You can specify values like 5, 10, 20, 50, or 200, depending on how many results you want to be shown per page in the response.',
            },
            {
                displayName: 'Page number',
                name: 'campaignPageNum',
                type: 'number',
                default: '',
                description: 'This parameter is used to indicate the page number you want to retrieve in the result set. For example, if you want the first set of results, you would set this value to 1. If you want the second set, set it to 2, and so on.',
            },
        ],
    },
    {
        displayName: 'Contact ID',
        name: 'campaignContactId',
        type: 'number',
        default: '',
        required: true,
        displayOptions: {
            show: {
                resource: ['campaign'],
                operation: ['start', 'stop'],
            },
        },
        description: 'The ID of the contact for whom the campaign should be started or stopped.',
    },
];