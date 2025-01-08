import { INodeType, INodeTypeDescription, INodeExecutionData, IDataObject } from 'n8n-workflow';
import { IExecuteFunctions, NodeConnectionType } from 'n8n-workflow';
import { tagFields, tagOperations } from './labels/tagsLabel';
import { contactFields, contactOperations } from './labels/contactsLabel';
import { globalFieldFields, globalFieldOperations } from './labels/globalFieldsLabel';
import { fourLeadsApiRequest } from './GenericFunctions';
import { optinFields, optinOperations } from './labels/optinLabel';
import { campaignFields, campaignOperations } from './labels/campaignsLabel';

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
						name: 'Campaign',
						value: 'campaign'
					},
					{
						name: 'Global Field',
						value: 'globalField'
					}
				],
				default: 'tag',
				description: 'The resource to operate on. ',
			},

			// Contacts
			...contactOperations,
			...contactFields,
			// Tags
			...tagOperations,
			...tagFields,
			// Opt-in
			...optinOperations,
			...optinFields,
			// Global fields
			...globalFieldOperations,
			...globalFieldFields,
			// Campaigns
			...campaignOperations,
			...campaignFields,
		]
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const length = items.length as number;
		const qs: IDataObject = {};
		const returnData: IDataObject[] = [];

		let responseData;

		const resource = this.getNodeParameter('resource', 0) as string;
		const operation = this.getNodeParameter('operation', 0) as string;

		for (let i = 0; i < length; i++) {
			try {
				if (resource === 'contact') {
					const endpoint = 'contacts';

					if (operation === 'create') {

						const contactFirstname = this.getNodeParameter('contactFirstname', i) as string;
						const contactLastname = this.getNodeParameter('contactLastname', i) as string;
						const contactEmail = this.getNodeParameter('contactEmail', i) as string;
						const contactMobile = this.getNodeParameter('contactMobile', i) as string;

						const contactCreateFields = this.getNodeParameter('contactCreateFields', i) as IDataObject;

						const body: IDataObject = {
							fname: contactFirstname,
							lname: contactLastname,
							email: contactEmail,
							mobilePhone: contactMobile,
						};

						// Adding additional fields if provided
						if (contactCreateFields.contactSalutation) body.salutation = contactCreateFields.contactSalutation;

						if (contactCreateFields.contactCompany) body.company = contactCreateFields.contactCompany;

						if (contactCreateFields.contactPhoneNumber) body.privatePhone = contactCreateFields.contactPhoneNumber;

						if (contactCreateFields.contactBirthday) {
							let dateValue = contactCreateFields.contactBirthday;

							if (typeof dateValue === 'string' || typeof dateValue === 'number') {
								const date = new Date(dateValue);
								if (!isNaN(date.getTime())) {
									const formattedDate = date.toLocaleDateString('de-AT');
									body.birthday = formattedDate;
								} else {
									console.error('Ungültiges Datum');
								}
							}
						}
						if (contactCreateFields.contactPosition) body.companyPosition = contactCreateFields.contactPosition;

						if (contactCreateFields.contactCountry) body.country = contactCreateFields.contactCountry;

						if (contactCreateFields.contactStreet) body.street = contactCreateFields.contactStreet;

						if (contactCreateFields.contactHouseNumber) body.houseNumber = contactCreateFields.contactHouseNumber;

						if (contactCreateFields.contactZip) body.zip = contactCreateFields.contactZip;

						if (contactCreateFields.contactCity) body.city = contactCreateFields.contactCity;

						if (contactCreateFields.contactFax) body.fax = contactCreateFields.contactFax;

						if (contactCreateFields.contactWebsite) body.website = contactCreateFields.contactWebsite;

						if (contactCreateFields.contactSkype) body.skype = contactCreateFields.contactSkype;

						responseData = await fourLeadsApiRequest.call(this, 'POST', endpoint, body);

					} else if (operation === 'update') {

						const contactId = this.getNodeParameter('contactId', i) as string;
						const contactCreateFields = this.getNodeParameter('contactUpdateFields', i) as IDataObject;

						const body: IDataObject = {};

						// Adding additional fields if provided
						if (contactCreateFields.contactFirstname) body.fname = contactCreateFields.contactFirstname;

						if (contactCreateFields.contactLastname) body.lname = contactCreateFields.contactLastname;

						if (contactCreateFields.contactEmail) body.email = contactCreateFields.contactEmail;

						if (contactCreateFields.contactMobile) body.mobilePhone = contactCreateFields.contactMobile;

						if (contactCreateFields.contactSalutation) body.salutation = contactCreateFields.contactSalutation;

						if (contactCreateFields.contactCompany) body.company = contactCreateFields.contactCompany;

						if (contactCreateFields.contactPhoneNumber) body.privatePhone = contactCreateFields.contactPhoneNumber;

						if (contactCreateFields.contactBirthday) {
							let dateValue = contactCreateFields.contactBirthday;

							if (typeof dateValue === 'string' || typeof dateValue === 'number') {
								const date = new Date(dateValue);
								if (!isNaN(date.getTime())) {
									const formattedDate = date.toLocaleDateString('de-AT');
									body.birthday = formattedDate;
								} else {
									console.error('Ungültiges Datum');
								}
							}
						}
						if (contactCreateFields.contactPosition) body.companyPosition = contactCreateFields.contactPosition;

						if (contactCreateFields.contactCountry) body.country = contactCreateFields.contactCountry;

						if (contactCreateFields.contactStreet) body.street = contactCreateFields.contactStreet;

						if (contactCreateFields.contactStreetNumber) body.streetNumber = contactCreateFields.contactStreetNumber;

						if (contactCreateFields.contactZip) body.zip = contactCreateFields.contactZip;

						if (contactCreateFields.contactCity) body.city = contactCreateFields.contactCity;

						if (contactCreateFields.contactFax) body.fax = contactCreateFields.contactFax;

						if (contactCreateFields.contactWebsite) body.website = contactCreateFields.contactWebsite;

						if (contactCreateFields.contactSkype) body.skype = contactCreateFields.contactSkype;


						responseData = await fourLeadsApiRequest.call(this, 'PUT', `${endpoint}/${contactId}`, body);

					} else if (operation === 'delete') {

						const contactId = this.getNodeParameter('contactId', i) as number;

						responseData = await fourLeadsApiRequest.call(this, 'DELETE', `${endpoint}/${contactId}`);

					} else if (operation === 'get') {
						const contactId = this.getNodeParameter('contactId', i) as string;

						responseData = await fourLeadsApiRequest.call(this, 'GET', `${endpoint}/${contactId}`);

					} else if (operation === 'getAll') {

						const queryString = this.getNodeParameter('contactQs', i) as IDataObject;

						if (queryString.contactSearchString) {
							qs.searchString = queryString.contactSearchString;
						}

						if (queryString.contactPageSize) {
							qs.pageSize = queryString.contactPageSize;
						}

						if (queryString.contactPageNum) {
							qs.pageNum = queryString.contactPageNum;
						}

						responseData = await fourLeadsApiRequest.call(this, 'GET', `${endpoint}`, undefined, qs);

					} else if (operation === 'addATag') {

						const contactId = this.getNodeParameter('contactId', i) as string;
						const bListOfTags = this.getNodeParameter('bListOfTags', i) as boolean;

						let body: IDataObject;
						let segment: string;

						if (bListOfTags) {
							// Handle list of tag IDs
							segment = 'addTagList';
							const tagIdsString = this.getNodeParameter('contactTagIdList', i) as string;
							const tagIds = tagIdsString.split(',').map(id => parseInt(id.trim(), 10)); // Convert string to number array

							body = {
								tagIds: tagIds,
							};

						} else {
							segment = 'addTag';
							// Handle single tag ID
							const tagId = this.getNodeParameter('contactTagId', i) as string;

							body = {
								tagId: parseInt(tagId, 10), // Convert string to number
							};

						}

						responseData = await fourLeadsApiRequest.call(this, 'POST', `${endpoint}/${contactId}/${segment}`, body);

					} else if (operation === 'removeATag') {

						const contactId = this.getNodeParameter('contactId', i) as string;
						const bListOfTags = this.getNodeParameter('bListOfTags', i) as boolean;

						let body: IDataObject;
						let segment: string;

						if (bListOfTags) {
							// Handle list of tag IDs
							segment = 'removeTagList';
							const tagIdsString = this.getNodeParameter('contactTagIdList', i) as string;
							const tagIds = tagIdsString.split(',').map(id => parseInt(id.trim(), 10)); // Convert string to number array

							body = {
								tagIds: tagIds,
							};

						} else {
							segment = 'removeTag';
							// Handle single tag ID
							const tagId = this.getNodeParameter('contactTagId', i) as string;

							body = {
								tagId: parseInt(tagId, 10), // Convert string to number
							};

						}

						responseData = await fourLeadsApiRequest.call(this, 'POST', `${endpoint}/${contactId}/${segment}`, body);

					} else if (operation === 'getContactTagList') {

						const contactId = this.getNodeParameter('contactId', i) as string;

						responseData = await fourLeadsApiRequest.call(this, 'GET', `${endpoint}/${contactId}/getTagList`)

					} else if (operation === 'getContactFieldList') {

						const contactId = this.getNodeParameter('contactId', i) as string;

						responseData = await fourLeadsApiRequest.call(this, 'GET', `${endpoint}/${contactId}/getFieldList`)

					}
				} else if (resource === 'tag') {
					const endpoint = 'tags';

					if (operation === 'create') {

						const tagName = this.getNodeParameter('tagName', i) as string;

						const body = {
							name: tagName
						}

						responseData = await fourLeadsApiRequest.call(this, 'POST', endpoint, body);

					} else if (operation === 'update') {

						const tagId = this.getNodeParameter('tagId', i) as string;
						const updatedFields = this.getNodeParameter('tagUpdateFields', i) as IDataObject;

						const body: IDataObject = {};

						if (updatedFields.updatedTagName) {
							body.name = updatedFields.updatedTagName;
						}

						if (updatedFields.updatedTagDescription) {
							body.description = updatedFields.updatedTagDescription;
						}

						responseData = await fourLeadsApiRequest.call(this, 'PUT', `${endpoint}/${tagId}`, body);

					} else if (operation === 'delete') {

						const tagId = this.getNodeParameter('tagId', i) as string;

						responseData = await fourLeadsApiRequest.call(this, 'DELETE', `${endpoint}/${tagId}`);

					} else if (operation === 'get') {

						const tagId = this.getNodeParameter('tagId', i) as string;

						responseData = await fourLeadsApiRequest.call(this, 'GET', `${endpoint}/${tagId}`);

					} else if (operation === 'getAll') {

						const queryString = this.getNodeParameter('tagQs', i) as IDataObject;

						if (queryString.tagSearchString) qs.searchString = queryString.tagSearchString;


						if (queryString.tagPageSize) qs.pageSize = queryString.tagPageSize;


						if (queryString.tagPageNum) qs.pageNum = queryString.tagPageNum;


						responseData = await fourLeadsApiRequest.call(this, 'GET', `${endpoint}`, undefined, qs);

					}
				} else if (resource === 'optin') {
					const endpoint = 'opt-ins';

					if (operation === 'delete') {

						const optinId = this.getNodeParameter('optinId', i) as string;

						responseData = await fourLeadsApiRequest.call(this, 'DELETE', `${endpoint}/${optinId}`);

					} else if (operation === 'get') {

						const bReturnAll = this.getNodeParameter('bReturnAll', i) as boolean;

						if (bReturnAll) {
							const queryString = this.getNodeParameter('optinQs', i) as IDataObject;

							if (queryString.optinSearchString) qs.searchString = queryString.optinSearchString;
							if (queryString.optinPageSize) qs.pageSize = queryString.optinPageSize;
							if (queryString.optinPageNum) qs.pageNum = queryString.optinPageNum;

							responseData = await fourLeadsApiRequest.call(this, 'GET', `${endpoint}`, undefined, qs);
						} else {
							const optinId = this.getNodeParameter('optinId', i) as string;
							responseData = await fourLeadsApiRequest.call(this, 'GET', `${endpoint}/${optinId}`, undefined, qs);
						}

					} else if (operation === 'send') {

						const optinId = this.getNodeParameter('optinId', i) as string;
						const contactId = this.getNodeParameter('optinContactId', i) as string;

						const body = {
							contactId: contactId
						}

						responseData = await fourLeadsApiRequest.call(this, 'POST', `${endpoint}/${optinId}/send`, body);

					} else if (operation === 'optout') {
						const contactId = this.getNodeParameter('optinContactId', i) as string;

						responseData = await fourLeadsApiRequest.call(this, 'POST', `contacts/${contactId}/opt-out`)
					}

				} else if (resource === 'campaign') {
					const endpoint = 'campaigns'

					if (operation === 'get') {

						const bReturnAll = this.getNodeParameter('bReturnAll', i) as boolean;

						if (bReturnAll) {
							const queryString = this.getNodeParameter('campaignQs', i) as IDataObject;

							if (queryString.campaignSearchString) qs.searchString = queryString.campaignSearchString;
							if (queryString.campaignPageSize) qs.pageSize = queryString.campaignPageSize;
							if (queryString.campaignPageNum) qs.pageNum = queryString.campaignPageNum;

							responseData = await fourLeadsApiRequest.call(this, 'GET', `${endpoint}`, undefined, qs);
						} else {
							const campaignId = this.getNodeParameter('campaignId', i) as string;
							responseData = await fourLeadsApiRequest.call(this, 'GET', `${endpoint}/${campaignId}`, undefined, qs);
						}

					} else if (operation == 'delete') {

						const campaignId = this.getNodeParameter('campaignId', i) as string;

						responseData = await fourLeadsApiRequest.call(this, 'DELETE', `${endpoint}/${campaignId}`);

					} else if (operation === 'start') {

						const campaignId = this.getNodeParameter('campaignId', i) as string;
						const contactId = this.getNodeParameter('campaignContactId', i) as string;

						const body = {
							contactId: contactId
						}

						const operationEndpoint = operation === 'start' ? '/start' : '/stop';

						responseData = await fourLeadsApiRequest.call(this, 'POST', `${endpoint}/${campaignId}/${operationEndpoint}`, body);

					}
				}

				if (Array.isArray(responseData)) {
					returnData.push.apply(returnData, responseData as IDataObject[]);
				} else if (responseData !== undefined) {
					returnData.push(responseData as IDataObject);
				}

			} catch (error) {
				throw error;
			}
		}

		return [this.helpers.returnJsonArray(responseData)];
	}
}