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
        default: 'get',
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
        displayName: 'Set Multiple Fields',
        name: 'bSetMultiFields',
        type: 'boolean',
        default: false,
        displayOptions: {
            show: {
                resource: ['globalField'],
                operation: ['setValue'],
            },
        },
        description: 'Enable this option to set multiple fields at once.',
    },
    {
        displayName: 'Contact ID',
        name: 'globalFieldContactId',
        type: 'number',
        default: '',
        required: true,
        displayOptions: {
            show: {
                resource: ['globalField'],
                operation: ['getValue', 'setValue'],
            },
        },
        description: 'The ID of the contact',
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
                operation: ['getValue'],
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
                operation: ['setValue'],
                bSetMultiFields: [false],
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
        displayName: 'Fields to Set (max. 20)',
        name: 'fieldsToSet',
        type: 'fixedCollection',
        placeholder: 'Add Field',
        default: {},
        typeOptions: {
            multipleValues: true,
        },
        displayOptions: {
            show: {
                bSetMultiFields: [true],
            },
        },
        options: [
            {
                name: 'field',
                displayName: 'Field',
                values: [
                    {
                        displayName: 'Global Field ID',
                        name: 'globalFieldId',
                        type: 'number',
                        default: '',
                        description: 'The ID of the global field.',
                    },
                    {
                        displayName: 'Value',
                        name: 'value',
                        type: 'string',
                        default: '',
                        description: 'The value to set for this field.',
                    },
                    {
                        displayName: 'Do Triggers',
                        name: 'doTriggers',
                        type: 'boolean',
                        default: false,
                        description: 'Enable or disable triggers for this field.',
                    },
                    {
                        displayName: 'Overwrite',
                        name: 'overwrite',
                        type: 'boolean',
                        default: false,
                        description: 'Enable or disable overwriting existing values.',
                    },
                ],
            },
        ],
    },
    {
        displayName: 'Value',
        name: 'globalFieldValue',
        type: 'string',
        default: '',
        required: true,
        displayOptions: {
            show: {
                resource: ['globalField'],
                operation: ['setValue'],
                bSetMultiFields: [false],
            },
        },
        description: 'The value',
    },
    {
        displayName: 'Do Triggers',
        name: 'bDoTriggers',
        type: 'boolean',
        default: false,
        required: false,
        displayOptions: {
            show: {
                operation: ['setValue'],
                resource: ['globalField'],
                bSetMultiFields: [false],
            },
        },
        description: 'If false, no automatic process will be triggered which normally listens to a value change.',
    },
    {
        displayName: 'Overwrite',
        name: 'bOverwrite',
        type: 'boolean',
        default: false,
        required: false,
        displayOptions: {
            show: {
                operation: ['setValue'],
                resource: ['globalField'],
                bSetMultiFields: [false],
            },
        },
        description: 'If false, an already present value won’t be overwritten.',
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