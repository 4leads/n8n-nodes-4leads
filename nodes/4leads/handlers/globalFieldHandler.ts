import { IExecuteFunctions, IDataObject } from 'n8n-workflow';
import { fourLeadsApiRequest } from '../GenericFunctions';

export async function globalFieldHandler(
    this: IExecuteFunctions,
    operation: string,
    i: number,
    qs: IDataObject
): Promise<IDataObject | IDataObject[]> {
    const endpoint = 'globalFields';
    let responseData: IDataObject;

    if (operation === 'create') {

        // TODO
        responseData = await fourLeadsApiRequest.call(this, 'POST', `${endpoint}/`)

    } else if (operation === 'update') {

        // TODO
        responseData = await fourLeadsApiRequest.call(this, 'POST', `${endpoint}/`)

    } else if (operation === 'delete') {

        const globalFieldId = this.getNodeParameter('globalFieldId', i) as number;

        responseData = await fourLeadsApiRequest.call(this, 'DELETE', `${endpoint}/${globalFieldId}`);

    } else if (operation === 'get') {

        const bReturnAll = this.getNodeParameter('bReturnAll', i) as boolean;

        if (bReturnAll) {
            const queryString = this.getNodeParameter('globalFieldQs', i) as IDataObject;

            if (queryString.globalFieldSearchString) qs.searchString = queryString.globalFieldSearchString;
            if (queryString.globalFieldPageSize) qs.pageSize = queryString.globalFieldPageSize;
            if (queryString.globalFieldPageNum) qs.pageNum = queryString.globalFieldPageNum;

            responseData = await fourLeadsApiRequest.call(this, 'GET', `${endpoint}`, undefined, qs);
        } else {
            const globalFieldId = this.getNodeParameter('globalFieldId', i) as number;
            responseData = await fourLeadsApiRequest.call(this, 'GET', `${endpoint}/${globalFieldId}`, undefined, qs);
        }

    } else if (operation === 'getValue') {

        const globalFieldId = this.getNodeParameter('globalFieldId', i) as number;
        const globalFieldContactId = this.getNodeParameter('globalFieldContactId', i) as number;

        const qs = { contactId: globalFieldContactId };

        responseData = await fourLeadsApiRequest.call(this, 'GET', `${endpoint}/${globalFieldId}/getValue`, undefined, qs);

    } else if (operation === 'setValue') {
        const bSetMultiFields = this.getNodeParameter('bSetMultiFields', i) as boolean;
        const globalFieldContactId = this.getNodeParameter('globalFieldContactId', i) as number;
    
        let body;
    
        if (bSetMultiFields) {
            let fields = this.getNodeParameter('fieldsToSet', i) as Object;
    
            if (fields && !Array.isArray(fields)) {
                fields = Object.values(fields);
            }
    
            if (!Array.isArray(fields)) {
                throw new Error('The "fieldsToSet" parameter is not an array or object with values!');
            }
    
            const flatFields = fields.flat();

    
            body = {
                contactId: globalFieldContactId,
                fields: flatFields.map((field: any) => ({
                    globalFieldId: field.globalFieldId,
                    value: field.value,
                    doTriggers: field.doTriggers,
                    overwrite: field.overwrite,
                })),
            };
    
            responseData = await fourLeadsApiRequest.call(this, 'POST', `${endpoint}/setFieldList`, body);

        } else {
            const globalFieldId = this.getNodeParameter('globalFieldId', i) as number;
            const globalFieldValue = this.getNodeParameter('globalFieldValue', i) as string;
            const globalFieldDoTrigger = this.getNodeParameter('bDoTriggers', i) as boolean;
            const globalFieldOverwrite = this.getNodeParameter('bOverwrite', i) as boolean;
    
            body = {
                contactId: globalFieldContactId,
                value: globalFieldValue,
                doTriggers: globalFieldDoTrigger,
                overwrite: globalFieldOverwrite,
            };
    
            responseData = await fourLeadsApiRequest.call(this, 'POST', `${endpoint}/${globalFieldId}/setValue`, body);
        }
        
    } else {
        throw new Error(`Operation "${operation}" is not supported for resource "globalField".`);
    }

    return responseData || {};
};