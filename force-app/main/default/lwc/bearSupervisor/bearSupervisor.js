import { LightningElement, api, wire } from 'lwc';
import { getRecord, getFieldValue } from 'lightning/uiRecordApi';
// Import Bear object fields
import SUPERVISOR_FIELD from '@salesforce/schema/Bear__c.Supervisor__c';
const bearFields = [SUPERVISOR_FIELD];

export default class BearSupervisor extends LightningElement {
    // automatically gets id of current record
    @api recordId;
    // fetch data based on recordId and get fields based on bearfields
    // set data to bear variable
    @wire(getRecord, { recordId: '$recordId', fields: bearFields })
    bear;

    // get supervisor id from bear var we just fetched
    get supervisorId() {
        return getFieldValue(this.bear.data, SUPERVISOR_FIELD);
    }
}
