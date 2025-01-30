import type { IDataObject, INodeExecutionData, INodeType, INodeTypeDescription, IPollFunctions } from 'n8n-workflow';
import { NodeConnectionType } from 'n8n-workflow';
import { getActionList } from '../GenericFunctions';

export class FleadsTrigger implements INodeType {
    description: INodeTypeDescription = {
        displayName: 'action trigger',
        name: 'FleadsTrigger',
        icon: 'file:fleads.svg',
        group: ['trigger'],
        version: 1,
        subtitle: '={{$parameter["triggerOn"]}}',
        description: 'Starts the workflow when 4leads events occur',
        defaults: {
            name: 'action trigger',
        },
        inputs: [],
        outputs: [NodeConnectionType.Main],
        credentials: [
            {
                name: 'FleadsApi',
                required: true,
            },
        ],
        polling: true,
        properties: [
            {
                displayName: 'Select an automation',
                name: 'automationId',
                type: 'resourceLocator',
                default: { mode: 'list', value: '' },
                required: true,
                description: 'Select your 4leads automation.',
                modes: [
                    {
                        displayName: 'Automations',
                        name: 'list',
                        type: 'list',
                        placeholder: 'Select a automation...',
                        typeOptions: {
                            searchListMethod: 'getActionList',
                            searchable: true,
                        },
                    },
                ],
            },
        ],
    };

    methods = {
        listSearch: {
            getActionList,
        },
    };

    async poll(this: IPollFunctions): Promise<INodeExecutionData[][] | null> {
        const automationId = this.getNodeParameter('automationId') as IDataObject;

        if (!automationId.value) {
            throw new Error('No automation ID provided.');
        }

        const credentials = await this.getCredentials('FleadsApi');

        if (!credentials) {
            throw new Error('No API credentials found.');
        }

        const endpoint = `https://api.4leads.eu/v1/automations/poll/${automationId.value}`;

        const responseData = await this.helpers.request({
            method: 'GET',
            url: endpoint,
            headers: {
                Authorization: `Bearer ${credentials.apiKey}`,
                'Content-Type': 'application/json',
            },
        });

        const parsedData = typeof responseData === 'string' ? JSON.parse(responseData) : responseData;

        return [this.helpers.returnJsonArray(parsedData.data?.results || [])];
    }
}