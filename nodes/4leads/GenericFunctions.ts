import { IDataObject, IExecuteFunctions, IExecuteSingleFunctions, IHttpRequestMethods, ILoadOptionsFunctions, IRequestOptions, NodeApiError, NodeOperationError } from "n8n-workflow";

export async function makeRequest(
    this: IExecuteFunctions | IExecuteSingleFunctions | ILoadOptionsFunctions, 
    method: IHttpRequestMethods, 
    endpoint: string, 
    body: any, 
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

    } catch (error) {
        throw new NodeApiError(this.getNode(), error);
    }

    if(Object.keys(responseData as IDataObject).length !== 0) {
		return responseData;
	} else {
		return { 'success': true };
	}
}