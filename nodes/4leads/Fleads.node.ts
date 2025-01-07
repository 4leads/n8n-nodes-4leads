import { INodeType, INodeTypeDescription, INodeExecutionData } from 'n8n-workflow';
import { IExecuteFunctions, NodeConnectionType } from 'n8n-workflow';
import { tagFields, tagOperations } from './labels/tagsLabel';
import { contactFields, contactOperations } from './labels/contactsLabel';
import { globalFieldFields, globalFieldOperations } from './labels/globalFieldsLabel';
import { makeRequest } from './GenericFunctions';

export class Fleads implements INodeType {
	description: INodeTypeDescription = {
		displayName: '4leads',
		name: 'Fleads',
		icon: 'file:fleads.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Interact with 4leads',
		defaults: {
			name: '4leads',
		},
		inputs: [NodeConnectionType.Main],
		outputs: [NodeConnectionType.Main],
		credentials: [
			{
				name: 'FleadsApi',
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
				required: true,
				noDataExpression: true,
				type: 'options',
				options: [
					{
						name: 'Tag',
						value: 'tag',
					},
					{
						name: 'Contact',
						value: 'contact',
					},
                    {
                        name: 'Global Field',
                        value: 'globalField'
                    }
				],
				default: 'tag',
				description: 'The resource to operate on. ',
			},

			// Tags
			...tagOperations,
			...tagFields,
			// Contacts
			...contactOperations,
			...contactFields,
            // Global fields
            ...globalFieldOperations,
            ...globalFieldFields,
		]
	};

    async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		//todo: remove
		const testNodeExecutionData: INodeExecutionData = {
			json: {
				key: "testing"
			}
		};
		//todo: remove
		const testData = [testNodeExecutionData];
	
		const items = this.getInputData();
		const length = items.length as number;
	
		const resource = this.getNodeParameter('resource', 0) as string;
		const operation = this.getNodeParameter('operation', 0) as string;
	
		for (let i = 0; i < length; i++) {
			try {
				if (resource === 'tag') {
					console.log("tag resource");
					if (operation === 'create') {
						console.log("tag create");
						const responseData = await makeRequest.call(this, 'POST', 'tags', 'bla');
						console.log(responseData);
					} else if (operation === 'delete') {
						console.log("tag delete");
					} else if (operation === 'get') {
						console.log("tag get");
					} else if (operation === 'getAll') {
						console.log("tag getAll");
					}
				}
			} catch (error) {
				throw error;
			}
		}
	
		return [testData]; //todo: remove
	}
}