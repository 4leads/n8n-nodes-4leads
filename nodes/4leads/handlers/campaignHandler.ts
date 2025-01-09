import { IExecuteFunctions, IDataObject } from 'n8n-workflow';
import { fourLeadsApiRequest } from '../GenericFunctions';

export async function campaignHandler(
    this: IExecuteFunctions,
    operation: string,
    i: number,
    qs: IDataObject
): Promise<IDataObject | IDataObject[]> {
    const endpoint = 'campaigns'
    let responseData: IDataObject;

    if (operation === 'get') {

        const bReturnAll = this.getNodeParameter('bReturnAll', i) as boolean;

        if (bReturnAll) {
            const queryString = this.getNodeParameter('campaignQs', i) as IDataObject;

            if (queryString.campaignSearchString) qs.searchString = queryString.campaignSearchString;
            if (queryString.campaignPageSize) qs.pageSize = queryString.campaignPageSize;
            if (queryString.campaignPageNum) qs.pageNum = queryString.campaignPageNum;

            responseData = await fourLeadsApiRequest.call(this, 'GET', `${endpoint}`, undefined, qs);
        } else {
            const campaignId = this.getNodeParameter('campaignId', i) as number;
            responseData = await fourLeadsApiRequest.call(this, 'GET', `${endpoint}/${campaignId}`, undefined, qs);
        }

    } else if (operation == 'delete') {

        const campaignId = this.getNodeParameter('campaignId', i) as number;

        responseData = await fourLeadsApiRequest.call(this, 'DELETE', `${endpoint}/${campaignId}`);

    } else if (operation === 'start' || operation === 'stop') {

        const campaignId = this.getNodeParameter('campaignId', i) as number;
        const contactId = this.getNodeParameter('campaignContactId', i) as number;

        const body = {
            contactId: contactId
        }

        const operationEndpoint = operation === 'start' ? '/start' : '/stop';

        responseData = await fourLeadsApiRequest.call(this, 'POST', `${endpoint}/${campaignId}/${operationEndpoint}`, body);

    } else {
        throw new Error(`Operation "${operation}" is not supported for resource "campaigns".`);
    }

    return responseData || {};
};