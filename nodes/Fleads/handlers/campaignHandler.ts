import { IExecuteFunctions, IDataObject } from 'n8n-workflow';
import { fourLeadsApiRequest } from '../../GenericFunctions';

export async function campaignHandler(
    this: IExecuteFunctions,
    operation: string,
    i: number,
    qs: IDataObject
): Promise<IDataObject | IDataObject[]> {
    const endpoint = 'automations';
    let responseData: IDataObject;

    if (operation === 'start') {

        const automationId = this.getNodeParameter('campaignId', i) as IDataObject;
        const contactId = this.getNodeParameter('contactId', i) as IDataObject;

        if (!automationId.value) throw new Error('Campaign ID is required and cannot be empty.');
        if (!contactId.value) throw new Error('Contact ID is required and cannot be empty.');

        const body = {
            idOrEmail: contactId.value
        };

        responseData = await fourLeadsApiRequest.call(this, 'POST', `${endpoint}/${automationId.value}/genericStart`, body);

    } else {
        throw new Error(`Operation "${operation}" is not supported for resource "campaign".`);
    }

    return responseData || {};
};