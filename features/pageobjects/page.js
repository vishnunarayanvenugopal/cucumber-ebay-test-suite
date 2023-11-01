const { browser } = require('@wdio/globals')

module.exports = class Page {

    open (path) {
        return browser.url(`https://www.ebay.com/${path}`)
    }

    get shopByCategoryButton () 
    {
        return $('//button[@id="gh-shop-a"]');
    }

    get searchBar () 
    {
        return $('//div[@id="gh-ac-box2"]/input');
    }

    searchSubmit () 
    {
        return $('//td/input[@type="submit" and @value="Search"]');
    }

    clickElement(element) 
    {
        try {
            const isDisplayed = element.isDisplayed();
            if (!isDisplayed) 
                {
                 element.focus();
                 element.scrollIntoView();
                }

                browser.waitUntil(
                    () => element.isClickable(),
                    {
                      timeout: 100000, // Maximum wait time in milliseconds
                      timeoutMsg: `Element is not clickable after waiting`,
                      interval: 5000,  // Polling interval in milliseconds
                    }
                  );
                
            element.click();
            return browser.pause(3000);
            }
        catch (error) 
            {
                console.error(`Error: Element not found or unable to click - ${error.message}`);
            }

    }

    searchTextInSearchBar (searchText) {
        return this.searchBar.setValue(searchText);

    }

    navigateToElementTypeByTextValue(elementType, textValue) {
        const selector = $(`//${elementType}[text()="${textValue}"]`);
        return selector.click();
      }


    navigateToCategoryName (categoryName) {
        this.shopByCategoryButton.click();
        return this.navigateToElementTypeByTextValue("a",categoryName);
    }

    

    
}
