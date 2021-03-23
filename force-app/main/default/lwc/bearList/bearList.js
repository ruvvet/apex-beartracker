import { LightningElement, wire } from 'lwc';
import ursusResources from '@salesforce/resourceUrl/ursus_park';
/** BearController.getAllBears() Apex method */
import getAllBears from '@salesforce/apex/BearController.getAllBears';
/** BearController.searchBears(searchTerm) Apex method */
import searchBears from '@salesforce/apex/BearController.searchBears';

export default class BearList extends LightningElement {
    // default is empty string, which returns all bears
    searchTerm = '';

    // call function get searchterm bears from controller with wire decorator
    // the results from @wire are assigned to the initialized bears var as bears.data
    @wire(searchBears, { searchTerm: '$searchTerm' })
    bears;
    appResources = {
        bearSilhouette: `${ursusResources}/img/standing-bear-silhouette.png`
    };

    handleSearchTermChange(event) {
        // Debouncing this method: do not update the reactive property as
        // long as this function is being called within a delay of 300 ms.
        // This is to avoid a very large number of Apex method calls.
        window.clearTimeout(this.delayTimeout);
        const searchTerm = event.target.value;
        // eslint-disable-next-line @lwc/lwc/no-async-operation
        this.delayTimeout = setTimeout(() => {
            this.searchTerm = searchTerm;
        }, 300);
    }

    // function to see if length of bears.data returned any matches
    get hasResults() {
        return this.bears.data.length > 0;
    }

    // IMPERATIVE APEX
    // // bears;
    // // error;
    // // appResources = {
    // //     bearSilhouette: `${ursusResources}/img/standing-bear-silhouette.png`
    // // };

    // // //onmount/useeffect
    // // connectedCallback() {
    // //     // call the function loadbears
    // //     this.loadBears();
    // // }

    // // // load bears function calls getallbears from apex bearcontroller and sets bears var to the result, else sets error as an error
    // // loadBears() {
    // //     getAllBears()
    // //         .then((result) => {
    // //             this.bears = result;
    // //         })
    // //         .catch((error) => {
    // //             this.error = error;
    // //         });
    // // }
}
