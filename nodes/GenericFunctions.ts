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
        const credentials = await this.getCredentials('fleadsApi');

        if (credentials === undefined) {
            throw new NodeOperationError(this.getNode(), 'No credentials found.');
        }

        options.headers = {
            ...options.headers,
            Authorization: `Bearer ${credentials.apiKey}`,
        };

        responseData = await this.helpers.request(options);

    } catch (error) {
        throw new NodeApiError(this.getNode(), error);
    }

    if (Object.keys(responseData as IDataObject).length !== 0) {
        return responseData;
    } else {
        return { 'success': true };
    }
}

export async function getList(
    context: ILoadOptionsFunctions,
    endpoint: string,
    filter?: string,
    mapFunction?: (item: any) => INodeListSearchItems
): Promise<INodeListSearchResult> {
    const response = await fourLeadsApiRequest.call(context, 'GET', endpoint);
    const items = response?.data?.results;

    if (!Array.isArray(items)) {
        return { results: [] };
    }

    const results: INodeListSearchItems[] = items
        .map(mapFunction || ((item) => ({ name: item.name, value: item.id })))
        .filter(
            (item) =>
                !filter ||
                item.name.toLowerCase().includes(filter.toLowerCase()) ||
                item.value?.toString() === filter,
        )
        .sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()));

    return { results };
}

export async function getTags(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
    return await getList(this, 'tags', filter);
}

export async function getContacts(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
    return await getList(this, 'contacts', filter, (contact) => ({
        name: (contact.fname || contact.lname)
            ? `${contact.fname || ''} ${contact.lname || ''}`.trim()
            : contact.email || 'No Name', // Fallback: If no name is set, display email instead
        value: contact.id,
    }));
}

export async function getOptins(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
    return await getList(this, 'opt-ins', filter);
}

export async function getSignIns(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
    return await getList(this, 'campaigns', filter);
}

export async function getGlobalFields(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
    return await getList(this, 'globalFields', filter);
}

export async function getOptInCases(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
    return await getList(this, 'opt-in-cases', filter);
}

export async function getAutomationList(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
    return await getList(this, 'automations/trigger/n8n', filter);
}

export async function getActionList(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
    return await getList(this, 'automations/toggle/n8n', filter);
}