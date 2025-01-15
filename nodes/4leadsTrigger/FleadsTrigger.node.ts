import type { INodeExecutionData, INodeType, INodeTypeDescription, IPollFunctions } from 'n8n-workflow';
import { NodeConnectionType } from 'n8n-workflow';
import { getAutomationList } from '../GenericFunctions';

export class FleadsTrigger implements INodeType {
    description: INodeTypeDescription = {
        displayName: '4leads Trigger',
        name: 'FleadsTrigger',
        icon: 'file:fleads.svg',
        group: ['trigger'],
        version: 1,
        subtitle: '={{$parameter["triggerOn"]}}',
        description: 'Starts the workflow when 4leads events occur',
        defaults: {
            name: '4leads Trigger',
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
                            searchListMethod: 'getAutomationList',
                            searchable: true,
                        },
                    },
                ],
            },
            {
                displayName: '123',
                name: '123',
                type: 'options',
                required: true,
                default: '',
                options: [
                    {
                        name: '123',
                        value: '123',
                    },
                ],
            },
        ],
    };

	methods = {
		listSearch: {
			getAutomationList,
		},
	};

    async poll(this: IPollFunctions): Promise<INodeExecutionData[][] | null> {
        console.log('hier bin ich');

        return [this.helpers.returnJsonArray({})];
    }
}