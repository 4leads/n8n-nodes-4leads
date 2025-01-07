import { IDataObject, IHttpRequestMethods, IRequestOptions } from "n8n-workflow";

export async function makeRequest(method: IHttpRequestMethods, endpoint: string, body: any, uri?: string, option: IDataObject = {}): Promise<any>
{
    let options: IRequestOptions = {
        headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
        method,
        body,
        uri: uri || `https://api.4leads.eu/${endpoint}`,
        json: true,
    }

    options = Object.assign({}, options, option)

    // Make request
    try {
        if (Object.keys(body).length === 0) {
            delete options.body;
        }
        
        console.log("here I am 1")


    } catch (error) {
        console.log(error);
    }
}