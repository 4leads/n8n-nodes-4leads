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
            const signInFormId = this.getNodeParameter('signInFormId', i) as IDataObject

            if (!signInFormId.value) throw new Error('Sign in form ID is required and cannot be empty.');

            responseData = await fourLeadsApiRequest.call(this, 'GET', `${endpoint}/${signInFormId.value}`, undefined, qs);
        }

    } else if (operation == 'delete') {

        const signInFormId = this.getNodeParameter('signInFormId', i) as IDataObject;

        if (!signInFormId.value) throw new Error('Sign in form ID is required and cannot be empty.');

        responseData = await fourLeadsApiRequest.call(this, 'DELETE', `${endpoint}/${signInFormId.value}`);

    } else if (operation === 'start' || operation === 'stop') {

        const signInFormId = this.getNodeParameter('signInFormId', i) as IDataObject;

        if (!signInFormId.value) throw new Error('Sign in form ID is required and cannot be empty.');

        const contactId = this.getNodeParameter('signInFormContactId', i) as IDataObject;

        if (!contactId.value) throw new Error('Contact ID is required and cannot be empty.');


        const body = {
            contactId: contactId.value
        }

        const operationEndpoint = operation === 'start' ? '/start' : '/stop';

        responseData = await fourLeadsApiRequest.call(this, 'POST', `${endpoint}/${signInFormId.value}/${operationEndpoint}`, body);

    } else {
        throw new Error(`Operation "${operation}" is not supported for resource "signInForms".`);
    }

    return responseData || {};
};