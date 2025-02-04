import type { INodeProperties } from 'n8n-workflow';

export const campaignOperations: INodeProperties[] = [
    {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: {
            show: {
                resource: ['campaign'],
            },
        },
        options: [
            {
                name: 'Start',
                value: 'start',
                action: 'Start a Campaign',
            },
        ],
        default: 'start',
    },
];

export const campaignFields: INodeProperties[] = [
    {
        displayName: 'Campaign',
        name: 'campaignId',
        type: 'resourceLocator',
        required: true,
        default: { mode: 'list', value: '' },
        placeholder: 'Select a campaign...',
        description: 'Select a campaign...',
        displayOptions: {
            show: {
                resource: ['campaign'],
                operation: ['start'],
            },
        },
        modes: [
            {
                displayName: 'From List',
                name: 'list',
                type: 'list',
                placeholder: 'Select a campaign...',
                typeOptions: {
                    searchListMethod: 'getAutomationList',
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
                            errorMessage: 'Not a valid campaign ID',
                        },
                    },
                ],
            },
        ],
    },
    {
        displayName: 'Contact',
        name: 'contactId',
        type: 'resourceLocator',
        required: true,
        default: { mode: 'id', value: '' },
        placeholder: 'Select a contact...',
        description: 'Select a contact...',
        displayOptions: {
            show: {
                resource: ['campaign'],
                operation: ['start'],
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
];