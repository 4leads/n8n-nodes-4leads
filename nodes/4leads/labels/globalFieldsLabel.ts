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
                action: 'Create a global field',
            },
            {
                name: 'Delete',
                value: 'delete',
                action: 'Delete a global field',
            },
            {
                name: 'Get',
                value: 'get',
                action: 'Get a global field',
            },
            {
                name: 'Get all',
                value: 'getAll',
                action: 'Get all global field',
            },
        ],
        default: 'create',
    },
];

export const globalFieldFields: INodeProperties[] = [
    {
        displayName: 'Name',
        name: 'name',
        type: 'string',
        default: '',
        required: true,
        displayOptions: {
            show: {
                resource: ['globalField'],
                operation: ['create'],
            },
        },
        placeholder: 'global field name',
        description: 'The name of the global field',
    },
    {
        displayName: 'global field ID',
        name: 'globalFieldId',
        type: 'string',
        default: '',
        required: true,
        displayOptions: {
            show: {
                resource: ['globalField'],
                operation: ['get', 'delete'],
            },
        },
        description: 'The ID of the global field',
    },
    {
        displayName: 'Return All',
        name: 'returnAll',
        type: 'boolean',
        displayOptions: {
            show: {
                operation: ['getAll'],
                resource: ['globalField'],
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
                resource: ['globalField'],
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