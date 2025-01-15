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
        displayName: 'Sign in form',
        name: 'signInFormId',
        type: 'resourceLocator',
        required: true,
        default: { mode: 'list', value: '' },
        placeholder: 'Select a sign in form...',
        description: 'Select a sign in form...',
        displayOptions: {
            show: {
                resource: ['signInForm'],
                operation: ['get'],
                bReturnAll: [false]
            },
        },
        modes: [
            {
                displayName: 'From List',
                name: 'list',
                type: 'list',
                placeholder: 'Select a sign in form...',
                typeOptions: {
                    searchListMethod: 'getGlobalFields',
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
                            errorMessage: 'Not a valid sign in form ID',
                        },
                    },
                ],
            },
        ],
    },
    {
        displayName: 'Sign in form',
        name: 'signInFormId',
        type: 'resourceLocator',
        required: true,
        default: { mode: 'list', value: '' },
        placeholder: 'Select a sign in form...',
        description: 'Select a sign in form...',
        displayOptions: {
            show: {
                resource: ['signInForm'],
                operation: ['delete', 'start', 'stop'],
            },
        },
        modes: [
            {
                displayName: 'From List',
                name: 'list',
                type: 'list',
                placeholder: 'Select a sign in form...',
                typeOptions: {
                    searchListMethod: 'getGlobalFields',
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
                            errorMessage: 'Not a valid sign in form ID',
                        },
                    },
                ],
            },
        ],
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
        displayName: 'Contact',
        name: 'signInFormContactId',
        type: 'resourceLocator',
        required: true,
        default: { mode: 'list', value: '' },
        placeholder: 'Select a contact...',
        description: 'Select a contact...',
        displayOptions: {
            show: {
                resource: ['signInForm'],
                operation: ['start', 'stop'],
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
    }
];