import { IDataObject, IExecuteFunctions, IExecuteSingleFunctions, IHttpRequestMethods, ILoadOptionsFunctions, IRequestOptions, INodeListSearchResult, INodeListSearchItems, NodeApiError, NodeOperationError } from "n8n-workflow";

export async function fourLeadsApiRequest(
    this: IExecuteFunctions | IExecuteSingleFunctions | ILoadOptionsFunctions,
    method: IHttpRequestMethods,
    endpoint: string,
    body: any = {},
    qs: IDataObject = {},
    uri?: string,
    option: IDataObject = {}
): Promise<any> {
    let options: IRequestOptions = {
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        method,
        body,
        qs,
        uri: uri || `https://api.4leads.eu/v1/${endpoint}`,
        json: true,
    };

    options = Object.assign({}, options, option);

    if (Object.keys(body).length === 0) {
        delete options.body;
    }

    // Make request
    let responseData: IDataObject | undefined;

    try {
        const credentials = await this.getCredentials('FleadsApi');

        if (credentials === undefined) {
            throw new NodeOperationError(this.getNode(), 'No credentials found.');
        }

        options.headers = {
            ...options.headers,
            Authorization: `Bearer ${credentials.apiKey}`,
        };

        responseData = await this.helpers.request(options);
        console.log(responseData)

    } catch (error) {
        throw new NodeApiError(this.getNode(), error);
    }

    if (Object.keys(responseData as IDataObject).length !== 0) {
        return responseData;
    } else {
        return { 'success': true };
    }
}

export async function getTags(
    this: ILoadOptionsFunctions,
    filter?: string,
): Promise<INodeListSearchResult> {
    const response = await fourLeadsApiRequest.call(this, 'GET', 'tags');

    const tags = response?.data?.results;

    if (!Array.isArray(tags)) {
        return { results: [] };
    }

    const results: INodeListSearchItems[] = tags
        .map((tag) => ({
            name: tag.name,
            value: tag.id,
        }))
        .filter(
            (tag) =>
                !filter ||
                tag.name.toLowerCase().includes(filter.toLowerCase()) ||
                tag.value?.toString() === filter,
        )
        .sort((a, b) => {
            if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
            if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
            return 0;
        });

    return { results };
}

export async function getContacts(
    this: ILoadOptionsFunctions,
    filter?: string,
): Promise<INodeListSearchResult> {
    const response = await fourLeadsApiRequest.call(this, 'GET', 'contacts');

    const contacts = response?.data?.results;

    if (!Array.isArray(contacts)) {
        return { results: [] };
    }

    const results: INodeListSearchItems[] = contacts
        .map((contact) => ({
            name: (contact.fname || contact.lname)
                ? `${contact.fname || ''} ${contact.lname || ''}`.trim()
                : contact.email || 'No Name', // Fallback: if no name is set, display email instead
            value: contact.id,
        }))
        .filter(
            (contact) =>
                !filter ||
                contact.name.toLowerCase().includes(filter.toLowerCase()) ||
                contact.value?.toString() === filter,
        )
        .sort((a, b) => {
            if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
            if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
            return 0;
        });

    return { results };
}

export async function getOptins(
    this: ILoadOptionsFunctions,
    filter?: string,
): Promise<INodeListSearchResult> {
    const response = await fourLeadsApiRequest.call(this, 'GET', 'opt-ins');

    const optins = response?.data?.results;

    if (!Array.isArray(optins)) {
        return { results: [] };
    }

    const results: INodeListSearchItems[] = optins
        .map((optin) => ({
            name: optin.name,
            value: optin.id,
        }))
        .filter(
            (optin) =>
                !filter ||
                optin.name.toLowerCase().includes(filter.toLowerCase()) ||
                optin.value?.toString() === filter,
        )
        .sort((a, b) => {
            if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
            if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
            return 0;
        });

    return { results };
}

export async function getGlobalFields(
    this: ILoadOptionsFunctions,
    filter?: string,
): Promise<INodeListSearchResult> {
    const response = await fourLeadsApiRequest.call(this, 'GET', 'globalFields');

    const globalfields = response?.data?.results;

    if (!Array.isArray(globalfields)) {
        return { results: [] };
    }

    const results: INodeListSearchItems[] = globalfields
        .map((globalfield) => ({
            name: globalfield.name,
            value: globalfield.id,
        }))
        .filter(
            (globalfield) =>
                !filter ||
                globalfield.name.toLowerCase().includes(filter.toLowerCase()) ||
                globalfield.value?.toString() === filter,
        )
        .sort((a, b) => {
            if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
            if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
            return 0;
        });

    return { results };
}

export async function getOptInCases(
    this: ILoadOptionsFunctions,
    filter?: string,
): Promise<INodeListSearchResult> {
    const response = await fourLeadsApiRequest.call(this, 'GET', 'opt-in-cases');

    const optInCases = response?.data?.results;

    if (!Array.isArray(optInCases)) {
        return { results: [] };
    }

    const results: INodeListSearchItems[] = optInCases
        .map((optInCase) => ({
            name: optInCase.name,
            value: optInCase.id,
        }))
        .filter(
            (optInCase) =>
                !filter ||
                optInCase.name.toLowerCase().includes(filter.toLowerCase()) ||
                optInCase.value?.toString() === filter,
        )
        .sort((a, b) => {
            if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
            if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
            return 0;
        });

    return { results };
}

export async function getAutomationList(
    this: ILoadOptionsFunctions,
    filter?: string,
): Promise<INodeListSearchResult> {
    const response = await fourLeadsApiRequest.call(this, 'GET', 'automations/trigger/n8n');
    
    const automations = response?.data?.results;

    if (!Array.isArray(automations)) {
        return { results: [] };
    }

    const results: INodeListSearchItems[] = automations
        .map((automation) => ({
            name: automation.name,
            value: automation.id,
        }))
        .filter(
            (automation) =>
                !filter ||
                automation.name.toLowerCase().includes(filter.toLowerCase()) ||
                automation.value?.toString() === filter,
        )
        .sort((a, b) => {
            if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
            if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
            return 0;
        });

    return { results };
}