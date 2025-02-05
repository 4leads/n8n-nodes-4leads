import { IExecuteFunctions, IDataObject } from 'n8n-workflow';
import { fourLeadsApiRequest } from '../../GenericFunctions';

export async function optInCaseHandler(
    this: IExecuteFunctions,
    operation: string,
    i: number,
    qs: IDataObject
): Promise<IDataObject | IDataObject[]> {
    const endpoint = 'opt-in-cases';
    let responseData: IDataObject;

    if (operation === 'get') {

        const bReturnAll = this.getNodeParameter('bReturnAll', i) as boolean;

        if (bReturnAll) {
            const queryString = this.getNodeParameter('optInCaseQs', i) as IDataObject;

            if (queryString.optInCaseSearchString) qs.searchString = queryString.optInCaseSearchString;
            if (queryString.optInCasePageSize) qs.pageSize = queryString.optInCasePageSize;
            if (queryString.optInCasePageNum) qs.pageNum = queryString.optInCasePageNum;

            responseData = await fourLeadsApiRequest.call(this, 'GET', `${endpoint}`, undefined, qs);
        } else {
            const optInCaseId = this.getNodeParameter('optInCaseId', i) as IDataObject;

            if (!optInCaseId.value) throw new Error('Opt-In-Case ID is required and cannot be empty.');

            responseData = await fourLeadsApiRequest.call(this, 'GET', `${endpoint}/${optInCaseId.value}`, undefined, qs);
        }

    } else if (operation === 'grant' || operation === 'revoke') {

        const optInCaseId = this.getNodeParameter('optInCaseId', i) as IDataObject;
    
        if (!optInCaseId.value) throw new Error('Opt-In-Case ID is required and cannot be empty.');
    
        const contactId = this.getNodeParameter('OptInCaseContactId', i) as IDataObject;
    
        if (!contactId.value) throw new Error('Contact ID is required and cannot be empty.');
    
        const optInCaseAdditionalFields = this.getNodeParameter('optInCaseAdditionalFields', i) as IDataObject;
    
        const body: IDataObject = {
            contactId: contactId.value,
        };
    
        if (optInCaseAdditionalFields.optInCaseIp) body.ip = optInCaseAdditionalFields.optInCaseIp;
    
        const operationEndpoint = operation === 'grant' ? 'grant' : 'revoke';
        
        responseData = await fourLeadsApiRequest.call(this, 'POST', `${endpoint}/${optInCaseId.value}/${operationEndpoint}`, body);

    } else {
        throw new Error(`Operation "${operation}" is not supported for resource "optInCase".`);
    }

    return responseData || {};
};