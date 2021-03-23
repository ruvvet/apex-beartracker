import { publish, MessageContext } from 'lightning/messageService';
import BEAR_LIST_UPDATE_MESSAGE from '@salesforce/messageChannel/BearListUpdate__c';
import { NavigationMixin } from 'lightning/navigation';
import { LightningElement, wire } from 'lwc';
/** BearController.searchBears(searchTerm) Apex method */
import searchBears from '@salesforce/apex/BearController.searchBears';

//navigationmixin >> adds functionality to a class without having to extend again...????
export default class BearList extends NavigationMixin(LightningElement) {
    // default is empty string, which returns all bears
    searchTerm = '';

    // call function get searchterm bears from controller with wire decorator
    // the results from @wire are assigned to the initialized bears var as bears.data
    // // @wire(searchBears, { searchTerm: '$searchTerm' })
    // // bears;

    // init bears var
    // create messagecontext var and store data from MessageContext returned in there
    //loadbears now re-executes every time search term changes
    // each time loadbears executes/searchterm changes, we assign data to message obj
    //then publish that in the messageContext
    bears;
    @wire(MessageContext)
    messageContext;
    @wire(searchBears, { searchTerm: '$searchTerm' })
    loadBears(result) {
        this.bears = result;
        if (result.data) {
            const message = {
                bears: result.data
            };
            publish(this.messageContext, BEAR_LIST_UPDATE_MESSAGE, message);
        }
    }

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

    handleBearView(event) {
        // Get bear record id from bearview event
        const bearId = event.detail;
        // Navigate to bear record page
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: bearId,
                objectApiName: 'Bear__c',
                actionName: 'view'
            }
        });
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
