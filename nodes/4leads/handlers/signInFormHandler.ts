import { IExecuteFunctions, IDataObject } from 'n8n-workflow';
import { fourLeadsApiRequest } from '../GenericFunctions';

export async function signInFormHandler(
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
            const queryString = this.getNodeParameter('signInFormQs', i) as IDataObject;

            if (queryString.signInFormSearchString) qs.searchString = queryString.signInFormSearchString;
            if (queryString.signInFormPageSize) qs.pageSize = queryString.signInFormPageSize;
            if (queryString.signInFormPageNum) qs.pageNum = queryString.signInFormPageNum;

            responseData = await fourLeadsApiRequest.call(this, 'GET', `${endpoint}`, undefined, qs);
        } else {
            const signInFormId = this.getNodeParameter('signInFormId', i) as number;
            responseData = await fourLeadsApiRequest.call(this, 'GET', `${endpoint}/${signInFormId}`, undefined, qs);
        }

    } else if (operation == 'delete') {

        const signInFormId = this.getNodeParameter('signInFormId', i) as number;

        responseData = await fourLeadsApiRequest.call(this, 'DELETE', `${endpoint}/${signInFormId}`);

    } else if (operation === 'start' || operation === 'stop') {

        const signInFormId = this.getNodeParameter('signInFormId', i) as number;
        const contactId = this.getNodeParameter('signInFormContactId', i) as number;

        const body = {
            contactId: contactId
        }

        const operationEndpoint = operation === 'start' ? '/start' : '/stop';

        responseData = await fourLeadsApiRequest.call(this, 'POST', `${endpoint}/${signInFormId}/${operationEndpoint}`, body);

    } else {
        throw new Error(`Operation "${operation}" is not supported for resource "signInForms".`);
    }

    return responseData || {};
};