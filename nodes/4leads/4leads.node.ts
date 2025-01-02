import { INodeType, INodeTypeDescription } from 'n8n-workflow';

export class FourLeads implements INodeType {
	description: INodeTypeDescription = {
		displayName: '4leads Node',
        name: '4leads Node',
        icon: undefined,
        group: ['transform'],
        version: 1,
        subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
        description: 'Get data from the 4leads API',
        defaults: {
            name: '4leads',
        },
        inputs: ['main'],
        outputs: ['main'],
        credentials: [
            {
                name: '4leadsApi',
                required: true,
            },
        ],
        requestDefaults: {
            baseURL: 'https://api.4leads.eu',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        },
        properties: [
            {
                displayName: 'Resource',
                name: 'resource',
                type: 'options',
                noDataExpression: true,
                options: [
                    {
                        name: 'Beispiel',
                        value: 'BSP 1',
                    },
                    {
                        name: 'Beispiel 2',
                        value: 'BSP 2',
                    },
                ],
                default: 'BSP 1',
            },
        
        ]
	};
}