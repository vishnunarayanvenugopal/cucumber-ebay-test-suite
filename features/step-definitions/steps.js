const { Given, When, Then } = require('@wdio/cucumber-framework');
const { expect, $ } = require('@wdio/globals')

const HomePage = require('../pageobjects/home.page');
const CategoryPage = require('../pageobjects/category.page');
const productListingPage = require('../pageobjects/product-listing.page');

const pages = {
    home: HomePage,
    category: CategoryPage,
    product: productListingPage
}

Given(/^I am on the (\w+) page$/, async (page) => {
    await pages[page].open()
});

When(/^I navigate to category with name : (.*)$/, async (categoryName) => {
    await HomePage.navigateToCategoryName(categoryName)
});

When(/^I navigate to main menu (.*) and then submenu (.*)$/, async (mainMenu,subMenu) => {
    await CategoryPage.navigateToSubmenuUnderMainMenu(subMenu,mainMenu)
});

When(/^I navigate to main menu (.*)$/, async (mainMenu) => {
    await CategoryPage.navigateToMainMenu(mainMenu)
});

When(/^I search string (.*) in search bar$/, async (searchText) => {
    await HomePage.searchTextInSearchBar(searchText)
    await HomePage.searchSubmit();
});

When(/^I navigate to element type (.*) with text (.*)$/, async (elementType,textValue) => {
    await productListingPage.navigateToElementTypeWithText(elementType,textValue)
});

Given('I apply filters with the following conditions:', async function (dataTable) {

    const filtersData = dataTable.raw();
  
    for (const row of filtersData.slice(1)) {
      const conditions = row[0].split(','); 
      const priceRange = row[1].split(','); 
      const itemLocation = row[2].split(','); 

      await productListingPage.applyFilters(["Condition","Price","Item Location"],conditions,priceRange,itemLocation);

    }

      });

Then(/^"(.*)" visible in first search result$/, async (content) => {
    const regex = new RegExp(content, "i");
    await expect(productListingPage.firstResult()).toBeExisting();
    await expect(productListingPage.firstResult()).toHaveTextContaining(regex);
    await browser.saveScreenshot('./screenshots/error.png');
});      


Then(/^I should see (.*)$/, async (content) => {
    await expect(productListingPage.filterText).toBeExisting();
    await expect(productListingPage.filterText).toHaveTextContaining(content);
    await browser.saveScreenshot('./screenshots/error.png');
    
});



