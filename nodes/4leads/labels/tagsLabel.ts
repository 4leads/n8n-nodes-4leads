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
				action: 'Create a tag',
			},
			{
				name: 'Delete',
				value: 'delete',
				action: 'Delete a tag',
			},
			{
				name: 'Get',
				value: 'get',
				action: 'Get a tag',
			},
			{
				name: 'Get all',
				value: 'getAll',
				action: 'Get all tags',
			},
		],
		default: 'create',
	},
];

export const tagFields: INodeProperties[] = [
	{
		displayName: 'Name',
		name: 'name',
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
	{
		displayName: 'Tag ID',
		name: 'tagId',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['tag'],
				operation: ['get', 'delete'],
			},
		},
		description: 'The ID of the tag',
	},
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		displayOptions: {
			show: {
				operation: ['getAll'],
				resource: ['tag'],
			},
		},
		default: false,
		description: 'Whether to return all results or only up to a given limit',
	},
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		displayOptions: {
			show: {
				operation: ['getAll'],
				resource: ['tag'],
				returnAll: [false],
			},
		},
		typeOptions: {
			minValue: 1
		},
		default: 50,
		description: 'Max number of results to return',
	},
];