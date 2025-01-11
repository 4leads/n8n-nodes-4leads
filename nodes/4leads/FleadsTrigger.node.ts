import type { INodeExecutionData, INodeType, INodeTypeDescription, IPollFunctions } from 'n8n-workflow';
import { NodeConnectionType } from 'n8n-workflow';
import { getTags } from './GenericFunctions';

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
                displayName: 'Tags',
                name: 'tagsId',
                type: 'resourceLocator',
                default: { mode: 'list', value: '' },
                required: true,
                description: 'Beschreibung',
                modes: [
                    {
                        displayName: 'Tags',
                        name: 'list',
                        type: 'list',
                        placeholder: 'Select a tag...',
                        typeOptions: {
                            searchListMethod: 'getTags',
                            searchable: true,
                        },
                    },
                ],
            },
            {
                displayName: 'Trigger On',
                name: 'triggerOn',
                type: 'options',
                required: true,
                default: '',
                options: [
                    {
                        name: 'Test Trigger',
                        value: 'triggerTest',
                    },
                ],
            },
        ],
    };

	methods = {
		listSearch: {
			getTags,
		},
	};

    async poll(this: IPollFunctions): Promise<INodeExecutionData[][] | null> {
        console.log('hier bin ich');

        return [this.helpers.returnJsonArray({})];
    }
}