import type { INodeProperties } from 'n8n-workflow';

export const signInFormOperations: INodeProperties[] = [
    {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: {
            show: {
                resource: ['signInForm'],
            },
        },
        options: [
            {
                name: 'Get',
                value: 'get',
                action: 'List Sign in forms',
            },
            {
                name: 'Delete',
                value: 'delete',
                action: 'Delete Sign in form',
            },
            {
                name: 'Start',
                value: 'start',
                action: 'Start Sign in form',
            },
            {
                name: 'Stop',
                value: 'stop',
                action: 'Stop Sign in form',
            },
        ],
        default: 'get',
    },
];

export const signInFormFields: INodeProperties[] = [
    {
        displayName: 'Return everything',
        name: 'bReturnAll',
        type: 'boolean',
        displayOptions: {
            show: {
                operation: ['get'],
                resource: ['signInForm'],
            },
        },
        default: false,
        description: 'Enable this option to return everything.',
    },
    {
        displayName: 'Sign in form ID',
        name: 'signInFormId',
        type: 'number',
        default: '',
        required: true,
        displayOptions: {
            show: {
                resource: ['signInForm'],
                operation: ['get'],
                bReturnAll: [false]
            },
        },
        description: 'The ID of the sign in form',
    },
    {
        displayName: 'Sign in form ID',
        name: 'signInFormId',
        type: 'number',
        default: '',
        required: true,
        displayOptions: {
            show: {
                resource: ['signInForm'],
                operation: ['delete', 'start', 'stop'],
            },
        },
        description: 'The ID of the sign in form',
    },
    {
        displayName: 'Additional Fields',
        name: 'signInFormQs',
        type: 'collection',
        placeholder: 'Add Field',
        default: {},
        displayOptions: {
            show: {
                resource: [
                    'signInForm',
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
                name: 'signInFormSearchString',
                type: 'string',
                default: '',
                description: 'This parameter is used to specify the text you want to search for within the name fields. For example, if you\'re looking for names containing "@muster.de", you would enter this value in the searchString parameter.',
            },
            {
                displayName: 'Page size',
                name: 'signInFormPageSize',
                type: 'number',
                default: '',
                description: 'This parameter defines the number of results to display per page. You can specify values like 5, 10, 20, 50, or 200, depending on how many results you want to be shown per page in the response.',
            },
            {
                displayName: 'Page number',
                name: 'signInFormPageNum',
                type: 'number',
                default: '',
                description: 'This parameter is used to indicate the page number you want to retrieve in the result set. For example, if you want the first set of results, you would set this value to 1. If you want the second set, set it to 2, and so on.',
            },
        ],
    },
    {
        displayName: 'Contact ID',
        name: 'signInFormContactId',
        type: 'number',
        default: '',
        required: true,
        displayOptions: {
            show: {
                resource: ['signInForm'],
                operation: ['start', 'stop'],
            },
        },
        description: 'The ID of the contact for whom the sign in form should be started or stopped.',
    },
];