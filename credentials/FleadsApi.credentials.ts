import {
	IAuthenticateGeneric,
	ICredentialType,
	INodeProperties,
	ICredentialTestRequest
} from 'n8n-workflow';

export class FleadsApi implements ICredentialType {
	name = 'fleadsApi';
	displayName = '4leads API';
	documentationUrl = 'https://4leadsv1.docs.apiary.io/#introduction/getting-started';

	properties: INodeProperties[] = [
		{
			displayName: 'API base URL',
			name: 'apiBaseUrl',
			type: 'string',
			default: 'https://api.4leads.net/v1/',
			placeholder: 'https://api.4leads.net/v1/',
		},
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			typeOptions: { password: true },
			default: '',
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				Authorization: '=Bearer {{$credentials.apiKey}}',
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			baseURL: '={{$credentials.apiBaseUrl}}',
			url: 'tags',
			method: 'GET',
			headers: {
				Authorization: 'Bearer {{$credentials.apiKey}}',
			},
		},
	};
}
