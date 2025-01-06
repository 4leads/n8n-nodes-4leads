import { INodeType, INodeTypeDescription, NodeConnectionType } from 'n8n-workflow';
import { tagOperations, tagFields } from './v1/tagsLabel';

export class Fleads implements INodeType {
	description: INodeTypeDescription = {
		displayName: '4leads',
		name: 'Fleads',
		icon: 'file:4leads.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Get data from the 4leads API',
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
			...tagOperations,
			...tagFields,
		]
	};
}
