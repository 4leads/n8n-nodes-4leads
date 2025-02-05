import {
	INodeType, INodeTypeDescription, INodeExecutionData, IDataObject,
	ILoadOptionsFunctions,
	INodePropertyOptions
} from 'n8n-workflow';
import { IExecuteFunctions } from 'n8n-workflow';

import { tagFields, tagOperations } from './labels/tagLabel';
import { contactFields, contactOperations } from './labels/contactLabel';
import { optinFields, optinOperations } from './labels/optinLabel';
import { signInFormFields, signInFormOperations } from './labels/signInFormLabel';
import { globalFieldFields, globalFieldOperations } from './labels/globalFieldLabel';
import { optInCasesFields, optInCasesOperations } from './labels/optInCasesLabel';
import { campaignFields, campaignOperations } from './labels/campaignLabel';

import { tagHandler } from './handlers/tagHandler';
import { contactHandler } from './handlers/contactHandler';
import { optinHandler } from './handlers/optinHandler';
import { signInFormHandler } from './handlers/signInFormHandler';
import { globalFieldHandler } from './handlers/globalFieldHandler';
import { optInCaseHandler } from './handlers/optInCaseHandler';
import { campaignHandler } from './handlers/campaignHandler';
import { getAutomationList, getContacts, getGlobalFields, getOptInCases, getOptins, getSignIns, getTags } from '../GenericFunctions';


export class Fleads implements INodeType {
	description: INodeTypeDescription = {
		displayName: '4leads',
		name: 'fleads',
		icon: 'file:../fleads.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Interact with 4leads',
		defaults: {
			name: '4leads',
		},
		inputs: ['main'],
		outputs: ['main'],
		credentials: [
			{
				name: 'fleadsApi',
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
						name: 'Campaign',
						value: 'campaign'
					},
					{
						name: 'Contact',
						value: 'contact'
					},
					{
						name: 'Global Field',
						value: 'globalField'
					},
					{
						name: 'Opt-In',
						value: 'optin'
					},
					{
						name: 'Opt-in-Case',
						value: 'optInCases'
					},
					{
						name: 'Sign in Form',
						value: 'signInForm'
					},
					{
						name: 'Tag',
						value: 'tag'
					}
				],
				default: 'campaign',
			},
			// Campaign
			...campaignOperations,
			...campaignFields,
			// Contacts
			...contactOperations,
			...contactFields,
			// Global fields
			...globalFieldOperations,
			...globalFieldFields,
			// Opt-in-cases
			...optInCasesOperations,
			...optInCasesFields,
			// Opt-ins
			...optinOperations,
			...optinFields,
			// Sign in form
			...signInFormOperations,
			...signInFormFields,
			// Tags
			...tagOperations,
			...tagFields,
		]
	};

	methods = {
		/**
		 * Used to search and filter a list of results from an API.
		 */
		listSearch: {
			getTags,
			getContacts,
			getOptins,
			getSignIns,
			getGlobalFields,
			getOptInCases,
			getAutomationList
		},
		loadOptions: {
			/**
			 * Used to load options for drop-downs or selection fields.
			 * No pagination or filtering required.
			 */
			async getTags(this: ILoadOptionsFunctions, filter?: string): Promise<INodePropertyOptions[]> {
				const result = await getTags.call(this, filter);

				return result.results.map((tag) => ({
					name: tag.name,
					value: tag.value,
				}));
			},
		},
	}

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
				} else if (resource === 'campaign') {
					responseData = await campaignHandler.call(this, operation, i, qs);
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