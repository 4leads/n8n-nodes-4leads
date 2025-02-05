import type { IDataObject, INodeExecutionData, INodeType, INodeTypeDescription, IPollFunctions } from 'n8n-workflow';
import { NodeOperationError } from 'n8n-workflow';
import { getActionList } from '../GenericFunctions';

export class FleadsTrigger implements INodeType {
    description: INodeTypeDescription = {
        displayName: '4leads trigger Trigger',
        name: 'fleadsTrigger',
        icon: 'file:../fleads.svg',
        group: ['trigger'],
        version: 1,
        subtitle: '={{$parameter["triggerOn"]}}',
        description: 'Starts the workflow when 4leads events occur',
        defaults: {
            name: '4leads trigger',
        },
        inputs: [],
        outputs: ['main'],
        credentials: [
            {
                name: 'fleadsApi',
                required: true,
            },
        ],
        polling: true,
        properties: [
            {
                displayName: 'Trigger On',
                name: 'triggerOn',
                type: 'options',
                required: true,
                default: 'eventCampaign',
                options: [
                    {
                        name: '4leads Campaign',
                        value: 'eventCampaign',
                    },
                ],
            },
            {
                displayName: 'Select an Automation',
                name: 'automationId',
                type: 'resourceLocator',
                default: { mode: 'list', value: '' },
                required: true,
                description: 'Select your 4leads automation',
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
        const triggerOn = this.getNodeParameter('triggerOn', '') as string;
        const automationId = this.getNodeParameter('automationId') as IDataObject;
        const webhookData = this.getWorkflowStaticData('node');

        if (!automationId.value) {
            throw new NodeOperationError(this.getNode(), 'No automation ID provided.');
        }
    
        if (triggerOn === '') {
            throw new NodeOperationError(this.getNode(), 'Please select an event');
        }
    
        if (triggerOn === 'eventCampaign') {
            const credentials = await this.getCredentials('fleadsApi');
    
            if (!credentials) {
                throw new NodeOperationError(this.getNode(), 'No API credentials found.');
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
    
            if (parsedData.data && parsedData.data.results && parsedData.data.results.length > 0) {
                const results = parsedData.data.results;
                let eventsToReturn: any[] = [];
    
                for (const event of results) {
                    const newEventId = event.eventId;
    
                    if (!webhookData.eventId || newEventId > webhookData.eventId) {
                        webhookData.eventId = newEventId;
                        eventsToReturn.push(event);
                    }
                }
    
                if (Array.isArray(eventsToReturn) && eventsToReturn.length) {
                    return [this.helpers.returnJsonArray(eventsToReturn)];
                }
            }
    
            return null;
        }
    
        return null;
    }
    
}