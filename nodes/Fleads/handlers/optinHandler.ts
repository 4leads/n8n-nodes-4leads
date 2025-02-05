import { IExecuteFunctions, IDataObject } from 'n8n-workflow';
import { fourLeadsApiRequest } from '../../GenericFunctions';

export async function optinHandler(
    this: IExecuteFunctions,
    operation: string,
    i: number,
    qs: IDataObject
): Promise<IDataObject | IDataObject[]> {
    const endpoint = 'opt-ins';
    let responseData: IDataObject;

    if (operation === 'delete') {

        const optinId = this.getNodeParameter('optinId', i) as IDataObject;
        if (!optinId.value) throw new Error('Opt-in ID is required and cannot be empty.');

        responseData = await fourLeadsApiRequest.call(this, 'DELETE', `${endpoint}/${optinId.value}`);

    } else if (operation === 'get') {

        const bReturnAll = this.getNodeParameter('bReturnAll', i) as boolean;

        if (bReturnAll) {
            const queryString = this.getNodeParameter('optinQs', i) as IDataObject;

            if (queryString.optinSearchString) qs.searchString = queryString.optinSearchString;
            if (queryString.optinPageSize) qs.pageSize = queryString.optinPageSize;
            if (queryString.optinPageNum) qs.pageNum = queryString.optinPageNum;

            responseData = await fourLeadsApiRequest.call(this, 'GET', `${endpoint}`, undefined, qs);
        } else {
            const optinId = this.getNodeParameter('optinId', i) as IDataObject;

            if (!optinId.value) throw new Error('Opt-in ID is required and cannot be empty.');

            responseData = await fourLeadsApiRequest.call(this, 'GET', `${endpoint}/${optinId.value}`, undefined, qs);
        }

    } else if (operation === 'send') {

        const optinId = this.getNodeParameter('optinId', i) as IDataObject;

        if (!optinId.value) throw new Error('Opt-in ID is required and cannot be empty.');


        const contactId = this.getNodeParameter('optinContactId', i) as IDataObject;

        if (!contactId.value) throw new Error('Contact ID is required and cannot be empty.');

        const body = {
            contactId: contactId.value
        }

        responseData = await fourLeadsApiRequest.call(this, 'POST', `${endpoint}/${optinId.value}/send`, body);

    } else if (operation === 'optout') {

        const contactId = this.getNodeParameter('optinContactId', i) as IDataObject;

        if (!contactId.value) throw new Error('Contact ID is required and cannot be empty.');

        responseData = await fourLeadsApiRequest.call(this, 'POST', `contacts/${contactId.value}/opt-out`)

    } else {
        throw new Error(`Operation "${operation}" is not supported for resource "optins".`);
    }

    return responseData || {};
};