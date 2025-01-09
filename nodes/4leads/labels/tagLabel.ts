import type { INodeProperties } from 'n8n-workflow';

export const tagOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['tag'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				action: 'Create a New Tag',
			},
			{
				name: 'Update',
				value: 'update',
				action: 'Update a Tag',
			},
			{
				name: 'Delete',
				value: 'delete',
				action: 'Delete a Tag',
			},
			{
				name: 'Get',
				value: 'get',
				action: 'List Tags',
			},
		],
		default: 'create',
	},
];

export const tagFields: INodeProperties[] = [
	// ----------------------------------------
    //             tag: create
    // ----------------------------------------
	{
		displayName: 'Name',
		name: 'tagName',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['tag'],
				operation: ['create'],
			},
		},
		placeholder: 'Tag name',
		description: 'The name of the tag',
	},
	// ----------------------------------------
    //             tag: update, get, delete
    // ----------------------------------------
	{
		displayName: 'Tag ID',
		name: 'tagId',
		type: 'number',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['tag'],
				operation: ['update', 'delete'],
			},
		},
		description: 'The ID of the tag',
	},
	// ----------------------------------------
    //             tag: get
    // ----------------------------------------
    {
        displayName: 'Return everything',
        name: 'bReturnAll',
        type: 'boolean',
        displayOptions: {
            show: {
                operation: ['get'],
                resource: ['tag'],
            },
        },
        default: false,
        description: 'Enable this option to return everything.',
    },
	{
		displayName: 'Tag ID',
		name: 'tagId',
		type: 'number',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['tag'],
				operation: ['get'],
				bReturnAll: [false]
			},
		},
		description: 'The ID of the tag',
	},
	{
		displayName: 'Additional Fields',
		name: 'tagQs',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: [
					'tag',
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
				name: 'tagSearchString',
				type: 'string',
				default: '',
				description: 'This parameter is used to specify the text you want to search for within the name fields. For example, if you\'re looking for names containing "@muster.de", you would enter this value in the searchString parameter.',
			},
			{
				displayName: 'Page size',
				name: 'tagPageSize',
				type: 'string',
				default: '',
				description: 'This parameter defines the number of results to display per page. You can specify values like 5, 10, 20, 50, or 200, depending on how many results you want to be shown per page in the response.',
			},
			{
				displayName: 'Page number',
				name: 'tagPageNum',
				type: 'string',
				default: '',
				description: 'This parameter is used to indicate the page number you want to retrieve in the result set. For example, if you want the first set of results, you would set this value to 1. If you want the second set, set it to 2, and so on.',
			},
		],
	},
	// ----------------------------------------
    //             tag: update
    // ----------------------------------------
	{
		displayName: 'Additional Fields',
		name: 'tagUpdateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: [
					'tag',
				],
				operation: [
					'update',
				],
			},
		},
		options: [
			{
				displayName: 'Name',
				name: 'updatedTagName',
				type: 'string',
				default: '',
				description: 'Select the name for the tag.',
			},
			{
				displayName: 'Description',
				name: 'updatedTagDescription',
				type: 'string',
				default: '',
				description: 'Select the description for the tag.',
			},
		],
	},
];