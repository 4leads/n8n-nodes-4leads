import { INodeType, INodeTypeDescription, INodeExecutionData, IDataObject } from 'n8n-workflow';
import { IExecuteFunctions, NodeConnectionType } from 'n8n-workflow';

import { tagFields, tagOperations } from './labels/tagLabel';
import { contactFields, contactOperations } from './labels/contactLabel';
import { optinFields, optinOperations } from './labels/optinLabel';
import { signInFormFields, signInFormOperations } from './labels/signInFormLabel';
import { globalFieldFields, globalFieldOperations } from './labels/globalFieldLabel';
import { optInCasesFields, optInCasesOperations } from './labels/optInCasesLabel';

import { tagHandler } from './handlers/tagHandler';
import { contactHandler } from './handlers/contactHandler';
import { optinHandler } from './handlers/optinHandler';
import { signInFormHandler } from './handlers/signInFormHandler';
import { globalFieldHandler } from './handlers/globalFieldHandler';
import { optInCaseHandler } from './handlers/optInCaseHandler';
import { getContacts, getGlobalFields, getOptInCases, getOptins, getTags } from './GenericFunctions';

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
						name: 'Opt-in',
						value: 'optin'
					},
					{
						name: 'Sign in form',
						value: 'signInForm'
					},
					{
						name: 'Global Field',
						value: 'globalField'
					},
					{
						name: 'Opt-in-cases',
						value: 'optInCases'
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
			// Opt-ins
			...optinOperations,
			...optinFields,
			// Sign in form
			...signInFormOperations,
			...signInFormFields,
			// Global fields
			...globalFieldOperations,
			...globalFieldFields,
			// Opt-in-cases
			...optInCasesOperations,
			...optInCasesFields,
		]
	};

	methods = {
		listSearch: {
			getTags,
			getContacts,
			getOptins,
			//todo: add signin forms here
			getGlobalFields,
			getOptInCases,
		},
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const length = items.length as number;
		const qs: IDataObject = {};
		const returnData: IDataObject[] = [];

		let responseData: IDataObject | IDataObject[] | undefined;

		const resource = this.getNodeParameter('resource', 0) as string;
		const operation = this.getNodeParameter('operation', 0) as string;

		for (let i = 0; i < length; i++) {
			try {
				if (resource === 'contact') {
					responseData = await contactHandler.call(this, operation, i, qs);
				} else if (resource === 'tag') {
					responseData = await tagHandler.call(this, operation, i, qs);
				} else if (resource === 'optin') {
					responseData = await optinHandler.call(this, operation, i, qs);
				} else if (resource === 'signInForm') {
					responseData = await signInFormHandler.call(this, operation, i, qs);
				} else if (resource === 'globalField') {
					responseData = await globalFieldHandler.call(this, operation, i, qs);
				} else if (resource === 'optInCases') {
					responseData = await optInCaseHandler.call(this, operation, i, qs);
				}

				if (Array.isArray(responseData)) {
					returnData.push(...responseData);
				} else if (responseData !== undefined) {
					returnData.push(responseData);
				}
			} catch (error) {
				throw error;
			}
		}

		return [this.helpers.returnJsonArray(returnData)];
	}
}