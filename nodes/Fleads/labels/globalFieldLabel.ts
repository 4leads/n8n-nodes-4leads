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
                action: 'List global fields',
            },
            {
                name: 'Get Value',
                value: 'getValue',
                action: 'Get global field value',
            },
            {
                name: 'Set Value',
                value: 'setValue',
                action: 'Set global field value',
            },
        ],
        default: 'get',
    },
];

export const globalFieldFields: INodeProperties[] = [
    {
        displayName: 'Return Everything',
        name: 'bReturnAll',
        type: 'boolean',
        displayOptions: {
            show: {
                operation: ['get'],
                resource: ['globalField'],
            },
        },
        default: false,
        description: "Whether everything should be returned",
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
        description: 'Whether to enable this option to set multiple fields at once',
    },
    {
        displayName: 'Global Field',
        name: 'globalFieldId',
        type: 'resourceLocator',
        required: true,
        default: { mode: 'list', value: '' },
        placeholder: 'Select a global field...',
        description: 'Select a global field',
        displayOptions: {
            show: {
                resource: ['globalField'],
                operation: ['getValue'],
            },
        },
        modes: [
            {
                displayName: 'From List',
                name: 'list',
                type: 'list',
                placeholder: 'Select a global field...',
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
                            errorMessage: 'Not a valid global field ID',
                        },
                    },
                ],
            },
        ],
    },
    {
        displayName: 'Global Field',
        name: 'globalFieldId',
        type: 'resourceLocator',
        required: true,
        default: { mode: 'list', value: '' },
        placeholder: 'Select a global field...',
        description: 'Select a global field',
        displayOptions: {
            show: {
                resource: ['globalField'],
                operation: ['setValue'],
                bSetMultiFields: [false],
            },
        },
        modes: [
            {
                displayName: 'From List',
                name: 'list',
                type: 'list',
                placeholder: 'Select a global field...',
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
                            errorMessage: 'Not a valid global field ID',
                        },
                    },
                ],
            },
        ],
    },
    {
        displayName: 'Contact',
        name: 'globalFieldContactId',
        type: 'resourceLocator',
        required: true,
        default: { mode: 'id', value: '' },
        placeholder: 'Select a contact...',
        description: 'Select a contact',
        displayOptions: {
            show: {
                resource: ['globalField'],
                operation: ['getValue', 'setValue'],
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
        displayName: 'Global Field',
        name: 'globalFieldId',
        type: 'resourceLocator',
        required: true,
        default: { mode: 'list', value: '' },
        placeholder: 'Select a global field...',
        description: 'Select a global field',
        displayOptions: {
            show: {
                resource: ['globalField'],
                operation: ['get'],
                bReturnAll: [false],
            },
        },
        modes: [
            {
                displayName: 'From List',
                name: 'list',
                type: 'list',
                placeholder: 'Select a global field...',
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
                            errorMessage: 'Not a valid global field ID',
                        },
                    },
                ],
            },
        ],
    },
    {
        displayName: 'Fields to Set (Max. 20)',
        name: 'fieldsToSet',
        type: 'fixedCollection',
        placeholder: 'Add Field',
        default: {},
        typeOptions: {
            multipleValues: true,
        },
        displayOptions: {
            show: {
                resource: ['globalField'],
                operation: ['setValue'],
                bSetMultiFields: [true],
            },
        },
        options: [
            {
                name: 'field',
                displayName: 'Field',
                values: [
                    {
                        displayName: 'Global Field',
                        name: 'globalFieldId',
                        type: 'resourceLocator',
                        required: true,
                        default: { mode: 'list', value: '' },
                        placeholder: 'Select a global field...',
                        description: 'Select a global field',
                        modes: [
                            {
                                displayName: 'From List',
                                name: 'list',
                                type: 'list',
                                placeholder: 'Select a global field...',
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
                                            errorMessage: 'Not a valid global field ID',
                                        },
                                    },
                                ],
                            },
                        ],
                    },
                    {
                        displayName: 'Value',
                        name: 'value',
                        type: 'string',
                        required: true,
                        default: '',
                        description: 'Whether to set this value for the field',
                    },
                    {
                        displayName: 'Do Triggers',
                        name: 'doTriggers',
                        type: 'boolean',
                        default: false,
                        description: 'Whether to enable or disable triggers for this field',
                    },
                    {
                        displayName: 'Overwrite',
                        name: 'overwrite',
                        type: 'boolean',
                        default: false,
                        description: 'Whether to enable or disable overwriting existing values',
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
        description: 'The value to set for this field',
    },
    {
        displayName: 'Do Triggers',
        name: 'bDoTriggers',
        type: 'boolean',
        default: false,

        displayOptions: {
            show: {
                operation: ['setValue'],
                resource: ['globalField'],
                bSetMultiFields: [false],
            },
        },
        description: 'Whether an automatic process, which normally listens to a value change, should be triggered',
    },
    {
        displayName: 'Overwrite',
        name: 'bOverwrite',
        type: 'boolean',
        default: false,

        displayOptions: {
            show: {
                operation: ['setValue'],
                resource: ['globalField'],
                bSetMultiFields: [false],
            },
        },
        description: 'Whether an already present value should be overwritten',
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
                displayName: 'Search String',
                name: 'globalFieldSearchString',
                type: 'string',
                default: '',
                description: 'This parameter is used to specify the text you want to search for within the name fields',
            },
            {
                displayName: 'Page Size',
                name: 'globalFieldPageSize',
                type: 'number',
                default: '',
                description: 'This parameter defines the number of results to display per page',
            },
            {
                displayName: 'Page Number',
                name: 'globalFieldPageNum',
                type: 'number',
                default: '',
                description: 'This parameter is used to indicate the page number you want to retrieve in the result set',
            },
        ],
    },
];