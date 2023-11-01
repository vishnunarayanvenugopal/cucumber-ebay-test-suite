const { $ } = require('@wdio/globals')
const Page = require('./page');

class ProductListingPage extends Page {

    get filterText () {
        return $('//button/span[text()="3 filters applied"]');
    }

    filtersButton () 
    {
        return $('//li/button[text()="All Filters"]');
    }

    checkBoxOption (text) 
    {
        return $('//label[span[text()="'+text+'"]]/preceding-sibling::span[1]');
    }

    filterBySelection (text) 
    {
        return $('//div[@role="tablist"]/div/span[text()="'+text+'"]');
    }

    firstResult () 
    {
        return $('//ul[contains(@class, "srp-results")]/li//a/div/span[@role="heading"]');
    }

    filterScrollSelection () 
    {
        return $('//div[@class="x-overlay__wrapper--left"]');
    }

    filtersApply () 
    {
        return $('//button[text()="Apply"]');
    }

    priceRangeBox (occurance) 
    {
        return $('(//div[@class="x-textrange__block"])['+occurance+']');
    }

    radioButtonWithValue (value) 
    {
        return $('//span[contains(@class, "radio")]/following-sibling::label/span[text()="'+value+'"]');
    }

    async navigateToElementTypeWithText (elementType,text) 
    {
        return super.navigateToElementTypeByTextValue(elementType,text);
    }


    async performSwitchFilterPopUp (filterBy) 
    {
        super.clickElement(this.filterBySelection(filterBy));
        await browser.pause(3000);
    }

    async selectFilterCheckBox (options) 
    {
        for(var i=0;i<options.length;i++)
        {
            await this.checkBoxOption(options[i]).click();
            await browser.pause(3000);
        }
    }

    async enterPriceRange (range) 
    {
        for(var i=0;i<2;i++)
        {
            await this.priceRangeBox(i).setValue(range[i]);
            await browser.pause(3000);
        }
    }

    async selectRadioButtons (options) 
    {
        for(var i=0;i<options.length;i++)
        {
            await this.radioButtonWithValue(options[i]).click();
            await browser.pause(3000);
        }
    }

    async applyFilters (filters,Conditions,PriceRange,ItemLocation) 
    {
        super.clickElement(this.filtersButton());

        for(var i=0;i<filters.length;i++)
        {
            //this.filterScrollSelection();
            this.performSwitchFilterPopUp(filters[i]);
            await browser.pause(3000);
            if(filters[i]=="Condition")
            {
                this.selectFilterCheckBox(Conditions);
            }
            if(filters[i]=="Price")
            {
                this.enterPriceRange(PriceRange);
            }
            if(filters[i]=="Item Location")
            {
                this.selectRadioButtons(ItemLocation);
            }
        }

        super.clickElement(this.filtersApply());

    }
}

module.exports = new ProductListingPage();
