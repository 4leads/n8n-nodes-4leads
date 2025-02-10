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
				action: 'Create Tag',
			},
			{
				name: 'Update',
				value: 'update',
				action: 'Update Tag',
			},
			{
				name: 'Delete',
				value: 'delete',
				action: 'Delete Tag',
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
		description: 'Specifies the name of the tag to be created',
	},
	// ----------------------------------------
    //             tag: update, get, delete
    // ----------------------------------------
	{
		displayName: 'Tag',
		name: 'tagId',
		type: 'resourceLocator',
		required: true,
		default: { mode: 'list', value: '' },
		placeholder: 'Select a tag...',
		description: 'Select a tag',
		displayOptions: {
			show: {
				resource: ['tag'],
				operation: ['update', 'delete'],
			},
		},
		modes: [
			{
				displayName: 'From List',
				name: 'list',
				type: 'list',
				placeholder: 'Select a tag...',
				typeOptions: {
					searchListMethod: 'getTags',
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
							errorMessage: 'Not a valid tag ID',
						},
					},
				],
			},
		],
	},
	// ----------------------------------------
    //             tag: get
    // ----------------------------------------
    {
        displayName: 'Search for multiple results',
        name: 'bReturnAll',
        type: 'boolean',
        displayOptions: {
            show: {
                operation: ['get'],
                resource: ['tag'],
            },
        },
        default: false,
        description: 'Whether to return a single object or a list of objects',
    },
	{
		displayName: 'Tag',
		name: 'tagId',
		type: 'resourceLocator',
		required: true,
		default: { mode: 'list', value: '' },
		placeholder: 'Select a tag...',
		description: 'Select a tag',
		displayOptions: {
			show: {
				resource: ['tag'],
				operation: ['get'],
				bReturnAll: [false]
			},
		},
		modes: [
			{
				displayName: 'From List',
				name: 'list',
				type: 'list',
				placeholder: 'Select a tag...',
				typeOptions: {
					searchListMethod: 'getTags',
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
							errorMessage: 'Not a valid tag ID',
						},
					},
				],
			},
		],
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
				displayName: 'Search String',
				name: 'tagSearchString',
				type: 'string',
				default: '',
				description: 'This parameter is used to specify the text you want to search for within the name fields. For example, if you\'re looking for names containing "@muster.de", you would enter this value in the searchString parameter.',
			},
			{
				displayName: 'Page Size',
				name: 'tagPageSize',
				type: 'string',
				default: '',
				description: 'This parameter defines the number of results to display per page. You can specify values like 5, 10, 20, 50, or 200, depending on how many results you want to be shown per page in the response.',
			},
			{
				displayName: 'Page Number',
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
				description: 'Enter the new name for the tag',
			},
			{
				displayName: 'Description',
				name: 'updatedTagDescription',
				type: 'string',
				default: '',
				description: 'Enter the new description for the tag',
			},
		],
	},
];