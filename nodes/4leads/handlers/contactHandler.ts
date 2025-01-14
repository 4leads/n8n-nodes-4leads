import { IExecuteFunctions, IDataObject } from 'n8n-workflow';
import { fourLeadsApiRequest } from '../GenericFunctions';

export async function contactHandler(
    this: IExecuteFunctions,
    operation: string,
    i: number,
    qs: IDataObject
): Promise<IDataObject | IDataObject[]> {
    const endpoint = 'contacts';
    let responseData: IDataObject;

    if (operation === 'create') {

        const contactFirstname = this.getNodeParameter('contactFirstname', i) as string;
        const contactLastname = this.getNodeParameter('contactLastname', i) as string;
        const contactEmail = this.getNodeParameter('contactEmail', i) as string;
        const contactMobile = this.getNodeParameter('contactMobile', i) as string;

        const contactCreateFields = this.getNodeParameter('contactCreateFields', i) as IDataObject;

        const body: IDataObject = {
            fname: contactFirstname,
            lname: contactLastname,
            email: contactEmail,
            mobilePhone: contactMobile,
        };

        // Adding additional fields if provided
        if (contactCreateFields.contactSalutation) body.salutation = contactCreateFields.contactSalutation;

        if (contactCreateFields.contactCompany) body.company = contactCreateFields.contactCompany;

        if (contactCreateFields.contactPhoneNumber) body.privatePhone = contactCreateFields.contactPhoneNumber;

        if (contactCreateFields.contactBirthday) {
            let dateValue = contactCreateFields.contactBirthday;

            if (typeof dateValue === 'string' || typeof dateValue === 'number') {
                const date = new Date(dateValue);
                if (!isNaN(date.getTime())) {
                    const formattedDate = date.toLocaleDateString('de-AT');
                    body.birthday = formattedDate;
                } else {
                    console.error('Ungültiges Datum');
                }
            }
        }
        if (contactCreateFields.contactPosition) body.companyPosition = contactCreateFields.contactPosition;

        if (contactCreateFields.contactCountry) body.country = contactCreateFields.contactCountry;

        if (contactCreateFields.contactStreet) body.street = contactCreateFields.contactStreet;

        if (contactCreateFields.contactHouseNumber) body.houseNumber = contactCreateFields.contactHouseNumber;

        if (contactCreateFields.contactZip) body.zip = contactCreateFields.contactZip;

        if (contactCreateFields.contactCity) body.city = contactCreateFields.contactCity;

        if (contactCreateFields.contactFax) body.fax = contactCreateFields.contactFax;

        if (contactCreateFields.contactWebsite) body.website = contactCreateFields.contactWebsite;

        if (contactCreateFields.contactSkype) body.skype = contactCreateFields.contactSkype;

        responseData = await fourLeadsApiRequest.call(this, 'POST', endpoint, body);

    } else if (operation === 'update') {

        const contactId = this.getNodeParameter('contactId', i) as IDataObject
        const contactCreateFields = this.getNodeParameter('contactUpdateFields', i) as IDataObject;

        if (!contactId.value) {
            throw new Error('Contact ID is required and cannot be empty.')
        }

        const body: IDataObject = {};

        // Adding additional fields if provided
        if (contactCreateFields.contactFirstname) body.fname = contactCreateFields.contactFirstname;

        if (contactCreateFields.contactLastname) body.lname = contactCreateFields.contactLastname;

        if (contactCreateFields.contactEmail) body.email = contactCreateFields.contactEmail;

        if (contactCreateFields.contactMobile) body.mobilePhone = contactCreateFields.contactMobile;

        if (contactCreateFields.contactSalutation) body.salutation = contactCreateFields.contactSalutation;

        if (contactCreateFields.contactCompany) body.company = contactCreateFields.contactCompany;

        if (contactCreateFields.contactPhoneNumber) body.privatePhone = contactCreateFields.contactPhoneNumber;

        if (contactCreateFields.contactBirthday) {
            let dateValue = contactCreateFields.contactBirthday;

            if (typeof dateValue === 'string' || typeof dateValue === 'number') {
                const date = new Date(dateValue);
                if (!isNaN(date.getTime())) {
                    const formattedDate = date.toLocaleDateString('de-AT');
                    body.birthday = formattedDate;
                } else {
                    console.error('Ungültiges Datum');
                }
            }
        }
        if (contactCreateFields.contactPosition) body.companyPosition = contactCreateFields.contactPosition;

        if (contactCreateFields.contactCountry) body.country = contactCreateFields.contactCountry;

        if (contactCreateFields.contactStreet) body.street = contactCreateFields.contactStreet;

        if (contactCreateFields.contactStreetNumber) body.streetNumber = contactCreateFields.contactStreetNumber;

        if (contactCreateFields.contactZip) body.zip = contactCreateFields.contactZip;

        if (contactCreateFields.contactCity) body.city = contactCreateFields.contactCity;

        if (contactCreateFields.contactFax) body.fax = contactCreateFields.contactFax;

        if (contactCreateFields.contactWebsite) body.website = contactCreateFields.contactWebsite;

        if (contactCreateFields.contactSkype) body.skype = contactCreateFields.contactSkype;


        responseData = await fourLeadsApiRequest.call(this, 'PUT', `${endpoint}/${contactId.value}`, body);

    } else if (operation === 'delete') {

        const contactId = this.getNodeParameter('contactId', i) as IDataObject

        if (!contactId.value) {
            throw new Error('Contact ID is required and cannot be empty.')
        }

        responseData = await fourLeadsApiRequest.call(this, 'DELETE', `${endpoint}/${contactId.value}`);

    } else if (operation === 'get') {

        const bReturnAll = this.getNodeParameter('bReturnAll', i) as boolean;

        if (bReturnAll) {
            const queryString = this.getNodeParameter('contactQs', i) as IDataObject;

            if (queryString.contactSearchString) qs.searchString = queryString.contactSearchString;
            if (queryString.contactPageSize) qs.pageSize = queryString.contactPageSize;
            if (queryString.contactPageNum) qs.pageNum = queryString.contactPageNum;

            responseData = await fourLeadsApiRequest.call(this, 'GET', `${endpoint}`, undefined, qs);
        } else {
            const contactId = this.getNodeParameter('contactId', i) as IDataObject;
            if (!contactId.value) {
                throw new Error('Contact ID is required and cannot be empty.');
            }
            responseData = await fourLeadsApiRequest.call(this, 'GET', `${endpoint}/${contactId.value}`, undefined, qs);
        }

    } else if (operation === 'addATag' || operation === 'removeATag') {
        const contactId = this.getNodeParameter('contactId', i) as IDataObject;

        if (!contactId.value) {
            throw new Error('Contact ID is required and cannot be empty.');
        }

        const bListOfTags = this.getNodeParameter('bListOfTags', i) as boolean;

        let body: IDataObject;
        let segment: string;

        if (bListOfTags) {
            // Handle list of tag IDs
            segment = operation === 'addATag' ? 'addTagList' : 'removeTagList';
            const tagIds = this.getNodeParameter('contactTagIdList', i) as number[];

            body = {
                tagIds: tagIds,
            };
        } else {
            // Handle single tag ID
            segment = operation === 'addATag' ? 'addTag' : 'removeTag';
            const tagId = this.getNodeParameter('contactTagId', i) as IDataObject;

            body = {
                tagId: tagId.value,
            };
        }

        responseData = await fourLeadsApiRequest.call(this, 'POST', `${endpoint}/${contactId.value}/${segment}`, body);
    } else if (operation === 'getContactTagList') {

        const contactId = this.getNodeParameter('contactId', i) as IDataObject

        if (!contactId.value) {
            throw new Error('Contact ID is required and cannot be empty.')
        }

        responseData = await fourLeadsApiRequest.call(this, 'GET', `${endpoint}/${contactId.value}/getTagList`)

    } else if (operation === 'getContactFieldList') {

        const contactId = this.getNodeParameter('contactId', i) as IDataObject

        if (!contactId.value) {
            throw new Error('Contact ID is required and cannot be empty.')
        }

        responseData = await fourLeadsApiRequest.call(this, 'GET', `${endpoint}/${contactId.value}/getFieldList`)

    } else {
        throw new Error(`Operation "${operation}" is not supported for resource "contact".`);
    }

    return responseData || {};
};