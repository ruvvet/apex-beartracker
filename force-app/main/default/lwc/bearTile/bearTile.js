import { LightningElement, api } from 'lwc';
import ursusResources from '@salesforce/resourceUrl/ursus_park';

export default class BearTile extends LightningElement {
    @api
    bear;

    appResources = {
        bearSilhouette: `${ursusResources}/img/standing-bear-silhouette.png`
    };

    //click a tile to call this function
    // create a new event with bearview tag
    // dispatches event with the bear's ID
    // in parent, an event handler called OnBearView will execute another function
    handleOpenRecordClick() {
        const selectEvent = new CustomEvent('bearview', {
            detail: this.bear.Id
        });
        this.dispatchEvent(selectEvent);
    }
}
