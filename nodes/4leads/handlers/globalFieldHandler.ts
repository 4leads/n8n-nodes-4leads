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
            if (!globalFieldId.value) {
                throw new Error('Global field ID is required and cannot be empty.');
            }
            responseData = await fourLeadsApiRequest.call(this, 'GET', `${endpoint}/${globalFieldId.value}`, undefined, qs);
        }

    } else if (operation === 'getValue') {
        const globalFieldId = this.getNodeParameter('globalFieldId', i) as IDataObject;

        if (!globalFieldId.value) {
            throw new Error('Global field ID is required and cannot be empty.');
        }

        const globalFieldContactId = this.getNodeParameter('globalFieldContactId', i) as IDataObject;

        const qs = { contactId: globalFieldContactId.value };

        responseData = await fourLeadsApiRequest.call(this, 'GET', `${endpoint}/${globalFieldId.value}/getValue`, undefined, qs);
    } else if (operation === 'setValue') {
        const bSetMultiFields = this.getNodeParameter('bSetMultiFields', i) as boolean;
        const globalFieldContactId = this.getNodeParameter('globalFieldContactId', i) as IDataObject;

        let body;

        if (bSetMultiFields) {
            let fields = this.getNodeParameter('fieldsToSet', i) as IDataObject;

            if (!Array.isArray(fields.field)) {
                throw new Error("fields.field is not a valid array");
            }

            const formattedFields = fields.field.map((field: any) => ({
                globalFieldId: field.globalFieldId.value,
                value: field.value,
                doTriggers: field.doTriggers,
                overwrite: field.overwrite,
            }));

            body = {
                contactId: globalFieldContactId.value,
                fields: formattedFields,
            };

            console.log('Body:', JSON.stringify(body));

            responseData = await fourLeadsApiRequest.call(this, 'POST', `${endpoint}/setFieldList`, body);
        } else {
            const globalFieldId = this.getNodeParameter('globalFieldId', i) as IDataObject;

            if (!globalFieldId.value) {
                throw new Error('Global field ID is required and cannot be empty.');
            }

            const globalFieldValue = this.getNodeParameter('globalFieldValue', i) as string;
            const globalFieldDoTrigger = this.getNodeParameter('bDoTriggers', i) as boolean;
            const globalFieldOverwrite = this.getNodeParameter('bOverwrite', i) as boolean;

            body = {
                contactId: globalFieldContactId.value,
                value: globalFieldValue,
                doTriggers: globalFieldDoTrigger,
                overwrite: globalFieldOverwrite,
            };

            responseData = await fourLeadsApiRequest.call(this, 'POST', `${endpoint}/${globalFieldId.value}/setValue`, body);
        }
    }
    else {
        throw new Error(`Operation "${operation}" is not supported for resource "globalField".`);
    }

    return responseData || {};
};