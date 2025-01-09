import type { INodeProperties } from 'n8n-workflow';

export const globalFieldOperations: INodeProperties[] = [
    {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: {
            show: {
                resource: ['globalField'],
            },
        },
        options: [
            {
                name: 'Create',
                value: 'create',
                action: 'Create new GlobalField',
            },
            {
                name: 'Update',
                value: 'update',
                action: 'Update a GlobalField',
            },
            {
                name: 'Delete',
                value: 'delete',
                action: 'Delete a GlobalField',
            },
            {
                name: 'Get',
                value: 'get',
                action: 'List GlobalFields',
            },
            {
                name: 'Get value',
                value: 'getValue',
                action: 'Get GlobalField Value',
            },
            {
                name: 'Set value',
                value: 'setValue',
                action: 'Set GlobalField Value',
            },
        ],
        default: 'create',
    },
];

export const globalFieldFields: INodeProperties[] = [
    {
        displayName: 'Return everything',
        name: 'bReturnAll',
        type: 'boolean',
        displayOptions: {
            show: {
                operation: ['get'],
                resource: ['globalField'],
            },
        },
        default: false,
        description: 'Enable this option to return everything.',
    },
    {
        displayName: 'Global field ID',
        name: 'globalFieldId',
        type: 'number',
        default: '',
        required: true,
        displayOptions: {
            show: {
                resource: ['globalField'],
                operation: ['update', 'delete'],
            },
        },
        description: 'The ID of the global field',
    },
    {
        displayName: 'Global field ID',
        name: 'globalFieldId',
        type: 'number',
        default: '',
        required: true,
        displayOptions: {
            show: {
                resource: ['globalField'],
                operation: ['get'],
                bReturnAll: [false],
            },
        },
        description: 'The ID of the global field',
    },
    {
        displayName: 'Additional Fields',
        name: 'globalFieldQs',
        type: 'collection',
        placeholder: 'Add Field',
        default: {},
        displayOptions: {
            show: {
                resource: ['globalField'],
                operation: ['get'],
                bReturnAll: [true],
            },
        },
        options: [
            {
                displayName: 'Search string',
                name: 'globalFieldSearchString',
                type: 'string',
                default: '',
                description: 'This parameter is used to specify the text you want to search for within the name fields.',
            },
            {
                displayName: 'Page size',
                name: 'globalFieldPageSize',
                type: 'number',
                default: '',
                description: 'This parameter defines the number of results to display per page.',
            },
            {
                displayName: 'Page number',
                name: 'globalFieldPageNum',
                type: 'number',
                default: '',
                description: 'This parameter is used to indicate the page number you want to retrieve in the result set.',
            },
        ],
    },
];