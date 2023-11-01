const { $ } = require('@wdio/globals')
const Page = require('./page');

class HomePage extends Page {

    async navigateToCategoryName (categoryName) {
        return super.navigateToCategoryName(categoryName);
    }

    async searchTextInSearchBar (searchText) {
        return super.searchTextInSearchBar(searchText);
    }

    async searchSubmit () {
        return super.searchSubmit().click();
    }

    open () {
        return super.open('');
    }
}

module.exports = new HomePage();
