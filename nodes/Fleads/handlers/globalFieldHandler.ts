import { IExecuteFunctions, IDataObject } from 'n8n-workflow';
import { fourLeadsApiRequest } from '../../GenericFunctions';

export async function globalFieldHandler(
    this: IExecuteFunctions,
    operation: string,
    i: number,
    qs: IDataObject
): Promise<IDataObject | IDataObject[]> {
    const endpoint = 'globalFields';
    let responseData: IDataObject;

    if (operation === 'get') {

        const bReturnAll = this.getNodeParameter('bReturnAll', i) as boolean;

        if (bReturnAll) {
            const queryString = this.getNodeParameter('globalFieldQs', i) as IDataObject;

            if (queryString.globalFieldSearchString) qs.searchString = queryString.globalFieldSearchString;
            if (queryString.globalFieldPageSize) qs.pageSize = queryString.globalFieldPageSize;
            if (queryString.globalFieldPageNum) qs.pageNum = queryString.globalFieldPageNum;

            responseData = await fourLeadsApiRequest.call(this, 'GET', `${endpoint}`, undefined, qs);
        } else {
            const globalFieldId = this.getNodeParameter('globalFieldId', i) as IDataObject;

            if (!globalFieldId.value) throw new Error('Global field ID is required and cannot be empty.');

            responseData = await fourLeadsApiRequest.call(this, 'GET', `${endpoint}/${globalFieldId.value}`, undefined, qs);
        }

    } else {
        throw new Error(`Operation "${operation}" is not supported for resource "globalField".`);
    }

    return responseData || {};
};