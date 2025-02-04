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
		displayName: 'Opt-in',
		name: 'optinId',
		type: 'resourceLocator',
        required: true,
		default: { mode: 'list', value: '' },
		placeholder: 'Select a opt-in...',
		description: 'Select a opt-in...',
        displayOptions: {
            show: {
                resource: ['optin'],
                operation: ['get'],
                bReturnAll: [false],
            },
        },
		modes: [
			{
				displayName: 'From List',
				name: 'list',
				type: 'list',
				placeholder: 'Select a opt-in...',
				typeOptions: {
					searchListMethod: 'getOptins',
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
							errorMessage: 'Not a valid opt-in ID',
						},
					},
				],
			},
		],
	},
    {
		displayName: 'Opt-in',
		name: 'optinId',
		type: 'resourceLocator',
        required: true,
		default: { mode: 'list', value: '' },
		placeholder: 'Select a opt-in...',
		description: 'Select a opt-in...',
        displayOptions: {
            show: {
                resource: ['optin'],
                operation: ['delete', 'send'],
            },
        },
		modes: [
			{
				displayName: 'From List',
				name: 'list',
				type: 'list',
				placeholder: 'Select a opt-in...',
				typeOptions: {
					searchListMethod: 'getOptins',
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
							errorMessage: 'Not a valid opt-in ID',
						},
					},
				],
			},
		],
	},
    {
        displayName: 'Contact',
        name: 'optinContactId',
        type: 'resourceLocator',
        default: { mode: 'id', value: '' },
        placeholder: 'Select a contact...',
        description: 'Select a contact...',
        displayOptions: {
            show: {
                resource: ['optin'],
                operation: ['send', 'optout'],
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