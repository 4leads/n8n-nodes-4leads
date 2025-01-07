import type { INodeProperties } from 'n8n-workflow';

export const contactOperations: INodeProperties[] = [
    {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: {
            show: {
                resource: ['contact'],
            },
        },
        options: [
            {
                name: 'Create',
                value: 'create',
                action: 'Create a contact',
            },
            {
                name: 'Delete',
                value: 'delete',
                action: 'Delete a contact',
            },
            {
                name: 'Get',
                value: 'get',
                action: 'Get a contact',
            },
            {
                name: 'Get all',
                value: 'getAll',
                action: 'Get all contacts',
            },
        ],
        default: 'create',
    },
];

export const contactFields: INodeProperties[] = [
    {
        displayName: 'Name',
        name: 'name',
        type: 'string',
        default: '',
        required: true,
        displayOptions: {
            show: {
                resource: ['contact'],
                operation: ['create'],
            },
        },
        placeholder: 'Contact name',
        description: 'The name of the contact',
    },
    {
        displayName: 'contact ID',
        name: 'contactId',
        type: 'string',
        default: '',
        required: true,
        displayOptions: {
            show: {
                resource: ['contact'],
                operation: ['get', 'delete'],
            },
        },
        description: 'The ID of the contact',
    },
    {
        displayName: 'Return All',
        name: 'returnAll',
        type: 'boolean',
        displayOptions: {
            show: {
                operation: ['getAll'],
                resource: ['contact'],
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
                resource: ['contact'],
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