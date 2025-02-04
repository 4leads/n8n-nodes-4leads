import { IExecuteFunctions, IDataObject } from 'n8n-workflow';
import { fourLeadsApiRequest } from '../../GenericFunctions';

export async function tagHandler(
    this: IExecuteFunctions,
    operation: string,
    i: number,
    qs: IDataObject
): Promise<IDataObject | IDataObject[]> {
    const endpoint = 'tags';
    let responseData: IDataObject;

    if (operation === 'create') {

        const tagName = this.getNodeParameter('tagName', i) as string;

        if (!tagName) throw new Error('Tag name is required and cannot be empty.');

        const body = {
            name: tagName
        }

        responseData = await fourLeadsApiRequest.call(this, 'POST', endpoint, body);

    } else if (operation === 'update') {

        const tagId = this.getNodeParameter('tagId', i) as IDataObject;

        if (!tagId.value) throw new Error('Tag ID is required and cannot be empty.');

        const updatedFields = this.getNodeParameter('tagUpdateFields', i) as IDataObject;

        if (!updatedFields.updatedTagName && !updatedFields.updatedTagDescription) {
            throw new Error('At least one of "Name" or "Description" must be provided.');
        }

        const body: IDataObject = {};

        if (updatedFields.updatedTagName) body.name = updatedFields.updatedTagName;

        if (updatedFields.updatedTagDescription) body.description = updatedFields.updatedTagDescription;

        responseData = await fourLeadsApiRequest.call(this, 'PUT', `${endpoint}/${tagId.value}`, body);

    } else if (operation === 'delete') {

        const tagId = this.getNodeParameter('tagId', i) as IDataObject;

        if (!tagId.value) throw new Error('Tag ID is required and cannot be empty.');

        responseData = await fourLeadsApiRequest.call(this, 'DELETE', `${endpoint}/${tagId.value}`);

    } else if (operation === 'get') {

        const bReturnAll = this.getNodeParameter('bReturnAll', i) as boolean;

        if (bReturnAll) {
            const queryString = this.getNodeParameter('tagQs', i) as IDataObject;

            if (queryString.tagSearchString) qs.searchString = queryString.tagSearchString;
            if (queryString.tagPageSize) qs.pageSize = queryString.tagPageSize;
            if (queryString.tagPageNum) qs.pageNum = queryString.tagPageNum;

            responseData = await fourLeadsApiRequest.call(this, 'GET', `${endpoint}`, undefined, qs);
        } else {
            const tagId = this.getNodeParameter('tagId', i) as IDataObject;

            if (!tagId.value) throw new Error('Tag ID is required and cannot be empty.');

            responseData = await fourLeadsApiRequest.call(this, 'GET', `${endpoint}/${tagId.value}`, undefined, qs);
        }

    } else {
        throw new Error(`Operation "${operation}" is not supported for resource "tags".`);
    }

    return responseData || {};
};