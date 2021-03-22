import { LightningElement, api, wire } from 'lwc';
import { getRecord, getFieldValue } from 'lightning/uiRecordApi';

// these are the api field names we need in the Bear__c obj
// set as bearFields and pass into getRecord
const NAME_FIELD = 'Bear__c.Name';
const LOCATION_LATITUDE_FIELD = 'Bear__c.Location__Latitude__s';
const LOCATION_LONGITUDE_FIELD = 'Bear__c.Location__Longitude__s';
const bearFields = [
    NAME_FIELD,
    LOCATION_LATITUDE_FIELD,
    LOCATION_LONGITUDE_FIELD
];

export default class BearLocation extends LightningElement {
    // get current record id
    @api recordId;
    name;
    mapMarkers = [];

    // fetch data/errors
    //inside @wire we need to call the getRecord function and pass the recordId + fields we want returned
    //loadbear function is then automatically called and passes errors/data
    //and changes dynamically based on the recordId
    @wire(getRecord, { recordId: '$recordId', fields: bearFields })
    loadBear({ error, data }) {
        if (error) {
            // TODO: handle error
        } else if (data) {
            // Get Bear data
            // set the variables
            this.name = getFieldValue(data, NAME_FIELD);
            const Latitude = getFieldValue(data, LOCATION_LATITUDE_FIELD);
            const Longitude = getFieldValue(data, LOCATION_LONGITUDE_FIELD);
            // Transform bear data into map markers
            this.mapMarkers = [
                {
                    // set mapmarkers
                    location: { Latitude, Longitude },
                    title: this.name,
                    description: `Coords: ${Latitude}, ${Longitude}`
                }
            ];
        }
    }

    get cardTitle() {
        // if name set specific, or if no record passed set default name
        return this.name ? `${this.name}'s location` : 'Bear location';
    }
}
